import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  ScrollView,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';

const { width, height } = Dimensions.get('window');

interface AuthScreenProps {
  onSkip?: () => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ onSkip }) => {
  const { login, register, loginWithGoogle } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async () => {
    setError('');
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    if (!isLogin && !name) {
      setError('Please enter your name');
      return;
    }

    setLoading(true);
    
    try {
      let result;
      if (isLogin) {
        result = await login(email, password);
      } else {
        result = await register(email, password, name);
      }

      if (!result.success) {
        setError(result.error || 'Authentication failed');
      }
    } catch (err) {
      setError('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1a1a2e', '#16213e', '#0f3460']}
        style={StyleSheet.absoluteFill}
      />
      
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Logo/Title */}
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <Ionicons name="globe" size={60} color="#FFD700" />
            </View>
            <Text style={styles.title}>Words of Wonders</Text>
            <Text style={styles.subtitle}>
              {isLogin ? 'Welcome back!' : 'Create your account'}
            </Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            {/* Google Sign In */}
            <TouchableOpacity
              style={styles.googleButton}
              onPress={loginWithGoogle}
              disabled={loading}
            >
              <Ionicons name="logo-google" size={24} color="#fff" />
              <Text style={styles.googleButtonText}>
                Continue with Google
              </Text>
            </TouchableOpacity>

            {/* Divider */}
            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>or</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Name field (register only) */}
            {!isLogin && (
              <View style={styles.inputContainer}>
                <Ionicons name="person" size={20} color="#7f8c8d" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Your name"
                  placeholderTextColor="#7f8c8d"
                  value={name}
                  onChangeText={setName}
                  autoCapitalize="words"
                />
              </View>
            )}

            {/* Email field */}
            <View style={styles.inputContainer}>
              <Ionicons name="mail" size={20} color="#7f8c8d" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Email address"
                placeholderTextColor="#7f8c8d"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {/* Password field */}
            <View style={styles.inputContainer}>
              <Ionicons name="lock-closed" size={20} color="#7f8c8d" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#7f8c8d"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeButton}
              >
                <Ionicons
                  name={showPassword ? 'eye-off' : 'eye'}
                  size={20}
                  color="#7f8c8d"
                />
              </TouchableOpacity>
            </View>

            {/* Error message */}
            {error ? (
              <View style={styles.errorContainer}>
                <Ionicons name="alert-circle" size={18} color="#e74c3c" />
                <Text style={styles.errorText}>{error}</Text>
              </View>
            ) : null}

            {/* Submit button */}
            <TouchableOpacity
              style={[styles.submitButton, loading && styles.submitButtonDisabled]}
              onPress={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.submitButtonText}>
                  {isLogin ? 'Sign In' : 'Create Account'}
                </Text>
              )}
            </TouchableOpacity>

            {/* Toggle login/register */}
            <TouchableOpacity
              style={styles.toggleButton}
              onPress={() => {
                setIsLogin(!isLogin);
                setError('');
              }}
            >
              <Text style={styles.toggleText}>
                {isLogin
                  ? "Don't have an account? "
                  : 'Already have an account? '}
                <Text style={styles.toggleTextBold}>
                  {isLogin ? 'Sign Up' : 'Sign In'}
                </Text>
              </Text>
            </TouchableOpacity>

            {/* Skip button */}
            {onSkip && (
              <TouchableOpacity style={styles.skipButton} onPress={onSkip}>
                <Text style={styles.skipText}>Play as Guest</Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 215, 0, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  form: {
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#db4437',
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  googleButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  dividerText: {
    color: 'rgba(255, 255, 255, 0.5)',
    marginHorizontal: 16,
    fontSize: 14,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    paddingVertical: 16,
  },
  eyeButton: {
    padding: 8,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(231, 76, 60, 0.2)',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    gap: 8,
  },
  errorText: {
    color: '#e74c3c',
    fontSize: 14,
  },
  submitButton: {
    backgroundColor: '#27ae60',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  submitButtonDisabled: {
    opacity: 0.7,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  toggleButton: {
    marginTop: 24,
    alignItems: 'center',
  },
  toggleText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
  },
  toggleTextBold: {
    color: '#FFD700',
    fontWeight: 'bold',
  },
  skipButton: {
    marginTop: 20,
    alignItems: 'center',
    padding: 12,
  },
  skipText: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});
