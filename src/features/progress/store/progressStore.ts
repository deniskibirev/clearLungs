// import { create } from 'zustand';
// import { persist, createJSONStorage } from 'zustand/middleware';
// import { ProgressData, TreeStage, DateInterval } from '@/types/progress';
// import { dateUtils } from '@/utils/dateUtils';
// import { storageService } from '@/services/storageService';


// interface ProgressStore {
//   progress: ProgressData;
//   markDay: () => void;
//   resetProgress: () => void;
//   getTreeStage: (days: number) => TreeStage;
//   // Методы для разработки
//   setStreakDays: (days: number) => void;
//   addDays: (count: number) => void;
// }

// const initialProgress: ProgressData = {
//   currentStreak: 0,
//   longestStreak: 0,
//   totalDays: 0,
//   dateIntervals: [],
//   lastCheckDate: null,
//   treeStage: 'seed',
//   timezone: dateUtils.getDeviceTimezone()
// };

// export const useProgressStore = create<ProgressStore>()(
//   persist(
//     (set, get) => ({
//       progress: initialProgress,
      
//       markDay: () => {
//         const today = dateUtils.getTodayLocal();
//         const { progress } = get();
        
//         // Проверяем, не отметился ли уже сегодня
//         if (dateUtils.isDateMarked(progress.dateIntervals, today)) {
//           return;
//         }

//         // Добавляем день к интервалам
//         const newIntervals = dateUtils.addDayToIntervals(progress.dateIntervals, today);
        
//         // Пересчитываем статистику
//         const newCurrentStreak = dateUtils.calculateCurrentStreak(newIntervals, progress.timezone);
//         const newLongestStreak = Math.max(
//           progress.longestStreak, 
//           dateUtils.calculateLongestStreak(newIntervals)
//         );
//         const newTotalDays = dateUtils.calculateTotalDays(newIntervals);
//         const newTreeStage = get().getTreeStage(newCurrentStreak);

//         const newProgress: ProgressData = {
//           currentStreak: newCurrentStreak,
//           longestStreak: newLongestStreak,
//           totalDays: newTotalDays,
//           dateIntervals: newIntervals,
//           lastCheckDate: today,
//           treeStage: newTreeStage,
//           timezone: progress.timezone
//         };

//         set({ progress: newProgress });
//       },

//       resetProgress: () => {
//         set({ progress: initialProgress });
//       },

//       getTreeStage: (days: number): TreeStage => {
//         if (days >= 365) return 'fruitful';
//         if (days >= 180) return 'flowering';
//         if (days >= 90) return 'mature';
//         if (days >= 30) return 'young';
//         if (days >= 7) return 'sprout';
//         return 'seed';
//       },

//       // Методы для разработки
//       setStreakDays: (days: number) => {
//         const { progress } = get();
        
//         if (days === 0) {
//           set({ progress: initialProgress });
//           return;
//         }

//         // Создаем искусственный интервал для тестирования
//         const endDate = dateUtils.getTodayLocal();
//         const startDate = new Date();
//         startDate.setDate(startDate.getDate() - (days - 1));
//         const startDateStr = startDate.toISOString().split('T')[0];
        
//         const testIntervals: DateInterval[] = [
//           { startDate: startDateStr, endDate }
//         ];

//         const newTreeStage = get().getTreeStage(days);

//         set({
//           progress: {
//             ...progress,
//             currentStreak: days,
//             longestStreak: Math.max(progress.longestStreak, days),
//             totalDays: days,
//             dateIntervals: testIntervals,
//             treeStage: newTreeStage
//           }
//         });
//       },

//       addDays: (count: number) => {
//         const { progress } = get();
//         const newDays = progress.currentStreak + count;
//         get().setStreakDays(Math.max(0, newDays));
//       }
//     }),
//     {
//       name: 'quit-smoking-storage',
//       storage: createJSONStorage(() => ({
//         getItem: async (name: string) => {
//           const data = await storageService.loadProgress();
//           return JSON.stringify(data ? { state: { progress: data } } : null);
//         },
//         setItem: async (name: string, value: string) => {
//           const { state } = JSON.parse(value);
//           await storageService.saveProgress(state.progress);
//         },
//         removeItem: async (name: string) => {
//           await storageService.clearProgress();
//         },
//       })),
//     }
//   )
// );

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { ProgressData, TreeStage, DateInterval } from '@/types/progress';
import { dateUtils } from '@/utils/dateUtils';
import { storageService } from '@/services/storageService';
import { 
  updateNotificationsBasedOnProgress, 
  initializeNotifications 
} from '@/utils/notificationUtils';

interface ProgressStore {
  progress: ProgressData;
  markDay: () => void;
  resetProgress: () => void;
  getTreeStage: (days: number) => TreeStage;
  // Методы для разработки
  setStreakDays: (days: number) => void;
  addDays: (count: number) => void;
  // Инициализация хранилища
  initializeStore: () => void;
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
      
