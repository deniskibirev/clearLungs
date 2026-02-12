// // import React, { useState } from 'react';
// // import { 
// //   View, 
// //   Text, 
// //   StyleSheet, 
// //   Modal, 
// //   TouchableOpacity, 
// //   ScrollView,
// //   Dimensions 
// // } from 'react-native';
// // import { colors } from '@/app/constants/colors';
// // import { calendarUtils } from '@/utils/calendarUtils';
// // import { CalendarMonth } from '@/types/progress';

// // interface FullCalendarModalProps {
// //   visible: boolean;
// //   onClose: () => void;
// //   markedDates: string[];
// // }

// // const { height: screenHeight } = Dimensions.get('window');

// // export const FullCalendarModal: React.FC<FullCalendarModalProps> = ({
// //   visible,
// //   onClose,
// //   markedDates
// // }) => {
// //   const [currentMonth, setCurrentMonth] = useState(calendarUtils.getCurrentMonth());
// //   const calendar = calendarUtils.getCalendarMonth(
// //     currentMonth.year, 
// //     currentMonth.month, 
// //     markedDates
// //   );
// //   const dayNames = calendarUtils.getDayNames();

// //   const navigateMonth = (direction: 'prev' | 'next') => {
// //     setCurrentMonth(prev => 
// //       calendarUtils.navigateMonth(prev.year, prev.month, direction)
// //     );
// //   };

// //   const getLongestStreak = (): number => {
// //     if (markedDates.length === 0) return 0;
    
// //     let longestStreak = 1;
// //     let currentStreak = 1;
    
// //     const sortedDates = [...markedDates].sort();
    
// //     for (let i = 1; i < sortedDates.length; i++) {
// //       const prevDate = new Date(sortedDates[i - 1]);
// //       const currentDate = new Date(sortedDates[i]);
// //       const diffTime = currentDate.getTime() - prevDate.getTime();
// //       const diffDays = diffTime / (1000 * 60 * 60 * 24);
      
// //       if (diffDays === 1) {
// //         currentStreak++;
// //         longestStreak = Math.max(longestStreak, currentStreak);
// //       } else {
// //         currentStreak = 1;
// //       }
// //     }
    
// //     return longestStreak;
// //   };

// //   return (
// //     <Modal
// //       visible={visible}
// //       animationType="slide"
// //       presentationStyle="pageSheet"
// //       onRequestClose={onClose}
// //     >
// //       <View style={styles.modalContainer}>
// //         {/* Header */}
// //         <View style={styles.modalHeader}>
// //           <Text style={styles.modalTitle}>Smoke-Free Calendar</Text>
// //           <TouchableOpacity onPress={onClose} style={styles.closeButton}>
// //             <Text style={styles.closeButtonText}>✕</Text>
// //           </TouchableOpacity>
// //         </View>

// //         {/* Stats */}
// //         <View style={styles.statsContainer}>
// //           <View style={styles.stat}>
// //             <Text style={styles.statNumber}>{markedDates.length}</Text>
// //             <Text style={styles.statLabel}>Total Days</Text>
// //           </View>
// //           <View style={styles.stat}>
// //             <Text style={styles.statNumber}>{getLongestStreak()}</Text>
// //             <Text style={styles.statLabel}>Longest Streak</Text>
// //           </View>
// //         </View>

// //         {/* Month Navigation */}
// //         <View style={styles.navigation}>
// //           <TouchableOpacity 
// //             onPress={() => navigateMonth('prev')}
// //             style={styles.navButton}
// //           >
// //             <Text style={styles.navButtonText}>‹</Text>
// //           </TouchableOpacity>
          
// //           <Text style={styles.monthTitle}>
// //             {calendarUtils.formatMonthYear(currentMonth.year, currentMonth.month)}
// //           </Text>
          
// //           <TouchableOpacity 
// //             onPress={() => navigateMonth('next')}
// //             style={styles.navButton}
// //           >
// //             <Text style={styles.navButtonText}>›</Text>
// //           </TouchableOpacity>
// //         </View>

// //         {/* Calendar */}
// //         <ScrollView style={styles.calendarContainer}>
// //           {/* Days Header */}
// //           <View style={styles.daysHeader}>
// //             {dayNames.map(day => (
// //               <Text key={day} style={styles.dayName}>{day}</Text>
// //             ))}
// //           </View>

