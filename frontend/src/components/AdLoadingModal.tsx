import React from 'react';
import { View, Text, StyleSheet, Modal, ActivityIndicator, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

interface AdLoadingModalProps {
  visible: boolean;
  message?: string;
}

export const AdLoadingModal: React.FC<AdLoadingModalProps> = ({ 
  visible, 
  message = 'Loading ad...' 
}) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Ionicons name="tv" size={50} color="#3498db" />
          <ActivityIndicator size="large" color="#3498db" style={styles.spinner} />
          <Text style={styles.message}>{message}</Text>
          <Text style={styles.subMessage}>Watch a short ad to continue</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    width: width * 0.8,
    maxWidth: 300,
  },
  spinner: {
    marginTop: 20,
  },
  message: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
    marginTop: 15,
  },
  subMessage: {
    fontSize: 14,
    color: '#7f8c8d',
    marginTop: 5,
  },
});
