import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { DiaryData, DiaryEntry } from '@/types/diary';
import { storageService } from '@/services/storageService';

interface DiaryStore {
  diary: DiaryData;
  addEntry: (content: string, mood?: DiaryEntry['mood'], cravings?: number) => void;
  deleteEntry: (id: string) => void;
  editEntry: (id: string, content: string, mood?: DiaryEntry['mood'], cravings?: number) => void;
  getEntriesByDate: (date: string) => DiaryEntry[];
  clearAllEntries: () => void;
}

const initialDiary: DiaryData = {
  entries: [],
  lastUpdated: null
};

export const useDiaryStore = create<DiaryStore>()(
  persist(
    (set, get) => ({
      diary: initialDiary,

      addEntry: (content, mood, cravings) => {
        const now = new Date();
        const date = now.toISOString().split('T')[0];
        
        const newEntry: DiaryEntry = {
          id: Date.now().toString() + Math.random().toString(36).substr(2, 5),
          date,
          timestamp: now.getTime(),
          content: content.trim(),
          mood,
          cravings
        };

        set((state) => ({
          diary: {
            entries: [newEntry, ...state.diary.entries], // Новые записи ВНАЧАЛЕ!
            lastUpdated: date
          }
        }));
      },

      deleteEntry: (id: string) => {
        set((state) => ({
          diary: {
            ...state.diary,
            entries: state.diary.entries.filter(entry => entry.id !== id)
          }
        }));
      },

      editEntry: (id: string, content: string, mood?, cravings?) => {
        set((state) => ({
          diary: {
            ...state.diary,
            entries: state.diary.entries.map(entry =>
              entry.id === id
                ? { 
                    ...entry, 
                    content: content.trim(), 
                    mood, 
                    cravings,
                    timestamp: Date.now() // обновляем время редактирования
                  }
                : entry
            )
          }
        }));
      },

      getEntriesByDate: (date: string) => {
        return get().diary.entries.filter(entry => entry.date === date);
      },

      clearAllEntries: () => {
        set({ diary: initialDiary });
      }
    }),
    {
      name: 'quit-smoking-diary-storage',
      storage: createJSONStorage(() => ({
        getItem: async (name: string) => {
          const data = await storageService.loadDiary();
          return JSON.stringify(data ? { state: { diary: data } } : null);
        },
        setItem: async (name: string, value: string) => {
          const { state } = JSON.parse(value);
          await storageService.saveDiary(state.diary);
        },
        removeItem: async (name: string) => {
          await storageService.clearDiary();
        },
      })),
    }
  )
);