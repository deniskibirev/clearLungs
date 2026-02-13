export interface DiaryEntry {
  id: string;
  date: string; // YYYY-MM-DD
  timestamp: number; // для сортировки
  content: string;
  mood?: 'great' | 'good' | 'okay' | 'bad' | 'awful';
  cravings?: number; // 0-10
  note?: string;
}

export interface DiaryData {
  entries: DiaryEntry[];
  lastUpdated: string | null;
}