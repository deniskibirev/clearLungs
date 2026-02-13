import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
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
  const [cravings, setCravings] = useState<number | undefined>();

  const handleAddEntry = () => {
    if (newEntryText.trim()) {
      addEntry(newEntryText, selectedMood, cravings);
      setNewEntryText('');
      setSelectedMood(undefined);
      setCravings(undefined);
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

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      {/* Форма добавления записи */}
      <View style={[styles.inputContainer, { backgroundColor: themeColors.calendar?.background || '#1E1E1E' }]}>
        <TextInput
          style={[styles.input, { color: themeColors.text }]}
          placeholder="Что вы чувствуете сегодня?"
          placeholderTextColor="#666"
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
                { backgroundColor: '#333' },
                selectedMood === mood && { backgroundColor: themeColors.primary }
              ]}
              onPress={() => setSelectedMood(mood as any)}
            >
              <Text style={styles.moodEmoji}>{getMoodEmoji(mood)}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Кнопка добавления */}
        <TouchableOpacity
          style={[styles.addButton, { backgroundColor: themeColors.primary }]}
          onPress={handleAddEntry}
        >
          <Text style={styles.addButtonText}>➕ Записать</Text>
        </TouchableOpacity>
      </View>

      {/* Список записей - ОТ НОВЫХ К СТАРЫМ */}
      <ScrollView style={styles.entriesList}>
        {diary.entries.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={[styles.emptyEmoji, { color: themeColors.text }]}>📔</Text>
            <Text style={[styles.emptyTitle, { color: themeColors.text }]}>
              Здесь пока пусто
            </Text>
            <Text style={[styles.emptySubtitle, { color: '#888' }]}>
              Запишите свои мысли и чувства о пути без курения
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
    backgroundColor: '#333',
  },
  moodContainer: {
    flexDirection: 'row',
    marginTop: 12,
    marginBottom: 8,
  },
  moodButton: {
    padding: 10,
    borderRadius: 20,
    marginRight: 8,
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  moodEmoji: {
    fontSize: 20,
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