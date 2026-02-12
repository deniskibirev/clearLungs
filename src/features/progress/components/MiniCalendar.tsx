// // import React from 'react';
// // import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// // import { colors } from '@/app/constants/colors';
// // import { calendarUtils } from '@/utils/calendarUtils';

// // interface MiniCalendarProps {
// //   markedDates: string[];
// //   onPress?: () => void;
// // }

// // export const MiniCalendar: React.FC<MiniCalendarProps> = ({ 
// //   markedDates, 
// //   onPress 
// // }) => {
// //   const { year, month } = calendarUtils.getCurrentMonth();
// //   const calendar = calendarUtils.getCalendarMonth(year, month, markedDates);
// //   const dayNames = calendarUtils.getDayNames();

// //   return (
// //     <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
// //       <View style={styles.header}>
// //         <Text style={styles.title}>📅 {calendarUtils.formatMonthYear(year, month)}</Text>
// //         <Text style={styles.tapHint}>(Tap to view full calendar)</Text>
// //       </View>
      
// //       {/* Дни недели */}
// //       <View style={styles.daysHeader}>
// //         {dayNames.map(day => (
// //           <Text key={day} style={styles.dayName}>{day}</Text>
// //         ))}
// //       </View>
      
// //       {/* Дни месяца */}
// //       {calendar.weeks.slice(0, 6).map((week, weekIndex) => (
// //         <View key={weekIndex} style={styles.week}>
// //           {week.map((day, dayIndex) => (
// //             <View 
// //               key={`${weekIndex}-${dayIndex}`} 
// //               style={[
// //                 styles.day,
// //                 !day.isCurrentMonth && styles.otherMonthDay
// //               ]}
// //             >
// //               <View style={[
// //                 styles.dayCircle,
// //                 day.isMarked && styles.markedDay,
// //                 day.isToday && styles.todayDay
// //               ]}>
// //                 <Text style={[
// //                   styles.dayText,
// //                   !day.isCurrentMonth && styles.otherMonthText,
// //                   day.isMarked && styles.markedDayText,
// //                   day.isToday && styles.todayDayText
// //                 ]}>
// //                   {day.dayNumber}
// //                 </Text>
// //               </View>
// //             </View>
// //           ))}
// //         </View>
// //       ))}
// //     </TouchableOpacity>
// //   );
// // };

// import React from 'react';
// import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// import { colors } from '@/app/constants/colors';
// import { calendarUtils } from '@/utils/calendarUtils';
// import { DateInterval } from '@/types/progress';
// import { dateUtils } from '@/utils/dateUtils';

// interface MiniCalendarProps {
//   dateIntervals: DateInterval[];
//   onPress?: () => void;
// }

// export const MiniCalendar: React.FC<MiniCalendarProps> = ({ 
//   dateIntervals, 
//   onPress 
// }) => {
//   const { year, month } = calendarUtils.getCurrentMonth();
//   const markedDates = dateUtils.intervalsToDates(dateIntervals);
//   const calendar = calendarUtils.getCalendarMonth(year, month, dateIntervals);
//   const dayNames = calendarUtils.getDayNames();

//   return (
//     <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
//       <View style={styles.header}>
//         <Text style={styles.title}>📅 {calendarUtils.formatMonthYear(year, month)}</Text>
//         <Text style={styles.tapHint}>(Tap to view full calendar)</Text>
//       </View>
      
//       {/* Дни недели */}
//       <View style={styles.daysHeader}>
//         {dayNames.map(day => (
//           <Text key={day} style={styles.dayName}>{day}</Text>
//         ))}
//       </View>
      
//       {/* Дни месяца */}
//       {calendar.weeks.slice(0, 6).map((week, weekIndex) => (
//         <View key={weekIndex} style={styles.week}>
//           {week.map((day, dayIndex) => (
//             <View 
//               key={`${weekIndex}-${dayIndex}`} 
//               style={[
//                 styles.day,
//                 !day.isCurrentMonth && styles.otherMonthDay
//               ]}
//             >
//               <View style={[
//                 styles.dayCircle,
//                 day.isMarked && styles.markedDay,
//                 day.isToday && styles.todayDay
//               ]}>
//                 <Text style={[
//                   styles.dayText,
//                   !day.isCurrentMonth && styles.otherMonthText,
//                   day.isMarked && styles.markedDayText,
//                   day.isToday && styles.todayDayText
//                 ]}>
//                   {day.dayNumber}
//                 </Text>
//               </View>
//             </View>
//           ))}
//         </View>
//       ))}
//     </TouchableOpacity>
//   );
// };


// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: colors.dark.calendar.background,
//     padding: 15,
//     borderRadius: 12,
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 15,
//   },
//   title: {
//     color: colors.dark.text,
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   tapHint: {
//     color: '#666',
//     fontSize: 10,
//   },
//   daysHeader: {
//     flexDirection: 'row',
//     marginBottom: 8,
//   },
//   dayName: {
//     flex: 1,
//     color: '#888',
//     fontSize: 11,
//     fontWeight: '500',
//     textAlign: 'center',
//   },
//   week: {
//     flexDirection: 'row',
//     marginBottom: 6,
//   },
//   day: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     height: 32,
//   },
//   dayCircle: {
//     width: 28,
//     height: 28,
//     borderRadius: 14,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: 'transparent',
//   },
//   markedDay: {
//     backgroundColor: colors.dark.calendar.marked,
//   },
//   todayDay: {
//     borderWidth: 2,
//     borderColor: colors.dark.calendar.today,
//   },
//   dayText: {
//     color: colors.dark.text,
//     fontSize: 12,
//     fontWeight: '500',
//   },
//   otherMonthDay: {
//     opacity: 0.4,
//   },
//   otherMonthText: {
//     color: '#666',
//   },
//   markedDayText: {
//     color: '#FFFFFF',
//     fontWeight: '600',
//   },
//   todayDayText: {
//     color: colors.dark.calendar.today,
//     fontWeight: 'bold',
//   },
// });






// import React from 'react';
// import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// import { calendarUtils } from '@/utils/calendarUtils';
// import { DateInterval } from '@/types/progress';
// import { dateUtils } from '@/utils/dateUtils';
// import { useTheme } from '@/app/context/ThemeContext';

// interface MiniCalendarProps {
//   dateIntervals: DateInterval[];
//   onPress?: () => void;
// }

// export const MiniCalendar: React.FC<MiniCalendarProps> = ({ 
//   dateIntervals, 
//   onPress 
// }) => {
//   const { themeColors } = useTheme();
//   const { year, month } = calendarUtils.getCurrentMonth();
//   const markedDates = dateUtils.intervalsToDates(dateIntervals);
//   const calendar = calendarUtils.getCalendarMonth(year, month, dateIntervals);
//   //const dayNames = calendarUtils.getDayNames();
//   const { getLocalizedDayNames } = calendarUtils;
//   const dayNames = getLocalizedDayNames();

//   return (
//     <TouchableOpacity 
//       style={[styles.container, { backgroundColor: themeColors.calendar?.background || '#1E1E1E' }]} 
//       onPress={onPress} 
//       activeOpacity={0.7}
//     >
//       <View style={styles.header}>
//         <Text style={[styles.title, { color: themeColors.text }]}>📅 {calendarUtils.formatMonthYear(year, month)}</Text>
//         <Text style={[styles.tapHint, { color: '#666' }]}>(Tap to view full calendar)</Text>
//       </View>
      
//       {/* Дни недели */}
//       <View style={styles.daysHeader}>
//         {dayNames.map(day => (
//           <Text key={day} style={[styles.dayName, { color: '#888' }]}>{day}</Text>
//         ))}
//       </View>
      
//       {/* Дни месяца */}
//       {calendar.weeks.slice(0, 6).map((week, weekIndex) => (
//         <View key={weekIndex} style={styles.week}>
//           {week.map((day, dayIndex) => (
//             <View 
//               key={`${weekIndex}-${dayIndex}`} 
//               style={[
//                 styles.day,
//                 !day.isCurrentMonth && styles.otherMonthDay
//               ]}
//             >
//               <View style={[
//                 styles.dayCircle,
//                 { backgroundColor: 'transparent' },
//                 day.isMarked && { backgroundColor: themeColors.calendar?.marked || '#4CAF50' },
//                 day.isToday && { borderColor: themeColors.calendar?.today || '#FF9800', borderWidth: 2 }
//               ]}>
//                 <Text style={[
//                   styles.dayText,
//                   { color: themeColors.text },
//                   !day.isCurrentMonth && { color: '#666' },
//                   day.isMarked && styles.markedDayText,
//                   day.isToday && { color: themeColors.calendar?.today || '#FF9800', fontWeight: 'bold' }
//                 ]}>
//                   {day.dayNumber}
//                 </Text>
//               </View>
//             </View>
//           ))}
//         </View>
//       ))}
//     </TouchableOpacity>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 15,
//     borderRadius: 12,
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 15,
//   },
//   title: {
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   tapHint: {
//     fontSize: 10,
//   },
//   daysHeader: {
//     flexDirection: 'row',
//     marginBottom: 8,
//   },
//   dayName: {
//     flex: 1,
//     fontSize: 11,
//     fontWeight: '500',
//     textAlign: 'center',
//   },
//   week: {
//     flexDirection: 'row',
//     marginBottom: 6,
//   },
//   day: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     height: 32,
//   },
//   dayCircle: {
//     width: 28,
//     height: 28,
//     borderRadius: 14,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   dayText: {
//     fontSize: 12,
//     fontWeight: '500',
//   },
//   otherMonthDay: {
//     opacity: 0.4,
//   },
//   markedDayText: {
//     color: '#FFFFFF',
//     fontWeight: '600',
//   },
// });




// import React from 'react';
// import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// import { calendarUtils } from '@/utils/calendarUtils';
// import { DateInterval } from '@/types/progress';
// import { dateUtils } from '@/utils/dateUtils';
// import { useTheme } from '@/app/context/ThemeContext';
// import { useLanguage } from '@/app/context/LanguageContext';

// interface MiniCalendarProps {
//   dateIntervals: DateInterval[];
//   onPress?: () => void;
// }

// export const MiniCalendar: React.FC<MiniCalendarProps> = ({ 
//   dateIntervals, 
//   onPress 
// }) => {
//   const { themeColors } = useTheme();
//   const { t } = useLanguage();
//   const { year, month } = calendarUtils.getCurrentMonth();
//   const markedDates = dateUtils.intervalsToDates(dateIntervals);
//   const calendar = calendarUtils.getCalendarMonth(year, month, dateIntervals);
//   const { getLocalizedDayNames } = calendarUtils;
//   const dayNames = getLocalizedDayNames();

//   return (
//     <TouchableOpacity 
//       style={[styles.container, { backgroundColor: themeColors.calendar?.background || '#1E1E1E' }]} 
//       onPress={onPress} 
//       activeOpacity={0.7}
//     >
//       <View style={styles.header}>
//         <Text style={[styles.title, { color: themeColors.text }]}>
//           📅 {calendarUtils.formatMonthYear(year, month)}
//         </Text>
//         <Text style={[styles.tapHint, { color: '#666' }]}>
//           {t('tapToView')}
//         </Text>
//       </View>
      
//       {/* Дни недели */}
//       <View style={styles.daysHeader}>
//         {dayNames.map(day => (
//           <Text key={day} style={[styles.dayName, { color: '#888' }]}>{day}</Text>
//         ))}
//       </View>
      
//       {/* Дни месяца */}
//       {calendar.weeks.slice(0, 6).map((week, weekIndex) => (
//         <View key={weekIndex} style={styles.week}>
//           {week.map((day, dayIndex) => (
//             <View 
//               key={`${weekIndex}-${dayIndex}`} 
//               style={[
//                 styles.day,
//                 !day.isCurrentMonth && styles.otherMonthDay
//               ]}
//             >
//               <View style={[
//                 styles.dayCircle,
//                 { backgroundColor: 'transparent' },
//                 day.isMarked && { backgroundColor: themeColors.calendar?.marked || '#4CAF50' },
//                 day.isToday && { borderColor: themeColors.calendar?.today || '#FF9800', borderWidth: 2 }
//               ]}>
//                 <Text style={[
//                   styles.dayText,
//                   { color: themeColors.text },
//                   !day.isCurrentMonth && { color: '#666' },
//                   day.isMarked && styles.markedDayText,
//                   day.isToday && { color: themeColors.calendar?.today || '#FF9800', fontWeight: 'bold' }
//                 ]}>
//                   {day.dayNumber}
//                 </Text>
//               </View>
//             </View>
//           ))}
//         </View>
//       ))}
//     </TouchableOpacity>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 15,
//     borderRadius: 12,
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 15,
//   },
//   title: {
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   tapHint: {
//     fontSize: 10,
//   },
//   daysHeader: {
//     flexDirection: 'row',
//     marginBottom: 8,
//   },
//   dayName: {
//     flex: 1,
//     fontSize: 11,
//     fontWeight: '500',
//     textAlign: 'center',
//   },
//   week: {
//     flexDirection: 'row',
//     marginBottom: 6,
//   },
//   day: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     height: 32,
//   },
//   dayCircle: {
//     width: 28,
//     height: 28,
//     borderRadius: 14,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   dayText: {
//     fontSize: 12,
//     fontWeight: '500',
//   },
//   otherMonthDay: {
//     opacity: 0.4,
//   },
//   markedDayText: {
//     color: '#FFFFFF',
//     fontWeight: '600',
//   },
// });


import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { calendarUtils } from '@/utils/calendarUtils';
import { DateInterval } from '@/types/progress';
import { dateUtils } from '@/utils/dateUtils';
import { useTheme } from '@/app/context/ThemeContext';
import { useLanguage } from '@/app/context/LanguageContext';

interface MiniCalendarProps {
  dateIntervals: DateInterval[];
  onPress?: () => void;
}

export const MiniCalendar: React.FC<MiniCalendarProps> = ({ 
  dateIntervals, 
  onPress 
}) => {
  const { themeColors } = useTheme();
  const { t } = useLanguage();
  const { year, month } = calendarUtils.getCurrentMonth();
  const markedDates = dateUtils.intervalsToDates(dateIntervals);
  const calendar = calendarUtils.getCalendarMonth(year, month, dateIntervals);
  const { getLocalizedDayNames } = calendarUtils;
  const dayNames = getLocalizedDayNames();

  return (
    <TouchableOpacity 
      style={[styles.container, { backgroundColor: themeColors.calendar?.background || '#1E1E1E' }]} 
      onPress={onPress} 
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: themeColors.text }]}>
          📅 {calendarUtils.formatMonthYear(year, month)}
        </Text>
        <Text style={[styles.tapHint, { color: '#666' }]}>
          {t('tapToView')}
        </Text>
      </View>
      
      {/* Дни недели */}
      <View style={styles.daysHeader}>
        {dayNames.map(day => (
          <Text key={day} style={[styles.dayName, { color: '#888' }]}>{day}</Text>
        ))}
      </View>
      
      {/* Дни месяца */}
      {calendar.weeks.slice(0, 6).map((week, weekIndex) => (
        <View key={weekIndex} style={styles.week}>
          {week.map((day, dayIndex) => (
            <View 
              key={`${weekIndex}-${dayIndex}`} 
              style={[
                styles.day,
                !day.isCurrentMonth && styles.otherMonthDay
              ]}
            >
              {/* <View style={[
                styles.dayCircle,
                { backgroundColor: 'transparent' },
                // 🆕 РАЗНАЯ ПОДСВЕТКА ДЛЯ ТЕКУЩЕЙ И ПРОШЛЫХ СЕРИЙ
                day.isMarked && day.isCurrentStreak && { 
                  backgroundColor: themeColors.calendar?.currentStreak || '#4CAF50' // Зеленый
                },
                day.isMarked && !day.isCurrentStreak && { 
                  backgroundColor: themeColors.calendar?.pastStreak || '#FF9800' // Оранжевый
                },
                day.isToday && { 
                  borderColor: themeColors.calendar?.today || '#FF5722', 
                  borderWidth: 2 
                }
              ]}> */}

                <View style={[
                  styles.dayCircle,
                  { backgroundColor: 'transparent' },
                  // 🆕 РАЗНАЯ ПОДСВЕТКА ДЛЯ ТЕКУЩЕЙ И ПРОШЛЫХ СЕРИЙ
                  day.isMarked && day.isCurrentStreak && { 
                    backgroundColor: (themeColors.calendar as any)?.currentStreak || '#4CAF50' // Зеленый
                  },
                  day.isMarked && !day.isCurrentStreak && { 
                    backgroundColor: (themeColors.calendar as any)?.pastStreak || '#FF9800' // Оранжевый
                  },
                  day.isToday && { 
                    borderColor: themeColors.calendar?.today || '#FF5722', 
                    borderWidth: 2 
                  }
                ]}>

                <Text style={[
                  styles.dayText,
                  { color: themeColors.text },
                  !day.isCurrentMonth && { color: '#666' },
                  day.isMarked && styles.markedDayText,
                  day.isToday && { 
                    color: themeColors.calendar?.today || '#FF5722', 
                    fontWeight: 'bold' 
                  }
                ]}>
                  {day.dayNumber}
                </Text>
              </View>
            </View>
          ))}
        </View>
      ))}
    </TouchableOpacity>
  );
};

// Стили без изменений...
const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderRadius: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  tapHint: {
    fontSize: 10,
  },
  daysHeader: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  dayName: {
    flex: 1,
    fontSize: 11,
    fontWeight: '500',
    textAlign: 'center',
  },
  week: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  day: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 32,
  },
  dayCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayText: {
    fontSize: 12,
    fontWeight: '500',
  },
  otherMonthDay: {
    opacity: 0.4,
  },
  markedDayText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});