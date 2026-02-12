// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView } from 'react-native';
// import { useProgressStore } from '../store/progressStore';
// import { colors } from '@/app/constants/colors';

// export const DevControls: React.FC = () => {
//   const [isVisible, setIsVisible] = useState(false);
//   const [customDays, setCustomDays] = useState('');
//   const { progress, setStreakDays, addDays, resetProgress } = useProgressStore();

//   const quickPresets = [1, 7, 30, 90, 180, 365];

//   const handleSetDays = () => {
//     const days = parseInt(customDays);
//     if (!isNaN(days) && days >= 0) {
//       setStreakDays(days);
//       setCustomDays('');
//     }
//   };

//   const getStageInfo = () => {
//     const stages = [
//       { min: 0, max: 6, stage: 'seed', emoji: '🌱' },
//       { min: 7, max: 29, stage: 'sprout', emoji: '🪴' },
//       { min: 30, max: 89, stage: 'young', emoji: '🌿' },
//       { min: 90, max: 179, stage: 'mature', emoji: '🌳' },
//       { min: 180, max: 364, stage: 'flowering', emoji: '🌸' },
//       { min: 365, max: Infinity, stage: 'fruitful', emoji: '🌲' }
//     ];

//     return stages.map(stage => ({
//       ...stage,
//       isCurrent: progress.streakDays >= stage.min && progress.streakDays <= stage.max
//     }));
//   };

//   if (!isVisible) {
//     return (
//       <TouchableOpacity 
//         style={styles.devButton}
//         onPress={() => setIsVisible(true)}
//       >
//         <Text style={styles.devButtonText}>🧪 Dev</Text>
//       </TouchableOpacity>
//     );
//   }

//   return (
//     <View style={styles.devPanel}>
//       <View style={styles.devHeader}>
//         <Text style={styles.devTitle}>Developer Controls</Text>
//         <TouchableOpacity onPress={() => setIsVisible(false)}>
//           <Text style={styles.closeButton}>✕</Text>
//         </TouchableOpacity>
//       </View>

//       <ScrollView style={styles.devContent}>
//         {/* Текущий прогресс */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Current: {progress.streakDays} days</Text>
//           <Text style={styles.stageText}>Stage: {progress.treeStage}</Text>
//         </View>

//         {/* Быстрые пресеты */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Quick Presets</Text>
//           <View style={styles.presetContainer}>
//             {quickPresets.map(days => (
//               <TouchableOpacity
//                 key={days}
//                 style={[
//                   styles.presetButton,
//                   progress.streakDays === days && styles.activePreset
//                 ]}
//                 onPress={() => setStreakDays(days)}
//               >
//                 <Text style={styles.presetText}>{days}d</Text>
//               </TouchableOpacity>
//             ))}
//           </View>
//         </View>

//         {/* Добавить/убавить дни */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Adjust Days</Text>
//           <View style={styles.adjustContainer}>
//             <TouchableOpacity 
//               style={styles.adjustButton}
//               onPress={() => addDays(-1)}
//             >
//               <Text style={styles.adjustText}>-1</Text>
//             </TouchableOpacity>
//             <TouchableOpacity 
//               style={styles.adjustButton}
//               onPress={() => addDays(1)}
//             >
//               <Text style={styles.adjustText}>+1</Text>
//             </TouchableOpacity>
//             <TouchableOpacity 
//               style={styles.adjustButton}
//               onPress={() => addDays(7)}
//             >
//               <Text style={styles.adjustText}>+7</Text>
//             </TouchableOpacity>
//             <TouchableOpacity 
//               style={styles.adjustButton}
//               onPress={() => addDays(30)}
//             >
//               <Text style={styles.adjustText}>+30</Text>
//             </TouchableOpacity>
//           </View>
//         </View>

//         {/* Кастомные дни */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Custom Days</Text>
//           <View style={styles.customContainer}>
//             <TextInput
//               style={styles.input}
//               value={customDays}
//               onChangeText={setCustomDays}
//               placeholder="Enter days"
//               keyboardType="numeric"
//               placeholderTextColor="#666"
//             />
//             <TouchableOpacity 
//               style={styles.setButton}
//               onPress={handleSetDays}
//             >
//               <Text style={styles.setButtonText}>Set</Text>
//             </TouchableOpacity>
//           </View>
//         </View>

//         {/* Сброс */}
//         <TouchableOpacity 
//           style={styles.resetButton}
//           onPress={resetProgress}
//         >
//           <Text style={styles.resetButtonText}>Reset to 0</Text>
//         </TouchableOpacity>

