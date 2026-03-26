import React from 'react';
import { AuthScreen } from '../src/components/AuthScreen';
import { useRouter } from 'expo-router';

export default function Auth() {
  const router = useRouter();

  const handleSkip = () => {
    router.replace('/');
  };

  return <AuthScreen onSkip={handleSkip} />;
}
