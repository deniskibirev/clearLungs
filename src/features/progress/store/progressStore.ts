import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { ProgressData, TreeStage, DateInterval } from '@/types/progress';
import { dateUtils } from '@/utils/dateUtils';
import { storageService } from '@/services/storageService';

interface ProgressStore {
  progress: ProgressData;
  markDay: () => void;
  resetProgress: () => void;
  getTreeStage: (days: number) => TreeStage;
  // Методы для разработки
  setStreakDays: (days: number) => void;
  addDays: (count: number) => void;
}

const initialProgress: ProgressData = {
  currentStreak: 0,
  longestStreak: 0,
  totalDays: 0,
  dateIntervals: [],
  lastCheckDate: null,
  treeStage: 'seed',
  timezone: dateUtils.getDeviceTimezone()
};

export const useProgressStore = create<ProgressStore>()(
  persist(
    (set, get) => ({
      progress: initialProgress,
      
      markDay: async () => {
        const today = dateUtils.getTodayLocal();
        const { progress } = get();
        
        if (dateUtils.isDateMarked(progress.dateIntervals, today)) {
          return;
        }

        const newIntervals = dateUtils.addDayToIntervals(progress.dateIntervals, today);
        
        const newCurrentStreak = dateUtils.calculateCurrentStreak(newIntervals, progress.timezone);
        const newLongestStreak = Math.max(
          progress.longestStreak, 
          dateUtils.calculateLongestStreak(newIntervals)
        );
        const newTotalDays = dateUtils.calculateTotalDays(newIntervals);
        const newTreeStage = get().getTreeStage(newCurrentStreak);

        const newProgress: ProgressData = {
          currentStreak: newCurrentStreak,
          longestStreak: newLongestStreak,
          totalDays: newTotalDays,
          dateIntervals: newIntervals,
          lastCheckDate: today,
          treeStage: newTreeStage,
          timezone: progress.timezone
        };

        set({ progress: newProgress });
      },

      resetProgress: async () => {
        set({ progress: initialProgress });
      },

      getTreeStage: (days: number): TreeStage => {
        if (days >= 365) return 'fruitful';
        if (days >= 180) return 'flowering';
        if (days >= 90) return 'mature';
        if (days >= 30) return 'young';
        if (days >= 7) return 'sprout';
        return 'seed';
      },

      setStreakDays: async (days: number) => {
        const { progress } = get();
        
        if (days === 0) {
          set({ progress: initialProgress });
          return;
        }

        const endDate = dateUtils.getTodayLocal();
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - (days - 1));
        const startDateLocal = new Date(startDate.getTime() - startDate.getTimezoneOffset() * 60000)
          .toISOString()
          .split('T')[0];
        
        const testIntervals: DateInterval[] = [
          { startDate: startDateLocal, endDate }
        ];

        const newTreeStage = get().getTreeStage(days);
        const hasMarkedToday = days > 0;

        set({
          progress: {
            ...progress,
            currentStreak: days,
            longestStreak: Math.max(progress.longestStreak, days),
            totalDays: days,
            dateIntervals: testIntervals,
            treeStage: newTreeStage,
            lastCheckDate: hasMarkedToday ? dateUtils.getTodayLocal() : null
          }
        });
      },

      addDays: async (count: number) => {
        const { progress } = get();
        const newDays = progress.currentStreak + count;
        const hasMarkedToday = newDays > 0;
        
        if (newDays === 0) {
          set({ progress: initialProgress });
          return;
        }

        const endDate = dateUtils.getTodayLocal();
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - (newDays - 1));
        const startDateLocal = new Date(startDate.getTime() - startDate.getTimezoneOffset() * 60000)
          .toISOString()
          .split('T')[0];
        
        const testIntervals: DateInterval[] = [
          { startDate: startDateLocal, endDate }
        ];

        const newTreeStage = get().getTreeStage(newDays);

        set({
          progress: {
            ...progress,
            currentStreak: newDays,
            longestStreak: Math.max(progress.longestStreak, newDays),
            totalDays: newDays,
            dateIntervals: testIntervals,
            treeStage: newTreeStage,
            lastCheckDate: hasMarkedToday ? dateUtils.getTodayLocal() : null
          }
        });
      }
    }),
    {
      name: 'quit-smoking-storage',
      storage: createJSONStorage(() => ({
        getItem: async (name: string) => {
          const data = await storageService.loadProgress();
          return JSON.stringify(data ? { state: { progress: data } } : null);
        },
        setItem: async (name: string, value: string) => {
          const { state } = JSON.parse(value);
          await storageService.saveProgress(state.progress);
        },
        removeItem: async (name: string) => {
          await storageService.clearProgress();
        },
      })),
    }
  )
);