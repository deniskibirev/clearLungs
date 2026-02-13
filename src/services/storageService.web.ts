import { ProgressData } from '@/types/progress';
import { DiaryData } from '@/types/diary';

const STORAGE_KEY = 'quit_smoking_progress';
const DIARY_STORAGE_KEY = 'quit_smoking_diary';

export const storageService = {
  saveProgress: async (progress: ProgressData): Promise<void> => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (error) {
      console.error('Failed to save progress:', error);
    }
  },

  loadProgress: async (): Promise<ProgressData | null> => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Failed to load progress:', error);
      return null;
    }
  },

  clearProgress: async (): Promise<void> => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Failed to clear progress:', error);
    }
  },

  saveDiary: async (diary: DiaryData): Promise<void> => {
    try {
      localStorage.setItem(DIARY_STORAGE_KEY, JSON.stringify(diary));
    } catch (error) {
      console.error('Failed to save diary:', error);
    }
  },

  loadDiary: async (): Promise<DiaryData | null> => {
    try {
      const data = localStorage.getItem(DIARY_STORAGE_KEY);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Failed to load diary:', error);
      return null;
    }
  },

   clearDiary: async (): Promise<void> => {
    try {
      localStorage.removeItem(DIARY_STORAGE_KEY);
    } catch (error) {
      console.error('Failed to clear diary:', error);
    }
  }
};