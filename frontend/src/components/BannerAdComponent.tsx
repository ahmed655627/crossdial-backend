import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { AD_UNIT_IDS } from '../utils/adManager';

// Dynamic import for banner ad
let BannerAd: any = null;
let BannerAdSize: any = null;

const loadBannerModule = async () => {
  if (Platform.OS === 'web') return false;
  
  try {
    const adsModule = await import('react-native-google-mobile-ads');
    BannerAd = adsModule.BannerAd;
    BannerAdSize = adsModule.BannerAdSize;
    return true;
  } catch (error) {
    console.log('Banner module not available:', error);
    return false;
  }
};

interface BannerAdComponentProps {
  style?: any;
}

export const BannerAdComponent: React.FC<BannerAdComponentProps> = ({ style }) => {
  const [moduleLoaded, setModuleLoaded] = useState(false);
  const [adError, setAdError] = useState(false);

  useEffect(() => {
    const init = async () => {
      const loaded = await loadBannerModule();
      setModuleLoaded(loaded);
    };
    init();
  }, []);

  // Don't render on web or if module failed to load
  if (Platform.OS === 'web' || !moduleLoaded || !BannerAd || adError) {
    return null;
  }

  return (
    <View style={[styles.container, style]}>
      <BannerAd
        unitId={AD_UNIT_IDS.BANNER}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
          keywords: ['game', 'puzzle', 'word'],
        }}
        onAdLoaded={() => {
          console.log('Banner ad loaded');
        }}
        onAdFailedToLoad={(error: any) => {
          console.log('Banner ad failed to load:', error);
          setAdError(true);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
});

export default BannerAdComponent;
