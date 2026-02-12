export type ThemeMode = 'light' | 'dark';

export interface ThemeColors {
  primary: string;
  background: string;
  text: string;
  calendar: {
    marked: string;
    today: string;
    background: string;
  };
}