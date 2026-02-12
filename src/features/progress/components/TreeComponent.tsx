// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import { TreeStage } from '@/types/progress';
// import { colors } from '@/app/constants/colors';

// interface TreeComponentProps {
//   stage: TreeStage;
//   size?: number;
// }

// export const TreeComponent: React.FC<TreeComponentProps> = ({ 
//   stage, 
//   size = 120 
// }) => {
//   const getTreeEmoji = (stage: TreeStage): string => {
//     switch (stage) {
//       case 'seed': return '🌱';
//       case 'sprout': return '🪴';
//       case 'young': return '🌿';
//       case 'mature': return '🌳';
//       case 'flowering': return '🌸';
//       case 'fruitful': return '🌲';
//       default: return '🌱';
//     }
//   };

//   const getStageName = (stage: TreeStage): string => {
//     switch (stage) {
//       case 'seed': return 'Seed';
//       case 'sprout': return 'Sprout';
//       case 'young': return 'Young Tree';
//       case 'mature': return 'Mature Tree';
//       case 'flowering': return 'Flowering';
//       case 'fruitful': return 'Fruitful Tree';
//       default: return 'Seed';
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={[styles.treeEmoji, { fontSize: size }]}>
//         {getTreeEmoji(stage)}
//       </Text>
//       <Text style={styles.stageName}>{getStageName(stage)}</Text>
//       <Text style={styles.stageDescription}>
//         {getStageDescription(stage)}
//       </Text>
//     </View>
//   );
// };

// const getStageDescription = (stage: TreeStage): string => {
//   switch (stage) {
//     case 'seed': return 'Your journey begins!';
//     case 'sprout': return 'Growing strong!';
//     case 'young': return 'Getting stronger every day!';
//     case 'mature': return 'Well established!';
//     case 'flowering': return 'Beautiful progress!';
//     case 'fruitful': return 'Amazing achievement!';
//     default: return 'Keep going!';
//   }
// };

// const styles = StyleSheet.create({
//   container: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 20,
//   },
//   treeEmoji: {
//     marginBottom: 10,
//   },
//   stageName: {
//     color: colors.dark.text,
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 5,
//   },
//   stageDescription: {
//     color: '#888888',
//     fontSize: 14,
//     textAlign: 'center',
//   },
// });






// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import { TreeStage } from '@/types/progress';
// import { useTheme } from '@/app/context/ThemeContext';

// interface TreeComponentProps {
//   stage: TreeStage;
//   size?: number;
// }

// export const TreeComponent: React.FC<TreeComponentProps> = ({ 
//   stage, 
//   size = 120 
// }) => {
//   const { themeColors } = useTheme();

//   const getTreeEmoji = (stage: TreeStage): string => {
//     switch (stage) {
//       case 'seed': return '🌱';
//       case 'sprout': return '🪴';
//       case 'young': return '🌿';
//       case 'mature': return '🌳';
//       case 'flowering': return '🌸';
//       case 'fruitful': return '🌲';
//       default: return '🌱';
//     }
//   };

//   const getStageName = (stage: TreeStage): string => {
//     switch (stage) {
//       case 'seed': return 'Seed';
//       case 'sprout': return 'Sprout';
//       case 'young': return 'Young Tree';
//       case 'mature': return 'Mature Tree';
//       case 'flowering': return 'Flowering';
//       case 'fruitful': return 'Fruitful Tree';
//       default: return 'Seed';
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={[styles.treeEmoji, { fontSize: size }]}>
//         {getTreeEmoji(stage)}
//       </Text>
//       <Text style={[styles.stageName, { color: themeColors.text }]}>{getStageName(stage)}</Text>
//       <Text style={[styles.stageDescription, { color: '#888888' }]}>
//         {getStageDescription(stage)}
//       </Text>
//     </View>
//   );
// };

// const getStageDescription = (stage: TreeStage): string => {
//   switch (stage) {
//     case 'seed': return 'Your journey begins!';
//     case 'sprout': return 'Growing strong!';
//     case 'young': return 'Getting stronger every day!';
//     case 'mature': return 'Well established!';
//     case 'flowering': return 'Beautiful progress!';
//     case 'fruitful': return 'Amazing achievement!';
//     default: return 'Keep going!';
//   }
// };

// const styles = StyleSheet.create({
//   container: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 20,
//   },
//   treeEmoji: {
//     marginBottom: 10,
//   },
//   stageName: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 5,
//   },
//   stageDescription: {
//     fontSize: 14,
//     textAlign: 'center',
//   },
// });



import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TreeStage } from '@/types/progress';
import { useTheme } from '@/app/context/ThemeContext';
import { useLanguage } from '@/app/context/LanguageContext';

interface TreeComponentProps {
  stage: TreeStage;
  size?: number;
}

export const TreeComponent: React.FC<TreeComponentProps> = ({ 
  stage, 
  size = 120 
}) => {
  const { themeColors } = useTheme();
  const { t } = useLanguage();

  const getTreeEmoji = (stage: TreeStage): string => {
    switch (stage) {
      case 'seed': return '🌱';
      case 'sprout': return '🪴';
      case 'young': return '🌿';
      case 'mature': return '🌳';
      case 'flowering': return '🌸';
      case 'fruitful': return '🌲';
      default: return '🌱';
    }
  };

  const getStageName = (stage: TreeStage): string => {
    switch (stage) {
      case 'seed': return t('seed');
      case 'sprout': return t('sprout');
      case 'young': return t('youngTree');
      case 'mature': return t('matureTree');
      case 'flowering': return t('flowering');
      case 'fruitful': return t('fruitfulTree');
      default: return t('seed');
    }
  };

  const getStageDescription = (stage: TreeStage): string => {
    switch (stage) {
      case 'seed': return t('seedDescription');
      case 'sprout': return t('sproutDescription');
      case 'young': return t('youngDescription');
      case 'mature': return t('matureDescription');
      case 'flowering': return t('floweringDescription');
      case 'fruitful': return t('fruitfulDescription');
      default: return t('seedDescription');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.treeEmoji, { fontSize: size }]}>
        {getTreeEmoji(stage)}
      </Text>
      <Text style={[styles.stageName, { color: themeColors.text }]}>
        {getStageName(stage)}
      </Text>
      <Text style={[styles.stageDescription, { color: '#888888' }]}>
        {getStageDescription(stage)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  treeEmoji: {
    marginBottom: 10,
  },
  stageName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  stageDescription: {
    fontSize: 14,
    textAlign: 'center',
  },
});