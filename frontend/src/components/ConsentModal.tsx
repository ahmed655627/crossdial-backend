import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Dimensions,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

interface ConsentModalProps {
  visible: boolean;
  onAccept: () => void;
  onViewPrivacyPolicy: () => void;
}

export const ConsentModal: React.FC<ConsentModalProps> = ({ 
  visible, 
  onAccept,
  onViewPrivacyPolicy 
}) => {

  const handleAccept = () => {
    onAccept();
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          {/* Header */}
          <LinearGradient
            colors={['#1a1a2e', '#16213e']}
            style={styles.header}
          >
            <Ionicons name="game-controller" size={40} color="#FFD700" />
            <Text style={styles.title}>Welcome!</Text>
            <Text style={styles.subtitle}>Before you start playing</Text>
          </LinearGradient>

          {/* Content */}
          <View style={styles.content}>
            {/* Privacy Notice */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Ionicons name="shield-checkmark" size={22} color="#27ae60" />
                <Text style={styles.sectionTitle}>Your Privacy Matters</Text>
              </View>
              <Text style={styles.sectionText}>
                We collect minimal data to save your game progress. We comply with COPPA for children's privacy.
              </Text>
            </View>

            {/* Ads Notice - No toggle, mandatory */}
            <View style={styles.adsNotice}>
              <Ionicons name="videocam" size={24} color="#3498db" />
              <View style={styles.adsTextContainer}>
                <Text style={styles.adsTitle}>Free to Play with Ads</Text>
                <Text style={styles.adsDescription}>
                  This game is free! Ads help us keep it that way. You'll see age-appropriate ads during gameplay.
                </Text>
              </View>
            </View>

            {/* Privacy Policy Link */}
            <TouchableOpacity 
              style={styles.privacyLink}
              onPress={onViewPrivacyPolicy}
            >
              <Ionicons name="document-text" size={18} color="#3498db" />
              <Text style={styles.privacyLinkText}>Read our Privacy Policy</Text>
              <Ionicons name="chevron-forward" size={18} color="#3498db" />
            </TouchableOpacity>

            {/* Info for Parents */}
            <View style={styles.parentInfo}>
              <Ionicons name="information-circle" size={18} color="#f39c12" />
              <Text style={styles.parentInfoText}>
                Parents: This game is suitable for all ages. Ads shown are child-friendly and age-appropriate.
              </Text>
            </View>
          </View>

          {/* Accept Button */}
          <View style={styles.footer}>
            <TouchableOpacity 
              style={styles.acceptButton}
              onPress={handleAccept}
            >
              <Text style={styles.acceptButtonText}>I Agree & Start Playing!</Text>
              <Ionicons name="play" size={20} color="#fff" />
            </TouchableOpacity>
            
            <Text style={styles.footerNote}>
              By continuing, you agree to our Privacy Policy and to see ads
            </Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: 24,
    width: width * 0.9,
    maxWidth: 400,
    overflow: 'hidden',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 25,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: 5,
  },
  content: {
    padding: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
  },
  sectionText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  adsNotice: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#e3f2fd',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    gap: 12,
  },
  adsTextContainer: {
    flex: 1,
  },
  adsTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1565c0',
    marginBottom: 4,
  },
  adsDescription: {
    fontSize: 13,
    color: '#1976d2',
    lineHeight: 18,
  },
  privacyLink: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    gap: 8,
  },
  privacyLinkText: {
    fontSize: 14,
    color: '#3498db',
    fontWeight: '500',
  },
  parentInfo: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#fff9e6',
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
    gap: 10,
  },
  parentInfoText: {
    flex: 1,
    fontSize: 12,
    color: '#856404',
    lineHeight: 18,
  },
  footer: {
    padding: 20,
    paddingTop: 0,
  },
  acceptButton: {
    backgroundColor: '#27ae60',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 30,
    gap: 10,
  },
  acceptButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footerNote: {
    fontSize: 11,
    color: '#95a5a6',
    textAlign: 'center',
    marginTop: 12,
  },
});
