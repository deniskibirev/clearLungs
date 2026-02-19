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
          {calendarUtils.formatMonthYear(year, month)}
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