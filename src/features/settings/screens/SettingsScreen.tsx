

// // import React from 'react';
// // import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
// // import { colors } from '@/app/constants/colors';
// // import { useLanguage } from '@/app/context/LanguageContext';
// // import { Language } from '@/app/constants/i18n';

// // export const SettingsScreen = () => {
// //   const { language, setLanguage, t } = useLanguage();

// //   const languages: { code: Language; name: string }[] = [
// //     { code: 'en', name: t('english') },
// //     { code: 'ru', name: t('russian') },
// //   ];

// //   return (
// //     <ScrollView style={styles.container}>
// //       <Text style={styles.title}>{t('settingsTitle')}</Text>
      
// //       {/* Выбор языка */}
// //       <View style={styles.section}>
// //         <Text style={styles.sectionTitle}>{t('selectLanguage')}</Text>
// //         <View style={styles.optionsContainer}>
// //           {languages.map((lang) => (
// //             <TouchableOpacity
// //               key={lang.code}
// //               style={[
// //                 styles.option,
// //                 language === lang.code && styles.selectedOption
// //               ]}
// //               onPress={() => setLanguage(lang.code)}
// //             >
// //               <Text style={[
// //                 styles.optionText,
// //                 language === lang.code && styles.selectedOptionText
// //               ]}>
// //                 {lang.name}
// //               </Text>
// //             </TouchableOpacity>
// //           ))}
// //         </View>
// //       </View>

// //       {/* Тема (заглушка для будущей реализации) */}
// //       <View style={styles.section}>
// //         <Text style={styles.sectionTitle}>{t('theme')}</Text>
// //         <View style={styles.optionsContainer}>
// //           <TouchableOpacity style={styles.option}>
// //             <Text style={styles.optionText}>{t('darkTheme')}</Text>
// //           </TouchableOpacity>
// //           <TouchableOpacity style={styles.option}>
// //             <Text style={styles.optionText}>{t('lightTheme')}</Text>
// //           </TouchableOpacity>
// //         </View>
// //       </View>
// //     </ScrollView>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: colors.dark.background,
// //     padding: 20,
// //   },
// //   title: {
// //     color: colors.dark.text,
// //     fontSize: 28,
// //     fontWeight: 'bold',
// //     textAlign: 'center',
// //     marginBottom: 30,
// //   },
// //   section: {
// //     marginBottom: 30,
// //   },
// //   sectionTitle: {
// //     color: colors.dark.text,
// //     fontSize: 20,
// //     fontWeight: '600',
// //     marginBottom: 15,
// //   },
// //   optionsContainer: {
// //     backgroundColor: colors.dark.calendar.background,
// //     borderRadius: 12,
// //     overflow: 'hidden',
// //   },
// //   option: {
// //     padding: 16,
// //     borderBottomWidth: 1,
// //     borderBottomColor: '#333',
// //   },
// //   selectedOption: {
// //     backgroundColor: colors.dark.primary,
// //   },
// //   optionText: {
// //     color: colors.dark.text,
// //     fontSize: 16,
// //   },
// //   selectedOptionText: {
// //     color: '#FFFFFF',
// //     fontWeight: '600',
// //   },
// // });


// import React, { useState } from 'react';
// import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal } from 'react-native';
// import { colors } from '@/app/constants/colors';
// import { useLanguage } from '@/app/context/LanguageContext';
// import { Language } from '@/app/constants/i18n';

// export const SettingsScreen = () => {
//   const { language, setLanguage, t } = useLanguage();
//   const [isLanguageModalVisible, setLanguageModalVisible] = useState(false);

//   const languages: { code: Language; name: string; nativeName: string }[] = [
//     { code: 'en', name: t('english'), nativeName: 'English' },
//     { code: 'ru', name: t('russian'), nativeName: 'Русский' },
//   ];

//   const currentLanguage = languages.find(lang => lang.code === language);

//   const handleLanguageSelect = (selectedLanguage: Language) => {
//     setLanguage(selectedLanguage);
//     setLanguageModalVisible(false);
//   };

//   return (
//     <ScrollView style={styles.container}>
//       <Text style={styles.title}>{t('settingsTitle')}</Text>
      
