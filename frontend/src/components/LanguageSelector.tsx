/**
 * Language Selector Component
 * Beautiful language selection modal
 */

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { 
  SupportedLanguage, 
  languageNames, 
  languageFlags,
  isRTL 
} from '../utils/localization';
import { useGameSettings } from '../stores/gameSettingsStore';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface LanguageSelectorProps {
  visible: boolean;
  onClose: () => void;
}

const languages: SupportedLanguage[] = [
  'en', 'it', 'es', 'fr', 'de', 'pt', 'ru', 'ja', 'ko', 'zh', 'ar', 'hi'
];

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  visible,
  onClose,
}) => {
  const { language, setLanguage, t } = useGameSettings();

  const handleSelect = (lang: SupportedLanguage) => {
    setLanguage(lang);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <BlurView intensity={20} style={styles.blur}>
          <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.title}>{t('language')}</Text>
              <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
                <Text style={styles.closeBtnText}>✕</Text>
              </TouchableOpacity>
            </View>

            {/* Language List */}
            <ScrollView 
              style={styles.list}
              showsVerticalScrollIndicator={false}
            >
              {languages.map((lang) => (
                <TouchableOpacity
                  key={lang}
                  style={[
                    styles.languageItem,
                    language === lang && styles.selectedItem,
                  ]}
                  onPress={() => handleSelect(lang)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.flag}>{languageFlags[lang]}</Text>
                  <Text 
                    style={[
                      styles.languageName,
                      language === lang && styles.selectedText,
                      isRTL(lang) && styles.rtlText,
                    ]}
                  >
                    {languageNames[lang]}
                  </Text>
                  {language === lang && (
                    <View style={styles.checkmark}>
                      <Text style={styles.checkmarkText}>✓</Text>
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </BlurView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  blur: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  container: {
    width: SCREEN_WIDTH * 0.85,
    maxHeight: SCREEN_HEIGHT * 0.7,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 20,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  closeBtn: {
    width: 35,
    height: 35,
    borderRadius: 18,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeBtnText: {
    fontSize: 18,
    color: '#666',
  },
  list: {
    maxHeight: SCREEN_HEIGHT * 0.5,
  },
  languageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 12,
    marginBottom: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
  },
  selectedItem: {
    backgroundColor: 'rgba(100, 150, 255, 0.15)',
    borderWidth: 2,
    borderColor: 'rgba(100, 150, 255, 0.5)',
  },
  flag: {
    fontSize: 28,
    marginRight: 15,
  },
  languageName: {
    fontSize: 17,
    color: '#333',
    flex: 1,
  },
  selectedText: {
    fontWeight: 'bold',
    color: '#4A90D9',
  },
  rtlText: {
    textAlign: 'right',
  },
  checkmark: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#4A90D9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmarkText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LanguageSelector;
