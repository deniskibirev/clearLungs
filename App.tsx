// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.text}>🚭 Quit Smoking App</Text>
//       <Text style={styles.subtext}>Your journey starts here!</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#121212',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   text: {
//     color: '#4CAF50',
//     fontSize: 28,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   subtext: {
//     color: '#CCCCCC',
//     fontSize: 16,
//   },
// });

// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { StatusBar } from 'expo-status-bar';
// import { TabNavigator } from '@/navigation/TabNavigator';

// export default function App() {
//   return (
//     <NavigationContainer>
//       <StatusBar style="light" />
//       <TabNavigator />
//     </NavigationContainer>
//   );
// }

// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { StatusBar } from 'expo-status-bar';
// import { TabNavigator } from '@/navigation/TabNavigator';
// import { View, Text, StyleSheet } from 'react-native';
// import { LanguageProvider } from '@/app/context/LanguageContext';

// class ErrorBoundary extends React.Component<
//   { children: React.ReactNode },
//   { hasError: boolean; error: Error | null }
// > {
//   constructor(props: { children: React.ReactNode }) {
//     super(props);
//     this.state = { hasError: false, error: null };
//   }

//   static getDerivedStateFromError(error: Error) {
//     return { hasError: true, error };
//   }

//   componentDidCatch(error: Error, errorInfo: any) {
//     console.error('Error caught by boundary:', error, errorInfo);
//   }

//   render() {
//     if (this.state.hasError) {
//       return (
//         <View style={styles.errorContainer}>
//           <Text style={styles.errorTitle}>Something went wrong</Text>
//           <Text style={styles.errorText}>{this.state.error?.message}</Text>
//           <Text style={styles.errorHint}>
//             Check the browser console for details
//           </Text>
//         </View>
//       );
//     }

//     return this.props.children;
//   }
// }

// export default function App() {
//   return (
//     <ErrorBoundary>
//       <LanguageProvider>
//         <NavigationContainer>
//           <StatusBar style="light" />
//           <TabNavigator />
//         </NavigationContainer>
//       </LanguageProvider>
//     </ErrorBoundary>
//   );
// }

// const styles = StyleSheet.create({
//   errorContainer: {
//     flex: 1,
//     backgroundColor: '#121212',
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   errorTitle: {
//     color: '#FF4444',
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   errorText: {
//     color: '#FFFFFF',
//     fontSize: 16,
//     marginBottom: 10,
//     textAlign: 'center',
//   },
//   errorHint: {
//     color: '#888888',
//     fontSize: 14,
//     textAlign: 'center',
//   },
// });

// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { StatusBar } from 'expo-status-bar';
// import { TabNavigator } from '@/navigation/TabNavigator';
// import { View, Text, StyleSheet } from 'react-native';
// import { LanguageProvider } from '@/app/context/LanguageContext';
// import { ThemeProvider, useTheme } from '@/app/context/ThemeContext';
// import { colors } from '@/app/constants/colors';

// class ErrorBoundary extends React.Component<
//   { children: React.ReactNode },
//   { hasError: boolean; error: Error | null }
// > {
//   constructor(props: { children: React.ReactNode }) {
//     super(props);
//     this.state = { hasError: false, error: null };
//   }

//   static getDerivedStateFromError(error: Error) {
//     return { hasError: true, error };
//   }

//   componentDidCatch(error: Error, errorInfo: any) {
//     console.error('Error caught by boundary:', error, errorInfo);
//   }

//   render() {
//     if (this.state.hasError) {
//       return (
//         <View style={styles.errorContainer}>
//           <Text style={styles.errorTitle}>Something went wrong</Text>
//           <Text style={styles.errorText}>{this.state.error?.message}</Text>
//           <Text style={styles.errorHint}>
//             Check the browser console for details
//           </Text>
//         </View>
//       );
//     }

//     return this.props.children;
//   }
// }

// // Компонент для применения темы к навигации
// const ThemedApp = () => {
//   const { themeColors } = useTheme();
  
//   return (
//     <NavigationContainer theme={{
//       dark: true,
//       colors: {
//         primary: themeColors.primary,
//         background: themeColors.background,
//         card: themeColors.background,
//         text: themeColors.text,
//         border: '#333',
//         notification: themeColors.primary,
//       },
//       fonts: {
//         regular: {
//           fontFamily: 'System',
//           fontWeight: '400' as '400',
//         },
//         medium: {
//           fontFamily: 'System', 
//           fontWeight: '500' as '500',
//         },
//         bold: {
//           fontFamily: 'System',
//           fontWeight: '700' as '700',
//         },
//         heavy: {
//           fontFamily: 'System',
//           fontWeight: '900' as '900',
//         },
//       },
//     }}>
//       <StatusBar style={themeColors === colors.dark ? 'light' : 'dark'} />
//       <TabNavigator />
//     </NavigationContainer>
//   );
// };

// export default function App() {
//   return (
//     <ErrorBoundary>
//       <ThemeProvider>
//         <LanguageProvider>
//           <ThemedApp />
//         </LanguageProvider>
//       </ThemeProvider>
//     </ErrorBoundary>
//   );
// }

// const styles = StyleSheet.create({
//   errorContainer: {
//     flex: 1,
//     backgroundColor: '#121212',
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   errorTitle: {
//     color: '#FF4444',
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   errorText: {
//     color: '#FFFFFF',
//     fontSize: 16,
//     marginBottom: 10,
//     textAlign: 'center',
//   },
//   errorHint: {
//     color: '#888888',
//     fontSize: 14,
//     textAlign: 'center',
//   },
// });

import React, { useEffect, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { TabNavigator } from '@/navigation/TabNavigator';
import { View, Text, StyleSheet } from 'react-native';
import { LanguageProvider } from '@/app/context/LanguageContext';
import { ThemeProvider, useTheme } from '@/app/context/ThemeContext';
import { colors } from '@/app/constants/colors';
import * as Notifications from 'expo-notifications';

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorTitle}>Something went wrong</Text>
          <Text style={styles.errorText}>{this.state.error?.message}</Text>
          <Text style={styles.errorHint}>
            Check the browser console for details
          </Text>
        </View>
      );
    }

    return this.props.children;
  }
}

