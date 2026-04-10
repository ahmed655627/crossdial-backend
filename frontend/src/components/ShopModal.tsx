/**
 * Shop Modal Component
 * Allows users to purchase coins, hints, and other in-app items
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

interface ShopItem {
  id: string;
  name: string;
  description: string;
  price: string;
  icon: string;
  type: 'coins' | 'hints' | 'premium';
  amount?: number;
}

const SHOP_ITEMS: ShopItem[] = [
  {
    id: 'coins_small',
    name: '100 Coins',
    description: 'Small coin pack',
    price: '$0.99',
    icon: '💎',
    type: 'coins',
    amount: 100,
  },
  {
    id: 'coins_medium',
    name: '500 Coins',
    description: 'Best value!',
    price: '$3.99',
    icon: '💎',
    type: 'coins',
    amount: 500,
  },
  {
    id: 'coins_large',
    name: '1500 Coins',
    description: 'Mega pack',
    price: '$9.99',
    icon: '💎',
    type: 'coins',
    amount: 1500,
  },
  {
    id: 'hints_pack',
    name: '10 Hints',
    description: 'Get unstuck faster',
    price: '$1.99',
    icon: '💡',
    type: 'hints',
    amount: 10,
  },
  {
    id: 'hints_mega',
    name: '30 Hints',
    description: 'Never get stuck',
    price: '$4.99',
    icon: '💡',
    type: 'hints',
    amount: 30,
  },
  {
    id: 'premium_weekly',
    name: 'VIP Week',
    description: 'No ads + 2x rewards',
    price: '$2.99',
    icon: '👑',
    type: 'premium',
  },
  {
    id: 'premium_monthly',
    name: 'VIP Month',
    description: 'No ads + 2x rewards',
    price: '$7.99',
    icon: '👑',
    type: 'premium',
  },
];

interface ShopModalProps {
  visible: boolean;
  onClose: () => void;
  onPurchase?: (item: ShopItem) => void;
  currentCoins: number;
  currentHints: number;
}

const ShopModal: React.FC<ShopModalProps> = ({
  visible,
  onClose,
  onPurchase,
  currentCoins,
  currentHints,
}) => {
  const handlePurchase = (item: ShopItem) => {
    Alert.alert(
      'Purchase',
      `Would you like to purchase ${item.name} for ${item.price}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Buy',
          onPress: () => {
            // In a real app, this would trigger IAP
            Alert.alert('Coming Soon', 'In-app purchases will be available soon!');
            if (onPurchase) onPurchase(item);
          },
        },
      ]
    );
  };

  const renderShopItem = (item: ShopItem) => {
    const gradientColors = 
      item.type === 'coins' ? ['#fbbf24', '#f59e0b'] :
      item.type === 'hints' ? ['#a855f7', '#9333ea'] :
      ['#00b894', '#00cec9'];

    return (
      <TouchableOpacity
        key={item.id}
        style={styles.itemCard}
        onPress={() => handlePurchase(item)}
        activeOpacity={0.8}
      >
        <LinearGradient colors={gradientColors} style={styles.itemIconContainer}>
          <Text style={styles.itemIcon}>{item.icon}</Text>
        </LinearGradient>
        <View style={styles.itemInfo}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemDescription}>{item.description}</Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.priceText}>{item.price}</Text>
        </View>
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
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <LinearGradient
            colors={['#1a1a2e', '#16213e']}
            style={styles.modalContent}
          >
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.title}>Shop</Text>
              <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <Ionicons name="close" size={24} color="#fff" />
              </TouchableOpacity>
            </View>

            {/* Current Balance */}
            <View style={styles.balanceRow}>
              <View style={styles.balanceItem}>
                <Text style={styles.balanceIcon}>💎</Text>
                <Text style={styles.balanceValue}>{currentCoins}</Text>
              </View>
              <View style={styles.balanceItem}>
                <Text style={styles.balanceIcon}>💡</Text>
                <Text style={styles.balanceValue}>{currentHints}</Text>
              </View>
            </View>

            {/* Shop Items */}
            <ScrollView style={styles.itemsList} showsVerticalScrollIndicator={false}>
              <Text style={styles.sectionTitle}>Coins</Text>
              {SHOP_ITEMS.filter(item => item.type === 'coins').map(renderShopItem)}
              
              <Text style={styles.sectionTitle}>Hints</Text>
              {SHOP_ITEMS.filter(item => item.type === 'hints').map(renderShopItem)}
              
              <Text style={styles.sectionTitle}>Premium</Text>
              {SHOP_ITEMS.filter(item => item.type === 'premium').map(renderShopItem)}

              {/* Watch Ad Option */}
              <TouchableOpacity 
                style={styles.watchAdButton}
                onPress={() => Alert.alert('Watch Ad', 'Ad playback coming soon!')}
              >
                <Ionicons name="play-circle" size={24} color="#10b981" />
                <Text style={styles.watchAdText}>Watch Ad for 25 Free Coins</Text>
              </TouchableOpacity>
            </ScrollView>
          </LinearGradient>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    maxHeight: '85%',
  },
  modalContent: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 20,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
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
  balanceRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 12,
    marginHorizontal: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    marginBottom: 16,
  },
  balanceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  balanceIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  balanceValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
  itemsList: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#8892b0',
    marginTop: 16,
    marginBottom: 12,
  },
  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 12,
    marginBottom: 10,
  },
  itemIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemIcon: {
    fontSize: 24,
  },
  itemInfo: {
    flex: 1,
    marginLeft: 12,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
  itemDescription: {
    fontSize: 12,
    color: '#8892b0',
    marginTop: 2,
  },
  priceContainer: {
    backgroundColor: '#00b894',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  priceText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#fff',
  },
  watchAdButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    marginBottom: 20,
  },
  watchAdText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#10b981',
    marginLeft: 8,
  },
});

export default ShopModal;
