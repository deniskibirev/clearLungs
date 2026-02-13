import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { DiaryEntry as DiaryEntryType } from '@/types/diary';
import { useTheme } from '@/app/context/ThemeContext';
import { useLanguage } from '@/app/context/LanguageContext';
import { useDiaryStore } from '../store/diaryStore';

interface DiaryEntryProps {
  entry: DiaryEntryType;
}

export const DiaryEntry: React.FC<DiaryEntryProps> = ({ entry }) => {
  const { themeColors } = useTheme();
  const { t } = useLanguage();
  const { deleteEntry, editEntry } = useDiaryStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(entry.content);
  const [selectedMood, setSelectedMood] = useState(entry.mood);

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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString + 'T00:00:00');
    return date.toLocaleDateString(undefined, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleDelete = () => {
    Alert.alert(
      'Удалить запись',
      'Вы уверены?',
      [
        { text: 'Отмена', style: 'cancel' },
        { 
          text: 'Удалить', 
          style: 'destructive',
          onPress: () => deleteEntry(entry.id)
        }
      ]
    );
  };

  const handleSave = () => {
    if (editText.trim()) {
      editEntry(entry.id, editText, selectedMood);
      setIsEditing(false);
    }
  };

  if (isEditing) {
    return (
      <View style={[styles.container, { backgroundColor: themeColors.calendar?.background || '#1E1E1E' }]}>
        <TextInput
          style={[styles.editInput, { color: themeColors.text, borderColor: themeColors.primary }]}
          value={editText}
          onChangeText={setEditText}
          multiline
          autoFocus
        />
        
        <View style={styles.moodSelector}>
          {['great', 'good', 'okay', 'bad', 'awful'].map((mood) => (
            <TouchableOpacity
              key={mood}
              style={[
                styles.moodButton,
                selectedMood === mood && { backgroundColor: themeColors.primary }
              ]}
              onPress={() => setSelectedMood(mood as any)}
            >
              <Text style={styles.moodEmoji}>{getMoodEmoji(mood)}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.editButtons}>
          <TouchableOpacity 
            style={[styles.saveButton, { backgroundColor: themeColors.primary }]}
            onPress={handleSave}
          >
            <Text style={styles.saveButtonText}>Сохранить</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.cancelButton, { borderColor: '#666' }]}
            onPress={() => setIsEditing(false)}
          >
            <Text style={[styles.cancelButtonText, { color: '#666' }]}>Отмена</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: themeColors.calendar?.background || '#1E1E1E' }]}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.moodEmoji}>{getMoodEmoji(entry.mood)}</Text>
          <Text style={[styles.date, { color: themeColors.text }]}>
            {formatDate(entry.date)}
          </Text>
        </View>
        <View style={styles.actions}>
          <TouchableOpacity onPress={() => setIsEditing(true)} style={styles.actionButton}>
            <Text style={[styles.actionText, { color: themeColors.primary }]}>✏️</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDelete} style={styles.actionButton}>
            <Text style={styles.actionText}>🗑️</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <Text style={[styles.content, { color: themeColors.text }]}>
        {entry.content}
      </Text>
      
      {entry.cravings !== undefined && (
        <View style={styles.cravings}>
          <Text style={[styles.cravingsText, { color: '#888' }]}>
            Тяга: {'🔥'.repeat(entry.cravings)}{'💨'.repeat(10 - entry.cravings)}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  moodEmoji: {
    fontSize: 20,
    marginRight: 8,
  },
  date: {
    fontSize: 14,
    fontWeight: '500',
    flex: 1,
  },
  actions: {
    flexDirection: 'row',
  },
  actionButton: {
    padding: 4,
    marginLeft: 8,
  },
  actionText: {
    fontSize: 16,
  },
  content: {
    fontSize: 16,
    lineHeight: 22,
  },
  cravings: {
    marginTop: 10,
  },
  cravingsText: {
    fontSize: 12,
  },
  editInput: {
    fontSize: 16,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    minHeight: 100,
    textAlignVertical: 'top',
    marginBottom: 12,
  },
  moodSelector: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  moodButton: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#333',
  },
  editButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  saveButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
  },
  cancelButtonText: {
    fontSize: 16,
  },
});