import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { THEME_PACKS, ThemePack, getUnlockedThemes } from '../data/themePacks';

const { width, height } = Dimensions.get('window');

interface ThemePacksModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectTheme: (themeId: string) => void;
  currentTheme: string;
  currentLevel: number;
  currentCoins: number;
  unlockedAchievements: string[];
}

const ThemePacksModal: React.FC<ThemePacksModalProps> = ({
  visible,
  onClose,
  onSelectTheme,
  currentTheme,
  currentLevel,
  currentCoins,
  unlockedAchievements,
}) => {
  const [selectedPreview, setSelectedPreview] = useState<ThemePack | null>(null);

  const isThemeUnlocked = (theme: ThemePack): boolean => {
    const req = theme.unlockRequirement;
    switch (req.type) {
      case 'level':
        return currentLevel >= (req.value as number);
      case 'coins':
        return currentCoins >= (req.value as number);
      case 'achievement':
        return unlockedAchievements.includes(req.value as string);
      default:
        return false;
    }
  };

  const getUnlockText = (theme: ThemePack): string => {
    const req = theme.unlockRequirement;
    switch (req.type) {
      case 'level':
        return `Reach Level ${req.value}`;
      case 'coins':
        return `Earn ${req.value} coins`;
      case 'achievement':
        return `Unlock achievement`;
      case 'purchase':
        return `Purchase required`;
      default:
        return 'Locked';
    }
  };

  const renderThemeCard = (theme: ThemePack) => {
    const unlocked = isThemeUnlocked(theme);
    const isSelected = currentTheme === theme.id;

    return (
      <TouchableOpacity
        key={theme.id}
        style={[
          styles.themeCard,
          isSelected && styles.themeCardSelected,
          !unlocked && styles.themeCardLocked,
        ]}
        onPress={() => {
          if (unlocked) {
            setSelectedPreview(theme);
          }
        }}
        disabled={!unlocked}
      >
        {/* Theme Preview Gradient */}
        <LinearGradient
          colors={theme.colors.background as [string, string, ...string[]]}
          style={styles.themePreview}
        >
          <Text style={styles.themeIcon}>{theme.icon}</Text>
          {!unlocked && (
            <View style={styles.lockOverlay}>
              <Text style={styles.lockIcon}>🔒</Text>
            </View>
          )}
          {isSelected && (
            <View style={styles.selectedBadge}>
              <Text style={styles.selectedText}>✓</Text>
            </View>
          )}
        </LinearGradient>

        <View style={styles.themeInfo}>
          <Text style={[styles.themeName, !unlocked && styles.textLocked]}>
            {theme.name}
          </Text>
          {unlocked ? (
            <Text style={styles.themeDesc} numberOfLines={1}>
              {theme.description}
            </Text>
          ) : (
            <Text style={styles.unlockText}>{getUnlockText(theme)}</Text>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <LinearGradient
            colors={['#1a1a2e', '#16213e', '#0f3460']}
            style={styles.gradient}
          >
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.title}>🎨 Theme Packs</Text>
              <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
                <Text style={styles.closeText}>✕</Text>
              </TouchableOpacity>
            </View>

            {/* Themes Grid */}
            <ScrollView style={styles.themesContainer}>
              <View style={styles.themesGrid}>
                {THEME_PACKS.map(renderThemeCard)}
              </View>
            </ScrollView>

            {/* Theme Preview Modal */}
            {selectedPreview && (
              <View style={styles.previewContainer}>
                <LinearGradient
                  colors={selectedPreview.colors.background as [string, string, ...string[]]}
                  style={styles.previewGradient}
                >
                  <Text style={styles.previewIcon}>{selectedPreview.icon}</Text>
                  <Text style={[styles.previewName, { color: selectedPreview.colors.text }]}>
                    {selectedPreview.name}
                  </Text>
                  <Text style={[styles.previewDesc, { color: selectedPreview.colors.text }]}>
                    {selectedPreview.description}
                  </Text>

                  {/* Color Swatches */}
                  <View style={styles.swatchRow}>
                    <View style={[styles.swatch, { backgroundColor: selectedPreview.colors.primary }]} />
                    <View style={[styles.swatch, { backgroundColor: selectedPreview.colors.secondary }]} />
                    <View style={[styles.swatch, { backgroundColor: selectedPreview.colors.accent }]} />
                  </View>

                  <View style={styles.previewButtons}>
                    <TouchableOpacity
                      style={styles.cancelBtn}
                      onPress={() => setSelectedPreview(null)}
                    >
                      <Text style={styles.cancelText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.applyBtn,
                        { backgroundColor: selectedPreview.colors.primary },
                      ]}
                      onPress={() => {
                        onSelectTheme(selectedPreview.id);
                        setSelectedPreview(null);
                        onClose();
                      }}
                    >
                      <Text style={styles.applyText}>Apply Theme</Text>
                    </TouchableOpacity>
                  </View>
                </LinearGradient>
              </View>
            )}
          </LinearGradient>
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
  modal: {
    width: width * 0.95,
    height: height * 0.8,
    borderRadius: 20,
    overflow: 'hidden',
  },
  gradient: {
    flex: 1,
    padding: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  closeBtn: {
    padding: 8,
  },
  closeText: {
    fontSize: 24,
    color: '#888',
  },
  themesContainer: {
    flex: 1,
  },
  themesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  themeCard: {
    width: '48%',
    marginBottom: 15,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  themeCardSelected: {
    borderWidth: 2,
    borderColor: '#667eea',
  },
  themeCardLocked: {
    opacity: 0.6,
  },
  themePreview: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  themeIcon: {
    fontSize: 40,
  },
  lockOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lockIcon: {
    fontSize: 30,
  },
  selectedBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#2ecc71',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  themeInfo: {
    padding: 10,
  },
  themeName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
  textLocked: {
    color: '#666',
  },
  themeDesc: {
    fontSize: 11,
    color: '#888',
    marginTop: 2,
  },
  unlockText: {
    fontSize: 10,
    color: '#f39c12',
    marginTop: 2,
  },
  previewContainer: {
    ...StyleSheet.absoluteFillObject,
    margin: 15,
    borderRadius: 20,
    overflow: 'hidden',
  },
  previewGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  previewIcon: {
    fontSize: 60,
    marginBottom: 10,
  },
  previewName: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  previewDesc: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  swatchRow: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  swatch: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 8,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  previewButtons: {
    flexDirection: 'row',
  },
  cancelBtn: {
    paddingVertical: 12,
    paddingHorizontal: 25,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 25,
    marginRight: 10,
  },
  cancelText: {
    color: '#fff',
    fontSize: 16,
  },
  applyBtn: {
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
  },
  applyText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ThemePacksModal;
