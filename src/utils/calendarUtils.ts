

// import { CalendarDay, CalendarMonth, DateInterval } from '@/types/progress';
// import { dateUtils } from './dateUtils';

// export const calendarUtils = {
//   // Получить календарь на конкретный месяц
//   getCalendarMonth: (year: number, month: number, dateIntervals: DateInterval[]): CalendarMonth => {
//     const markedDates = dateUtils.intervalsToDates(dateIntervals);
//     const firstDay = new Date(year, month, 1);
//     const lastDay = new Date(year, month + 1, 0);
//     const today = dateUtils.getTodayLocal();
    
//     const weeks: CalendarDay[][] = [];
//     let currentWeek: CalendarDay[] = [];
    
//     // Добавляем дни предыдущего месяца
//     const firstDayOfWeek = firstDay.getDay();
//     for (let i = firstDayOfWeek - 1; i >= 0; i--) {
//       const date = new Date(year, month, -i);
//       currentWeek.push(createCalendarDay(date, markedDates, today, false));
//     }
    
//     // Добавляем дни текущего месяца
//     for (let day = 1; day <= lastDay.getDate(); day++) {
//       const date = new Date(year, month, day);
//       currentWeek.push(createCalendarDay(date, markedDates, today, true));
      
//       if (currentWeek.length === 7) {
//         weeks.push([...currentWeek]);
//         currentWeek = [];
//       }
//     }
    
//     // Добавляем дни следующего месяца
//     if (currentWeek.length > 0) {
//       const nextMonth = month === 11 ? 0 : month + 1;
//       const nextYear = month === 11 ? year + 1 : year;
      
//       let day = 1;
//       while (currentWeek.length < 7) {
//         const date = new Date(nextYear, nextMonth, day);
//         currentWeek.push(createCalendarDay(date, markedDates, today, false));
//         day++;
//       }
//       weeks.push([...currentWeek]);
//     }
    
//     return { year, month, weeks };
//   },

//   // Получить текущий месяц
//   getCurrentMonth: (): { year: number; month: number } => {
//     const now = new Date();
//     return { year: now.getFullYear(), month: now.getMonth() };
//   },

//   // Перейти к предыдущему/следующему месяцу
//   navigateMonth: (year: number, month: number, direction: 'prev' | 'next') => {
//     if (direction === 'prev') {
//       if (month === 0) return { year: year - 1, month: 11 };
//       return { year, month: month - 1 };
//     } else {
//       if (month === 11) return { year: year + 1, month: 0 };
//       return { year, month: month + 1 };
//     }
//   },

//   // Форматирование даты
//   formatMonthYear: (year: number, month: number): string => {
//     return new Date(year, month).toLocaleDateString('en-US', { 
//       month: 'long', 
//       year: 'numeric' 
//     });
//   },

//   // Получить короткое название дня недели
//   getDayNames: (): string[] => {
//     return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
//   },

//   // 🆕 Новая функция: получить локализованные названия дней
//   getLocalizedDayNames: (): string[] => {
//     const baseDate = new Date(2023, 0, 1); // 1 января 2023 (воскресенье)
//     const dayNames: string[] = [];
    
//     for (let i = 0; i < 7; i++) {
//       const date = new Date(baseDate);
//       date.setDate(baseDate.getDate() + i);
//       dayNames.push(date.toLocaleDateString(undefined, { weekday: 'short' }));
//     }
    
//     return dayNames;
//   }
// };

// // 🆕 ИСПРАВЛЕННАЯ функция создания дня календаря
// const createCalendarDay = (
//   date: Date, 
//   markedDates: string[], 
//   today: string, 
//   isCurrentMonth: boolean
// ): CalendarDay => {
//   // ИСПРАВЛЕНИЕ: используем локальную дату вместо UTC
//   const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
//   const dateString = localDate.toISOString().split('T')[0];
  
//   return {
//     date: dateString,
//     isMarked: markedDates.includes(dateString),
//     isToday: dateString === today,
//     isCurrentMonth,
//     dayNumber: date.getDate() // Оставляем оригинальный getDate() для отображения числа
//   };
// };





// import { CalendarDay, CalendarMonth, DateInterval } from '@/types/progress';
// import { dateUtils } from './dateUtils';

// export const calendarUtils = {
//   // Получить календарь на конкретный месяц
//   getCalendarMonth: (year: number, month: number, dateIntervals: DateInterval[]): CalendarMonth => {
//     const markedDates = dateUtils.intervalsToDates(dateIntervals);
//     const firstDay = new Date(year, month, 1);
//     const lastDay = new Date(year, month + 1, 0);
//     const today = dateUtils.getTodayLocal();
    
//     const weeks: CalendarDay[][] = [];
//     let currentWeek: CalendarDay[] = [];
    
