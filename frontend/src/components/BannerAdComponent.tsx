import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Platform } from 'react-native';

// Import AD_UNIT_IDS directly from constants, not from adManager (which may have native dependencies)
const AD_UNIT_IDS = {
  BANNER: 'ca-app-pub-1991020937935015/3076430560',
};

interface BannerAdComponentProps {
  style?: any;
}

// Native-only implementation - web has its own stub file (BannerAdComponent.web.tsx)
export const BannerAdComponent: React.FC<BannerAdComponentProps> = ({ style }) => {
  const [moduleLoaded, setModuleLoaded] = useState(false);
  const [adError, setAdError] = useState(false);
  const [adModule, setAdModule] = useState<{
    BannerAd: any;
    BannerAdSize: any;
  } | null>(null);

  useEffect(() => {
    // Web platform check - should use .web.tsx file but double check here
    if (Platform.OS === 'web') {
      setAdError(true);
      return;
    }

    const loadModule = async () => {
      try {
        // Dynamic require to avoid bundling issues
        const adsModule = await eval('import("react-native-google-mobile-ads")');
        setAdModule({
          BannerAd: adsModule.BannerAd,
          BannerAdSize: adsModule.BannerAdSize,
        });
        setModuleLoaded(true);
      } catch (error) {
        console.log('Banner module not available:', error);
        setAdError(true);
      }
    };

    loadModule();
  }, []);

  // Don't render if module failed to load or not ready
  if (!moduleLoaded || !adModule || adError) {
    return null;
  }

  const { BannerAd, BannerAdSize } = adModule;

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