// //           {/* Weeks */}
// //           {calendar.weeks.map((week, weekIndex) => (
// //             <View key={weekIndex} style={styles.week}>
// //               {week.map((day, dayIndex) => (
// //                 <View 
// //                   key={`${weekIndex}-${dayIndex}`} 
// //                   style={[
// //                     styles.day,
// //                     !day.isCurrentMonth && styles.otherMonthDay
// //                   ]}
// //                 >
// //                   <View style={[
// //                     styles.dayCircle,
// //                     day.isMarked && styles.markedDay,
// //                     day.isToday && styles.todayDay
// //                   ]}>
// //                     <Text style={[
// //                       styles.dayText,
// //                       !day.isCurrentMonth && styles.otherMonthText,
// //                       day.isMarked && styles.markedDayText,
// //                       day.isToday && styles.todayDayText
// //                     ]}>
// //                       {day.dayNumber}
// //                     </Text>
// //                   </View>
// //                 </View>
// //               ))}
// //             </View>
// //           ))}
// //         </ScrollView>

// //         {/* Legend */}
// //         <View style={styles.legend}>
// //           <View style={styles.legendItem}>
// //             <View style={[styles.legendColor, styles.markedLegend]} />
// //             <Text style={styles.legendText}>Smoke-free day</Text>
// //           </View>
// //           <View style={styles.legendItem}>
// //             <View style={[styles.legendColor, styles.todayLegend]} />
// //             <Text style={styles.legendText}>Today</Text>
// //           </View>
// //         </View>
// //       </View>
// //     </Modal>
// //   );
// // };

// import React, { useState } from 'react';
// import { 
//   View, 
//   Text, 
//   StyleSheet, 
//   Modal, 
//   TouchableOpacity, 
//   ScrollView,
//   Dimensions 
// } from 'react-native';
// import { colors } from '@/app/constants/colors';
// import { calendarUtils } from '@/utils/calendarUtils';
// import { DateInterval } from '@/types/progress';

// interface FullCalendarModalProps {
//   visible: boolean;
//   onClose: () => void;
//   dateIntervals: DateInterval[];
//   currentStreak: number;
//   longestStreak: number;
//   totalDays: number;
// }

// const { height: screenHeight } = Dimensions.get('window');

// export const FullCalendarModal: React.FC<FullCalendarModalProps> = ({
//   visible,
//   onClose,
//   dateIntervals,
//   currentStreak,
//   longestStreak,
//   totalDays
// }) => {
//   const [currentMonth, setCurrentMonth] = useState(calendarUtils.getCurrentMonth());
//   const calendar = calendarUtils.getCalendarMonth(
//     currentMonth.year, 
//     currentMonth.month, 
//     dateIntervals
//   );
//   const dayNames = calendarUtils.getDayNames();

//   const navigateMonth = (direction: 'prev' | 'next') => {
//     setCurrentMonth(prev => 
//       calendarUtils.navigateMonth(prev.year, prev.month, direction)
//     );
//   };

//   return (
//     <Modal
//       visible={visible}
//       animationType="slide"
//       presentationStyle="pageSheet"
//       onRequestClose={onClose}
//     >
//       <View style={styles.modalContainer}>
//         {/* Header */}
//         <View style={styles.modalHeader}>
//           <Text style={styles.modalTitle}>Smoke-Free Calendar</Text>
//           <TouchableOpacity onPress={onClose} style={styles.closeButton}>
//             <Text style={styles.closeButtonText}>✕</Text>
//           </TouchableOpacity>
//         </View>

//         {/* Stats */}
//         <View style={styles.statsContainer}>
//           <View style={styles.stat}>
//             <Text style={styles.statNumber}>{totalDays}</Text>
//             <Text style={styles.statLabel}>Total Days</Text>
//           </View>
//           <View style={styles.stat}>
//             <Text style={styles.statNumber}>{currentStreak}</Text>
//             <Text style={styles.statLabel}>Current Streak</Text>
//           </View>
//           <View style={styles.stat}>
//             <Text style={styles.statNumber}>{longestStreak}</Text>
//             <Text style={styles.statLabel}>Longest Streak</Text>
//           </View>
//         </View>

