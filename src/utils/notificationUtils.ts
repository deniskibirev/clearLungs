// import * as Notifications from 'expo-notifications';

// // Конфигурация уведомлений
// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: true,
//     shouldSetBadge: true,
//     shouldShowBanner: true,
//     shouldShowList: true,
//   }),
// });

// // Константы
// const NOTIFICATION_CHANNEL_ID = 'smoking-reminders';

// // Типы для уведомлений
// export interface NotificationSchedule {
//   identifier: string;
//   title: string;
//   body: string;
//   hour: number;
//   minute: number;
// }

// // Расписание уведомлений (3 раза в день)
// export const DAILY_NOTIFICATIONS: NotificationSchedule[] = [
//   {
//     identifier: 'morning-reminder',
//     title: 'Time to check in! 🌱',
//     body: 'Don\'t forget to mark your smoke-free day! Your tree is growing!',
//     hour: 9,
//     minute: 0,
//   },
//   {
//     identifier: 'afternoon-reminder',
//     title: 'How is your day going? 🪴',
//     body: 'Remember to stay strong! Mark your progress in the app.',
//     hour: 15,
//     minute: 0,
//   },
//   {
//     identifier: 'evening-reminder',
//     title: 'Final check-in! 🌿',
//     body: 'Almost there! Mark today as another smoke-free day.',
//     hour: 21,
//     minute: 0,
//   },
// ];

// // Запрос разрешений
// export async function requestNotificationPermissions(): Promise<boolean> {
//   const settings = await Notifications.getPermissionsAsync();
//   if (!settings.granted) {
//     const { status } = await Notifications.requestPermissionsAsync();
//     return status === 'granted';
//   }
//   return true;
// }

// // Создание канала уведомлений (Android)
// export async function setupNotificationChannel() {
//   await Notifications.setNotificationChannelAsync(NOTIFICATION_CHANNEL_ID, {
//     name: 'Smoking Reminders',
//     importance: Notifications.AndroidImportance.HIGH,
//     sound: 'default',
//     vibrationPattern: [0, 250, 250, 250],
//     lightColor: '#FF231F7C',
//   });
// }

// // Универсальная функция для планирования уведомлений
// async function scheduleNotificationSafe(options: {
//   identifier?: string;
//   content: Notifications.NotificationContentInput;
//   trigger: any;
// }) {
//   try {
//     await Notifications.scheduleNotificationAsync(options);
//     return true;
//   } catch (error) {
//     console.error('Error scheduling notification:', error);
//     return false;
//   }
// }

// export async function scheduleDailyNotifications() {
//   await cancelAllNotifications();
  
//   for (const notification of DAILY_NOTIFICATIONS) {
//     await scheduleNotificationSafe({
//       identifier: notification.identifier,
//       content: {
//         title: notification.title,
//         body: notification.body,
//         sound: true,
//         badge: 1,
//       },
//       trigger: {
//         hour: notification.hour,
//         minute: notification.minute,
//         repeats: true,
//       },
//     });
//   }
// }

// export async function scheduleTestNotification(minutes: number) {
//   await scheduleNotificationSafe({
//     content: {
//       title: 'Test Reminder ⚡',
//       body: `This is a test notification scheduled for ${minutes} minute(s) from now!`,
//       sound: true,
//       badge: 1,
//     },
//     trigger: {
//       seconds: minutes * 60,
//       repeats: false,
//     },
//   });
// }

// // Отмена всех уведомлений
// export async function cancelAllNotifications() {
//   await Notifications.cancelAllScheduledNotificationsAsync();
// }

// // Получение статуса уведомлений
// export async function getNotificationStatus() {
//   const settings = await Notifications.getPermissionsAsync();
//   const scheduledNotifications = await Notifications.getAllScheduledNotificationsAsync();
  
//   return {
//     granted: settings.granted,
//     scheduledCount: scheduledNotifications.length,
//     scheduledNotifications,
//   };
// }

// // Инициализация системы уведомлений
// export async function initializeNotifications() {
//   try {
//     const granted = await requestNotificationPermissions();
    
//     if (granted) {
//       await setupNotificationChannel();
//       await scheduleDailyNotifications();
//       console.log('✅ Notifications initialized successfully');
//       return true;
//     } else {
//       console.log('❌ Notification permissions not granted');
//       return false;
//     }
//   } catch (error) {
//     console.error('❌ Error initializing notifications:', error);
//     return false;
//   }
// }


