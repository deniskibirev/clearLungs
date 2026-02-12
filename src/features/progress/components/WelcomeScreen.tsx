import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useLanguage } from '@/app/context/LanguageContext';
import { useTheme } from '@/app/context/ThemeContext';

interface WelcomeScreenProps {
  onClose: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onClose }) => {
  const { t } = useLanguage();
  const { themeColors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      <View style={styles.content}>
        {/* Заголовок */}
        <Text style={[styles.title, { color: themeColors.text }]}>
          🚭 {t('welcomeTitle')}
        </Text>
        
        {/* Основное описание */}
        <View style={styles.descriptionContainer}>
          <Text style={[styles.description, { color: themeColors.text }]}>
            {t('welcomeDescription1')}
          </Text>
          
          <View style={styles.featureItem}>
            <Text style={[styles.emoji, { color: themeColors.primary }]}>🌱</Text>
            <Text style={[styles.featureText, { color: themeColors.text }]}>
              {t('welcomeFeature1')}
            </Text>
          </View>
          
          <View style={styles.featureItem}>
            <Text style={[styles.emoji, { color: themeColors.primary }]}>📅</Text>
            <Text style={[styles.featureText, { color: themeColors.text }]}>
              {t('welcomeFeature2')}
            </Text>
          </View>
          
          <View style={styles.featureItem}>
            <Text style={[styles.emoji, { color: themeColors.primary }]}>🌳</Text>
            <Text style={[styles.featureText, { color: themeColors.text }]}>
              {t('welcomeFeature3')}
            </Text>
          </View>
        </View>

        {/* Кнопка начала */}
        <TouchableOpacity 
          style={[styles.startButton, { backgroundColor: themeColors.primary }]}
          onPress={onClose}
        >
          <Text style={styles.startButtonText}>{t('startMyJourney')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  content: {
    width: '100%',
    maxWidth: 400,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
  },
  descriptionContainer: {
    marginBottom: 50,
  },
  description: {
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 30,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  emoji: {
    fontSize: 24,
    marginRight: 15,
  },
  featureText: {
    fontSize: 16,
    flex: 1,
    lineHeight: 22,
  },
  startButton: {
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
  },
  startButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '600',
  },
});