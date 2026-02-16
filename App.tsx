import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { TabNavigator } from '@/navigation/TabNavigator';
import { View, Text, StyleSheet } from 'react-native';
import { LanguageProvider } from '@/app/context/LanguageContext';
import { ThemeProvider, useTheme } from '@/app/context/ThemeContext';
import { colors } from '@/app/constants/colors';

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