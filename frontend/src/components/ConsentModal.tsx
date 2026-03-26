import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Dimensions,
  Switch,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

interface ConsentModalProps {
  visible: boolean;
  onAccept: (adsConsent: boolean) => void;
  onViewPrivacyPolicy: () => void;
}

export const ConsentModal: React.FC<ConsentModalProps> = ({ 
  visible, 
  onAccept,
  onViewPrivacyPolicy 
}) => {
  const [adsConsent, setAdsConsent] = useState(true);

  const handleAccept = () => {
    onAccept(adsConsent);
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
                We collect minimal data to save your game progress and show you age-appropriate ads. We comply with COPPA for children's privacy.
              </Text>
            </View>

            {/* Ads Consent */}
            <View style={styles.consentRow}>
              <View style={styles.consentInfo}>
                <Ionicons name="videocam" size={20} color="#3498db" />
                <View style={styles.consentTextContainer}>
                  <Text style={styles.consentTitle}>Show Ads</Text>
                  <Text style={styles.consentDescription}>
                    Watch optional ads for rewards (coins & hints)
                  </Text>
                </View>
              </View>
              <Switch
                value={adsConsent}
                onValueChange={setAdsConsent}
                trackColor={{ false: '#ddd', true: '#a8e6cf' }}
                thumbColor={adsConsent ? '#27ae60' : '#999'}
              />
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
                Parents: This game is suitable for all ages. We follow strict privacy guidelines for children under 13.
              </Text>
            </View>
          </View>

          {/* Accept Button */}
          <View style={styles.footer}>
            <TouchableOpacity 
              style={styles.acceptButton}
              onPress={handleAccept}
            >
              <Text style={styles.acceptButtonText}>Start Playing!</Text>
              <Ionicons name="play" size={20} color="#fff" />
            </TouchableOpacity>
            
            <Text style={styles.footerNote}>
              By continuing, you agree to our Privacy Policy
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
  consentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
  },
  consentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  consentTextContainer: {
    flex: 1,
  },
  consentTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2c3e50',
  },
  consentDescription: {
    fontSize: 12,
    color: '#7f8c8d',
    marginTop: 2,
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
