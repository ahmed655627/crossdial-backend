/**
 * Language Selector Modal
 * Allows users to select puzzle language for multilingual support
 */

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import Constants from 'expo-constants';

const { width, height } = Dimensions.get('window');

interface Language {
  code: string;
  name: string;
  flag: string;
  direction: string;
  levelCount: number;
}

interface LanguageSelectorProps {
  visible: boolean;
  onClose: () => void;
  onSelectLanguage: (languageCode: string, languageName: string) => void;
  currentLanguage?: string;
}

// Get API URL from environment
const getApiUrl = () => {
  // Try process.env first (works on web and with dotenv)
  if (process.env.EXPO_PUBLIC_BACKEND_URL) {
    return process.env.EXPO_PUBLIC_BACKEND_URL;
  }
  // Fallback to Constants for native builds
  return Constants.expoConfig?.extra?.EXPO_BACKEND_URL || '';
};

const API_URL = getApiUrl();

// Default/fallback languages list
const DEFAULT_LANGUAGES: Language[] = [
  { code: 'en', name: 'English', flag: '🇺🇸', direction: 'ltr', levelCount: 150 },
  { code: 'it', name: 'Italiano', flag: '🇮🇹', direction: 'ltr', levelCount: 15 },
  { code: 'es', name: 'Español', flag: '🇪🇸', direction: 'ltr', levelCount: 15 },
  { code: 'fr', name: 'Français', flag: '🇫🇷', direction: 'ltr', levelCount: 15 },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪', direction: 'ltr', levelCount: 15 },
  { code: 'pt', name: 'Português', flag: '🇧🇷', direction: 'ltr', levelCount: 15 },
  { code: 'nl', name: 'Nederlands', flag: '🇳🇱', direction: 'ltr', levelCount: 15 },
  { code: 'ar', name: 'العربية', flag: '🇸🇦', direction: 'rtl', levelCount: 10 },
  { code: 'hi', name: 'हिंदी', flag: '🇮🇳', direction: 'ltr', levelCount: 10 },
  { code: 'ja', name: '日本語', flag: '🇯🇵', direction: 'ltr', levelCount: 10 },
  { code: 'ko', name: '한국어', flag: '🇰🇷', direction: 'ltr', levelCount: 10 },
  { code: 'zh', name: '中文', flag: '🇨🇳', direction: 'ltr', levelCount: 10 },
];

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  visible,
  onClose,
  onSelectLanguage,
  currentLanguage = 'en',
}) => {
  const [languages, setLanguages] = useState<Language[]>(DEFAULT_LANGUAGES);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (visible) {
      fetchLanguages();
    }
  }, [visible]);

  const fetchLanguages = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/api/languages`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) throw new Error('Failed to fetch languages');
      const data = await response.json();
      
      // Add English as default first option
      const allLanguages = [
        { code: 'en', name: 'English', flag: '🇺🇸', direction: 'ltr', levelCount: 150 },
        ...data.languages
      ];
      setLanguages(allLanguages);
      setError(null);
    } catch (err) {
      console.error('Error fetching languages:', err);
      // Use fallback languages - don't show error since we have defaults
      setLanguages(DEFAULT_LANGUAGES);
      setError(null); // Clear error since we have fallback
    } finally {
      setLoading(false);
    }
  };

  const renderLanguageItem = ({ item }: { item: Language }) => {
    const isSelected = item.code === currentLanguage;
    
    return (
      <TouchableOpacity
        style={[styles.languageItem, isSelected && styles.languageItemSelected]}
        onPress={() => onSelectLanguage(item.code, item.name)}
        activeOpacity={0.7}
      >
        <View style={styles.languageInfo}>
          <Text style={styles.languageFlag}>{item.flag}</Text>
          <View style={styles.languageTextContainer}>
            <Text style={[styles.languageName, isSelected && styles.languageNameSelected]}>
              {item.name}
            </Text>
            <Text style={styles.levelCount}>
              {item.levelCount} {item.levelCount === 1 ? 'level' : 'levels'}
            </Text>
          </View>
        </View>
        {isSelected && (
          <Ionicons name="checkmark-circle" size={24} color="#00b894" />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <BlurView intensity={20} style={styles.backdrop}>
        <View style={styles.container}>
          <LinearGradient
            colors={['#1a1a2e', '#16213e', '#0f3460']}
            style={styles.gradient}
          >
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.title}>Select Language</Text>
              <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <Ionicons name="close" size={24} color="#fff" />
              </TouchableOpacity>
            </View>

            <Text style={styles.subtitle}>
              Play puzzles in your favorite language
            </Text>

            {/* Language List */}
            {loading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#FFD700" />
                <Text style={styles.loadingText}>Loading languages...</Text>
              </View>
            ) : error ? (
              <View style={styles.errorContainer}>
                <Ionicons name="alert-circle" size={48} color="#e74c3c" />
                <Text style={styles.errorText}>{error}</Text>
                <TouchableOpacity style={styles.retryButton} onPress={fetchLanguages}>
                  <Text style={styles.retryButtonText}>Retry</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <FlatList
                data={languages}
                renderItem={renderLanguageItem}
                keyExtractor={(item) => item.code}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listContent}
              />
            )}

            {/* Footer Note */}
            <View style={styles.footer}>
              <Ionicons name="information-circle-outline" size={16} color="#8892b0" />
              <Text style={styles.footerText}>
                More languages and levels coming soon!
              </Text>
            </View>
          </LinearGradient>
        </View>
      </BlurView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  container: {
    height: height * 0.75,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: 'hidden',
  },
  gradient: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#8892b0',
    marginBottom: 20,
  },
  listContent: {
    paddingBottom: 20,
  },
  languageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  languageItemSelected: {
    backgroundColor: 'rgba(0, 184, 148, 0.1)',
    borderColor: '#00b894',
  },
  languageInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  languageFlag: {
    fontSize: 32,
    marginRight: 16,
  },
  languageTextContainer: {
    justifyContent: 'center',
  },
  languageName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  languageNameSelected: {
    color: '#00b894',
  },
  levelCount: {
    fontSize: 12,
    color: '#8892b0',
    marginTop: 2,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#8892b0',
    marginTop: 12,
    fontSize: 14,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: '#e74c3c',
    marginTop: 12,
    fontSize: 14,
  },
  retryButton: {
    marginTop: 16,
    paddingHorizontal: 24,
    paddingVertical: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
  },
  retryButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  footerText: {
    color: '#8892b0',
    fontSize: 12,
    marginLeft: 6,
  },
});

export default LanguageSelector;
