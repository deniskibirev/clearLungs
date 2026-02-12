import { ProgressData } from '@/types/progress';

const STORAGE_KEY = 'quit_smoking_progress';

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
  }
};