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

export interface VIPBenefit {
  id: string;
  icon: string;
  title: string;
  description: string;
}

const VIP_BENEFITS: VIPBenefit[] = [
  { id: 'no_ads', icon: '🚫', title: 'No Ads', description: 'Play without interruptions' },
  { id: 'unlimited_hints', icon: '♾️', title: 'Unlimited Hints', description: 'Never get stuck again' },
  { id: 'exclusive_themes', icon: '🎨', title: 'Exclusive Themes', description: '10 premium color themes' },
  { id: 'double_coins', icon: '🪙', title: '2X Coins', description: 'Earn double from levels' },
  { id: 'vip_badge', icon: '👑', title: 'VIP Badge', description: 'Stand out on leaderboards' },
  { id: 'early_access', icon: '🚀', title: 'Early Access', description: 'Play new levels first' },
  { id: 'priority_support', icon: '🌟', title: 'Priority Support', description: 'Fast customer service' },
];

export interface VIPPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  savings?: string;
  popular?: boolean;
}

const VIP_PLANS: VIPPlan[] = [
  { id: 'weekly', name: 'Weekly', price: '$2.99', period: '/week' },
  { id: 'monthly', name: 'Monthly', price: '$7.99', period: '/month', savings: 'Save 33%', popular: true },
  { id: 'yearly', name: 'Yearly', price: '$49.99', period: '/year', savings: 'Save 60%' },
];

interface VIPSubscriptionModalProps {
  visible: boolean;
  onClose: () => void;
  onSubscribe: (planId: string) => void;
  isVIP: boolean;
  expiresAt?: string;
}

export const VIPSubscriptionModal: React.FC<VIPSubscriptionModalProps> = ({
  visible,
  onClose,
  onSubscribe,
  isVIP,
  expiresAt,
}) => {
  const [selectedPlan, setSelectedPlan] = useState('monthly');

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <LinearGradient colors={['#fbbf24', '#f59e0b']} style={styles.header}>
              <Text style={styles.crown}>👑</Text>
              <Text style={styles.title}>VIP Membership</Text>
              {isVIP ? (
                <View style={styles.activeBadge}>
                  <Text style={styles.activeText}>✅ Active</Text>
                </View>
              ) : (
                <Text style={styles.subtitle}>Unlock the full experience!</Text>
              )}
            </LinearGradient>

            {/* Benefits */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>VIP Benefits</Text>
              <View style={styles.benefitsGrid}>
                {VIP_BENEFITS.map((benefit) => (
                  <View key={benefit.id} style={styles.benefitCard}>
                    <Text style={styles.benefitIcon}>{benefit.icon}</Text>
                    <Text style={styles.benefitTitle}>{benefit.title}</Text>
                    <Text style={styles.benefitDesc}>{benefit.description}</Text>
                  </View>
                ))}
              </View>
            </View>

            {!isVIP && (
              /* Plans */
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Choose Your Plan</Text>
                {VIP_PLANS.map((plan) => (
                  <TouchableOpacity
                    key={plan.id}
                    style={[
                      styles.planCard,
                      selectedPlan === plan.id && styles.planCardSelected,
                      plan.popular && styles.planCardPopular,
                    ]}
                    onPress={() => setSelectedPlan(plan.id)}
                  >
                    {plan.popular && (
                      <View style={styles.popularBadge}>
                        <Text style={styles.popularText}>MOST POPULAR</Text>
                      </View>
                    )}
                    <View style={styles.planInfo}>
                      <Text style={styles.planName}>{plan.name}</Text>
                      <View style={styles.priceRow}>
                        <Text style={styles.planPrice}>{plan.price}</Text>
                        <Text style={styles.planPeriod}>{plan.period}</Text>
                      </View>
                      {plan.savings && (
                        <Text style={styles.planSavings}>{plan.savings}</Text>
                      )}
                    </View>
                    <View style={[
                      styles.radioOuter,
                      selectedPlan === plan.id && styles.radioOuterSelected,
                    ]}>
                      {selectedPlan === plan.id && <View style={styles.radioInner} />}
                    </View>
                  </TouchableOpacity>
                ))}

                <TouchableOpacity
                  style={styles.subscribeButton}
                  onPress={() => onSubscribe(selectedPlan)}
                >
                  <Text style={styles.subscribeText}>Subscribe Now</Text>
                </TouchableOpacity>

                <Text style={styles.legalText}>
                  Cancel anytime. Subscription auto-renews.
                </Text>
              </View>
            )}

            {isVIP && expiresAt && (
              <View style={styles.statusBox}>
                <Text style={styles.statusText}>Your VIP expires: {expiresAt}</Text>
              </View>
            )}

            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

export const VIPBadge: React.FC<{ small?: boolean }> = ({ small }) => {
  return (
    <LinearGradient
      colors={['#fbbf24', '#f59e0b']}
      style={[styles.vipBadge, small && styles.vipBadgeSmall]}
    >
      <Text style={[styles.vipBadgeText, small && styles.vipBadgeTextSmall]}>VIP</Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.9)',
  },
  scrollContainer: {
    flex: 1,
  },
  container: {
    margin: 16,
    backgroundColor: '#1a1a2e',
    borderRadius: 24,
    overflow: 'hidden',
  },
  header: {
    padding: 32,
    alignItems: 'center',
  },
  crown: {
    fontSize: 64,
    marginBottom: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a1a2e',
  },
  subtitle: {
    color: '#1a1a2e',
    marginTop: 8,
    opacity: 0.8,
  },
  activeBadge: {
    backgroundColor: '#22c55e',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: 12,
  },
  activeText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  benefitsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  benefitCard: {
    width: '48%',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
  },
  benefitIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  benefitTitle: {
    color: '#fff',
    fontWeight: '600',
    marginBottom: 4,
  },
  benefitDesc: {
    color: '#9ca3af',
    fontSize: 11,
    textAlign: 'center',
  },
  planCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  planCardSelected: {
    borderColor: '#fbbf24',
  },
  planCardPopular: {
    position: 'relative',
  },
  popularBadge: {
    position: 'absolute',
    top: -10,
    right: 16,
    backgroundColor: '#22c55e',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  popularText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  planInfo: {
    flex: 1,
  },
  planName: {
    color: '#fff',
    fontWeight: '600',
    marginBottom: 4,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  planPrice: {
    color: '#fbbf24',
    fontSize: 24,
    fontWeight: 'bold',
  },
  planPeriod: {
    color: '#9ca3af',
    marginLeft: 4,
  },
  planSavings: {
    color: '#22c55e',
    fontSize: 12,
    marginTop: 4,
  },
  radioOuter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#9ca3af',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOuterSelected: {
    borderColor: '#fbbf24',
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#fbbf24',
  },
  subscribeButton: {
    backgroundColor: '#fbbf24',
    padding: 18,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  subscribeText: {
    color: '#1a1a2e',
    fontSize: 18,
    fontWeight: 'bold',
  },
  legalText: {
    color: '#9ca3af',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 12,
  },
  statusBox: {
    margin: 20,
    padding: 16,
    backgroundColor: 'rgba(251, 191, 36, 0.1)',
    borderRadius: 12,
  },
  statusText: {
    color: '#fbbf24',
    textAlign: 'center',
  },
  closeButton: {
    padding: 20,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  closeText: {
    color: '#9ca3af',
    fontSize: 16,
  },
  vipBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
  },
  vipBadgeSmall: {
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  vipBadgeText: {
    color: '#1a1a2e',
    fontWeight: 'bold',
    fontSize: 14,
  },
  vipBadgeTextSmall: {
    fontSize: 10,
  },
});

export default VIPSubscriptionModal;
