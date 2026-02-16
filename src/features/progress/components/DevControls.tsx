import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView } from 'react-native';
import { useProgressStore } from '../store/progressStore';
import { colors } from '@/app/constants/colors';
import { IS_DEV } from '@/app/constants/config';

interface DevControlsProps {
  onClose?: () => void;
}

export const DevControls: React.FC<DevControlsProps> = ({ onClose }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [customDays, setCustomDays] = useState('');
  const { progress, setStreakDays, addDays, resetProgress } = useProgressStore();

  const quickPresets = [1, 7, 30, 90, 180, 365];

  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };

  const handleSetDays = () => {
    const days = parseInt(customDays);
    if (!isNaN(days) && days >= 0) {
      setStreakDays(days);
      setCustomDays('');
    }
  };

  const getStageInfo = () => {
    const stages = [
      { min: 0, max: 6, stage: 'seed', emoji: '🌱', name: 'Seed' },
      { min: 7, max: 29, stage: 'sprout', emoji: '🪴', name: 'Sprout' },
      { min: 30, max: 89, stage: 'young', emoji: '🌿', name: 'Young Tree' },
      { min: 90, max: 179, stage: 'mature', emoji: '🌳', name: 'Mature Tree' },
      { min: 180, max: 364, stage: 'flowering', emoji: '🌸', name: 'Flowering' },
      { min: 365, max: Infinity, stage: 'fruitful', emoji: '🌲', name: 'Fruitful Tree' }
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
          <Text style={styles.sectionTitle}>Current Progress</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{progress.currentStreak}</Text>
              <Text style={styles.statLabel}>Current</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{progress.longestStreak}</Text>
              <Text style={styles.statLabel}>Longest</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{progress.totalDays}</Text>
              <Text style={styles.statLabel}>Total</Text>
            </View>
          </View>
          <Text style={styles.stageText}>
            Stage: {progress.treeStage} ({progress.currentStreak} days)
          </Text>
          <Text style={styles.stageText}>
            Marked Today: {progress.lastCheckDate === new Date().toISOString().split('T')[0] ? '✅' : '❌'}
          </Text>
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
          <Text style={styles.resetButtonText}>🔥 Reset to 0</Text>
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
                {stage.name} ({stage.min}-{stage.max === Infinity ? '∞' : stage.max} days)
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
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 8,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    color: colors.dark.primary,
    fontSize: 20,
    fontWeight: 'bold',
  },
  statLabel: {
    color: '#888',
    fontSize: 11,
    marginTop: 2,
  },
  stageText: {
    color: '#888',
    fontSize: 12,
    marginBottom: 2,
  },
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