//     // Добавляем дни предыдущего месяца
//     const firstDayOfWeek = firstDay.getDay();
//     for (let i = firstDayOfWeek - 1; i >= 0; i--) {
//       const date = new Date(year, month, -i);
//       currentWeek.push(createCalendarDay(date, markedDates, today, false));
//     }
    
//     // Добавляем дни текущего месяца
//     for (let day = 1; day <= lastDay.getDate(); day++) {
//       const date = new Date(year, month, day);
//       currentWeek.push(createCalendarDay(date, markedDates, today, true));
      
//       if (currentWeek.length === 7) {
//         weeks.push([...currentWeek]);
//         currentWeek = [];
//       }
//     }
    
//     // Добавляем дни следующего месяца
//     if (currentWeek.length > 0) {
//       const nextMonth = month === 11 ? 0 : month + 1;
//       const nextYear = month === 11 ? year + 1 : year;
      
//       let day = 1;
//       while (currentWeek.length < 7) {
//         const date = new Date(nextYear, nextMonth, day);
//         currentWeek.push(createCalendarDay(date, markedDates, today, false));
//         day++;
//       }
//       weeks.push([...currentWeek]);
//     }
    
//     return { year, month, weeks };
//   },

//   // Получить текущий месяц
//   getCurrentMonth: (): { year: number; month: number } => {
//     const now = new Date();
//     return { year: now.getFullYear(), month: now.getMonth() };
//   },

//   // Перейти к предыдущему/следующему месяцу
//   navigateMonth: (year: number, month: number, direction: 'prev' | 'next') => {
//     if (direction === 'prev') {
//       if (month === 0) return { year: year - 1, month: 11 };
//       return { year, month: month - 1 };
//     } else {
//       if (month === 11) return { year: year + 1, month: 0 };
//       return { year, month: month + 1 };
//     }
//   },

//   // Форматирование даты (ИСПРАВЛЕННАЯ)
//   formatMonthYear: (year: number, month: number): string => {
//     return new Date(year, month).toLocaleDateString(undefined, { // 🆕 undefined вместо 'en-US'
//       month: 'long', 
//       year: 'numeric' 
//     });
//   },

//   // Получить короткое название дня недели
//   getDayNames: (): string[] => {
//     return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
//   },

//   // 🆕 Новая функция: получить локализованные названия дней
//   getLocalizedDayNames: (): string[] => {
//     const baseDate = new Date(2023, 0, 1); // 1 января 2023 (воскресенье)
//     const dayNames: string[] = [];
    
//     for (let i = 0; i < 7; i++) {
//       const date = new Date(baseDate);
//       date.setDate(baseDate.getDate() + i);
//       dayNames.push(date.toLocaleDateString(undefined, { weekday: 'short' }));
//     }
    
//     return dayNames;
//   },

//   // 🆕 Новая функция: получить локализованное название месяца
//   getLocalizedMonthName: (month: number): string => {
//     const date = new Date(2023, month, 1);
//     return date.toLocaleDateString(undefined, { month: 'long' });
//   },

//   // 🆕 Новая функция: форматировать месяц и год с локализацией
//   formatLocalizedMonthYear: (year: number, month: number): string => {
//     const date = new Date(year, month, 1);
//     return date.toLocaleDateString(undefined, {
//       month: 'long',
//       year: 'numeric'
//     });
//   }
// };

// // 🆕 ИСПРАВЛЕННАЯ функция создания дня календаря
// const createCalendarDay = (
//   date: Date, 
//   markedDates: string[], 
//   today: string, 
//   isCurrentMonth: boolean
// ): CalendarDay => {
//   // ИСПРАВЛЕНИЕ: используем локальную дату вместо UTC
//   const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
//   const dateString = localDate.toISOString().split('T')[0];
  
//   return {
//     date: dateString,
//     isMarked: markedDates.includes(dateString),
//     isToday: dateString === today,
//     isCurrentMonth,
//     dayNumber: date.getDate() // Оставляем оригинальный getDate() для отображения числа
//   };
// };


import { CalendarDay, CalendarMonth, DateInterval } from '@/types/progress';
import { dateUtils } from './dateUtils';

// 🆕 Функция для получения всех дат из интервала (ПЕРЕМЕЩЕНА ВВЕРХ)
const getDatesFromInterval = (interval: DateInterval): string[] => {
  const dates: string[] = [];
  const start = new Date(interval.startDate + 'T00:00:00');
  const end = new Date(interval.endDate + 'T00:00:00');
  
  let current = new Date(start);
  while (current <= end) {
    const localDate = new Date(current.getTime() - current.getTimezoneOffset() * 60000);
    dates.push(localDate.toISOString().split('T')[0]);
    current.setDate(current.getDate() + 1);
  }
  
  return dates;
};

