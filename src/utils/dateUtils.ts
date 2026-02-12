// import { DateInterval } from '@/types/progress';

// export const dateUtils = {
//   // Получить текущую дату в локальном времени
//   getTodayLocal: (): string => {
//     const now = new Date();
//     // Учитываем локальное время, а не UTC
//     const year = now.getFullYear();
//     const month = String(now.getMonth() + 1).padStart(2, '0');
//     const day = String(now.getDate()).padStart(2, '0');
//     return `${year}-${month}-${day}`;
//   },

//   // Получить часовой пояс устройства
//   getDeviceTimezone: (): string => {
//     return Intl.DateTimeFormat().resolvedOptions().timeZone;
//   },

//   // Проверить, являются ли две даты последовательными
//   areDatesConsecutive: (date1: string, date2: string): boolean => {
//     const d1 = new Date(date1);
//     const d2 = new Date(date2);
//     const diffTime = d2.getTime() - d1.getTime();
//     const diffDays = diffTime / (1000 * 60 * 60 * 24);
//     return diffDays === 1;
//   },

//   // Преобразовать интервалы в массив всех отмеченных дат (для календаря)
//   intervalsToDates: (intervals: DateInterval[]): string[] => {
//     const allDates: string[] = [];
    
//     intervals.forEach(interval => {
//       const start = new Date(interval.startDate);
//       const end = new Date(interval.endDate);
      
//       let current = new Date(start);
//       while (current <= end) {
//         const dateStr = current.toISOString().split('T')[0];
//         allDates.push(dateStr);
//         current.setDate(current.getDate() + 1);
//       }
//     });
    
//     return allDates.sort();
//   },

//   // Добавить день к последнему интервалу или создать новый
//   addDayToIntervals: (intervals: DateInterval[], newDate: string): DateInterval[] => {
//     if (intervals.length === 0) {
//       return [{ startDate: newDate, endDate: newDate }];
//     }

//     const lastInterval = intervals[intervals.length - 1];
    
//     // Проверяем, является ли новая дата продолжением последнего интервала
//     if (dateUtils.areDatesConsecutive(lastInterval.endDate, newDate)) {
//       // Обновляем конец последнего интервала
//       const updatedIntervals = [...intervals];
//       updatedIntervals[updatedIntervals.length - 1] = {
//         ...lastInterval,
//         endDate: newDate
//       };
//       return updatedIntervals;
//     } else {
//       // Создаем новый интервал
//       return [...intervals, { startDate: newDate, endDate: newDate }];
//     }
//   },

//   // Рассчитать текущий стрик на основе интервалов
//   calculateCurrentStreak: (intervals: DateInterval[], timezone: string): number => {
//     if (intervals.length === 0) return 0;
    
//     const today = dateUtils.getTodayLocal();
//     const lastInterval = intervals[intervals.length - 1];
    
//     // Проверяем, включает ли последний интервал сегодня или вчера
//     const lastDate = new Date(lastInterval.endDate);
//     const todayDate = new Date(today);
//     const diffTime = todayDate.getTime() - lastDate.getTime();
//     const diffDays = diffTime / (1000 * 60 * 60 * 24);
    
//     if (diffDays <= 1) {
//       // Если последний день был сегодня или вчера, считаем длину последнего интервала
//       const start = new Date(lastInterval.startDate);
//       const end = new Date(lastInterval.endDate);
//       return Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
//     } else {
//       // Пропуск дня - стрик сбрасывается
//       return 0;
//     }
//   },

//   // Рассчитать самый длинный стрик
//   calculateLongestStreak: (intervals: DateInterval[]): number => {
//     if (intervals.length === 0) return 0;
    
//     let longestStreak = 0;
    
//     intervals.forEach(interval => {
//       const start = new Date(interval.startDate);
//       const end = new Date(interval.endDate);
//       const streakLength = Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
//       longestStreak = Math.max(longestStreak, streakLength);
//     });
    
//     return longestStreak;
//   },

//   // Рассчитать общее количество дней
//   calculateTotalDays: (intervals: DateInterval[]): number => {
//     return intervals.reduce((total, interval) => {
//       const start = new Date(interval.startDate);
//       const end = new Date(interval.endDate);
//       const daysInInterval = Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
//       return total + daysInInterval;
//     }, 0);
//   },

//   // Проверить, был ли день уже отмечен
//   isDateMarked: (intervals: DateInterval[], date: string): boolean => {
//     return intervals.some(interval => {
//       const start = new Date(interval.startDate);
//       const end = new Date(interval.endDate);
//       const checkDate = new Date(date);
//       return checkDate >= start && checkDate <= end;
//     });
//   }
// };


import { DateInterval } from '@/types/progress';

