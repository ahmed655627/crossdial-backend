import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useAuth } from '../src/contexts/AuthContext';
import { Ionicons } from '@expo/vector-icons';

export default function AuthCallback() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { handleGoogleCallback } = useAuth();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('Processing login...');

  useEffect(() => {
    const processCallback = async () => {
      const sessionId = params.session_id as string;
      
      if (!sessionId) {
        setStatus('error');
        setMessage('No session ID found');
        setTimeout(() => router.replace('/auth'), 2000);
        return;
      }

      try {
        const success = await handleGoogleCallback(sessionId);
        
        if (success) {
          setStatus('success');
          setMessage('Login successful!');
          setTimeout(() => router.replace('/'), 1500);
        } else {
          setStatus('error');
          setMessage('Login failed. Please try again.');
          setTimeout(() => router.replace('/auth'), 2000);
        }
      } catch (error) {
        setStatus('error');
        setMessage('Something went wrong');
        setTimeout(() => router.replace('/auth'), 2000);
      }
    };

    processCallback();
  }, [params.session_id]);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1a1a2e', '#16213e', '#0f3460']}
        style={StyleSheet.absoluteFill}
      />
      
      <View style={styles.content}>
        {status === 'loading' && (
          <ActivityIndicator size="large" color="#FFD700" />
        )}
        {status === 'success' && (
          <Ionicons name="checkmark-circle" size={60} color="#27ae60" />
        )}
        {status === 'error' && (
          <Ionicons name="close-circle" size={60} color="#e74c3c" />
        )}
        
        <Text style={styles.message}>{message}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
    gap: 20,
  },
  message: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
