import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '@/app/constants/colors';

interface CalendarComponentProps {
  markedDates: string[];
}

export const CalendarComponent: React.FC<CalendarComponentProps> = ({ 
  markedDates 
}) => {
  const today = new Date().toISOString().split('T')[0];
  
  // Получаем последние 7 дней для отображения
  const getLast7Days = () => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateString = date.toISOString().split('T')[0];
      days.push(dateString);
    }
    return days;
  };

  const last7Days = getLast7Days();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Last 7 Days</Text>
      <View style={styles.daysContainer}>
        {last7Days.map((date, index) => {
          const isMarked = markedDates.includes(date);
          const isToday = date === today;
          const dayName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][new Date(date).getDay()];
          
          return (
            <View key={date} style={styles.dayContainer}>
              <Text style={styles.dayName}>{dayName}</Text>
              <View 
                style={[
                  styles.dayCircle,
                  isMarked && styles.markedDay,
                  isToday && styles.todayDay
                ]}
              >
                <Text style={[
                  styles.dayText,
                  isMarked && styles.markedDayText,
                  isToday && styles.todayDayText
                ]}>
                  {new Date(date).getDate()}
                </Text>
              </View>
              {isToday && <Text style={styles.todayLabel}>Today</Text>}
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.dark.calendar.background,
    padding: 20,
    borderRadius: 12,
  },
  title: {
    color: colors.dark.text,
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    textAlign: 'center',
  },
  daysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayContainer: {
    alignItems: 'center',
  },
  dayName: {
    color: '#888888',
    fontSize: 12,
    marginBottom: 5,
  },
  dayCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#333333',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
  },
  markedDay: {
    backgroundColor: colors.dark.calendar.marked,
  },
  todayDay: {
    borderWidth: 2,
    borderColor: colors.dark.calendar.today,
  },
  dayText: {
    color: colors.dark.text,
    fontSize: 14,
    fontWeight: '500',
  },
  markedDayText: {
    color: '#FFFFFF',
  },
  todayDayText: {
    color: colors.dark.calendar.today,
  },
  todayLabel: {
    color: colors.dark.calendar.today,
    fontSize: 10,
    fontWeight: '500',
  },
});