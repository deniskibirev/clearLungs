

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ProgressScreen } from '@/features/progress/screens/ProgressScreen';
import { DiaryScreen } from '@/features/diary/screens/DiaryScreen';
import { SettingsScreen } from '@/features/settings/screens/SettingsScreen';
import { RootTabParamList } from '@/types';
import { useLanguage } from '@/app/context/LanguageContext'; // 🆕 ДОБАВИТЬ
import { useTheme } from '@/app/context/ThemeContext'; // 🆕 ДОБАВИТЬ

const Tab = createBottomTabNavigator<RootTabParamList>();

export const TabNavigator = () => {
  const { t } = useLanguage(); // 🆕 ДОБАВИТЬ
  const { themeColors } = useTheme(); // 🆕 ДОБАВИТЬ

  return (
    <Tab.Navigator
    //   screenOptions={{
    //     tabBarStyle: { backgroundColor: themeColors.background }, // 🆕 ИСПРАВИТЬ
    //     tabBarActiveTintColor: themeColors.primary, // 🆕 ИСПРАВИТЬ
    //     tabBarInactiveTintColor: '#666666',
    //     headerStyle: { backgroundColor: themeColors.background }, // 🆕 ИСПРАВИТЬ
    //     headerTintColor: themeColors.text, // 🆕 ИСПРАВИТЬ
    //   }}
    // >
      screenOptions={{
        tabBarStyle: { backgroundColor: themeColors.background },
        tabBarActiveTintColor: themeColors.primary,
        tabBarInactiveTintColor: '#666666',
        headerStyle: { 
          backgroundColor: themeColors.background,
          height: 120, // 🆕 Увеличиваем высоту хедера
        },
        headerTintColor: themeColors.text,
        headerTitleStyle: {
          fontSize: 24, // 🆕 Увеличиваем размер шрифта
          fontWeight: 'bold',
        },
      }}
    >
      <Tab.Screen 
        name="Progress" 
        component={ProgressScreen}
        options={{ title: t('progress') }} // 🆕 ИСПРАВИТЬ
      />
      <Tab.Screen 
        name="Diary" 
        component={DiaryScreen}
        options={{ title: t('diary') }} // 🆕 ИСПРАВИТЬ
      />
      <Tab.Screen 
        name="Settings" 
        component={SettingsScreen}
        options={{ title: t('settings') }} // 🆕 ИСПРАВИТЬ
      />
    </Tab.Navigator>
  );
};


// import React from 'react';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { ProgressScreen } from '@/features/progress/screens/ProgressScreen';
// import { DiaryScreen } from '@/features/diary/screens/DiaryScreen';
// import { SettingsScreen } from '@/features/settings/screens/SettingsScreen';
// import { RootTabParamList } from '@/types';
// import { useLanguage } from '@/app/context/LanguageContext';
// import { useTheme } from '@/app/context/ThemeContext';

// const Tab = createBottomTabNavigator<RootTabParamList>();

// export const TabNavigator = () => {
//   const { t } = useLanguage();
//   const { themeColors } = useTheme();

//   return (
//     <Tab.Navigator
//       screenOptions={{
//         tabBarStyle: { backgroundColor: themeColors.background },
//         tabBarActiveTintColor: themeColors.primary,
//         tabBarInactiveTintColor: '#666666',
//         headerStyle: { 
//           backgroundColor: themeColors.background,
//           height: 80, // 🆕 Увеличиваем высоту хедера
//         },
//         headerTintColor: themeColors.text,
//         headerTitleStyle: {
//           fontSize: 24, // 🆕 Увеличиваем размер шрифта
//           fontWeight: 'bold',
//         },
//       }}
//     >
//       <Tab.Screen 
//         name="Progress" 
//         component={ProgressScreen}
//         options={{ title: t('progress') }}
//       />
//       <Tab.Screen 
//         name="Diary" 
//         component={DiaryScreen}
//         options={{ title: t('diary') }}
//       />
//       <Tab.Screen 
//         name="Settings" 
//         component={SettingsScreen}
//         options={{ title: t('settings') }}
//       />
//     </Tab.Navigator>
//   );
// };