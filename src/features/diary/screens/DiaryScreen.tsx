import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useTheme } from '@/app/context/ThemeContext';
import { useLanguage } from '@/app/context/LanguageContext';
import { useDiaryStore } from '../store/diaryStore';
import { DiaryEntry } from '../components/DiaryEntry';

export const DiaryScreen = () => {
  const { themeColors } = useTheme();
  const { t } = useLanguage();
  const { diary, addEntry } = useDiaryStore();
  
  const [newEntryText, setNewEntryText] = useState('');
  const [selectedMood, setSelectedMood] = useState<'great' | 'good' | 'okay' | 'bad' | 'awful' | undefined>();

  const handleAddEntry = () => {
    if (newEntryText.trim()) {
      addEntry(newEntryText, selectedMood);
      setNewEntryText('');
      setSelectedMood(undefined);
    }
  };

  const getMoodEmoji = (mood?: string) => {
    switch (mood) {
      case 'great': return '🤩';
      case 'good': return '😊';
      case 'okay': return '😐';
      case 'bad': return '😞';
      case 'awful': return '😫';
      default: return '📝';
    }
  };

  const getEntryCountText = (count: number) => {
    const { language } = useLanguage();
    
    if (language === 'ru') {
      if (count % 10 === 1 && count % 100 !== 11) return `${count} запись`;
      if ([2,3,4].includes(count % 10) && ![12,13,14].includes(count % 100)) return `${count} записи`;
      return `${count} записей`;
    } else {
      return `${count} ${count === 1 ? 'entry' : 'entries'}`;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: themeColors.border || '#888' }]}>
        <Text style={[styles.headerTitle, { color: themeColors.text }]}>
          {t('diaryTitle')}
        </Text>
        <Text style={[styles.entryCount, { color: themeColors.text === '#FFFFFF' ? '#888' : '#666' }]}>
          {getEntryCountText(diary.entries.length)}
        </Text>
      </View>

      {/* Форма добавления записи */}
      <View style={[styles.inputContainer, { backgroundColor: themeColors.cardBackground || '#1E1E1E' }]}>
        <TextInput
          style={[
            styles.input, 
            { 
              color: themeColors.text,
              backgroundColor: themeColors.inputBackground || '#333',
              borderColor: themeColors.border || '#444',
            }
          ]}
          placeholder={t('diaryPlaceholder')}
          placeholderTextColor={themeColors.text === '#FFFFFF' ? '#888' : '#999'}
          value={newEntryText}
          onChangeText={setNewEntryText}
          multiline
        />
        
        {/* Выбор настроения */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.moodContainer}>
          {['great', 'good', 'okay', 'bad', 'awful'].map((mood) => (
            <TouchableOpacity
              key={mood}
              style={[
                styles.moodButton,
                { 
                  backgroundColor: themeColors.inputBackground || '#333',
                  borderColor: themeColors.border || '#444',
                  borderWidth: 1,
                },
                selectedMood === mood && { 
                  backgroundColor: themeColors.primary,
                  borderColor: themeColors.primary,
                }
              ]}
              onPress={() => setSelectedMood(mood as any)}
            >
              <Text style={styles.moodEmoji}>{getMoodEmoji(mood)}</Text>
              <Text 
                style={[
                  styles.moodText, 
                  { 
                    color: selectedMood === mood 
                      ? '#FFFFFF' 
                      : themeColors.text 
                  }
                ]}
              >
                {t(mood as any)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Кнопка добавления */}
        <TouchableOpacity
          style={[styles.addButton, { backgroundColor: themeColors.primary }]}
          onPress={handleAddEntry}
        >
          <Text style={styles.addButtonText}>{t('addEntry')}</Text>
        </TouchableOpacity>
      </View>

      {/* Список записей */}
      <ScrollView style={styles.entriesList}>
        {diary.entries.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={[styles.emptyEmoji, { color: themeColors.text }]}>📔</Text>
            <Text style={[styles.emptyTitle, { color: themeColors.text }]}>
              {t('noEntries')}
            </Text>
            <Text style={[styles.emptySubtitle, { color: themeColors.text === '#FFFFFF' ? '#888' : '#666' }]}>
              {t('noEntriesSubtitle')}
            </Text>
          </View>
        ) : (
          diary.entries.map((entry) => (
            <DiaryEntry key={entry.id} entry={entry} />
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  entryCount: {
    fontSize: 14,
  },
  inputContainer: {
    padding: 16,
    margin: 16,
    borderRadius: 12,
  },
  input: {
    fontSize: 16,
    padding: 12,
    minHeight: 80,
    textAlignVertical: 'top',
    borderRadius: 8,
    borderWidth: 1,
  },
  moodContainer: {
    flexDirection: 'row',
    marginTop: 12,
    marginBottom: 8,
  },
  moodButton: {
    padding: 8,
    borderRadius: 20,
    marginRight: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  moodEmoji: {
    fontSize: 16,
  },
  moodText: {
    fontSize: 12,
    fontWeight: '500',
  },
  addButton: {
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  entriesList: {
    flex: 1,
    paddingHorizontal: 16,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
  },
  emptyEmoji: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 32,
  },
});