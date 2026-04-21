import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView, Switch, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

export interface AccessibilitySettings {
  largeText: boolean;
  highContrast: boolean;
  colorblindMode: 'none' | 'protanopia' | 'deuteranopia' | 'tritanopia';
  reduceMotion: boolean;
  screenReaderMode: boolean;
  hapticFeedback: boolean;
  soundFeedback: boolean;
}

const DEFAULT_SETTINGS: AccessibilitySettings = {
  largeText: false,
  highContrast: false,
  colorblindMode: 'none',
  reduceMotion: false,
  screenReaderMode: false,
  hapticFeedback: true,
  soundFeedback: true,
};

interface AccessibilityOptionsProps {
  visible: boolean;
  onClose: () => void;
  onSettingsChange: (settings: AccessibilitySettings) => void;
}

export const AccessibilityOptions: React.FC<AccessibilityOptionsProps> = ({
  visible,
  onClose,
  onSettingsChange,
}) => {
  const [settings, setSettings] = useState<AccessibilitySettings>(DEFAULT_SETTINGS);

  useEffect(() => {
    if (visible) {
      loadSettings();
    }
  }, [visible]);

  const loadSettings = async () => {
    try {
      const saved = await AsyncStorage.getItem('accessibilitySettings');
      if (saved) {
        setSettings(JSON.parse(saved));
      }
    } catch (e) {
      console.log('Error loading accessibility settings:', e);
    }
  };

  const updateSetting = async (key: keyof AccessibilitySettings, value: any) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    await AsyncStorage.setItem('accessibilitySettings', JSON.stringify(newSettings));
    onSettingsChange(newSettings);
  };

  const SettingRow: React.FC<{
    icon: string;
    title: string;
    subtitle?: string;
    children: React.ReactNode;
  }> = ({ icon, title, subtitle, children }) => (
    <View style={styles.settingRow}>
      <View style={styles.settingLeft}>
        <Text style={styles.settingIcon}>{icon}</Text>
        <View style={styles.settingInfo}>
          <Text style={[styles.settingTitle, settings.largeText && styles.largeText]}>{title}</Text>
          {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
        </View>
      </View>
      <View style={styles.settingRight}>{children}</View>
    </View>
  );

  const ColorblindOption: React.FC<{ mode: AccessibilitySettings['colorblindMode']; label: string }> = ({
    mode,
    label,
  }) => (
    <TouchableOpacity
      style={[styles.colorblindOption, settings.colorblindMode === mode && styles.colorblindSelected]}
      onPress={() => updateSetting('colorblindMode', mode)}
    >
      <Text style={[styles.colorblindText, settings.colorblindMode === mode && styles.colorblindTextSelected]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <LinearGradient
          colors={settings.highContrast ? ['#000000', '#1a1a1a'] : ['#1a1a3e', '#0d0d1a']}
          style={styles.container}
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
              <Text style={styles.closeBtnText}>✕</Text>
            </TouchableOpacity>
            <Text style={[styles.title, settings.largeText && styles.largeTitleText]}>
              ♿ Accessibility
            </Text>
            <View style={{ width: 36 }} />
          </View>

          <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
            {/* Vision Section */}
            <Text style={styles.sectionHeader}>Vision</Text>
            <View style={styles.section}>
              <SettingRow
                icon="🔤"
                title="Large Text"
                subtitle="Increase text size throughout the app"
              >
                <Switch
                  value={settings.largeText}
                  onValueChange={(value) => updateSetting('largeText', value)}
                  trackColor={{ false: '#444', true: '#4ECDC4' }}
                  thumbColor="#FFFFFF"
                />
              </SettingRow>

              <SettingRow
                icon="◐"
                title="High Contrast"
                subtitle="Increase contrast for better visibility"
              >
                <Switch
                  value={settings.highContrast}
                  onValueChange={(value) => updateSetting('highContrast', value)}
                  trackColor={{ false: '#444', true: '#4ECDC4' }}
                  thumbColor="#FFFFFF"
                />
              </SettingRow>
            </View>

            {/* Colorblind Modes */}
            <Text style={styles.sectionHeader}>Colorblind Support</Text>
            <View style={styles.section}>
              <Text style={styles.colorblindLabel}>Select your color vision type:</Text>
              <View style={styles.colorblindOptions}>
                <ColorblindOption mode="none" label="Normal" />
                <ColorblindOption mode="protanopia" label="Red-Blind" />
                <ColorblindOption mode="deuteranopia" label="Green-Blind" />
                <ColorblindOption mode="tritanopia" label="Blue-Blind" />
              </View>
              <View style={styles.colorPreview}>
                <Text style={styles.colorPreviewLabel}>Color preview:</Text>
                <View style={styles.colorSamples}>
                  {getColorSamples(settings.colorblindMode).map((color, index) => (
                    <View key={index} style={[styles.colorSample, { backgroundColor: color }]} />
                  ))}
                </View>
              </View>
            </View>

            {/* Motion Section */}
            <Text style={styles.sectionHeader}>Motion</Text>
            <View style={styles.section}>
              <SettingRow
                icon="🎬"
                title="Reduce Motion"
                subtitle="Minimize animations and transitions"
              >
                <Switch
                  value={settings.reduceMotion}
                  onValueChange={(value) => updateSetting('reduceMotion', value)}
                  trackColor={{ false: '#444', true: '#4ECDC4' }}
                  thumbColor="#FFFFFF"
                />
              </SettingRow>
            </View>

            {/* Feedback Section */}
            <Text style={styles.sectionHeader}>Feedback</Text>
            <View style={styles.section}>
              <SettingRow
                icon="📳"
                title="Haptic Feedback"
                subtitle="Vibration for interactions"
              >
                <Switch
                  value={settings.hapticFeedback}
                  onValueChange={(value) => updateSetting('hapticFeedback', value)}
                  trackColor={{ false: '#444', true: '#4ECDC4' }}
                  thumbColor="#FFFFFF"
                />
              </SettingRow>

              <SettingRow
                icon="🔊"
                title="Sound Feedback"
                subtitle="Audio cues for actions"
              >
                <Switch
                  value={settings.soundFeedback}
                  onValueChange={(value) => updateSetting('soundFeedback', value)}
                  trackColor={{ false: '#444', true: '#4ECDC4' }}
                  thumbColor="#FFFFFF"
                />
              </SettingRow>
            </View>

            {/* Screen Reader */}
            <Text style={styles.sectionHeader}>Screen Reader</Text>
            <View style={styles.section}>
              <SettingRow
                icon="📖"
                title="Screen Reader Mode"
                subtitle="Optimized for VoiceOver/TalkBack"
              >
                <Switch
                  value={settings.screenReaderMode}
                  onValueChange={(value) => updateSetting('screenReaderMode', value)}
                  trackColor={{ false: '#444', true: '#4ECDC4' }}
                  thumbColor="#FFFFFF"
                />
              </SettingRow>
            </View>

            {/* Reset Button */}
            <TouchableOpacity
              style={styles.resetBtn}
              onPress={() => {
                setSettings(DEFAULT_SETTINGS);
                AsyncStorage.setItem('accessibilitySettings', JSON.stringify(DEFAULT_SETTINGS));
                onSettingsChange(DEFAULT_SETTINGS);
              }}
            >
              <Text style={styles.resetBtnText}>Reset to Defaults</Text>
            </TouchableOpacity>
          </ScrollView>
        </LinearGradient>
      </View>
    </Modal>
  );
};

// Helper function to get colorblind-friendly colors
const getColorSamples = (mode: AccessibilitySettings['colorblindMode']): string[] => {
  switch (mode) {
    case 'protanopia':
      return ['#0077BB', '#33BBEE', '#EE7733', '#BBBBBB', '#EE3377'];
    case 'deuteranopia':
      return ['#0077BB', '#33BBEE', '#EE7733', '#BBBBBB', '#EE3377'];
    case 'tritanopia':
      return ['#CC3311', '#EE7733', '#009988', '#BBBBBB', '#AA4499'];
    default:
      return ['#FF6B6B', '#4ECDC4', '#FFE66D', '#95E1D3', '#A29BFE'];
  }
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  container: {
    flex: 1,
    marginTop: 50,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeBtnText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  title: {
    fontSize: 20,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  largeTitleText: {
    fontSize: 24,
  },
  scrollView: {
    flex: 1,
    padding: 20,
  },
  sectionHeader: {
    fontSize: 14,
    fontWeight: '700',
    color: '#4ECDC4',
    marginBottom: 12,
    marginTop: 8,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  section: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    marginBottom: 20,
    overflow: 'hidden',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    fontSize: 22,
    marginRight: 14,
  },
  settingInfo: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  largeText: {
    fontSize: 18,
  },
  settingSubtitle: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.5)',
    marginTop: 2,
  },
  settingRight: {
    marginLeft: 12,
  },
  colorblindLabel: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
    padding: 16,
    paddingBottom: 8,
  },
  colorblindOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
    paddingBottom: 8,
  },
  colorblindOption: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginRight: 8,
    marginBottom: 8,
  },
  colorblindSelected: {
    backgroundColor: '#4ECDC4',
  },
  colorblindText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 13,
    fontWeight: '600',
  },
  colorblindTextSelected: {
    color: '#FFFFFF',
  },
  colorPreview: {
    padding: 16,
    paddingTop: 8,
  },
  colorPreviewLabel: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 12,
    marginBottom: 8,
  },
  colorSamples: {
    flexDirection: 'row',
  },
  colorSample: {
    width: 40,
    height: 24,
    borderRadius: 6,
    marginRight: 8,
  },
  resetBtn: {
    marginVertical: 20,
    paddingVertical: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 25,
    alignItems: 'center',
  },
  resetBtnText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default AccessibilityOptions;
