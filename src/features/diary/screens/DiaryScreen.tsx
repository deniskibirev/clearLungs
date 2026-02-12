// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import { colors } from '@/app/constants/colors';

// export const DiaryScreen = () => {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.text}>📔 Diary Screen - Coming Soon</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: colors.dark.background,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   text: {
//     color: colors.dark.text,
//     fontSize: 18,
//   },
// });

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/app/context/ThemeContext'; // 🆕 ДОБАВИТЬ
import { useLanguage } from '@/app/context/LanguageContext'; // 🆕 ДОБАВИТЬ

export const DiaryScreen = () => {
  const { themeColors } = useTheme(); // 🆕 ДОБАВИТЬ
  const { t } = useLanguage(); // 🆕 ДОБАВИТЬ

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      <Text style={[styles.text, { color: themeColors.text }]}>
        📔 {t('diary')} - Coming Soon {/* 🆕 ИСПРАВИТЬ */}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
  },
});