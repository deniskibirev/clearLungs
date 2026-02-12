
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useProgressStore } from '../store/progressStore';
import { TreeComponent } from '../components/TreeComponent';
import { MiniCalendar } from '../components/MiniCalendar';
import { FullCalendarModal } from '../components/FullCalendarModal';
import { DevControls } from '../components/DevControls';
import { useLanguage } from '@/app/context/LanguageContext';
import { useTheme } from '@/app/context/ThemeContext';
import { IS_DEV } from '@/app/constants/config';

export const ProgressScreen = () => {
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [showDev, setShowDev] = useState(IS_DEV); // Показываем только в dev режиме по умолчанию
  const [tapCount, setTapCount] = useState(0);
  const { progress, markDay, resetProgress } = useProgressStore();
  const { t } = useLanguage();
  const { themeColors } = useTheme();

  // Секретный жест: 5 тапов по заголовку за 2 секунды
  const handleTitlePress = () => {
    const newCount = tapCount + 1;
    setTapCount(newCount);
    
    console.log(`🔐 Secret tap: ${newCount}/5`);
    
    if (newCount >= 5) {
      setShowDev(!showDev); // Переключаем состояние
      setTapCount(0);
      console.log(`🎉 DevControls ${showDev ? 'hidden' : 'shown'}!`);
    }
    
    // Сбрасываем счетчик через 2 секунды
    setTimeout(() => {
      setTapCount(0);
    }, 2000);
  };

  const handleCloseDev = () => {
    setShowDev(false);
  };

  const handleMarkDay = () => {
    const today = new Date().toISOString().split('T')[0];
    
    if (progress.lastCheckDate === today) {
      Alert.alert(t('alreadyMarked'), t('alreadyMarkedMessage'));
      return;
    }

    markDay();
  };

  const handleReset = () => {
    Alert.alert(
      t('resetProgress'),
      t('confirmReset'),
      [
        { text: 'Cancel', style: 'cancel' },
        { text: t('resetProgress'), style: 'destructive', onPress: resetProgress }
      ]
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={[styles.container, { backgroundColor: themeColors.background }]}>
        

        {/* Заголовок как секретная кнопка */}
        <TouchableOpacity 
          onPress={handleTitlePress}
          activeOpacity={0.8}
        >

          <Text style={[styles.sectionTitle, { color: themeColors.text }]}>{t('currentStreak')}</Text>
          <Text style={[styles.streakCount, { color: themeColors.primary }]}>{progress.currentStreak} {t('days')}</Text>
          <Text style={[styles.streakSubtext, { color: '#888888' }]}>
            {progress.currentStreak === 0 
              ? t('startJourney') 
              : t('keepUpGreatWork')
            }
          </Text>
          <View style={styles.additionalStats}>
            <Text style={[styles.additionalStat, { color: '#666' }]}>
              {t('longestStreak')}: {progress.longestStreak} {t('days')}
            </Text>
            <Text style={[styles.additionalStat, { color: '#666' }]}>
              {t('totalDays')}: {progress.totalDays} {t('days')}
            </Text>
          </View>

          {/* Подсказка только в dev режиме */}
          {IS_DEV && (
            <Text style={[styles.devHint, { color: '#666' }]}>
              🧪 Dev: {showDev ? 'ON' : 'OFF'} (tap 5x to toggle)
            </Text>
          )}
        </TouchableOpacity>


        {/* Tree */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: themeColors.text }]}>{t('yourTree')}</Text>
          <View style={[styles.treeContainer, { backgroundColor: themeColors.calendar?.background || '#1E1E1E' }]}>
            <TreeComponent stage={progress.treeStage} size={100} />
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity 
            style={[styles.primaryButton, { backgroundColor: themeColors.primary }]} 
            onPress={handleMarkDay}
          >
            <Text style={styles.primaryButtonText}>{t('markAsDone')}</Text>
          </TouchableOpacity>

          {/* {progress.currentStreak > 0 && (
            <TouchableOpacity 
              style={[styles.secondaryButton, { borderColor: '#666666' }]} 
              onPress={handleReset}
            >
              <Text style={[styles.secondaryButtonText, { color: '#666666' }]}>{t('resetProgress')}</Text>
            </TouchableOpacity>
          )} */}
        </View>
        
        {/* Calendar */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: themeColors.text }]}>{t('progressCalendar')}</Text>
          <MiniCalendar 
            dateIntervals={progress.dateIntervals}
            onPress={() => setIsCalendarVisible(true)}
          />
        </View>

      </ScrollView>
      
      {/* Full Calendar Modal */}
      <FullCalendarModal
        visible={isCalendarVisible}
        onClose={() => setIsCalendarVisible(false)}
        dateIntervals={progress.dateIntervals}
        currentStreak={progress.currentStreak}
        longestStreak={progress.longestStreak}
        totalDays={progress.totalDays}
      />
      
      {/* Dev Controls - показывается только если включен режим разработки ИЛИ активирован секретный жест */}
      {showDev && <DevControls onClose={handleCloseDev} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    padding: 10,
  },
  devHint: {
    fontSize: 10,
    textAlign: 'center',
    marginBottom: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 15,
  },
  streakCount: {
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  streakSubtext: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 5,
  },
  additionalStats: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    gap: 20,
  },
  additionalStat: {
    fontSize: 12,
  },
  treeContainer: {
    borderRadius: 12,
    padding: 10,
  },
  buttonsContainer: {
    marginTop: 20,
    paddingBottom: 15,
  },
  primaryButton: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 10,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
});


// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
// import { useProgressStore } from '../store/progressStore';
// import { TreeComponent } from '../components/TreeComponent';
// import { MiniCalendar } from '../components/MiniCalendar';
// import { FullCalendarModal } from '../components/FullCalendarModal';
// import { DevControls } from '../components/DevControls';
// import { WelcomeScreen } from '../components/WelcomeScreen'; // 🆕 Приветственный экран
// import { useLanguage } from '@/app/context/LanguageContext';
// import { useTheme } from '@/app/context/ThemeContext';
// import { IS_DEV } from '@/app/constants/config';

// // 🆕 Выносим обработчик тапов для навигации
// let headerTapCount = 0;
// let headerTapTimeout: NodeJS.Timeout;

// export const handleHeaderPress = () => {
//   headerTapCount++;
  
//   console.log(`🔐 Header tap: ${headerTapCount}/5`);
  
//   if (headerTapCount >= 5) {
//     // Переключаем DevControls - нужно передать состояние
//     // Это будет обработано в ProgressScreen
//     headerTapCount = 0;
//     // Здесь будет логика переключения DevControls
//   }
  
//   clearTimeout(headerTapTimeout);
//   headerTapTimeout = setTimeout(() => {
//     headerTapCount = 0;
//   }, 2000);
// };

// export const ProgressScreen = () => {
//   const [isCalendarVisible, setIsCalendarVisible] = useState(false);
//   const [showDev, setShowDev] = useState(IS_DEV);
//   const [showWelcome, setShowWelcome] = useState(true); // 🆕 Показывать приветствие
//   const [tapCount, setTapCount] = useState(0);
//   const { progress, markDay, resetProgress } = useProgressStore();
//   const { t } = useLanguage();
//   const { themeColors } = useTheme();

//   // 🆕 Проверяем первый запуск
//   useEffect(() => {
//     const checkFirstLaunch = async () => {
//       // Здесь можно добавить проверку в AsyncStorage
//       // Показываем приветствие только если нет прогресса
//       if (progress.currentStreak > 0) {
//         setShowWelcome(false);
//       }
//     };
//     checkFirstLaunch();
//   }, []);

//   // 🆕 Обработчик закрытия приветственного экрана
//   const handleWelcomeClose = () => {
//     setShowWelcome(false);
//     markDay(); // Отмечаем первый день
//   };

//   // Секретный жест: 5 тапов по экрану за 2 секунды
//   const handleScreenPress = () => {
//     const newCount = tapCount + 1;
//     setTapCount(newCount);
    
//     console.log(`🔐 Secret tap: ${newCount}/5`);
    
//     if (newCount >= 5) {
//       setShowDev(!showDev);
//       setTapCount(0);
//       console.log(`🎉 DevControls ${showDev ? 'hidden' : 'shown'}!`);
//     }
    
//     setTimeout(() => {
//       setTapCount(0);
//     }, 2000);
//   };

//   const handleCloseDev = () => {
//     setShowDev(false);
//   };

//   const handleMarkDay = () => {
//     const today = new Date().toISOString().split('T')[0];
    
//     if (progress.lastCheckDate === today) {
//       Alert.alert(t('alreadyMarked'), t('alreadyMarkedMessage'));
//       return;
//     }

//     markDay();
//   };

//   const handleReset = () => {
//     Alert.alert(
//       t('resetProgress'),
//       t('confirmReset'),
//       [
//         { text: 'Cancel', style: 'cancel' },
//         { text: t('resetProgress'), style: 'destructive', onPress: resetProgress }
//       ]
//     );
//   };

//   // 🆕 Показываем приветственный экран
//   if (showWelcome) {
//     return <WelcomeScreen onClose={handleWelcomeClose} />;
//   }

//   return (
//     <TouchableOpacity 
//       style={{ flex: 1 }} 
//       activeOpacity={1} 
//       onPress={handleScreenPress} // 🆕 Переносим жесты на весь экран
//     >
//       <ScrollView style={[styles.container, { backgroundColor: themeColors.background }]}>
//         {/* 🆕 УБИРАЕМ старый заголовок - теперь он в навигации */}
        