//         {/* Month Navigation */}
//         <View style={styles.navigation}>
//           <TouchableOpacity 
//             onPress={() => navigateMonth('prev')}
//             style={styles.navButton}
//           >
//             <Text style={styles.navButtonText}>‹</Text>
//           </TouchableOpacity>
          
//           <Text style={styles.monthTitle}>
//             {calendarUtils.formatMonthYear(currentMonth.year, currentMonth.month)}
//           </Text>
          
//           <TouchableOpacity 
//             onPress={() => navigateMonth('next')}
//             style={styles.navButton}
//           >
//             <Text style={styles.navButtonText}>›</Text>
//           </TouchableOpacity>
//         </View>

//         {/* Calendar */}
//         <ScrollView style={styles.calendarContainer}>
//           {/* Days Header */}
//           <View style={styles.daysHeader}>
//             {dayNames.map(day => (
//               <Text key={day} style={styles.dayName}>{day}</Text>
//             ))}
//           </View>

//           {/* Weeks */}
//           {calendar.weeks.map((week, weekIndex) => (
//             <View key={weekIndex} style={styles.week}>
//               {week.map((day, dayIndex) => (
//                 <View 
//                   key={`${weekIndex}-${dayIndex}`} 
//                   style={[
//                     styles.day,
//                     !day.isCurrentMonth && styles.otherMonthDay
//                   ]}
//                 >
//                   <View style={[
//                     styles.dayCircle,
//                     day.isMarked && styles.markedDay,
//                     day.isToday && styles.todayDay
//                   ]}>
//                     <Text style={[
//                       styles.dayText,
//                       !day.isCurrentMonth && styles.otherMonthText,
//                       day.isMarked && styles.markedDayText,
//                       day.isToday && styles.todayDayText
//                     ]}>
//                       {day.dayNumber}
//                     </Text>
//                   </View>
//                 </View>
//               ))}
//             </View>
//           ))}
//         </ScrollView>

//         {/* Legend */}
//         <View style={styles.legend}>
//           <View style={styles.legendItem}>
//             <View style={[styles.legendColor, styles.markedLegend]} />
//             <Text style={styles.legendText}>Smoke-free day</Text>
//           </View>
//           <View style={styles.legendItem}>
//             <View style={[styles.legendColor, styles.todayLegend]} />
//             <Text style={styles.legendText}>Today</Text>
//           </View>
//         </View>
//       </View>
//     </Modal>
//   );
// };


