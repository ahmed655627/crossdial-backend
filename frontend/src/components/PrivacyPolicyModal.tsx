import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  Dimensions,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

interface PrivacyPolicyModalProps {
  visible: boolean;
  onClose: () => void;
}

export const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({ visible, onClose }) => {
  const lastUpdated = 'March 26, 2025';
  const appName = 'Words of Wonders';
  const contactEmail = 'privacy@wordsofwonders.app';

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          {/* Header */}
          <LinearGradient
            colors={['#2c3e50', '#34495e']}
            style={styles.header}
          >
            <View style={styles.headerContent}>
              <Ionicons name="shield-checkmark" size={24} color="#27ae60" />
              <Text style={styles.title}>Privacy Policy</Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close-circle" size={32} color="#fff" />
            </TouchableOpacity>
          </LinearGradient>

          <ScrollView 
            style={styles.content} 
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={true}
          >
            <Text style={styles.lastUpdated}>Last Updated: {lastUpdated}</Text>

            {/* Introduction */}
            <Text style={styles.sectionTitle}>Welcome to {appName}</Text>
            <Text style={styles.paragraph}>
              This Privacy Policy explains how we collect, use, and protect your information when you use our word puzzle game. We are committed to protecting your privacy, especially for our younger players.
            </Text>

            {/* Children's Privacy - COPPA */}
            <View style={styles.importantSection}>
              <Ionicons name="people" size={20} color="#e74c3c" />
              <Text style={styles.importantTitle}>Children's Privacy (COPPA Compliance)</Text>
            </View>
            <Text style={styles.paragraph}>
              {appName} is designed for players of all ages, including children under 13. We comply with the Children's Online Privacy Protection Act (COPPA) and similar regulations worldwide.
            </Text>
            <Text style={styles.bulletPoint}>• We do not knowingly collect personal information from children under 13 without parental consent</Text>
            <Text style={styles.bulletPoint}>• Ads shown to children are age-appropriate and limited</Text>
            <Text style={styles.bulletPoint}>• We do not allow behavioral advertising for child users</Text>
            <Text style={styles.bulletPoint}>• Parents can contact us to review or delete their child's data</Text>

            {/* Information We Collect */}
            <Text style={styles.sectionTitle}>Information We Collect</Text>
            
            <Text style={styles.subTitle}>Game Progress Data</Text>
            <Text style={styles.bulletPoint}>• Current level and completed levels</Text>
            <Text style={styles.bulletPoint}>• Coins, hints, and in-game achievements</Text>
            <Text style={styles.bulletPoint}>• Words discovered in each level</Text>

            <Text style={styles.subTitle}>Account Information (Optional)</Text>
            <Text style={styles.bulletPoint}>• Email address (if you create an account)</Text>
            <Text style={styles.bulletPoint}>• Display name (if you choose to set one)</Text>

            <Text style={styles.subTitle}>Device Information</Text>
            <Text style={styles.bulletPoint}>• Anonymous device identifier for game progress</Text>
            <Text style={styles.bulletPoint}>• Device type and operating system</Text>

            {/* How We Use Information */}
            <Text style={styles.sectionTitle}>How We Use Your Information</Text>
            <Text style={styles.bulletPoint}>• To save and sync your game progress</Text>
            <Text style={styles.bulletPoint}>• To display leaderboards and rankings</Text>
            <Text style={styles.bulletPoint}>• To show age-appropriate advertisements</Text>
            <Text style={styles.bulletPoint}>• To improve our game and fix issues</Text>
            <Text style={styles.bulletPoint}>• To send game-related notifications (with your permission)</Text>

            {/* Advertising */}
            <Text style={styles.sectionTitle}>Advertising</Text>
            <Text style={styles.paragraph}>
              We show advertisements to support our free game. We use Google AdMob for advertising.
            </Text>
            <Text style={styles.bulletPoint}>• Ads are age-appropriate (rated G for General audiences)</Text>
            <Text style={styles.bulletPoint}>• We do not use behavioral targeting for children</Text>
            <Text style={styles.bulletPoint}>• You can watch optional rewarded ads for in-game rewards</Text>

            {/* Data Sharing */}
            <Text style={styles.sectionTitle}>Data Sharing</Text>
            <Text style={styles.paragraph}>
              We do not sell your personal information. We may share data with:
            </Text>
            <Text style={styles.bulletPoint}>• Service providers who help operate our game</Text>
            <Text style={styles.bulletPoint}>• Advertising partners (limited, non-personal data)</Text>
            <Text style={styles.bulletPoint}>• Legal authorities if required by law</Text>

            {/* Data Security */}
            <Text style={styles.sectionTitle}>Data Security</Text>
            <Text style={styles.paragraph}>
              We implement appropriate security measures to protect your information. Game data is stored securely on our servers. However, no method of transmission over the internet is 100% secure.
            </Text>

            {/* Your Rights */}
            <Text style={styles.sectionTitle}>Your Rights</Text>
            <Text style={styles.paragraph}>You have the right to:</Text>
            <Text style={styles.bulletPoint}>• Access your personal data</Text>
            <Text style={styles.bulletPoint}>• Request deletion of your data</Text>
            <Text style={styles.bulletPoint}>• Opt-out of personalized advertising</Text>
            <Text style={styles.bulletPoint}>• Withdraw consent at any time</Text>

            {/* Contact */}
            <Text style={styles.sectionTitle}>Contact Us</Text>
            <Text style={styles.paragraph}>
              If you have questions about this Privacy Policy or wish to exercise your rights, please contact us:
            </Text>
            <TouchableOpacity 
              style={styles.contactButton}
              onPress={() => Linking.openURL(`mailto:${contactEmail}`)}
            >
              <Ionicons name="mail" size={18} color="#3498db" />
              <Text style={styles.contactText}>{contactEmail}</Text>
            </TouchableOpacity>

            {/* Changes */}
            <Text style={styles.sectionTitle}>Changes to This Policy</Text>
            <Text style={styles.paragraph}>
              We may update this Privacy Policy from time to time. We will notify you of any significant changes through the app or by other means.
            </Text>

            <View style={styles.bottomPadding} />
          </ScrollView>

          {/* Accept Button */}
          <View style={styles.footer}>
            <TouchableOpacity style={styles.acceptButton} onPress={onClose}>
              <Text style={styles.acceptButtonText}>I Understand</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modal: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 40,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  closeButton: {
    padding: 5,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  lastUpdated: {
    fontSize: 12,
    color: '#7f8c8d',
    marginBottom: 15,
    fontStyle: 'italic',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginTop: 20,
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#34495e',
    marginTop: 12,
    marginBottom: 6,
  },
  paragraph: {
    fontSize: 14,
    color: '#555',
    lineHeight: 22,
    marginBottom: 10,
  },
  bulletPoint: {
    fontSize: 14,
    color: '#555',
    lineHeight: 22,
    marginLeft: 10,
    marginBottom: 5,
  },
  importantSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fdf2f2',
    padding: 12,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 10,
    gap: 10,
  },
  importantTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#e74c3c',
    flex: 1,
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f8ff',
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
    gap: 10,
  },
  contactText: {
    fontSize: 14,
    color: '#3498db',
    fontWeight: '500',
  },
  bottomPadding: {
    height: 30,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#ecf0f1',
  },
  acceptButton: {
    backgroundColor: '#27ae60',
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: 'center',
  },
  acceptButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
