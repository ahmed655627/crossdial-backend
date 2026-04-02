import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export interface Language {
  id: string;
  name: string;
  flag: string;
  nativeName: string;
  difficulty: 'easy' | 'medium' | 'hard';
  available: boolean;
  wordCount: number;
}

export const LANGUAGES: Language[] = [
  { id: 'en', name: 'English', flag: '🇺🇸', nativeName: 'English', difficulty: 'easy', available: true, wordCount: 5000 },
  { id: 'es', name: 'Spanish', flag: '🇪🇸', nativeName: 'Español', difficulty: 'easy', available: true, wordCount: 4500 },
  { id: 'fr', name: 'French', flag: '🇫🇷', nativeName: 'Français', difficulty: 'medium', available: true, wordCount: 4000 },
  { id: 'de', name: 'German', flag: '🇩🇪', nativeName: 'Deutsch', difficulty: 'medium', available: true, wordCount: 3800 },
  { id: 'it', name: 'Italian', flag: '🇮🇹', nativeName: 'Italiano', difficulty: 'medium', available: true, wordCount: 3500 },
  { id: 'pt', name: 'Portuguese', flag: '🇧🇷', nativeName: 'Português', difficulty: 'medium', available: true, wordCount: 3200 },
  { id: 'ja', name: 'Japanese', flag: '🇯🇵', nativeName: '日本語', difficulty: 'hard', available: false, wordCount: 2000 },
  { id: 'ko', name: 'Korean', flag: '🇰🇷', nativeName: '한국어', difficulty: 'hard', available: false, wordCount: 2000 },
  { id: 'zh', name: 'Chinese', flag: '🇨🇳', nativeName: '中文', difficulty: 'hard', available: false, wordCount: 1500 },
  { id: 'ar', name: 'Arabic', flag: '🇸🇦', nativeName: 'العربية', difficulty: 'hard', available: false, wordCount: 1800 },
];

interface LanguageLearningModalProps {
  visible: boolean;
  onClose: () => void;
  currentLanguage: string;
  onSelectLanguage: (language: Language) => void;
  unlockedLanguages: string[];
}

export const LanguageLearningModal: React.FC<LanguageLearningModalProps> = ({
  visible,
  onClose,
  currentLanguage,
  onSelectLanguage,
  unlockedLanguages,
}) => {
  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'easy': return '#22c55e';
      case 'medium': return '#f59e0b';
      case 'hard': return '#ef4444';
      default: return '#9ca3af';
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>🌍 Language Learning</Text>
            <Text style={styles.subtitle}>Play and learn new languages!</Text>
          </View>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            {LANGUAGES.map((language) => {
              const isUnlocked = unlockedLanguages.includes(language.id) || language.id === 'en';
              const isActive = currentLanguage === language.id;

              return (
                <TouchableOpacity
                  key={language.id}
                  style={[
                    styles.languageCard,
                    isActive && styles.activeCard,
                    !isUnlocked && styles.lockedCard,
                  ]}
                  onPress={() => isUnlocked && language.available && onSelectLanguage(language)}
                  disabled={!isUnlocked || !language.available}
                >
                  <Text style={styles.flag}>{language.flag}</Text>
                  <View style={styles.languageInfo}>
                    <Text style={styles.languageName}>{language.name}</Text>
                    <Text style={styles.nativeName}>{language.nativeName}</Text>
                    <View style={styles.statsRow}>
                      <View style={[styles.diffBadge, { backgroundColor: getDifficultyColor(language.difficulty) }]}>
                        <Text style={styles.diffText}>{language.difficulty}</Text>
                      </View>
                      <Text style={styles.wordCount}>{language.wordCount} words</Text>
                    </View>
                  </View>
                  {!language.available && (
                    <View style={styles.comingSoon}>
                      <Text style={styles.comingSoonText}>Soon</Text>
                    </View>
                  )}
                  {!isUnlocked && language.available && (
                    <View style={styles.lockIcon}>
                      <Text>🔒</Text>
                    </View>
                  )}
                  {isActive && (
                    <View style={styles.activeIcon}>
                      <Text>✓</Text>
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '95%',
    maxHeight: '85%',
    backgroundColor: '#1a1a2e',
    borderRadius: 24,
    overflow: 'hidden',
  },
  header: {
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    color: '#9ca3af',
    marginTop: 4,
  },
  content: {
    padding: 16,
    maxHeight: 400,
  },
  languageCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
  },
  activeCard: {
    borderWidth: 2,
    borderColor: '#22c55e',
  },
  lockedCard: {
    opacity: 0.6,
  },
  flag: {
    fontSize: 40,
    marginRight: 16,
  },
  languageInfo: {
    flex: 1,
  },
  languageName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  nativeName: {
    color: '#9ca3af',
    fontSize: 14,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 8,
  },
  diffBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  diffText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  wordCount: {
    color: '#9ca3af',
    fontSize: 12,
  },
  comingSoon: {
    backgroundColor: '#6b7280',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  comingSoonText: {
    color: '#fff',
    fontSize: 12,
  },
  lockIcon: {
    fontSize: 24,
  },
  activeIcon: {
    backgroundColor: '#22c55e',
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButton: {
    padding: 16,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  closeText: {
    color: '#9ca3af',
    fontSize: 16,
  },
});

export default LanguageLearningModal;