// const styles = StyleSheet.create({
//   modalContainer: {
//     flex: 1,
//     backgroundColor: colors.dark.background,
//     paddingTop: 20,
//   },
//   modalHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//     paddingBottom: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: '#333',
//   },
//   modalTitle: {
//     color: colors.dark.text,
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   closeButton: {
//     padding: 5,
//   },
//   closeButtonText: {
//     color: colors.dark.text,
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   statsContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     padding: 20,
//   },
//   stat: {
//     alignItems: 'center',
//   },
//   statNumber: {
//     color: colors.dark.primary,
//     fontSize: 28,
//     fontWeight: 'bold',
//   },
//   statLabel: {
//     color: '#888',
//     fontSize: 14,
//     marginTop: 5,
//   },
//   navigation: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//     marginBottom: 15,
//   },
//   navButton: {
//     padding: 10,
//   },
//   navButtonText: {
//     color: colors.dark.text,
//     fontSize: 24,
//     fontWeight: 'bold',
//   },
//   monthTitle: {
//     color: colors.dark.text,
//     fontSize: 18,
//     fontWeight: '600',
//   },
//   calendarContainer: {
//     flex: 1,
//     paddingHorizontal: 15,
//   },
//   daysHeader: {
//     flexDirection: 'row',
//     marginBottom: 10,
//   },
//   dayName: {
//     flex: 1,
//     color: '#888',
//     fontSize: 12,
//     fontWeight: '500',
//     textAlign: 'center',
//   },
//   week: {
//     flexDirection: 'row',
//     marginBottom: 8,
//   },
//   day: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     height: 40,
//   },
//   dayCircle: {
//     width: 36,
//     height: 36,
//     borderRadius: 18,
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
//     fontSize: 14,
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
//   legend: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     padding: 20,
//     borderTopWidth: 1,
//     borderTopColor: '#333',
//     gap: 20,
//   },
//   legendItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//   },
//   legendColor: {
//     width: 16,
//     height: 16,
//     borderRadius: 8,
//   },
//   markedLegend: {
//     backgroundColor: colors.dark.calendar.marked,
//   },
//   todayLegend: {
//     borderWidth: 2,
//     borderColor: colors.dark.calendar.today,
//     backgroundColor: 'transparent',
//   },
//   legendText: {
//     color: '#888',
//     fontSize: 12,
//   },
// });





// import React, { useState } from 'react';
// import { 
//   View, 
//   Text, 
//   StyleSheet, 
//   Modal, 
//   TouchableOpacity, 
//   ScrollView,
//   Dimensions 
// } from 'react-native';
// import { calendarUtils } from '@/utils/calendarUtils';
// import { DateInterval } from '@/types/progress';
// import { useTheme } from '@/app/context/ThemeContext';

// interface FullCalendarModalProps {
//   visible: boolean;
//   onClose: () => void;
//   dateIntervals: DateInterval[];
//   currentStreak: number;
//   longestStreak: number;
//   totalDays: number;
// }

// const { height: screenHeight } = Dimensions.get('window');

// export const FullCalendarModal: React.FC<FullCalendarModalProps> = ({
//   visible,
//   onClose,
//   dateIntervals,
//   currentStreak,
//   longestStreak,
//   totalDays
// }) => {
//   const { themeColors } = useTheme();
//   const [currentMonth, setCurrentMonth] = useState(calendarUtils.getCurrentMonth());
//   const calendar = calendarUtils.getCalendarMonth(
//     currentMonth.year, 
//     currentMonth.month, 
//     dateIntervals
//   );
//   //const dayNames = calendarUtils.getDayNames();
//   const { getLocalizedDayNames } = calendarUtils;
//   const dayNames = getLocalizedDayNames();
  
//   const navigateMonth = (direction: 'prev' | 'next') => {
//     setCurrentMonth(prev => 
//       calendarUtils.navigateMonth(prev.year, prev.month, direction)
//     );
//   };

//   return (
//     <Modal
//       visible={visible}
//       animationType="slide"
//       presentationStyle="pageSheet"
//       onRequestClose={onClose}
//     >
//       <View style={[styles.modalContainer, { backgroundColor: themeColors.background }]}>
//         {/* Header */}
//         <View style={[styles.modalHeader, { borderBottomColor: '#333' }]}>
//           <Text style={[styles.modalTitle, { color: themeColors.text }]}>Smoke-Free Calendar</Text>
//           <TouchableOpacity onPress={onClose} style={styles.closeButton}>
//             <Text style={[styles.closeButtonText, { color: themeColors.text }]}>✕</Text>
//           </TouchableOpacity>
//         </View>

//         {/* Stats */}
//         <View style={styles.statsContainer}>
//           <View style={styles.stat}>
//             <Text style={[styles.statNumber, { color: themeColors.primary }]}>{totalDays}</Text>
//             <Text style={[styles.statLabel, { color: '#888' }]}>Total Days</Text>
//           </View>
//           <View style={styles.stat}>
//             <Text style={[styles.statNumber, { color: themeColors.primary }]}>{currentStreak}</Text>
//             <Text style={[styles.statLabel, { color: '#888' }]}>Current Streak</Text>
//           </View>
//           <View style={styles.stat}>
//             <Text style={[styles.statNumber, { color: themeColors.primary }]}>{longestStreak}</Text>
//             <Text style={[styles.statLabel, { color: '#888' }]}>Longest Streak</Text>
//           </View>
//         </View>

//         {/* Month Navigation */}
//         <View style={styles.navigation}>
//           <TouchableOpacity 
//             onPress={() => navigateMonth('prev')}
//             style={styles.navButton}
//           >
//             <Text style={[styles.navButtonText, { color: themeColors.text }]}>‹</Text>
//           </TouchableOpacity>
          
//           <Text style={[styles.monthTitle, { color: themeColors.text }]}>
//             {calendarUtils.formatMonthYear(currentMonth.year, currentMonth.month)}
//           </Text>
          
//           <TouchableOpacity 
//             onPress={() => navigateMonth('next')}
//             style={styles.navButton}
//           >
//             <Text style={[styles.navButtonText, { color: themeColors.text }]}>›</Text>
//           </TouchableOpacity>
//         </View>

//         {/* Calendar */}
//         <ScrollView style={styles.calendarContainer}>
//           {/* Days Header */}
//           <View style={styles.daysHeader}>
//             {dayNames.map(day => (
//               <Text key={day} style={[styles.dayName, { color: '#888' }]}>{day}</Text>
//             ))}
//           </View>

//           {/* Weeks */}
//           {calendar.weeks.map((week, weekIndex) => (
//             <View key={weekIndex} style={styles.week}>
//               {week.map((day, dayIndex) => (
//                 <View 
//                   key={`${weekIndex}-${dayIndex}`} 
//                   style={[
//                     styles.day,
//                     !day.isCurrentMonth && styles.otherMonthDay
//                   ]}
//                 >
//                   <View style={[
//                     styles.dayCircle,
//                     { backgroundColor: 'transparent' },
//                     day.isMarked && { backgroundColor: themeColors.calendar?.marked || '#4CAF50' },
//                     day.isToday && { 
//                       borderColor: themeColors.calendar?.today || '#FF9800', 
//                       borderWidth: 2 
//                     }
//                   ]}>
//                     <Text style={[
//                       styles.dayText,
//                       { color: themeColors.text },
//                       !day.isCurrentMonth && { color: '#666' },
//                       day.isMarked && styles.markedDayText,
//                       day.isToday && { 
//                         color: themeColors.calendar?.today || '#FF9800', 
//                         fontWeight: 'bold' 
//                       }
//                     ]}>
//                       {day.dayNumber}
//                     </Text>
//                   </View>
//                 </View>
//               ))}
//             </View>
//           ))}
//         </ScrollView>

//         {/* Legend */}
//         <View style={[styles.legend, { borderTopColor: '#333' }]}>
//           <View style={styles.legendItem}>
//             <View style={[
//               styles.legendColor, 
//               { backgroundColor: themeColors.calendar?.marked || '#4CAF50' }
//             ]} />
//             <Text style={[styles.legendText, { color: '#888' }]}>Smoke-free day</Text>
//           </View>
//           <View style={styles.legendItem}>
//             <View style={[
//               styles.legendColor, 
//               { 
//                 borderColor: themeColors.calendar?.today || '#FF9800',
//                 borderWidth: 2,
//                 backgroundColor: 'transparent'
//               }
//             ]} />
//             <Text style={[styles.legendText, { color: '#888' }]}>Today</Text>
//           </View>
//         </View>
//       </View>
//     </Modal>
//   );
// };

// const styles = StyleSheet.create({
//   modalContainer: {
//     flex: 1,
//     paddingTop: 20,
//   },
//   modalHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//     paddingBottom: 15,
//     borderBottomWidth: 1,
//   },
//   modalTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   closeButton: {
//     padding: 5,
//   },
//   closeButtonText: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   statsContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     padding: 20,
//   },
//   stat: {
//     alignItems: 'center',
//   },
//   statNumber: {
//     fontSize: 28,
//     fontWeight: 'bold',
//   },
//   statLabel: {
//     fontSize: 14,
//     marginTop: 5,
//   },
//   navigation: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//     marginBottom: 15,
//   },
//   navButton: {
//     padding: 10,
//   },
//   navButtonText: {
//     fontSize: 24,
//     fontWeight: 'bold',
//   },
//   monthTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//   },
//   calendarContainer: {
//     flex: 1,
//     paddingHorizontal: 15,
//   },
//   daysHeader: {
//     flexDirection: 'row',
//     marginBottom: 10,
//   },
//   dayName: {
//     flex: 1,
//     fontSize: 12,
//     fontWeight: '500',
//     textAlign: 'center',
//   },
//   week: {
//     flexDirection: 'row',
//     marginBottom: 8,
//   },
//   day: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     height: 40,
//   },
//   dayCircle: {
//     width: 36,
//     height: 36,
//     borderRadius: 18,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   dayText: {
//     fontSize: 14,
//     fontWeight: '500',
//   },
//   otherMonthDay: {
//     opacity: 0.4,
//   },
//   markedDayText: {
//     color: '#FFFFFF',
//     fontWeight: '600',
//   },
//   legend: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     padding: 20,
//     borderTopWidth: 1,
//     gap: 20,
//   },
//   legendItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//   },
//   legendColor: {
//     width: 16,
//     height: 16,
//     borderRadius: 8,
//   },
//   legendText: {
//     fontSize: 12,
//   },
// });



import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Modal, 
  TouchableOpacity, 
  ScrollView,
  Dimensions 
} from 'react-native';
import { calendarUtils } from '@/utils/calendarUtils';
import { DateInterval } from '@/types/progress';
import { useTheme } from '@/app/context/ThemeContext';
import { useLanguage } from '@/app/context/LanguageContext';