// 🆕 Функция для получения дат текущей серии (ПЕРЕМЕЩЕНА ВВЕРХ)
const getCurrentStreakDates = (dateIntervals: DateInterval[]): string[] => {
  if (dateIntervals.length === 0) return [];
  
  const lastInterval = dateIntervals[dateIntervals.length - 1];
  const today = dateUtils.getTodayLocal();
  const yesterday = dateUtils.getYesterdayLocal();
  
  // Проверяем, является ли последний интервал текущей серией
  const lastDate = new Date(lastInterval.endDate + 'T00:00:00');
  const todayDate = new Date(today + 'T00:00:00');
  const diffTime = todayDate.getTime() - lastDate.getTime();
  const diffDays = diffTime / (1000 * 60 * 60 * 24);
  
  // Если последний день был сегодня или вчера - это текущая серия
  if (diffDays <= 1) {
    return getDatesFromInterval(lastInterval);
  }
  
  return []; // Нет текущей серии
};

// 🆕 ОБНОВЛЕННАЯ функция создания дня календаря (ПЕРЕМЕЩЕНА ВВЕРХ)
const createCalendarDay = (
  date: Date, 
  markedDates: string[], 
  currentStreakDates: string[], 
  today: string, 
  isCurrentMonth: boolean
): CalendarDay => {
  const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  const dateString = localDate.toISOString().split('T')[0];
  const isMarked = markedDates.includes(dateString);
  const isCurrentStreak = currentStreakDates.includes(dateString);
  
  return {
    date: dateString,
    isMarked,
    isToday: dateString === today,
    isCurrentMonth,
    dayNumber: date.getDate(),
    isCurrentStreak: isMarked && isCurrentStreak // 🆕 Новое поле
  };
};

export const calendarUtils = {
  // Получить календарь на конкретный месяц
  getCalendarMonth: (year: number, month: number, dateIntervals: DateInterval[]): CalendarMonth => {
    const markedDates = dateUtils.intervalsToDates(dateIntervals);
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const today = dateUtils.getTodayLocal();
    
    // 🆕 Определяем даты текущей серии
    const currentStreakDates = getCurrentStreakDates(dateIntervals);
    
    const weeks: CalendarDay[][] = [];
    let currentWeek: CalendarDay[] = [];
    
    // Добавляем дни предыдущего месяца
    const firstDayOfWeek = firstDay.getDay();
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      const date = new Date(year, month, -i);
      currentWeek.push(createCalendarDay(date, markedDates, currentStreakDates, today, false));
    }
    
    // Добавляем дни текущего месяца
    for (let day = 1; day <= lastDay.getDate(); day++) {
      const date = new Date(year, month, day);
      currentWeek.push(createCalendarDay(date, markedDates, currentStreakDates, today, true));
      
      if (currentWeek.length === 7) {
        weeks.push([...currentWeek]);
        currentWeek = [];
      }
    }
    
    // Добавляем дни следующего месяца
    if (currentWeek.length > 0) {
      const nextMonth = month === 11 ? 0 : month + 1;
      const nextYear = month === 11 ? year + 1 : year;
      
      let day = 1;
      while (currentWeek.length < 7) {
        const date = new Date(nextYear, nextMonth, day);
        currentWeek.push(createCalendarDay(date, markedDates, currentStreakDates, today, false));
        day++;
      }
      weeks.push([...currentWeek]);
    }
    
    return { year, month, weeks };
  },

  // 🆕 Новая функция: получить даты текущей серии (публичная версия)
  getCurrentStreakDates: (dateIntervals: DateInterval[]): string[] => {
    return getCurrentStreakDates(dateIntervals);
  },

  // Остальные функции без изменений...
  getCurrentMonth: (): { year: number; month: number } => {
    const now = new Date();
    return { year: now.getFullYear(), month: now.getMonth() };
  },

  navigateMonth: (year: number, month: number, direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      if (month === 0) return { year: year - 1, month: 11 };
      return { year, month: month - 1 };
    } else {
      if (month === 11) return { year: year + 1, month: 0 };
      return { year, month: month + 1 };
    }
  },

  formatMonthYear: (year: number, month: number): string => {
    return new Date(year, month).toLocaleDateString(undefined, {
      month: 'long', 
      year: 'numeric' 
    });
  },

  getDayNames: (): string[] => {
    return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  },

  getLocalizedDayNames: (): string[] => {
    const baseDate = new Date(2023, 0, 1);
    const dayNames: string[] = [];
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(baseDate);
      date.setDate(baseDate.getDate() + i);
      dayNames.push(date.toLocaleDateString(undefined, { weekday: 'short' }));
    }
    
    return dayNames;
  },

  getLocalizedMonthName: (month: number): string => {
    const date = new Date(2023, month, 1);
    return date.toLocaleDateString(undefined, { month: 'long' });
  },

  formatLocalizedMonthYear: (year: number, month: number): string => {
    const date = new Date(year, month, 1);
    return date.toLocaleDateString(undefined, {
      month: 'long',
      year: 'numeric'
    });
  }
};