export const dateUtils = {
  // Получить текущую дату в локальном времени (ИСПРАВЛЕННАЯ ВЕРСИЯ)
  getTodayLocal: (): string => {
    const now = new Date();
    // Корректное получение локальной даты без проблем с часовыми поясами
    const localDate = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
    return localDate.toISOString().split('T')[0];
  },

  // Получить часовой пояс устройства
  getDeviceTimezone: (): string => {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  },

  // Проверить, являются ли две даты последовательными (ИСПРАВЛЕННАЯ)
  areDatesConsecutive: (date1: string, date2: string): boolean => {
    const d1 = new Date(date1 + 'T00:00:00'); // Добавляем время для корректного сравнения
    const d2 = new Date(date2 + 'T00:00:00');
    const diffTime = d2.getTime() - d1.getTime();
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    return diffDays === 1;
  },

  // Преобразовать интервалы в массив всех отмеченных дат (УПРОЩЕННАЯ)
  intervalsToDates: (intervals: DateInterval[]): string[] => {
    const allDates: string[] = [];
    
    intervals.forEach(interval => {
      const start = new Date(interval.startDate + 'T00:00:00');
      const end = new Date(interval.endDate + 'T00:00:00');
      
      let current = new Date(start);
      while (current <= end) {
        // Конвертируем в локальную дату для единообразия
        const dateStr = new Date(current.getTime() - current.getTimezoneOffset() * 60000)
          .toISOString()
          .split('T')[0];
        allDates.push(dateStr);
        current.setDate(current.getDate() + 1);
      }
    });
    
    return allDates.sort();
  },

  // Добавить день к последнему интервалу или создать новый
  addDayToIntervals: (intervals: DateInterval[], newDate: string): DateInterval[] => {
    if (intervals.length === 0) {
      return [{ startDate: newDate, endDate: newDate }];
    }

    const lastInterval = intervals[intervals.length - 1];
    
    // Проверяем, является ли новая дата продолжением последнего интервала
    if (dateUtils.areDatesConsecutive(lastInterval.endDate, newDate)) {
      // Обновляем конец последнего интервала
      const updatedIntervals = [...intervals];
      updatedIntervals[updatedIntervals.length - 1] = {
        ...lastInterval,
        endDate: newDate
      };
      return updatedIntervals;
    } else {
      // Создаем новый интервал
      return [...intervals, { startDate: newDate, endDate: newDate }];
    }
  },

  // Рассчитать текущий стрик на основе интервалов (ИСПРАВЛЕННАЯ)
  calculateCurrentStreak: (intervals: DateInterval[], timezone: string): number => {
    if (intervals.length === 0) return 0;
    
    const today = dateUtils.getTodayLocal();
    const lastInterval = intervals[intervals.length - 1];
    
    // Проверяем, включает ли последний интервал сегодня или вчера
    const lastDate = new Date(lastInterval.endDate + 'T00:00:00');
    const todayDate = new Date(today + 'T00:00:00');
    const diffTime = todayDate.getTime() - lastDate.getTime();
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    
    // Если последний день был сегодня (0) или вчера (1), продолжаем стрик
    if (diffDays === 0 || diffDays === 1) {
      const start = new Date(lastInterval.startDate + 'T00:00:00');
      const end = new Date(lastInterval.endDate + 'T00:00:00');
      return Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    } else {
      // Пропуск дня - стрик сбрасывается
      return 0;
    }
  },

  // Рассчитать самый длинный стрик
  calculateLongestStreak: (intervals: DateInterval[]): number => {
    if (intervals.length === 0) return 0;
    
    let longestStreak = 0;
    
    intervals.forEach(interval => {
      const start = new Date(interval.startDate + 'T00:00:00');
      const end = new Date(interval.endDate + 'T00:00:00');
      const streakLength = Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
      longestStreak = Math.max(longestStreak, streakLength);
    });
    
    return longestStreak;
  },

  // Рассчитать общее количество дней
  calculateTotalDays: (intervals: DateInterval[]): number => {
    return intervals.reduce((total, interval) => {
      const start = new Date(interval.startDate + 'T00:00:00');
      const end = new Date(interval.endDate + 'T00:00:00');
      const daysInInterval = Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
      return total + daysInInterval;
    }, 0);
  },

  // Проверить, был ли день уже отмечен (ИСПРАВЛЕННАЯ)
  isDateMarked: (intervals: DateInterval[], date: string): boolean => {
    const checkDate = new Date(date + 'T00:00:00');
    
    return intervals.some(interval => {
      const start = new Date(interval.startDate + 'T00:00:00');
      const end = new Date(interval.endDate + 'T00:00:00');
      return checkDate >= start && checkDate <= end;
    });
  },

  // 🆕 Новая функция: получить вчерашнюю дату
  getYesterdayLocal: (): string => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const localDate = new Date(yesterday.getTime() - yesterday.getTimezoneOffset() * 60000);
    return localDate.toISOString().split('T')[0];
  },

  // 🆕 Новая функция: форматировать дату для отображения
  formatDateForDisplay: (dateString: string): string => {
    const date = new Date(dateString + 'T00:00:00');
    return date.toLocaleDateString(); // Локальный формат устройства
  }
};