//         {/* Информация о стадиях */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Tree Stages</Text>
//           {getStageInfo().map(stage => (
//             <View 
//               key={stage.stage} 
//               style={[
//                 styles.stageRow,
//                 stage.isCurrent && styles.currentStage
//               ]}
//             >
//               <Text style={styles.stageEmoji}>{stage.emoji}</Text>
//               <Text style={styles.stageName}>
//                 {stage.stage} ({stage.min}-{stage.max === Infinity ? '∞' : stage.max} days)
//               </Text>
//               {stage.isCurrent && <Text style={styles.currentBadge}>Current</Text>}
//             </View>
//           ))}
//         </View>
//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   devButton: {
//     position: 'absolute',
//     top: 50,
//     right: 20,
//     backgroundColor: '#666',
//     padding: 8,
//     borderRadius: 20,
//     zIndex: 1000,
//   },
//   devButtonText: {
//     color: '#FFF',
//     fontSize: 12,
//     fontWeight: 'bold',
//   },
//   devPanel: {
//     position: 'absolute',
//     top: 80,
//     right: 20,
//     backgroundColor: '#1E1E1E',
//     borderRadius: 12,
//     padding: 15,
//     width: 280,
//     maxHeight: 500,
//     borderWidth: 1,
//     borderColor: '#333',
//     zIndex: 1000,
//   },
//   devHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 15,
//   },
//   devTitle: {
//     color: colors.dark.text,
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   closeButton: {
//     color: '#666',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   devContent: {
//     maxHeight: 400,
//   },
//   section: {
//     marginBottom: 15,
//   },
//   sectionTitle: {
//     color: colors.dark.text,
//     fontSize: 14,
//     fontWeight: '600',
//     marginBottom: 8,
//   },
//   stageText: {
//     color: '#888',
//     fontSize: 12,
//   },
//   presetContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     gap: 8,
//   },
//   presetButton: {
//     backgroundColor: '#333',
//     padding: 8,
//     borderRadius: 8,
//     minWidth: 40,
//     alignItems: 'center',
//   },
//   activePreset: {
//     backgroundColor: colors.dark.primary,
//   },
//   presetText: {
//     color: '#FFF',
//     fontSize: 12,
//     fontWeight: '500',
//   },
//   adjustContainer: {
//     flexDirection: 'row',
//     gap: 8,
//   },
//   adjustButton: {
//     backgroundColor: '#333',
//     padding: 8,
//     borderRadius: 8,
//     flex: 1,
//     alignItems: 'center',
//   },
//   adjustText: {
//     color: '#FFF',
//     fontSize: 12,
//     fontWeight: '500',
//   },
//   customContainer: {
//     flexDirection: 'row',
//     gap: 8,
//   },
//   input: {
//     flex: 1,
//     backgroundColor: '#333',
//     color: '#FFF',
//     padding: 8,
//     borderRadius: 8,
//     fontSize: 12,
//   },
//   setButton: {
//     backgroundColor: colors.dark.primary,
//     padding: 8,
//     borderRadius: 8,
//     minWidth: 40,
//     alignItems: 'center',
//   },
//   setButtonText: {
//     color: '#FFF',
//     fontSize: 12,
//     fontWeight: '500',
//   },
//   resetButton: {
//     backgroundColor: '#FF4444',
//     padding: 12,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginBottom: 15,
//   },
//   resetButtonText: {
//     color: '#FFF',
//     fontSize: 14,
//     fontWeight: '600',
//   },
//   stageRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 6,
//     borderRadius: 6,
//     marginBottom: 4,
//   },
//   currentStage: {
//     backgroundColor: 'rgba(76, 175, 80, 0.2)',
//   },
//   stageEmoji: {
//     fontSize: 16,
//     marginRight: 8,
//   },
//   stageName: {
//     color: '#CCC',
//     fontSize: 12,
//     flex: 1,
//   },
//   currentBadge: {
//     color: colors.dark.primary,
//     fontSize: 10,
//     fontWeight: 'bold',
//     backgroundColor: 'rgba(76, 175, 80, 0.3)',
//     paddingHorizontal: 6,
//     paddingVertical: 2,
//     borderRadius: 4,
//   },
// });

// import React, { useState, useEffect } from 'react';
// import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView } from 'react-native';
// import { useProgressStore } from '../store/progressStore';
// import { colors } from '@/app/constants/colors';
// import { 
//   scheduleTestNotification, 
//   getNotificationStatus, 
//   initializeNotifications,
//   cancelAllNotifications 
// } from '@/utils/notificationUtils';

// export const DevControls: React.FC = () => {
//   const [isVisible, setIsVisible] = useState(false);
//   const [customDays, setCustomDays] = useState('');
//   const [testMinutes, setTestMinutes] = useState('1');
//   const [notificationStatus, setNotificationStatus] = useState<any>(null);
//   const { progress, setStreakDays, addDays, resetProgress } = useProgressStore();

//   const quickPresets = [1, 7, 30, 90, 180, 365];

//   // Загрузка статуса уведомлений
//   const loadNotificationStatus = async () => {
//     const status = await getNotificationStatus();
//     setNotificationStatus(status);
//   };

//   useEffect(() => {
//     if (isVisible) {
//       loadNotificationStatus();
//     }
//   }, [isVisible]);

//   const handleSetDays = () => {
//     const days = parseInt(customDays);
//     if (!isNaN(days) && days >= 0) {
//       setStreakDays(days);
//       setCustomDays('');
//     }
//   };

//   // Функции для управления уведомлениями
//   const handleInitializeNotifications = async () => {
//     const success = await initializeNotifications();
//     if (success) {
//       alert('✅ Notifications initialized successfully!');
//       loadNotificationStatus();
//     } else {
//       alert('❌ Failed to initialize notifications. Please check permissions.');
//     }
//   };

//   const handleTestNotification = async () => {
//     const minutes = parseInt(testMinutes) || 1;
//     await scheduleTestNotification(minutes);
//     alert(`⏰ Test notification scheduled for ${minutes} minute(s) from now!`);
//   };

//   const handleCancelNotifications = async () => {
//     await cancelAllNotifications();
//     alert('🔕 All notifications cancelled!');
//     loadNotificationStatus();
//   };

//   const getStageInfo = () => {
//     const stages = [
//       { min: 0, max: 6, stage: 'seed', emoji: '🌱' },
//       { min: 7, max: 29, stage: 'sprout', emoji: '🪴' },
//       { min: 30, max: 89, stage: 'young', emoji: '🌿' },
//       { min: 90, max: 179, stage: 'mature', emoji: '🌳' },
//       { min: 180, max: 364, stage: 'flowering', emoji: '🌸' },
//       { min: 365, max: Infinity, stage: 'fruitful', emoji: '🌲' }
//     ];

//     return stages.map(stage => ({
//       ...stage,
//       isCurrent: progress.currentStreak >= stage.min && progress.currentStreak <= stage.max
//     }));
//   };

//   if (!isVisible) {
//     return (
//       <TouchableOpacity 
//         style={styles.devButton}
//         onPress={() => setIsVisible(true)}
//       >
//         <Text style={styles.devButtonText}>🧪 Dev</Text>
//       </TouchableOpacity>
//     );
//   }

//   return (
//     <View style={styles.devPanel}>
//       <View style={styles.devHeader}>
//         <Text style={styles.devTitle}>Developer Controls</Text>
//         <TouchableOpacity onPress={() => setIsVisible(false)}>
//           <Text style={styles.closeButton}>✕</Text>
//         </TouchableOpacity>
//       </View>

//       <ScrollView style={styles.devContent}>
//         {/* Текущий прогресс */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Current: {progress.currentStreak} days</Text>
//           <Text style={styles.stageText}>Stage: {progress.treeStage}</Text>
//           <Text style={styles.stageText}>Longest: {progress.longestStreak} days</Text>
//           <Text style={styles.stageText}>Total: {progress.totalDays} days</Text>
//         </View>

//         {/* Управление уведомлениями */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>🔔 Notification Controls</Text>
          
//           {notificationStatus && (
//             <View style={styles.notificationStatus}>
//               <Text style={styles.statusText}>
//                 Permissions: {notificationStatus.granted ? '✅ Granted' : '❌ Denied'}
//               </Text>
//               <Text style={styles.statusText}>
//                 Scheduled: {notificationStatus.scheduledCount} notifications
//               </Text>
//             </View>
//           )}
          
//           <TouchableOpacity 
//             style={styles.notificationButton} 
//             onPress={handleInitializeNotifications}
//           >
//             <Text style={styles.notificationButtonText}>Initialize Notifications</Text>
//           </TouchableOpacity>

//           <View style={styles.testNotification}>
//             <Text style={styles.testLabel}>Test Notification in (minutes):</Text>
//             <View style={styles.testInputRow}>
//               <TouchableOpacity 
//                 style={styles.smallAdjustButton}
//                 onPress={() => setTestMinutes(String(Math.max(1, parseInt(testMinutes || '1') - 1)))}
//               >
//                 <Text style={styles.adjustText}>-</Text>
//               </TouchableOpacity>
              
//               <Text style={styles.minutesText}>{testMinutes}</Text>
              
//               <TouchableOpacity 
//                 style={styles.smallAdjustButton}
//                 onPress={() => setTestMinutes(String(parseInt(testMinutes || '1') + 1))}
//               >
//                 <Text style={styles.adjustText}>+</Text>
//               </TouchableOpacity>
//             </View>
            
//             <TouchableOpacity 
//               style={styles.testNotificationButton} 
//               onPress={handleTestNotification}
//             >
//               <Text style={styles.notificationButtonText}>Schedule Test Notification</Text>
//             </TouchableOpacity>
//           </View>

//           <TouchableOpacity 
//             style={styles.cancelNotificationButton} 
//             onPress={handleCancelNotifications}
//           >
//             <Text style={styles.notificationButtonText}>Cancel All Notifications</Text>
//           </TouchableOpacity>
//         </View>

//         {/* Быстрые пресеты */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Quick Presets</Text>
//           <View style={styles.presetContainer}>
//             {quickPresets.map(days => (
//               <TouchableOpacity
//                 key={days}
//                 style={[
//                   styles.presetButton,
//                   progress.currentStreak === days && styles.activePreset
//                 ]}
//                 onPress={() => setStreakDays(days)}
//               >
//                 <Text style={styles.presetText}>{days}d</Text>
//               </TouchableOpacity>
//             ))}
//           </View>
//         </View>

//         {/* Добавить/убавить дни */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Adjust Days</Text>
//           <View style={styles.adjustContainer}>
//             <TouchableOpacity 
//               style={styles.adjustButton}
//               onPress={() => addDays(-1)}
//             >
//               <Text style={styles.adjustText}>-1</Text>
//             </TouchableOpacity>
//             <TouchableOpacity 
//               style={styles.adjustButton}
//               onPress={() => addDays(1)}
//             >
//               <Text style={styles.adjustText}>+1</Text>
//             </TouchableOpacity>
//             <TouchableOpacity 
//               style={styles.adjustButton}
//               onPress={() => addDays(7)}
//             >
//               <Text style={styles.adjustText}>+7</Text>
//             </TouchableOpacity>
//             <TouchableOpacity 
//               style={styles.adjustButton}
//               onPress={() => addDays(30)}
//             >
//               <Text style={styles.adjustText}>+30</Text>
//             </TouchableOpacity>
//           </View>
//         </View>

//         {/* Кастомные дни */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Custom Days</Text>
//           <View style={styles.customContainer}>
//             <TextInput
//               style={styles.input}
//               value={customDays}
//               onChangeText={setCustomDays}
//               placeholder="Enter days"
//               keyboardType="numeric"
//               placeholderTextColor="#666"
//             />
//             <TouchableOpacity 
//               style={styles.setButton}
//               onPress={handleSetDays}
//             >
//               <Text style={styles.setButtonText}>Set</Text>
//             </TouchableOpacity>
//           </View>
//         </View>

//         {/* Сброс */}
//         <TouchableOpacity 
//           style={styles.resetButton}
//           onPress={resetProgress}
//         >
//           <Text style={styles.resetButtonText}>Reset to 0</Text>
//         </TouchableOpacity>

//         {/* Информация о стадиях */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Tree Stages</Text>
//           {getStageInfo().map(stage => (
//             <View 
//               key={stage.stage} 
//               style={[
//                 styles.stageRow,
//                 stage.isCurrent && styles.currentStage
//               ]}
//             >
//               <Text style={styles.stageEmoji}>{stage.emoji}</Text>
//               <Text style={styles.stageName}>
//                 {stage.stage} ({stage.min}-{stage.max === Infinity ? '∞' : stage.max} days)
//               </Text>
//               {stage.isCurrent && <Text style={styles.currentBadge}>Current</Text>}
//             </View>
//           ))}
//         </View>
//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   devButton: {
//     position: 'absolute',
//     top: 50,
//     right: 20,
//     backgroundColor: '#666',
//     padding: 8,
//     borderRadius: 20,
//     zIndex: 1000,
//   },
//   devButtonText: {
//     color: '#FFF',
//     fontSize: 12,
//     fontWeight: 'bold',
//   },
//   devPanel: {
//     position: 'absolute',
//     top: 80,
//     right: 20,
//     backgroundColor: '#1E1E1E',
//     borderRadius: 12,
//     padding: 15,
//     width: 300,
//     maxHeight: 500,
//     borderWidth: 1,
//     borderColor: '#333',
//     zIndex: 1000,
//   },
//   devHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 15,
//   },
//   devTitle: {
//     color: colors.dark.text,
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   closeButton: {
//     color: '#666',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   devContent: {
//     maxHeight: 400,
//   },
//   section: {
//     marginBottom: 15,
//   },
//   sectionTitle: {
//     color: colors.dark.text,
//     fontSize: 14,
//     fontWeight: '600',
//     marginBottom: 8,
//   },
//   stageText: {
//     color: '#888',
//     fontSize: 12,
//   },
//   // Стили для уведомлений
//   notificationStatus: {
//     backgroundColor: '#333',
//     padding: 8,
//     borderRadius: 6,
//     marginBottom: 10,
//   },
//   statusText: {
//     color: '#CCC',
//     fontSize: 11,
//     marginBottom: 2,
//   },
//   notificationButton: {
//     backgroundColor: '#4CAF50',
//     padding: 10,
//     borderRadius: 6,
//     alignItems: 'center',
//     marginBottom: 8,
//   },
//   testNotificationButton: {
//     backgroundColor: '#2196F3',
//     padding: 10,
//     borderRadius: 6,
//     alignItems: 'center',
//     marginBottom: 8,
//   },
//   cancelNotificationButton: {
//     backgroundColor: '#f44336',
//     padding: 10,
//     borderRadius: 6,
//     alignItems: 'center',
//     marginBottom: 8,
//   },
//   notificationButtonText: {
//     color: '#FFF',
//     fontSize: 12,
//     fontWeight: '500',
//   },
//   testNotification: {
//     marginBottom: 8,
//   },
//   testLabel: {
//     color: '#CCC',
//     fontSize: 12,
//     marginBottom: 6,
//   },
//   testInputRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     marginBottom: 8,
//     backgroundColor: '#333',
//     borderRadius: 6,
//     padding: 8,
//   },
//   smallAdjustButton: {
//     backgroundColor: '#555',
//     padding: 6,
//     borderRadius: 4,
//     minWidth: 30,
//     alignItems: 'center',
//   },
//   minutesText: {
//     color: '#FFF',
//     fontSize: 14,
//     fontWeight: 'bold',
//     marginHorizontal: 10,
//   },
//   // Существующие стили
//   presetContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     gap: 8,
//   },
//   presetButton: {
//     backgroundColor: '#333',
//     padding: 8,
//     borderRadius: 8,
//     minWidth: 40,
//     alignItems: 'center',
//   },
//   activePreset: {
//     backgroundColor: colors.dark.primary,
//   },
//   presetText: {
//     color: '#FFF',
//     fontSize: 12,
//     fontWeight: '500',
//   },
//   adjustContainer: {
//     flexDirection: 'row',
//     gap: 8,
//   },
//   adjustButton: {
//     backgroundColor: '#333',
//     padding: 8,
//     borderRadius: 8,
//     flex: 1,
//     alignItems: 'center',
//   },
//   adjustText: {
//     color: '#FFF',
//     fontSize: 12,
//     fontWeight: '500',
//   },
//   customContainer: {
//     flexDirection: 'row',
//     gap: 8,
//   },
//   input: {
//     flex: 1,
//     backgroundColor: '#333',
//     color: '#FFF',
//     padding: 8,
//     borderRadius: 8,
//     fontSize: 12,
//   },
//   setButton: {
//     backgroundColor: colors.dark.primary,
//     padding: 8,
//     borderRadius: 8,
//     minWidth: 40,
//     alignItems: 'center',
//   },
//   setButtonText: {
//     color: '#FFF',
//     fontSize: 12,
//     fontWeight: '500',
//   },
//   resetButton: {
//     backgroundColor: '#FF4444',
//     padding: 12,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginBottom: 15,
//   },
//   resetButtonText: {
//     color: '#FFF',
//     fontSize: 14,
//     fontWeight: '600',
//   },
//   stageRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 6,
//     borderRadius: 6,
//     marginBottom: 4,
//   },
//   currentStage: {
//     backgroundColor: 'rgba(76, 175, 80, 0.2)',
//   },
//   stageEmoji: {
//     fontSize: 16,
//     marginRight: 8,
//   },
//   stageName: {
//     color: '#CCC',
//     fontSize: 12,
//     flex: 1,
//   },
//   currentBadge: {
//     color: colors.dark.primary,
//     fontSize: 10,
//     fontWeight: 'bold',
//     backgroundColor: 'rgba(76, 175, 80, 0.3)',
//     paddingHorizontal: 6,
//     paddingVertical: 2,
//     borderRadius: 4,
//   },
// });

// import React, { useState, useEffect } from 'react';
// import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView } from 'react-native';
// import { useProgressStore } from '../store/progressStore';
// import { colors } from '@/app/constants/colors';
// import { 
//   scheduleTestNotification, 
//   getNotificationStatus, 
//   initializeNotifications,
//   cancelAllNotifications,
//   updateNotificationsBasedOnProgress
// } from '@/utils/notificationUtils';

// export const DevControls: React.FC = () => {
//   const [isVisible, setIsVisible] = useState(false);
//   const [customDays, setCustomDays] = useState('');
//   const [testMinutes, setTestMinutes] = useState('1');
//   const [notificationStatus, setNotificationStatus] = useState<any>(null);
//   const { progress, setStreakDays, addDays, resetProgress } = useProgressStore();

//   const quickPresets = [1, 7, 30, 90, 180, 365];

//   // Загрузка статуса уведомлений
//   const loadNotificationStatus = async () => {
//     const status = await getNotificationStatus();
//     setNotificationStatus(status);
//   };

//   useEffect(() => {
//     if (isVisible) {
//       loadNotificationStatus();
//     }
//   }, [isVisible]);

//   const handleSetDays = () => {
//     const days = parseInt(customDays);
//     if (!isNaN(days) && days >= 0) {
//       setStreakDays(days);
//       setCustomDays('');
//     }
//   };

//   // Функции для управления уведомлениями
//   const handleInitializeNotifications = async () => {
//     const hasMarkedToday = progress.currentStreak > 0 && 
//       progress.lastCheckDate === new Date().toISOString().split('T')[0];
    
//     const success = await initializeNotifications(hasMarkedToday);
//     if (success) {
//       alert(`✅ Notifications initialized in ${hasMarkedToday ? 'PRAISE' : 'REMINDER'} mode!`);
//       loadNotificationStatus();
//     } else {
//       alert('❌ Failed to initialize notifications. Please check permissions.');
//     }
//   };

//   const handleTestReminderNotification = async () => {
//     const minutes = parseInt(testMinutes) || 1;
//     await scheduleTestNotification(minutes, 'reminder');
//     alert(`⏰ Test REMINDER notification scheduled for ${minutes} minute(s) from now!`);
//   };

//   const handleTestPraiseNotification = async () => {
//     const minutes = parseInt(testMinutes) || 1;
//     await scheduleTestNotification(minutes, 'praise');
//     alert(`🎉 Test PRAISE notification scheduled for ${minutes} minute(s) from now!`);
//   };

//   const handleUpdateNotifications = async () => {
//     // Симулируем разные состояния для тестирования
//     const hasMarkedToday = Math.random() > 0.5; // 50/50 шанс
//     await updateNotificationsBasedOnProgress(hasMarkedToday);
//     alert(`🔄 Notifications updated for: ${hasMarkedToday ? 'PRAISE (marked today)' : 'REMINDER (not marked)'}`);
//     loadNotificationStatus();
//   };

//   const handleCancelNotifications = async () => {
//     await cancelAllNotifications();
//     alert('🔕 All notifications cancelled!');
//     loadNotificationStatus();
//   };

//   const getStageInfo = () => {
//     const stages = [
//       { min: 0, max: 6, stage: 'seed', emoji: '🌱' },
//       { min: 7, max: 29, stage: 'sprout', emoji: '🪴' },
//       { min: 30, max: 89, stage: 'young', emoji: '🌿' },
//       { min: 90, max: 179, stage: 'mature', emoji: '🌳' },
//       { min: 180, max: 364, stage: 'flowering', emoji: '🌸' },
//       { min: 365, max: Infinity, stage: 'fruitful', emoji: '🌲' }
//     ];

//     return stages.map(stage => ({
//       ...stage,
//       isCurrent: progress.currentStreak >= stage.min && progress.currentStreak <= stage.max
//     }));
//   };

//   if (!isVisible) {
//     return (
//       <TouchableOpacity 
//         style={styles.devButton}
//         onPress={() => setIsVisible(true)}
//       >
//         <Text style={styles.devButtonText}>🧪 Dev</Text>
//       </TouchableOpacity>
//     );
//   }

//   return (
//     <View style={styles.devPanel}>
//       <View style={styles.devHeader}>
//         <Text style={styles.devTitle}>Developer Controls</Text>
//         <TouchableOpacity onPress={() => setIsVisible(false)}>
//           <Text style={styles.closeButton}>✕</Text>
//         </TouchableOpacity>
//       </View>

//       <ScrollView style={styles.devContent}>
//         {/* Текущий прогресс */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Current: {progress.currentStreak} days</Text>
//           <Text style={styles.stageText}>Stage: {progress.treeStage}</Text>
//           <Text style={styles.stageText}>Longest: {progress.longestStreak} days</Text>
//           <Text style={styles.stageText}>Total: {progress.totalDays} days</Text>
//           <Text style={styles.stageText}>
//             Marked Today: {progress.lastCheckDate === new Date().toISOString().split('T')[0] ? '✅' : '❌'}
//           </Text>
//         </View>

//         {/* Управление уведомлениями */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>🔔 Smart Notifications</Text>
          
//           {notificationStatus && (
//             <View style={styles.notificationStatus}>
//               <Text style={styles.statusText}>
//                 Permissions: {notificationStatus.granted ? '✅ Granted' : '❌ Denied'}
//               </Text>
//               <Text style={styles.statusText}>
//                 Scheduled: {notificationStatus.scheduledCount} notifications
//               </Text>
//               <Text style={styles.statusText}>
//                 Current Mode: {progress.lastCheckDate === new Date().toISOString().split('T')[0] ? '🎉 PRAISE' : '⏰ REMINDER'}
//               </Text>
//             </View>
//           )}
          
//           <TouchableOpacity 
//             style={styles.notificationButton} 
//             onPress={handleInitializeNotifications}
//           >
//             <Text style={styles.notificationButtonText}>Initialize Notifications</Text>
//           </TouchableOpacity>

//           <View style={styles.testNotification}>
//             <Text style={styles.testLabel}>Test Notification in (minutes):</Text>
//             <View style={styles.testInputRow}>
//               <TouchableOpacity 
//                 style={styles.smallAdjustButton}
//                 onPress={() => setTestMinutes(String(Math.max(1, parseInt(testMinutes || '1') - 1)))}
//               >
//                 <Text style={styles.adjustText}>-</Text>
//               </TouchableOpacity>
              
//               <Text style={styles.minutesText}>{testMinutes}</Text>
              
//               <TouchableOpacity 
//                 style={styles.smallAdjustButton}
//                 onPress={() => setTestMinutes(String(parseInt(testMinutes || '1') + 1))}
//               >
//                 <Text style={styles.adjustText}>+</Text>
//               </TouchableOpacity>
//             </View>
            
//             <View style={styles.testButtonsRow}>
//               <TouchableOpacity 
//                 style={[styles.testTypeButton, {backgroundColor: '#2196F3'}]} 
//                 onPress={handleTestReminderNotification}
//               >
//                 <Text style={styles.notificationButtonText}>Test Reminder</Text>
//               </TouchableOpacity>
              
//               <TouchableOpacity 
//                 style={[styles.testTypeButton, {backgroundColor: '#9C27B0'}]} 
//                 onPress={handleTestPraiseNotification}
//               >
//                 <Text style={styles.notificationButtonText}>Test Praise</Text>
//               </TouchableOpacity>
//             </View>
//           </View>

//           <TouchableOpacity 
//             style={[styles.updateNotificationButton, {backgroundColor: '#FF9800'}]} 
//             onPress={handleUpdateNotifications}
//           >
//             <Text style={styles.notificationButtonText}>Simulate Mode Change</Text>
//           </TouchableOpacity>

//           <TouchableOpacity 
//             style={styles.cancelNotificationButton} 
//             onPress={handleCancelNotifications}
//           >
//             <Text style={styles.notificationButtonText}>Cancel All Notifications</Text>
//           </TouchableOpacity>
//         </View>

//         {/* Быстрые пресеты */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Quick Presets</Text>
//           <View style={styles.presetContainer}>
//             {quickPresets.map(days => (
//               <TouchableOpacity
//                 key={days}
//                 style={[
//                   styles.presetButton,
//                   progress.currentStreak === days && styles.activePreset
//                 ]}
//                 onPress={() => setStreakDays(days)}
//               >
//                 <Text style={styles.presetText}>{days}d</Text>
//               </TouchableOpacity>
//             ))}
//           </View>
//         </View>

//         {/* Добавить/убавить дни */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Adjust Days</Text>
//           <View style={styles.adjustContainer}>
//             <TouchableOpacity 
//               style={styles.adjustButton}
//               onPress={() => addDays(-1)}
//             >
//               <Text style={styles.adjustText}>-1</Text>
//             </TouchableOpacity>
//             <TouchableOpacity 
//               style={styles.adjustButton}
//               onPress={() => addDays(1)}
//             >
//               <Text style={styles.adjustText}>+1</Text>
//             </TouchableOpacity>
//             <TouchableOpacity 
//               style={styles.adjustButton}
//               onPress={() => addDays(7)}
//             >
//               <Text style={styles.adjustText}>+7</Text>
//             </TouchableOpacity>
//             <TouchableOpacity 
//               style={styles.adjustButton}
//               onPress={() => addDays(30)}
//             >
//               <Text style={styles.adjustText}>+30</Text>
//             </TouchableOpacity>
//           </View>
//         </View>

//         {/* Кастомные дни */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Custom Days</Text>
//           <View style={styles.customContainer}>
//             <TextInput
//               style={styles.input}
//               value={customDays}
//               onChangeText={setCustomDays}
//               placeholder="Enter days"
//               keyboardType="numeric"
//               placeholderTextColor="#666"
//             />
//             <TouchableOpacity 
//               style={styles.setButton}
//               onPress={handleSetDays}
//             >
//               <Text style={styles.setButtonText}>Set</Text>
//             </TouchableOpacity>
//           </View>
//         </View>

//         {/* Сброс */}
//         <TouchableOpacity 
//           style={styles.resetButton}
//           onPress={resetProgress}
//         >
//           <Text style={styles.resetButtonText}>Reset to 0</Text>
//         </TouchableOpacity>

//         {/* Информация о стадиях */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Tree Stages</Text>
//           {getStageInfo().map(stage => (
//             <View 
//               key={stage.stage} 
//               style={[
//                 styles.stageRow,
//                 stage.isCurrent && styles.currentStage
//               ]}
//             >
//               <Text style={styles.stageEmoji}>{stage.emoji}</Text>
//               <Text style={styles.stageName}>
//                 {stage.stage} ({stage.min}-{stage.max === Infinity ? '∞' : stage.max} days)
//               </Text>
//               {stage.isCurrent && <Text style={styles.currentBadge}>Current</Text>}
//             </View>
//           ))}
//         </View>
//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   devButton: {
//     position: 'absolute',
//     top: 50,
//     right: 20,
//     backgroundColor: '#666',
//     padding: 8,
//     borderRadius: 20,
//     zIndex: 1000,
//   },
//   devButtonText: {
//     color: '#FFF',
//     fontSize: 12,
//     fontWeight: 'bold',
//   },
//   devPanel: {
//     position: 'absolute',
//     top: 80,
//     right: 20,
//     backgroundColor: '#1E1E1E',
//     borderRadius: 12,
//     padding: 15,
//     width: 320,
//     maxHeight: 500,
//     borderWidth: 1,
//     borderColor: '#333',
//     zIndex: 1000,
//   },
//   devHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 15,
//   },
//   devTitle: {
//     color: colors.dark.text,
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   closeButton: {
//     color: '#666',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   devContent: {
//     maxHeight: 400,
//   },
//   section: {
//     marginBottom: 15,
//   },
//   sectionTitle: {
//     color: colors.dark.text,
//     fontSize: 14,
//     fontWeight: '600',
//     marginBottom: 8,
//   },
//   stageText: {
//     color: '#888',
//     fontSize: 12,
//   },
//   // Стили для уведомлений
//   notificationStatus: {
//     backgroundColor: '#333',
//     padding: 8,
//     borderRadius: 6,
//     marginBottom: 10,
//   },
//   statusText: {
//     color: '#CCC',
//     fontSize: 11,
//     marginBottom: 2,
//   },
//   notificationButton: {
//     backgroundColor: '#4CAF50',
//     padding: 10,
//     borderRadius: 6,
//     alignItems: 'center',
//     marginBottom: 8,
//   },
//   updateNotificationButton: {
//     padding: 10,
//     borderRadius: 6,
//     alignItems: 'center',
//     marginBottom: 8,
//   },
//   cancelNotificationButton: {
//     backgroundColor: '#f44336',
//     padding: 10,
//     borderRadius: 6,
//     alignItems: 'center',
//     marginBottom: 8,
//   },
//   notificationButtonText: {
//     color: '#FFF',
//     fontSize: 12,
//     fontWeight: '500',
//   },
//   testNotification: {
//     marginBottom: 8,
//   },
//   testLabel: {
//     color: '#CCC',
//     fontSize: 12,
//     marginBottom: 6,
//   },
//   testInputRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     marginBottom: 8,
//     backgroundColor: '#333',
//     borderRadius: 6,
//     padding: 8,
//   },
//   testButtonsRow: {
//     flexDirection: 'row',
//     gap: 8,
//     marginBottom: 8,
//   },
//   testTypeButton: {
//     flex: 1,
//     padding: 10,
//     borderRadius: 6,
//     alignItems: 'center',
//   },
//   smallAdjustButton: {
//     backgroundColor: '#555',
//     padding: 6,
//     borderRadius: 4,
//     minWidth: 30,
//     alignItems: 'center',
//   },
//   minutesText: {
//     color: '#FFF',
//     fontSize: 14,
//     fontWeight: 'bold',
//     marginHorizontal: 10,
//   },
//   // Существующие стили
//   presetContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     gap: 8,
//   },
//   presetButton: {
//     backgroundColor: '#333',
//     padding: 8,
//     borderRadius: 8,
//     minWidth: 40,
//     alignItems: 'center',
//   },
//   activePreset: {
//     backgroundColor: colors.dark.primary,
//   },
//   presetText: {
//     color: '#FFF',
//     fontSize: 12,
//     fontWeight: '500',
//   },
//   adjustContainer: {
//     flexDirection: 'row',
//     gap: 8,
//   },
//   adjustButton: {
//     backgroundColor: '#333',
//     padding: 8,
//     borderRadius: 8,
//     flex: 1,
//     alignItems: 'center',
//   },
//   adjustText: {
//     color: '#FFF',
//     fontSize: 12,
//     fontWeight: '500',
//   },
//   customContainer: {
//     flexDirection: 'row',
//     gap: 8,
//   },
//   input: {
//     flex: 1,
//     backgroundColor: '#333',
//     color: '#FFF',
//     padding: 8,
//     borderRadius: 8,
//     fontSize: 12,
//   },
//   setButton: {
//     backgroundColor: colors.dark.primary,
//     padding: 8,
//     borderRadius: 8,
//     minWidth: 40,
//     alignItems: 'center',
//   },
//   setButtonText: {
//     color: '#FFF',
//     fontSize: 12,
//     fontWeight: '500',
//   },
//   resetButton: {
//     backgroundColor: '#FF4444',
//     padding: 12,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginBottom: 15,
//   },
//   resetButtonText: {
//     color: '#FFF',
//     fontSize: 14,
//     fontWeight: '600',
//   },
//   stageRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 6,
//     borderRadius: 6,
//     marginBottom: 4,
//   },
//   currentStage: {
//     backgroundColor: 'rgba(76, 175, 80, 0.2)',
//   },
//   stageEmoji: {
//     fontSize: 16,
//     marginRight: 8,
//   },
//   stageName: {
//     color: '#CCC',
//     fontSize: 12,
//     flex: 1,
//   },
//   currentBadge: {
//     color: colors.dark.primary,
//     fontSize: 10,
//     fontWeight: 'bold',
//     backgroundColor: 'rgba(76, 175, 80, 0.3)',
//     paddingHorizontal: 6,
//     paddingVertical: 2,
//     borderRadius: 4,
//   },
// });


import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView } from 'react-native';
import { useProgressStore } from '../store/progressStore';
import { colors } from '@/app/constants/colors';
import { 
  scheduleTestNotification, 
  getNotificationStatus, 
  initializeNotifications,
  cancelAllNotifications,
  updateNotificationsBasedOnProgress
} from '@/utils/notificationUtils';
import { IS_DEV } from '@/app/constants/config';

interface DevControlsProps {
  onClose?: () => void;
}

export const DevControls: React.FC<DevControlsProps> = ({ onClose }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [customDays, setCustomDays] = useState('');
  const [testMinutes, setTestMinutes] = useState('1');
  const [notificationStatus, setNotificationStatus] = useState<any>(null);
  const { progress, setStreakDays, addDays, resetProgress } = useProgressStore();

  const quickPresets = [1, 7, 30, 90, 180, 365];

  // Загрузка статуса уведомлений
  const loadNotificationStatus = async () => {
    const status = await getNotificationStatus();
    setNotificationStatus(status);
  };

  useEffect(() => {
    loadNotificationStatus();
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    onClose?.(); // Вызываем переданную функцию закрытия
  };

  const handleSetDays = () => {
    const days = parseInt(customDays);
    if (!isNaN(days) && days >= 0) {
      setStreakDays(days);
      setCustomDays('');
    }
  };

  // Функции для управления уведомлениями
  const handleInitializeNotifications = async () => {
    const hasMarkedToday = progress.currentStreak > 0 && 
      progress.lastCheckDate === new Date().toISOString().split('T')[0];
    
    const success = await initializeNotifications(hasMarkedToday);
    if (success) {
      alert(`✅ Notifications initialized in ${hasMarkedToday ? 'PRAISE' : 'REMINDER'} mode!`);
      loadNotificationStatus();
    } else {
      alert('❌ Failed to initialize notifications. Please check permissions.');
    }
  };

  const handleTestReminderNotification = async () => {
    const minutes = parseInt(testMinutes) || 1;
    await scheduleTestNotification(minutes, 'reminder');
    alert(`⏰ Test REMINDER notification scheduled for ${minutes} minute(s) from now!`);
  };

  const handleTestPraiseNotification = async () => {
    const minutes = parseInt(testMinutes) || 1;
    await scheduleTestNotification(minutes, 'praise');
    alert(`🎉 Test PRAISE notification scheduled for ${minutes} minute(s) from now!`);
  };

  const handleUpdateNotifications = async () => {
    // Симулируем разные состояния для тестирования
    const hasMarkedToday = Math.random() > 0.5; // 50/50 шанс
    await updateNotificationsBasedOnProgress(hasMarkedToday);
    alert(`🔄 Notifications updated for: ${hasMarkedToday ? 'PRAISE (marked today)' : 'REMINDER (not marked)'}`);
    loadNotificationStatus();
  };

  const handleCancelNotifications = async () => {
    await cancelAllNotifications();
    alert('🔕 All notifications cancelled!');
    loadNotificationStatus();
  };

  const getStageInfo = () => {
    const stages = [
      { min: 0, max: 6, stage: 'seed', emoji: '🌱' },
      { min: 7, max: 29, stage: 'sprout', emoji: '🪴' },
      { min: 30, max: 89, stage: 'young', emoji: '🌿' },
      { min: 90, max: 179, stage: 'mature', emoji: '🌳' },
      { min: 180, max: 364, stage: 'flowering', emoji: '🌸' },
      { min: 365, max: Infinity, stage: 'fruitful', emoji: '🌲' }
    ];

    return stages.map(stage => ({
      ...stage,
      isCurrent: progress.currentStreak >= stage.min && progress.currentStreak <= stage.max
    }));
  };

  if (!isVisible) {
    return null;
  }

  return (
    <View style={styles.devPanel}>
      <View style={styles.devHeader}>
        <Text style={styles.devTitle}>
          🧪 Dev Controls {IS_DEV ? '(Dev Mode)' : '(Secret)'}
        </Text>
        <View style={styles.headerButtons}>
          <TouchableOpacity onPress={handleClose}>
            <Text style={styles.closeButton}>👋 Close</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleClose}>
            <Text style={styles.closeButton}>✕</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.devContent}>
        {/* Текущий прогресс */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Current: {progress.currentStreak} days</Text>
          <Text style={styles.stageText}>Stage: {progress.treeStage}</Text>
          <Text style={styles.stageText}>Longest: {progress.longestStreak} days</Text>
          <Text style={styles.stageText}>Total: {progress.totalDays} days</Text>
          <Text style={styles.stageText}>
            Marked Today: {progress.lastCheckDate === new Date().toISOString().split('T')[0] ? '✅' : '❌'}
          </Text>
        </View>

        {/* Управление уведомлениями */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🔔 Smart Notifications</Text>
          
          {notificationStatus && (
            <View style={styles.notificationStatus}>
              <Text style={styles.statusText}>
                Permissions: {notificationStatus.granted ? '✅ Granted' : '❌ Denied'}
              </Text>
              <Text style={styles.statusText}>
                Scheduled: {notificationStatus.scheduledCount} notifications
              </Text>
              <Text style={styles.statusText}>
                Current Mode: {progress.lastCheckDate === new Date().toISOString().split('T')[0] ? '🎉 PRAISE' : '⏰ REMINDER'}
              </Text>
            </View>
          )}
          
          <TouchableOpacity 
            style={styles.notificationButton} 
            onPress={handleInitializeNotifications}
          >
            <Text style={styles.notificationButtonText}>Initialize Notifications</Text>
          </TouchableOpacity>

          <View style={styles.testNotification}>
            <Text style={styles.testLabel}>Test Notification in (minutes):</Text>
            <View style={styles.testInputRow}>
              <TouchableOpacity 
                style={styles.smallAdjustButton}
                onPress={() => setTestMinutes(String(Math.max(1, parseInt(testMinutes || '1') - 1)))}
              >
                <Text style={styles.adjustText}>-</Text>
              </TouchableOpacity>
              
              <Text style={styles.minutesText}>{testMinutes}</Text>
              
              <TouchableOpacity 
                style={styles.smallAdjustButton}
                onPress={() => setTestMinutes(String(parseInt(testMinutes || '1') + 1))}
              >
                <Text style={styles.adjustText}>+</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.testButtonsRow}>
              <TouchableOpacity 
                style={[styles.testTypeButton, {backgroundColor: '#2196F3'}]} 
                onPress={handleTestReminderNotification}
              >
                <Text style={styles.notificationButtonText}>Test Reminder</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.testTypeButton, {backgroundColor: '#9C27B0'}]} 
                onPress={handleTestPraiseNotification}
              >
                <Text style={styles.notificationButtonText}>Test Praise</Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity 
            style={[styles.updateNotificationButton, {backgroundColor: '#FF9800'}]} 
            onPress={handleUpdateNotifications}
          >
            <Text style={styles.notificationButtonText}>Simulate Mode Change</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.cancelNotificationButton} 
            onPress={handleCancelNotifications}
          >
            <Text style={styles.notificationButtonText}>Cancel All Notifications</Text>
          </TouchableOpacity>
        </View>

        {/* Быстрые пресеты */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Presets</Text>
          <View style={styles.presetContainer}>
            {quickPresets.map(days => (
              <TouchableOpacity
                key={days}
                style={[
                  styles.presetButton,
                  progress.currentStreak === days && styles.activePreset
                ]}
                onPress={() => setStreakDays(days)}
              >
                <Text style={styles.presetText}>{days}d</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Добавить/убавить дни */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Adjust Days</Text>
          <View style={styles.adjustContainer}>
            <TouchableOpacity 
              style={styles.adjustButton}
              onPress={() => addDays(-1)}
            >
              <Text style={styles.adjustText}>-1</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.adjustButton}
              onPress={() => addDays(1)}
            >
              <Text style={styles.adjustText}>+1</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.adjustButton}
              onPress={() => addDays(7)}
            >
              <Text style={styles.adjustText}>+7</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.adjustButton}
              onPress={() => addDays(30)}
            >
              <Text style={styles.adjustText}>+30</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Кастомные дни */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Custom Days</Text>
          <View style={styles.customContainer}>
            <TextInput
              style={styles.input}
              value={customDays}
              onChangeText={setCustomDays}
              placeholder="Enter days"
              keyboardType="numeric"
              placeholderTextColor="#666"
            />
            <TouchableOpacity 
              style={styles.setButton}
              onPress={handleSetDays}
            >
              <Text style={styles.setButtonText}>Set</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Сброс */}
        <TouchableOpacity 
          style={styles.resetButton}
          onPress={resetProgress}
        >
          <Text style={styles.resetButtonText}>Reset to 0</Text>
        </TouchableOpacity>

        {/* Информация о стадиях */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tree Stages</Text>
          {getStageInfo().map(stage => (
            <View 
              key={stage.stage} 
              style={[
                styles.stageRow,
                stage.isCurrent && styles.currentStage
              ]}
            >
              <Text style={styles.stageEmoji}>{stage.emoji}</Text>
              <Text style={styles.stageName}>
                {stage.stage} ({stage.min}-{stage.max === Infinity ? '∞' : stage.max} days)
              </Text>
              {stage.isCurrent && <Text style={styles.currentBadge}>Current</Text>}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  devPanel: {
    position: 'absolute',
    top: 80,
    right: 20,
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 15,
    width: 320,
    maxHeight: 500,
    borderWidth: 1,
    borderColor: '#333',
    zIndex: 1000,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  devHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  devTitle: {
    color: colors.dark.text,
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
  headerButtons: {  
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  closeButton: {
    color: '#666',
    fontSize: 14,
    fontWeight: 'bold',
  },
  devContent: {
    maxHeight: 400,
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    color: colors.dark.text,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  stageText: {
    color: '#888',
    fontSize: 12,
  },
  // Стили для уведомлений
  notificationStatus: {
    backgroundColor: '#333',
    padding: 8,
    borderRadius: 6,
    marginBottom: 10,
  },
  statusText: {
    color: '#CCC',
    fontSize: 11,
    marginBottom: 2,
  },
  notificationButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 8,
  },
  updateNotificationButton: {
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 8,
  },
  cancelNotificationButton: {
    backgroundColor: '#f44336',
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 8,
  },
  notificationButtonText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '500',
  },
  testNotification: {
    marginBottom: 8,
  },
  testLabel: {
    color: '#CCC',
    fontSize: 12,
    marginBottom: 6,
  },
  testInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
    backgroundColor: '#333',
    borderRadius: 6,
    padding: 8,
  },
  testButtonsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  testTypeButton: {
    flex: 1,
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  smallAdjustButton: {
    backgroundColor: '#555',
    padding: 6,
    borderRadius: 4,
    minWidth: 30,
    alignItems: 'center',
  },
  minutesText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
  // Существующие стили
  presetContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  presetButton: {
    backgroundColor: '#333',
    padding: 8,
    borderRadius: 8,
    minWidth: 40,
    alignItems: 'center',
  },
  activePreset: {
    backgroundColor: colors.dark.primary,
  },
  presetText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '500',
  },
  adjustContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  adjustButton: {
    backgroundColor: '#333',
    padding: 8,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
  },
  adjustText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '500',
  },
  customContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  input: {
    flex: 1,
    backgroundColor: '#333',
    color: '#FFF',
    padding: 8,
    borderRadius: 8,
    fontSize: 12,
  },
  setButton: {
    backgroundColor: colors.dark.primary,
    padding: 8,
    borderRadius: 8,
    minWidth: 40,
    alignItems: 'center',
  },
  setButtonText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '500',
  },
  resetButton: {
    backgroundColor: '#FF4444',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  resetButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
  },
  stageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 6,
    borderRadius: 6,
    marginBottom: 4,
  },
  currentStage: {
    backgroundColor: 'rgba(76, 175, 80, 0.2)',
  },
  stageEmoji: {
    fontSize: 16,
    marginRight: 8,
  },
  stageName: {
    color: '#CCC',
    fontSize: 12,
    flex: 1,
  },
  currentBadge: {
    color: colors.dark.primary,
    fontSize: 10,
    fontWeight: 'bold',
    backgroundColor: 'rgba(76, 175, 80, 0.3)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
});