interface FullCalendarModalProps {
  visible: boolean;
  onClose: () => void;
  dateIntervals: DateInterval[];
  currentStreak: number;
  longestStreak: number;
  totalDays: number;
}

const { height: screenHeight } = Dimensions.get('window');

export const FullCalendarModal: React.FC<FullCalendarModalProps> = ({
  visible,
  onClose,
  dateIntervals,
  currentStreak,
  longestStreak,
  totalDays
}) => {
  const { themeColors } = useTheme();
  const { t } = useLanguage();
  const [currentMonth, setCurrentMonth] = useState(calendarUtils.getCurrentMonth());
  const calendar = calendarUtils.getCalendarMonth(
    currentMonth.year, 
    currentMonth.month, 
    dateIntervals
  );
  const { getLocalizedDayNames } = calendarUtils;
  const dayNames = getLocalizedDayNames();
  
  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(prev => 
      calendarUtils.navigateMonth(prev.year, prev.month, direction)
    );
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View style={[styles.modalContainer, { backgroundColor: themeColors.background }]}>
        {/* Header */}
        <View style={[styles.modalHeader, { borderBottomColor: '#333' }]}>
          <Text style={[styles.modalTitle, { color: themeColors.text }]}>
            {t('smokeFreeCalendar')}
          </Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={[styles.closeButtonText, { color: themeColors.text }]}>✕</Text>
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.stat}>
            <Text style={[styles.statNumber, { color: themeColors.primary }]}>{totalDays}</Text>
            <Text style={[styles.statLabel, { color: '#888' }]}>
              {t('totalDaysLabel')}
            </Text>
          </View>
          <View style={styles.stat}>
            <Text style={[styles.statNumber, { color: themeColors.primary }]}>{currentStreak}</Text>
            <Text style={[styles.statLabel, { color: '#888' }]}>
              {t('currentStreakLabel')}
            </Text>
          </View>
          <View style={styles.stat}>
            <Text style={[styles.statNumber, { color: themeColors.primary }]}>{longestStreak}</Text>
            <Text style={[styles.statLabel, { color: '#888' }]}>
              {t('longestStreakLabel')}
            </Text>
          </View>
        </View>

        {/* Month Navigation */}
        <View style={styles.navigation}>
          <TouchableOpacity 
            onPress={() => navigateMonth('prev')}
            style={styles.navButton}
          >
            <Text style={[styles.navButtonText, { color: themeColors.text }]}>‹</Text>
          </TouchableOpacity>
          
          <Text style={[styles.monthTitle, { color: themeColors.text }]}>
            {calendarUtils.formatMonthYear(currentMonth.year, currentMonth.month)}
          </Text>
          
          <TouchableOpacity 
            onPress={() => navigateMonth('next')}
            style={styles.navButton}
          >
            <Text style={[styles.navButtonText, { color: themeColors.text }]}>›</Text>
          </TouchableOpacity>
        </View>

        {/* Calendar */}
        <ScrollView style={styles.calendarContainer}>
          {/* Days Header */}
          <View style={styles.daysHeader}>
            {dayNames.map(day => (
              <Text key={day} style={[styles.dayName, { color: '#888' }]}>{day}</Text>
            ))}
          </View>

          {/* Weeks */}
          {calendar.weeks.map((week, weekIndex) => (
            <View key={weekIndex} style={styles.week}>
              {week.map((day, dayIndex) => (
                <View 
                  key={`${weekIndex}-${dayIndex}`} 
                  style={[
                    styles.day,
                    !day.isCurrentMonth && styles.otherMonthDay
                  ]}
                >
                  {/* //<View style={[ */}
                  {/* //  styles.dayCircle,
                  //  { backgroundColor: 'transparent' },
                  //  day.isMarked && { backgroundColor: themeColors.calendar?.marked || '#4CAF50' },
                  //  day.isToday && { 
                  //    borderColor: themeColors.calendar?.today || '#FF9800', 
                  //    borderWidth: 2 
                  //  }
                  //]}> */}
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
                        color: themeColors.calendar?.today || '#FF9800', 
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
        </ScrollView>

        {/* Legend
        <View style={[styles.legend, { borderTopColor: '#333' }]}>
          <View style={styles.legendItem}>
            <View style={[
              styles.legendColor, 
              { backgroundColor: themeColors.calendar?.marked || '#4CAF50' }
            ]} />
            <Text style={[styles.legendText, { color: '#888' }]}>
              {t('smokeFreeDay')}
            </Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[
              styles.legendColor, 
              { 
                borderColor: themeColors.calendar?.today || '#FF9800',
                borderWidth: 2,
                backgroundColor: 'transparent'
              }
            ]} />
            <Text style={[styles.legendText, { color: '#888' }]}>
              {t('today')}
            </Text>
          </View>
        </View> */}

        {/* Legend */}
          {/* <View style={[styles.legend, { borderTopColor: '#333' }]}>
            <View style={styles.legendItem}>
              <View style={[
                styles.legendColor, 
                { backgroundColor: themeColors.calendar?.currentStreak || '#4CAF50' }
              ]} />
              <Text style={[styles.legendText, { color: '#888' }]}>
                {t('currentStreakDay')}
              </Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[
                styles.legendColor, 
                { backgroundColor: themeColors.calendar?.pastStreak || '#FF9800' }
              ]} />
              <Text style={[styles.legendText, { color: '#888' }]}>
                {t('pastStreakDay')}
              </Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[
                styles.legendColor, 
                { 
                  borderColor: themeColors.calendar?.today || '#FF5722',
                  borderWidth: 2,
                  backgroundColor: 'transparent'
                }
              ]} />
              <Text style={[styles.legendText, { color: '#888' }]}>
                {t('today')}
              </Text>
            </View>
          </View> */}

          {/* Legend */}
        <View style={[styles.legend, { borderTopColor: '#333' }]}>
          <View style={styles.legendItem}>
            <View style={[
              styles.legendColor, 
              { backgroundColor: (themeColors.calendar as any)?.currentStreak || '#4CAF50' }
            ]} />
            <Text style={[styles.legendText, { color: '#888' }]}>
              {t('currentStreakDay')}
            </Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[
              styles.legendColor, 
              { backgroundColor: (themeColors.calendar as any)?.pastStreak || '#FF9800' }
            ]} />
            <Text style={[styles.legendText, { color: '#888' }]}>
              {t('pastStreakDay')}
            </Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[
              styles.legendColor, 
              { 
                borderColor: themeColors.calendar?.today || '#FF5722',
                borderWidth: 2,
                backgroundColor: 'transparent'
              }
            ]} />
            <Text style={[styles.legendText, { color: '#888' }]}>
              {t('today')}
            </Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    paddingTop: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 5,
  },
  closeButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
  },
  stat: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 14,
    marginTop: 5,
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  navButton: {
    padding: 10,
  },
  navButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  monthTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  calendarContainer: {
    flex: 1,
    paddingHorizontal: 15,
  },
  daysHeader: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  dayName: {
    flex: 1,
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
  week: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  day: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
  },
  dayCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayText: {
    fontSize: 14,
    fontWeight: '500',
  },
  otherMonthDay: {
    opacity: 0.4,
  },
  markedDayText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 20,
    borderTopWidth: 1,
    gap: 20,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  legendColor: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  legendText: {
    fontSize: 12,
  },
});