//         {/* Current Streak */}
//         <View style={styles.section}>
//           <Text style={[styles.sectionTitle, { color: themeColors.text }]}>{t('currentStreak')}</Text>
//           <Text style={[styles.streakCount, { color: themeColors.primary }]}>{progress.currentStreak} {t('days')}</Text>
//           <Text style={[styles.streakSubtext, { color: '#888888' }]}>
//             {progress.currentStreak === 0 
//               ? t('startJourney') 
//               : t('keepUpGreatWork')
//             }
//           </Text>
//           <View style={styles.additionalStats}>
//             <Text style={[styles.additionalStat, { color: '#666' }]}>
//               {t('longestStreak')}: {progress.longestStreak} {t('days')}
//             </Text>
//             <Text style={[styles.additionalStat, { color: '#666' }]}>
//               {t('totalDays')}: {progress.totalDays} {t('days')}
//             </Text>
//           </View>
//         </View>

//         {/* Tree */}
//         <View style={styles.section}>
//           <Text style={[styles.sectionTitle, { color: themeColors.text }]}>{t('yourTree')}</Text>
//           <View style={[styles.treeContainer, { backgroundColor: themeColors.calendar?.background || '#1E1E1E' }]}>
//             <TreeComponent stage={progress.treeStage} size={120} /> {/* 🆕 Увеличиваем дерево */}
//           </View>
//         </View>

//         {/* 🆕 ПЕРЕМЕЩАЕМ кнопку отметки после дерева */}
//         <View style={styles.section}>
//           <TouchableOpacity 
//             style={[styles.primaryButton, { backgroundColor: themeColors.primary }]} 
//             onPress={handleMarkDay}
//           >
//             <Text style={styles.primaryButtonText}>
//               {progress.currentStreak === 0 ? t('startJourney') : t('markAsDone')}
//             </Text>
//           </TouchableOpacity>
//         </View>

//         {/* Calendar */}
//         <View style={styles.section}>
//           <Text style={[styles.sectionTitle, { color: themeColors.text }]}>{t('progressCalendar')}</Text>
//           <MiniCalendar 
//             dateIntervals={progress.dateIntervals}
//             onPress={() => setIsCalendarVisible(true)}
//           />
//         </View>

//         {/* 🆕 СКРЫВАЕМ кнопку сброса прогресса от пользователей */}
//         {IS_DEV && progress.currentStreak > 0 && (
//           <View style={styles.section}>
//             <TouchableOpacity 
//               style={[styles.secondaryButton, { borderColor: '#666666' }]} 
//               onPress={handleReset}
//             >
//               <Text style={[styles.secondaryButtonText, { color: '#666666' }]}>{t('resetProgress')}</Text>
//             </TouchableOpacity>
//           </View>
//         )}
//       </ScrollView>
      
//       {/* Full Calendar Modal */}
//       <FullCalendarModal
//         visible={isCalendarVisible}
//         onClose={() => setIsCalendarVisible(false)}
//         dateIntervals={progress.dateIntervals}
//         currentStreak={progress.currentStreak}
//         longestStreak={progress.longestStreak}
//         totalDays={progress.totalDays}
//       />
      
//       {/* Dev Controls */}
//       {showDev && <DevControls onClose={handleCloseDev} />}
//     </TouchableOpacity>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//   },
//   section: {
//     marginBottom: 30,
//   },
//   sectionTitle: {
//     fontSize: 20,
//     fontWeight: '600',
//     marginBottom: 15,
//     textAlign: 'center', // 🆕 Центрируем заголовки
//   },
//   streakCount: {
//     fontSize: 42,
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   streakSubtext: {
//     fontSize: 16, // 🆕 Увеличиваем шрифт
//     textAlign: 'center',
//     marginTop: 10,
//     lineHeight: 20,
//   },
//   additionalStats: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     marginTop: 15,
//     gap: 20,
//   },
//   additionalStat: {
//     fontSize: 14, // 🆕 Увеличиваем шрифт
//   },
//   treeContainer: {
//     borderRadius: 16, // 🆕 Увеличиваем скругление
//     padding: 20, // 🆕 Увеличиваем отступы
//     alignItems: 'center',
//   },
//   primaryButton: {
//     padding: 18, // 🆕 Увеличиваем кнопку
//     borderRadius: 16,
//     alignItems: 'center',
//     marginVertical: 10,
//   },
//   primaryButtonText: {
//     color: '#FFFFFF',
//     fontSize: 20, // 🆕 Увеличиваем шрифт
//     fontWeight: '600',
//   },
//   secondaryButton: {
//     backgroundColor: 'transparent',
//     padding: 16,
//     borderRadius: 12,
//     alignItems: 'center',
//     borderWidth: 1,
//     marginTop: 10,
//   },
//   secondaryButtonText: {
//     fontSize: 16,
//     fontWeight: '500',
//   },
// });