import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView, Switch, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Slider from '@react-native-community/slider';

const { width } = Dimensions.get('window');

interface SettingsScreenProps {
  visible: boolean;
  onClose: () => void;
  settings: {
    soundEnabled: boolean;
    musicEnabled: boolean;
    vibrationEnabled: boolean;
    notificationsEnabled: boolean;
    soundVolume: number;
    musicVolume: number;
    language: string;
    darkMode: boolean;
  };
  onUpdateSettings: (key: string, value: any) => void;
  onShowPrivacyPolicy: () => void;
  onShowLanguageSelector: () => void;
  onResetProgress: () => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  visible,
  onClose,
  settings,
  onUpdateSettings,
  onShowPrivacyPolicy,
  onShowLanguageSelector,
  onResetProgress,
}) => {
  const SettingRow: React.FC<{
    icon: string;
    title: string;
    subtitle?: string;
    children: React.ReactNode;
  }> = ({ icon, title, subtitle, children }) => (
    <View style={styles.settingRow}>
      <View style={styles.settingLeft}>
        <Text style={styles.settingIcon}>{icon}</Text>
        <View>
          <Text style={styles.settingTitle}>{title}</Text>
          {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
        </View>
      </View>
      <View style={styles.settingRight}>{children}</View>
    </View>
  );

  const SectionHeader: React.FC<{ title: string }> = ({ title }) => (
    <Text style={styles.sectionHeader}>{title}</Text>
  );

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <LinearGradient
          colors={['#1a1a3e', '#0d0d1a']}
          style={styles.container}
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
              <Text style={styles.closeBtnText}>✕</Text>
            </TouchableOpacity>
            <Text style={styles.title}>⚙️ Settings</Text>
            <View style={{ width: 36 }} />
          </View>

          <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
            {/* Sound & Music */}
            <SectionHeader title="Sound & Music" />
            <View style={styles.section}>
              <SettingRow icon="🔊" title="Sound Effects">
                <Switch
                  value={settings.soundEnabled}
                  onValueChange={(value) => onUpdateSettings('soundEnabled', value)}
                  trackColor={{ false: '#444', true: '#4ECDC4' }}
                  thumbColor="#FFFFFF"
                />
              </SettingRow>
              {settings.soundEnabled && (
                <View style={styles.sliderContainer}>
                  <Slider
                    style={styles.slider}
                    minimumValue={0}
                    maximumValue={100}
                    value={settings.soundVolume}
                    onValueChange={(value) => onUpdateSettings('soundVolume', value)}
                    minimumTrackTintColor="#4ECDC4"
                    maximumTrackTintColor="#444"
                    thumbTintColor="#FFFFFF"
                  />
                  <Text style={styles.sliderValue}>{Math.round(settings.soundVolume)}%</Text>
                </View>
              )}
              
              <SettingRow icon="🎵" title="Background Music">
                <Switch
                  value={settings.musicEnabled}
                  onValueChange={(value) => onUpdateSettings('musicEnabled', value)}
                  trackColor={{ false: '#444', true: '#4ECDC4' }}
                  thumbColor="#FFFFFF"
                />
              </SettingRow>
              {settings.musicEnabled && (
                <View style={styles.sliderContainer}>
                  <Slider
                    style={styles.slider}
                    minimumValue={0}
                    maximumValue={100}
                    value={settings.musicVolume}
                    onValueChange={(value) => onUpdateSettings('musicVolume', value)}
                    minimumTrackTintColor="#4ECDC4"
                    maximumTrackTintColor="#444"
                    thumbTintColor="#FFFFFF"
                  />
                  <Text style={styles.sliderValue}>{Math.round(settings.musicVolume)}%</Text>
                </View>
              )}
              
              <SettingRow icon="📳" title="Vibration">
                <Switch
                  value={settings.vibrationEnabled}
                  onValueChange={(value) => onUpdateSettings('vibrationEnabled', value)}
                  trackColor={{ false: '#444', true: '#4ECDC4' }}
                  thumbColor="#FFFFFF"
                />
              </SettingRow>
            </View>

            {/* Notifications */}
            <SectionHeader title="Notifications" />
            <View style={styles.section}>
              <SettingRow 
                icon="🔔" 
                title="Push Notifications" 
                subtitle="Daily reminders & events"
              >
                <Switch
                  value={settings.notificationsEnabled}
                  onValueChange={(value) => onUpdateSettings('notificationsEnabled', value)}
                  trackColor={{ false: '#444', true: '#4ECDC4' }}
                  thumbColor="#FFFFFF"
                />
              </SettingRow>
            </View>

            {/* Display */}
            <SectionHeader title="Display" />
            <View style={styles.section}>
              <SettingRow icon="🌙" title="Dark Mode">
                <Switch
                  value={settings.darkMode}
                  onValueChange={(value) => onUpdateSettings('darkMode', value)}
                  trackColor={{ false: '#444', true: '#4ECDC4' }}
                  thumbColor="#FFFFFF"
                />
              </SettingRow>
              
              <TouchableOpacity onPress={onShowLanguageSelector}>
                <SettingRow icon="🌍" title="Language" subtitle={settings.language}>
                  <Text style={styles.chevron}>›</Text>
                </SettingRow>
              </TouchableOpacity>
            </View>

            {/* Account */}
            <SectionHeader title="Account & Data" />
            <View style={styles.section}>
              <TouchableOpacity onPress={onShowPrivacyPolicy}>
                <SettingRow icon="🔒" title="Privacy Policy">
                  <Text style={styles.chevron}>›</Text>
                </SettingRow>
              </TouchableOpacity>
              
              <TouchableOpacity onPress={onResetProgress}>
                <SettingRow icon="🗑️" title="Reset Progress" subtitle="Start fresh (cannot be undone)">
                  <Text style={styles.chevron}>›</Text>
                </SettingRow>
              </TouchableOpacity>
            </View>

            {/* App Info */}
            <View style={styles.appInfo}>
              <Text style={styles.appName}>WonderWordQuest</Text>
              <Text style={styles.appVersion}>Version 1.0.2</Text>
              <Text style={styles.appCopyright}>© 2025 WonderWordQuest</Text>
            </View>
          </ScrollView>
        </LinearGradient>
      </View>
    </Modal>
  );
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
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  settingSubtitle: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.5)',
    marginTop: 2,
  },
  settingRight: {
    marginLeft: 12,
  },
  chevron: {
    fontSize: 24,
    color: 'rgba(255, 255, 255, 0.4)',
    fontWeight: '300',
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 0,
  },
  slider: {
    flex: 1,
    height: 40,
  },
  sliderValue: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 12,
    minWidth: 40,
    textAlign: 'right',
  },
  appInfo: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  appName: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  appVersion: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.5)',
    marginTop: 4,
  },
  appCopyright: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.3)',
    marginTop: 8,
  },
});

export default SettingsScreen;