//       {/* Выбор языка */}
//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>{t('language')}</Text>
//         <TouchableOpacity
//           style={styles.languageSelector}
//           onPress={() => setLanguageModalVisible(true)}
//         >
//           <Text style={styles.currentLanguageText}>
//             {currentLanguage?.nativeName}
//           </Text>
//           <Text style={styles.languageArrow}>▼</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Тема (заглушка для будущей реализации) */}
//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>{t('theme')}</Text>
//         <View style={styles.optionsContainer}>
//           <TouchableOpacity style={[styles.option, styles.selectedOption]}>
//             <Text style={styles.selectedOptionText}>{t('darkTheme')}</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.option}>
//             <Text style={styles.optionText}>{t('lightTheme')}</Text>
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* Модальное окно выбора языка */}
//       <Modal
//         visible={isLanguageModalVisible}
//         animationType="slide"
//         transparent={true}
//         onRequestClose={() => setLanguageModalVisible(false)}
//       >
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContent}>
//             <Text style={styles.modalTitle}>{t('selectLanguage')}</Text>
            
//             {languages.map((lang) => (
//               <TouchableOpacity
//                 key={lang.code}
//                 style={[
//                   styles.modalOption,
//                   language === lang.code && styles.modalSelectedOption
//                 ]}
//                 onPress={() => handleLanguageSelect(lang.code)}
//               >
//                 <Text style={[
//                   styles.modalOptionText,
//                   language === lang.code && styles.modalSelectedOptionText
//                 ]}>
//                   {lang.nativeName}
//                 </Text>
//                 {language === lang.code && (
//                   <Text style={styles.selectedIcon}>✓</Text>
//                 )}
//               </TouchableOpacity>
//             ))}

