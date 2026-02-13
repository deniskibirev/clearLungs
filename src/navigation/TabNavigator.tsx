import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Platform } from 'react-native';
import { Feather } from '@expo/vector-icons'; // <- Импортируем иконки

import { ProgressScreen } from '@/features/progress/screens/ProgressScreen';
import { DiaryScreen } from '@/features/diary/screens/DiaryScreen';
import { SettingsScreen } from '@/features/settings/screens/SettingsScreen';
import { RootTabParamList } from '@/types';
import { useLanguage } from '@/app/context/LanguageContext';
import { useTheme } from '@/app/context/ThemeContext';

const Tab = createBottomTabNavigator<RootTabParamList>();

export const TabNavigator = () => {
  const { t } = useLanguage();
  const { themeColors } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: { 
          backgroundColor: themeColors.background,
          borderTopColor: '#333',
          height: Platform.OS === 'ios' ? 88 : 60,
          paddingBottom: Platform.OS === 'ios' ? 28 : 8,
          paddingTop: 8,
        },
        tabBarActiveTintColor: themeColors.primary,
        tabBarInactiveTintColor: '#666666',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          marginBottom: Platform.OS === 'ios' ? 0 : 4,
        },
        tabBarIcon: ({ focused, color, size }) => {
          // Выбираем иконку в зависимости от роута
          let iconName: keyof typeof Feather.glyphMap = 'circle';

          if (route.name === 'Progress') {
            iconName = focused ? 'trending-up' : 'activity';
          } else if (route.name === 'Diary') {
            iconName = focused ? 'book-open' : 'book';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'sliders';
          }

          // Возвращаем компонент иконки
          return <Feather name={iconName} size={size} color={color} />;
        },
        headerStyle: { 
          backgroundColor: themeColors.background,
          height: Platform.OS === 'ios' ? 110 : 80,
          borderBottomWidth: 1,
          borderBottomColor: '#333',
        },
        headerTintColor: themeColors.text,
        headerTitleStyle: {
          fontSize: 24,
          fontWeight: 'bold',
        },
        headerTitleAlign: 'center',
      })}
    >
      <Tab.Screen 
        name="Progress" 
        component={ProgressScreen}
        options={{ title: t('progress') }}
      />
      <Tab.Screen 
        name="Diary" 
        component={DiaryScreen}
        options={{ title: t('diary') }}
      />
      <Tab.Screen 
        name="Settings" 
        component={SettingsScreen}
        options={{ title: t('settings') }}
      />
    </Tab.Navigator>
  );
};