      initializeStore: async () => {
        // Инициализируем уведомления при первом запуске
        const { progress } = get();
        const hasUserMarkedToday = dateUtils.isDateMarked(
          progress.dateIntervals, 
          dateUtils.getTodayLocal()
        );
        
        try {
          await initializeNotifications(hasUserMarkedToday);
          console.log('✅ Store and notifications initialized');
        } catch (error) {
          console.error('❌ Error initializing notifications:', error);
        }
      },
      
      markDay: async () => {
        const today = dateUtils.getTodayLocal();
        const { progress } = get();
        
        // Проверяем, не отметился ли уже сегодня
        if (dateUtils.isDateMarked(progress.dateIntervals, today)) {
          return;
        }

        // Добавляем день к интервалам
        const newIntervals = dateUtils.addDayToIntervals(progress.dateIntervals, today);
        
        // Пересчитываем статистику
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

        // Обновляем уведомления - теперь отправляем похвалу!
        try {
          await updateNotificationsBasedOnProgress(true);
          console.log('✅ Notifications updated to PRAISE mode');
        } catch (error) {
          console.error('❌ Error updating notifications:', error);
        }
      },

      resetProgress: async () => {
        set({ progress: initialProgress });
        
        // Обновляем уведомления - возвращаем напоминания
        try {
          await updateNotificationsBasedOnProgress(false);
          console.log('✅ Notifications updated to REMINDER mode');
        } catch (error) {
          console.error('❌ Error updating notifications:', error);
        }
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
          await updateNotificationsBasedOnProgress(false);
          return;
        }

        // 🆕 ИСПРАВЛЕННО: создаем интервал с корректными локальными датами
        const endDate = dateUtils.getTodayLocal();
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - (days - 1));
        // Конвертируем в локальную дату
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

        await updateNotificationsBasedOnProgress(hasMarkedToday);
      },

      addDays: async (count: number) => {
        const { progress } = get();
        const newDays = progress.currentStreak + count;
        const hasMarkedToday = newDays > 0;
        
        if (newDays === 0) {
          set({ progress: initialProgress });
          await updateNotificationsBasedOnProgress(false);
          return;
        }

        // 🆕 ИСПРАВЛЕННО: создаем интервал с корректными локальными датами
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

        await updateNotificationsBasedOnProgress(hasMarkedToday);
      }

      // // Методы для разработки
      // setStreakDays: async (days: number) => {
      //   const { progress } = get();
        
      //   if (days === 0) {
      //     set({ progress: initialProgress });
      //     // Обновляем уведомления
      //     await updateNotificationsBasedOnProgress(false);
      //     return;
      //   }

      //   // Создаем искусственный интервал для тестирования
      //   const endDate = dateUtils.getTodayLocal();
      //   const startDate = new Date();
      //   startDate.setDate(startDate.getDate() - (days - 1));
      //   const startDateStr = startDate.toISOString().split('T')[0];
        
      //   const testIntervals: DateInterval[] = [
      //     { startDate: startDateStr, endDate }
      //   ];

      //   const newTreeStage = get().getTreeStage(days);

      //   const hasMarkedToday = days > 0; // Если дни установлены, считаем что отметился

      //   set({
      //     progress: {
      //       ...progress,
      //       currentStreak: days,
      //       longestStreak: Math.max(progress.longestStreak, days),
      //       totalDays: days,
      //       dateIntervals: testIntervals,
      //       treeStage: newTreeStage,
      //       lastCheckDate: hasMarkedToday ? dateUtils.getTodayLocal() : null
      //     }
      //   });

      //   // Обновляем уведомления в зависимости от статуса
      //   await updateNotificationsBasedOnProgress(hasMarkedToday);
      // },

      // addDays: async (count: number) => {
      //   const { progress } = get();
      //   const newDays = progress.currentStreak + count;
      //   const hasMarkedToday = newDays > 0;
        
      //   if (newDays === 0) {
      //     set({ progress: initialProgress });
      //     await updateNotificationsBasedOnProgress(false);
      //     return;
      //   }

      //   // Создаем искусственный интервал для тестирования
      //   const endDate = dateUtils.getTodayLocal();
      //   const startDate = new Date();
      //   startDate.setDate(startDate.getDate() - (newDays - 1));
      //   const startDateStr = startDate.toISOString().split('T')[0];
        
      //   const testIntervals: DateInterval[] = [
      //     { startDate: startDateStr, endDate }
      //   ];

      //   const newTreeStage = get().getTreeStage(newDays);

      //   set({
      //     progress: {
      //       ...progress,
      //       currentStreak: newDays,
      //       longestStreak: Math.max(progress.longestStreak, newDays),
      //       totalDays: newDays,
      //       dateIntervals: testIntervals,
      //       treeStage: newTreeStage,
      //       lastCheckDate: hasMarkedToday ? dateUtils.getTodayLocal() : null
      //     }
      //   });

      //   // Обновляем уведомления
      //   await updateNotificationsBasedOnProgress(hasMarkedToday);
      // }
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