//             <TouchableOpacity
//               style={styles.modalCloseButton}
//               onPress={() => setLanguageModalVisible(false)}
//             >
//               <Text style={styles.modalCloseButtonText}>Cancel</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: colors.dark.background,
//     padding: 20,
//   },
//   title: {
//     color: colors.dark.text,
//     fontSize: 28,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginBottom: 30,
//   },
//   section: {
//     marginBottom: 30,
//   },
//   sectionTitle: {
//     color: colors.dark.text,
//     fontSize: 20,
//     fontWeight: '600',
//     marginBottom: 15,
//   },
//   languageSelector: {
//     backgroundColor: colors.dark.calendar.background,
//     padding: 16,
//     borderRadius: 12,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   currentLanguageText: {
//     color: colors.dark.text,
//     fontSize: 16,
//     fontWeight: '500',
//   },
//   languageArrow: {
//     color: colors.dark.text,
//     fontSize: 12,
//   },
//   optionsContainer: {
//     backgroundColor: colors.dark.calendar.background,
//     borderRadius: 12,
//     overflow: 'hidden',
//   },
//   option: {
//     padding: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: '#333',
//   },
//   selectedOption: {
//     backgroundColor: colors.dark.primary,
//   },
//   optionText: {
//     color: colors.dark.text,
//     fontSize: 16,
//   },
//   selectedOptionText: {
//     color: '#FFFFFF',
//     fontWeight: '600',
//   },
//   // Стили для модального окна
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   modalContent: {
//     backgroundColor: colors.dark.background,
//     borderRadius: 16,
//     padding: 20,
//     width: '100%',
//     maxWidth: 300,
//   },
//   modalTitle: {
//     color: colors.dark.text,
//     fontSize: 20,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginBottom: 20,
//   },
//   modalOption: {
//     padding: 16,
//     borderRadius: 8,
//     marginBottom: 8,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     backgroundColor: colors.dark.calendar.background,
//   },
//   modalSelectedOption: {
//     backgroundColor: colors.dark.primary,
//   },
//   modalOptionText: {
//     color: colors.dark.text,
//     fontSize: 16,
//   },
//   modalSelectedOptionText: {
//     color: '#FFFFFF',
//     fontWeight: '600',
//   },
//   selectedIcon: {
//     color: '#FFFFFF',
//     fontWeight: 'bold',
//   },
//   modalCloseButton: {
//     marginTop: 15,
//     padding: 12,
//     borderRadius: 8,
//     alignItems: 'center',
//     backgroundColor: '#333',
//   },
//   modalCloseButtonText: {
//     color: colors.dark.text,
//     fontSize: 16,
//     fontWeight: '500',
//   },
// });






// import React, { useState } from 'react';
// import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal } from 'react-native';
// import { useLanguage } from '@/app/context/LanguageContext';
// import { useTheme, ThemeMode } from '@/app/context/ThemeContext';
// import { colors } from '@/app/constants/colors';

// export const SettingsScreen = () => {
//   const { language, setLanguage, t } = useLanguage();
//   const { theme, setTheme, themeColors } = useTheme();
//   const [isLanguageModalVisible, setLanguageModalVisible] = useState(false);
//   const [isThemeModalVisible, setThemeModalVisible] = useState(false);

//   const languages: { code: any; name: string; nativeName: string }[] = [
//     { code: 'en', name: t('english'), nativeName: 'English' },
//     { code: 'ru', name: t('russian'), nativeName: 'Русский' },
//   ];

//   const themes: { code: ThemeMode; name: string; icon: string }[] = [
//     { code: 'dark', name: t('darkTheme'), icon: '🌙' },
//     { code: 'light', name: t('lightTheme'), icon: '☀️' },
//   ];

//   const currentLanguage = languages.find(lang => lang.code === language);
//   const currentTheme = themes.find(t => t.code === theme);

//   const handleLanguageSelect = (selectedLanguage: any) => {
//     setLanguage(selectedLanguage);
//     setLanguageModalVisible(false);
//   };

//   const handleThemeSelect = (selectedTheme: ThemeMode) => {
//     setTheme(selectedTheme);
//     setThemeModalVisible(false);
//   };

//   return (
//     <ScrollView style={[styles.container, { backgroundColor: themeColors.background }]}>
//       <Text style={[styles.title, { color: themeColors.text }]}>{t('settingsTitle')}</Text>
      
//       {/* Выбор языка */}
//       <View style={styles.section}>
//         <Text style={[styles.sectionTitle, { color: themeColors.text }]}>{t('language')}</Text>
//         <TouchableOpacity
//           style={[styles.selector, { backgroundColor: themeColors.calendar?.background || '#1E1E1E' }]}
//           onPress={() => setLanguageModalVisible(true)}
//         >
//           <Text style={[styles.selectorText, { color: themeColors.text }]}>
//             {currentLanguage?.nativeName}
//           </Text>
//           <Text style={[styles.selectorArrow, { color: themeColors.text }]}>▼</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Выбор темы */}
//       <View style={styles.section}>
//         <Text style={[styles.sectionTitle, { color: themeColors.text }]}>{t('theme')}</Text>
//         <TouchableOpacity
//           style={[styles.selector, { backgroundColor: themeColors.calendar?.background || '#1E1E1E' }]}
//           onPress={() => setThemeModalVisible(true)}
//         >
//           <Text style={[styles.selectorText, { color: themeColors.text }]}>
//             {currentTheme?.icon} {currentTheme?.name}
//           </Text>
//           <Text style={[styles.selectorArrow, { color: themeColors.text }]}>▼</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Модальное окно выбора языка */}
//       <Modal
//         visible={isLanguageModalVisible}
//         animationType="slide"
//         transparent={true}
//         onRequestClose={() => setLanguageModalVisible(false)}
//       >
//         <View style={styles.modalOverlay}>
//           <View style={[styles.modalContent, { backgroundColor: themeColors.background }]}>
//             <Text style={[styles.modalTitle, { color: themeColors.text }]}>{t('selectLanguage')}</Text>
            
//             {languages.map((lang) => (
//               <TouchableOpacity
//                 key={lang.code}
//                 style={[
//                   styles.modalOption,
//                   { backgroundColor: themeColors.calendar?.background || '#1E1E1E' },
//                   language === lang.code && { backgroundColor: themeColors.primary }
//                 ]}
//                 onPress={() => handleLanguageSelect(lang.code)}
//               >
//                 <Text style={[
//                   styles.modalOptionText,
//                   { color: themeColors.text },
//                   language === lang.code && styles.modalSelectedOptionText
//                 ]}>
//                   {lang.nativeName}
//                 </Text>
//                 {language === lang.code && (
//                   <Text style={styles.selectedIcon}>✓</Text>
//                 )}
//               </TouchableOpacity>
//             ))}

//             <TouchableOpacity
//               style={[styles.modalCloseButton, { backgroundColor: '#333' }]}
//               onPress={() => setLanguageModalVisible(false)}
//             >
//               <Text style={[styles.modalCloseButtonText, { color: themeColors.text }]}>Cancel</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>

//       {/* Модальное окно выбора темы */}
//       <Modal
//         visible={isThemeModalVisible}
//         animationType="slide"
//         transparent={true}
//         onRequestClose={() => setThemeModalVisible(false)}
//       >
//         <View style={styles.modalOverlay}>
//           <View style={[styles.modalContent, { backgroundColor: themeColors.background }]}>
//             <Text style={[styles.modalTitle, { color: themeColors.text }]}>{t('theme')}</Text>
            
//             {themes.map((themeItem) => (
//               <TouchableOpacity
//                 key={themeItem.code}
//                 style={[
//                   styles.modalOption,
//                   { backgroundColor: themeColors.calendar?.background || '#1E1E1E' },
//                   theme === themeItem.code && { backgroundColor: themeColors.primary }
//                 ]}
//                 onPress={() => handleThemeSelect(themeItem.code)}
//               >
//                 <Text style={[
//                   styles.modalOptionText,
//                   { color: themeColors.text },
//                   theme === themeItem.code && styles.modalSelectedOptionText
//                 ]}>
//                   {themeItem.icon} {themeItem.name}
//                 </Text>
//                 {theme === themeItem.code && (
//                   <Text style={styles.selectedIcon}>✓</Text>
//                 )}
//               </TouchableOpacity>
//             ))}

//             <TouchableOpacity
//               style={[styles.modalCloseButton, { backgroundColor: '#333' }]}
//               onPress={() => setThemeModalVisible(false)}
//             >
//               <Text style={[styles.modalCloseButtonText, { color: themeColors.text }]}>Cancel</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginBottom: 30,
//   },
//   section: {
//     marginBottom: 30,
//   },
//   sectionTitle: {
//     fontSize: 20,
//     fontWeight: '600',
//     marginBottom: 15,
//   },
//   selector: {
//     padding: 16,
//     borderRadius: 12,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   selectorText: {
//     fontSize: 16,
//     fontWeight: '500',
//   },
//   selectorArrow: {
//     fontSize: 12,
//   },
//   // Стили для модальных окон
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   modalContent: {
//     borderRadius: 16,
//     padding: 20,
//     width: '100%',
//     maxWidth: 300,
//   },
//   modalTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginBottom: 20,
//   },
//   modalOption: {
//     padding: 16,
//     borderRadius: 8,
//     marginBottom: 8,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   modalOptionText: {
//     fontSize: 16,
//   },
//   modalSelectedOptionText: {
//     color: '#FFFFFF',
//     fontWeight: '600',
//   },
//   selectedIcon: {
//     color: '#FFFFFF',
//     fontWeight: 'bold',
//   },
//   modalCloseButton: {
//     marginTop: 15,
//     padding: 12,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   modalCloseButtonText: {
//     fontSize: 16,
//     fontWeight: '500',
//   },
// });


import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { useLanguage } from '@/app/context/LanguageContext';
import { useTheme, ThemeMode } from '@/app/context/ThemeContext';
import { colors } from '@/app/constants/colors';

export const SettingsScreen = () => {
  const { language, setLanguage, t } = useLanguage();
  const { theme, setTheme, themeColors } = useTheme();
  const [isLanguageModalVisible, setLanguageModalVisible] = useState(false);
  const [isThemeModalVisible, setThemeModalVisible] = useState(false);

  const languages: { code: any; name: string; nativeName: string }[] = [
    { code: 'en', name: t('english'), nativeName: 'English' },
    { code: 'ru', name: t('russian'), nativeName: 'Русский' },
  ];

  const themes: { code: ThemeMode; name: string; icon: string }[] = [
    { code: 'dark', name: t('darkTheme'), icon: '🌙' },
    { code: 'light', name: t('lightTheme'), icon: '☀️' },
  ];

  const currentLanguage = languages.find(lang => lang.code === language);
  const currentTheme = themes.find(t => t.code === theme);

  const handleLanguageSelect = (selectedLanguage: any) => {
    setLanguage(selectedLanguage);
    setLanguageModalVisible(false);
  };

  const handleThemeSelect = (selectedTheme: ThemeMode) => {
    setTheme(selectedTheme);
    setThemeModalVisible(false);
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: themeColors.background }]}>
      {/* <Text style={[styles.title, { color: themeColors.text }]}>{t('settingsTitle')}</Text> */}
      
      {/* Выбор языка */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: themeColors.text }]}>{t('language')}</Text>
        <TouchableOpacity
          style={[styles.selector, { backgroundColor: themeColors.calendar?.background || '#1E1E1E' }]}
          onPress={() => setLanguageModalVisible(true)}
        >
          <Text style={[styles.selectorText, { color: themeColors.text }]}>
            {currentLanguage?.nativeName}
          </Text>
          <Text style={[styles.selectorArrow, { color: themeColors.text }]}>▼</Text>
        </TouchableOpacity>
      </View>

      {/* Выбор темы */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: themeColors.text }]}>{t('theme')}</Text>
        <TouchableOpacity
          style={[styles.selector, { backgroundColor: themeColors.calendar?.background || '#1E1E1E' }]}
          onPress={() => setThemeModalVisible(true)}
        >
          <Text style={[styles.selectorText, { color: themeColors.text }]}>
            {currentTheme?.icon} {currentTheme?.name}
          </Text>
          <Text style={[styles.selectorArrow, { color: themeColors.text }]}>▼</Text>
        </TouchableOpacity>
      </View>

      {/* Модальное окно выбора языка */}
      <Modal
        visible={isLanguageModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setLanguageModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: themeColors.background }]}>
            <Text style={[styles.modalTitle, { color: themeColors.text }]}>{t('selectLanguage')}</Text>
            
            {languages.map((lang) => (
              <TouchableOpacity
                key={lang.code}
                style={[
                  styles.modalOption,
                  { backgroundColor: themeColors.calendar?.background || '#1E1E1E' },
                  language === lang.code && { backgroundColor: themeColors.primary }
                ]}
                onPress={() => handleLanguageSelect(lang.code)}
              >
                <Text style={[
                  styles.modalOptionText,
                  { color: themeColors.text },
                  language === lang.code && styles.modalSelectedOptionText
                ]}>
                  {lang.nativeName}
                </Text>
                {language === lang.code && (
                  <Text style={styles.selectedIcon}>✓</Text>
                )}
              </TouchableOpacity>
            ))}

            {/* 🆕 ИСПРАВЛЕННАЯ кнопка Cancel */}
            <TouchableOpacity
              style={[styles.modalCloseButton, { backgroundColor: themeColors.calendar?.background || '#333' }]}
              onPress={() => setLanguageModalVisible(false)}
            >
              <Text style={[styles.modalCloseButtonText, { color: themeColors.text }]}>
                {t('cancel')} {/* 🆕 ИСПОЛЬЗУЕМ ПЕРЕВОД */}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Модальное окно выбора темы */}
      <Modal
        visible={isThemeModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setThemeModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: themeColors.background }]}>
            <Text style={[styles.modalTitle, { color: themeColors.text }]}>{t('theme')}</Text>
            
            {themes.map((themeItem) => (
              <TouchableOpacity
                key={themeItem.code}
                style={[
                  styles.modalOption,
                  { backgroundColor: themeColors.calendar?.background || '#1E1E1E' },
                  theme === themeItem.code && { backgroundColor: themeColors.primary }
                ]}
                onPress={() => handleThemeSelect(themeItem.code)}
              >
                <Text style={[
                  styles.modalOptionText,
                  { color: themeColors.text },
                  theme === themeItem.code && styles.modalSelectedOptionText
                ]}>
                  {themeItem.icon} {themeItem.name}
                </Text>
                {theme === themeItem.code && (
                  <Text style={styles.selectedIcon}>✓</Text>
                )}
              </TouchableOpacity>
            ))}

            {/* 🆕 ИСПРАВЛЕННАЯ кнопка Cancel */}
            <TouchableOpacity
              style={[styles.modalCloseButton, { backgroundColor: themeColors.calendar?.background || '#333' }]}
              onPress={() => setThemeModalVisible(false)}
            >
              <Text style={[styles.modalCloseButtonText, { color: themeColors.text }]}>
                {t('cancel')} {/* 🆕 ИСПОЛЬЗУЕМ ПЕРЕВОД */}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
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
    marginBottom: 30,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 15,
  },
  selector: {
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectorText: {
    fontSize: 16,
    fontWeight: '500',
  },
  selectorArrow: {
    fontSize: 12,
  },
  // Стили для модальных окон
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    borderRadius: 16,
    padding: 20,
    width: '100%',
    maxWidth: 300,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalOption: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalOptionText: {
    fontSize: 16,
  },
  modalSelectedOptionText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  selectedIcon: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  modalCloseButton: {
    marginTop: 15,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalCloseButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
});