import * as Notifications from 'expo-notifications';
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';

// Конфигурация уведомлений
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

// Константы
const NOTIFICATION_CHANNEL_ID = 'smoking-reminders';
const BACKGROUND_TASK = 'CHECK_DAILY_PROGRESS';

// Типы для уведомлений
export interface NotificationSchedule {
  identifier: string;
  title: string;
  body: string;
  hour: number;
  minute: number;
  type: 'reminder' | 'praise';
}

// Расписание уведомлений (3 раза в день)
export const DAILY_NOTIFICATIONS: NotificationSchedule[] = [
  {
    identifier: 'morning-reminder',
    title: 'Time to check in! 🌱',
    body: 'Don\'t forget to mark your smoke-free day! Your tree is growing!',
    hour: 9,
    minute: 0,
    type: 'reminder'
  },
  {
    identifier: 'afternoon-reminder',
    title: 'How is your day going? 🪴',
    body: 'Remember to stay strong! Mark your progress in the app.',
    hour: 15,
    minute: 0,
    type: 'reminder'
  },
  {
    identifier: 'evening-reminder',
    title: 'Final check-in! 🌿',
    body: 'Almost there! Mark today as another smoke-free day.',
    hour: 21,
    minute: 0,
    type: 'reminder'
  },
];

// Уведомления с похвалой
export const PRAISE_NOTIFICATIONS: NotificationSchedule[] = [
  {
    identifier: 'morning-praise',
    title: 'Great start! 🌞',
    body: 'You\'ve already marked today as smoke-free! Keep up the amazing work!',
    hour: 10,
    minute: 0,
    type: 'praise'
  },
  {
    identifier: 'afternoon-praise',
    title: 'You\'re doing fantastic! 💪',
    body: 'Another smoke-free day recorded! Your future self thanks you!',
    hour: 16,
    minute: 0,
    type: 'praise'
  },
  {
    identifier: 'evening-praise',
    title: 'Congratulations! 🎉',
    body: 'You made it through another day without smoking! So proud of you!',
    hour: 22,
    minute: 0,
    type: 'praise'
  },
];

// Запрос разрешений
export async function requestNotificationPermissions(): Promise<boolean> {
  const settings = await Notifications.getPermissionsAsync();
  if (!settings.granted) {
    const { status } = await Notifications.requestPermissionsAsync();
    return status === 'granted';
  }
  return true;
}

// Создание канала уведомлений (Android)
export async function setupNotificationChannel() {
  await Notifications.setNotificationChannelAsync(NOTIFICATION_CHANNEL_ID, {
    name: 'Smoking Reminders',
    importance: Notifications.AndroidImportance.HIGH,
    sound: 'default',
    vibrationPattern: [0, 250, 250, 250],
    lightColor: '#FF231F7C',
  });
}

// Получение локального времени устройства
function getLocalTime(): { hour: number; minute: number } {
  const now = new Date();
  return {
    hour: now.getHours(),
    minute: now.getMinutes()
  };
}

// Проверка, нужно ли отправлять уведомление (учитывая отметку пользователя)
export async function shouldSendReminder(hasUserMarkedToday: boolean): Promise<boolean> {
  if (hasUserMarkedToday) {
    return false; // Не отправляем напоминания, если пользователь уже отметился
  }
  
  const localTime = getLocalTime();
  const currentTimeInMinutes = localTime.hour * 60 + localTime.minute;
  
  // Проверяем, не прошло ли уже время для утреннего/дневного напоминания
  for (const notification of DAILY_NOTIFICATIONS) {
    const notificationTimeInMinutes = notification.hour * 60 + notification.minute;
    if (currentTimeInMinutes >= notificationTimeInMinutes) {
      // Если время уведомления уже прошло, пропускаем его сегодня
      continue;
    }
    return true; // Есть предстоящие напоминания
  }
  
  return false; // Все напоминания на сегодня уже прошли
}

