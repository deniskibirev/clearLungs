import AsyncStorage from '@react-native-async-storage/async-storage';
import { ProgressData, DateInterval } from '@/types/progress';
import { DiaryData } from '@/types/diary'; 
import { dateUtils } from '@/utils/dateUtils';


const STORAGE_KEY = 'quit_smoking_progress';
const DIARY_STORAGE_KEY = 'quit_smoking_diary';

export const storageService = {
  // Сохранить прогресс
  saveProgress: async (progress: ProgressData): Promise<void> => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (error) {
      console.error('Failed to save progress:', error);
      throw error;
    }
  },

  // Загрузить прогресс
  loadProgress: async (): Promise<ProgressData | null> => {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      if (!data) return null;
      
      const progress = JSON.parse(data);
      
      // Миграция со старого формата (отдельные дни) на новый (интервалы)
      if (progress.markedDates && !progress.dateIntervals) {
        return migrateFromOldFormat(progress);
      }
      
      return progress;
    } catch (error) {
      console.error('Failed to load progress:', error);
      return null;
    }
  },

  // Очистить прогресс
  clearProgress: async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Failed to clear progress:', error);
      throw error;
    }
  },

  // Сохранить дневник
  saveDiary: async (diary: DiaryData): Promise<void> => {
    try {
      await AsyncStorage.setItem(DIARY_STORAGE_KEY, JSON.stringify(diary));
    } catch (error) {
      console.error('Failed to save diary:', error);
      throw error;
    }
  },

  // Загрузить дневник
  loadDiary: async (): Promise<DiaryData | null> => {
    try {
      const data = await AsyncStorage.getItem(DIARY_STORAGE_KEY);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Failed to load diary:', error);
      return null;
    }
  },

  // Очистить дневник
  clearDiary: async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem(DIARY_STORAGE_KEY);
    } catch (error) {
      console.error('Failed to clear diary:', error);
      throw error;
    }
  }
};

// Миграция данных со старого формата
const migrateFromOldFormat = (oldProgress: any): ProgressData => {
  const markedDates: string[] = oldProgress.markedDates || [];
  const dateIntervals = convertDatesToIntervals(markedDates);
  
  return {
    currentStreak: dateUtils.calculateCurrentStreak(dateIntervals, oldProgress.timezone || dateUtils.getDeviceTimezone()),
    longestStreak: dateUtils.calculateLongestStreak(dateIntervals),
    totalDays: dateUtils.calculateTotalDays(dateIntervals),
    dateIntervals,
    lastCheckDate: oldProgress.lastCheckDate,
    treeStage: oldProgress.treeStage || 'seed',
    timezone: oldProgress.timezone || dateUtils.getDeviceTimezone()
  };
};

// Конвертировать массив дат в интервалы
const convertDatesToIntervals = (dates: string[]): DateInterval[] => {
  if (dates.length === 0) return [];
  
  const sortedDates = [...dates].sort();
  const intervals: DateInterval[] = [];
  let currentInterval: DateInterval | null = null;
  
  sortedDates.forEach(date => {
    if (!currentInterval) {
      currentInterval = { startDate: date, endDate: date };
    } else if (dateUtils.areDatesConsecutive(currentInterval.endDate, date)) {
      currentInterval.endDate = date;
    } else {
      intervals.push(currentInterval);
      currentInterval = { startDate: date, endDate: date };
    }
  });
  
  if (currentInterval) {
    intervals.push(currentInterval);
  }
  
  return intervals;
};