// Компонент для применения темы к навигации
const ThemedApp = () => {
  const { themeColors } = useTheme();
  const notificationListener = useRef<Notifications.EventSubscription | null>(null);
  const responseListener = useRef<Notifications.EventSubscription | null>(null);

  useEffect(() => {
    // // Настройка обработчиков уведомлений
    // notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
    //   console.log('📱 Notification received:', notification);
    // });

      // Настройка обработчиков уведомлений
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      console.log('📱 Notification received:', {
        title: notification.request.content.title,
        body: notification.request.content.body,
        trigger: notification.request.trigger,
        receivedAt: new Date().toLocaleString()
      });
    });


    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log('👆 Notification response:', response);
      // Можно добавить навигацию на определенный экран при нажатии на уведомление
    });

    // Инициализация уведомлений при запуске приложения
    const initializeAppNotifications = async () => {
      try {
        // Проверяем разрешения и планируем уведомления
        const { granted } = await Notifications.getPermissionsAsync();
        if (granted) {
          console.log('✅ Notifications already granted, scheduling daily reminders...');
          // Здесь можно автоматически включить уведомления при первом запуске
          // или сделать настройку в настройках приложения
        }
      } catch (error) {
        console.error('❌ Error initializing notifications:', error);
      }
    };

    initializeAppNotifications();

    // Очистка подписок при размонтировании
    return () => {
      notificationListener.current?.remove();
      responseListener.current?.remove();
    };
  }, []);

  return (
    <NavigationContainer theme={{
      dark: true,
      colors: {
        primary: themeColors.primary,
        background: themeColors.background,
        card: themeColors.background,
        text: themeColors.text,
        border: '#333',
        notification: themeColors.primary,
      },
      fonts: {
        regular: {
          fontFamily: 'System',
          fontWeight: '400' as '400',
        },
        medium: {
          fontFamily: 'System', 
          fontWeight: '500' as '500',
        },
        bold: {
          fontFamily: 'System',
          fontWeight: '700' as '700',
        },
        heavy: {
          fontFamily: 'System',
          fontWeight: '900' as '900',
        },
      },
    }}>
      <StatusBar style={themeColors === colors.dark ? 'light' : 'dark'} />
      <TabNavigator />
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <LanguageProvider>
          <ThemedApp />
        </LanguageProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    backgroundColor: '#121212',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorTitle: {
    color: '#FF4444',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  errorText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  errorHint: {
    color: '#888888',
    fontSize: 14,
    textAlign: 'center',
  },
});