// Планирование уведомлений на основе статуса пользователя
export async function scheduleSmartNotifications(hasUserMarkedToday: boolean) {
  await cancelAllNotifications();
  
  const notificationsToSchedule = hasUserMarkedToday ? PRAISE_NOTIFICATIONS : DAILY_NOTIFICATIONS;
  
  for (const notification of notificationsToSchedule) {
    const now = new Date();
    const triggerTime = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      notification.hour,
      notification.minute,
      0
    );
    
    // Если время уже прошло сегодня, планируем на завтра
    if (triggerTime.getTime() <= now.getTime()) {
      triggerTime.setDate(triggerTime.getDate() + 1);
    }
    
    await scheduleNotificationSafe({
      identifier: notification.identifier,
      content: {
        title: notification.title,
        body: notification.body,
        sound: true,
        badge: 1,
        data: { type: notification.type }
      },
      trigger: {
        date: triggerTime.getTime(),
      },
    });
  }
}

// Универсальная функция для планирования уведомлений
async function scheduleNotificationSafe(options: {
  identifier?: string;
  content: Notifications.NotificationContentInput;
  trigger: any;
}) {
  try {
    await Notifications.scheduleNotificationAsync(options);
    console.log(`✅ Scheduled: ${options.identifier}`);
    return true;
  } catch (error) {
    console.error(`❌ Failed to schedule ${options.identifier}:`, error);
    return false;
  }
}

// // Отправка тестового уведомления через указанное время (для DevControls)
// export async function scheduleTestNotification(minutes: number, type: 'reminder' | 'praise' = 'reminder') {
//   const testNotifications = type === 'praise' ? PRAISE_NOTIFICATIONS : DAILY_NOTIFICATIONS;
//   const testNotification = testNotifications[0]; // Берем первое уведомление для теста
  
//   await scheduleNotificationSafe({
//     content: {
//       title: `[TEST] ${testNotification.title}`,
//       body: `[TEST] ${testNotification.body} (scheduled for ${minutes} minutes)`,
//       sound: true,
//       badge: 1,
//       data: { type: 'test', originalType: type }
//     },
//     trigger: {
//       seconds: minutes * 60,
//     },
//   });
// }

// Отправка тестового уведомления через указанное время (для DevControls)
export async function scheduleTestNotification(minutes: number, type: 'reminder' | 'praise' = 'reminder') {
  const testNotifications = type === 'praise' ? PRAISE_NOTIFICATIONS : DAILY_NOTIFICATIONS;
  const testNotification = testNotifications[0];
  
  // Создаем дату для триггера
  const triggerDate = new Date();
  triggerDate.setMinutes(triggerDate.getMinutes() + minutes);
  
  console.log(`🕐 Scheduling test notification for: ${triggerDate.toLocaleString()}`);
  
  await scheduleNotificationSafe({
    content: {
      title: `[TEST] ${testNotification.title}`,
      body: `[TEST] ${testNotification.body} (scheduled for ${minutes} minutes)`,
      sound: true,
      badge: 1,
      data: { type: 'test', originalType: type }
    },
    trigger: {
      date: triggerDate, // Используем конкретную дату/время
    },
  });
}

// Отмена всех уведомлений
export async function cancelAllNotifications() {
  await Notifications.cancelAllScheduledNotificationsAsync();
}

// Получение статуса уведомлений
export async function getNotificationStatus() {
  const settings = await Notifications.getPermissionsAsync();
  const scheduledNotifications = await Notifications.getAllScheduledNotificationsAsync();
  
  return {
    granted: settings.granted,
    scheduledCount: scheduledNotifications.length,
    scheduledNotifications,
  };
}

// Инициализация системы уведомлений
export async function initializeNotifications(hasUserMarkedToday: boolean = false) {
  try {
    const granted = await requestNotificationPermissions();
    
    if (granted) {
      await setupNotificationChannel();
      await scheduleSmartNotifications(hasUserMarkedToday);
      console.log('✅ Smart notifications initialized');
      return true;
    } else {
      console.log('❌ Notification permissions not granted');
      return false;
    }
  } catch (error) {
    console.error('❌ Error initializing notifications:', error);
    return false;
  }
}

// Обновление уведомлений при изменении статуса пользователя
export async function updateNotificationsBasedOnProgress(hasUserMarkedToday: boolean) {
  try {
    await scheduleSmartNotifications(hasUserMarkedToday);
    console.log(`✅ Notifications updated: ${hasUserMarkedToday ? 'praise' : 'reminder'} mode`);
    return true;
  } catch (error) {
    console.error('❌ Error updating notifications:', error);
    return false;
  }
}