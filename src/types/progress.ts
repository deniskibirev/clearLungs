// export type TreeStage = 'seed' | 'sprout' | 'young' | 'mature' | 'flowering' | 'fruitful';

// export interface ProgressData {
//   streakDays: number;
//   markedDates: string[];
//   lastCheckDate: string | null;
//   treeStage: TreeStage;
// }

// export interface CalendarDay {
//   date: string; // YYYY-MM-DD
//   isMarked: boolean;
//   isToday: boolean;
//   isCurrentMonth: boolean;
//   dayNumber: number;
// }

// export interface CalendarMonth {
//   year: number;
//   month: number; // 0-11
//   weeks: CalendarDay[][];
// }

export type TreeStage = 'seed' | 'sprout' | 'young' | 'mature' | 'flowering' | 'fruitful';

export interface DateInterval {
  startDate: string; // YYYY-MM-DD
  endDate: string;   // YYYY-MM-DD
}

export interface ProgressData {
  currentStreak: number;
  longestStreak: number;
  totalDays: number;
  dateIntervals: DateInterval[]; // Интервалы вместо отдельных дней
  lastCheckDate: string | null;
  treeStage: TreeStage;
  timezone: string; // Часовой пояс пользователя
}

export interface CalendarDay {
  date: string;
  isMarked: boolean;
  isToday: boolean;
  isCurrentMonth: boolean;
  dayNumber: number;
  isCurrentStreak: boolean;
}

export interface CalendarMonth {
  year: number;
  month: number;
  weeks: CalendarDay[][];
}