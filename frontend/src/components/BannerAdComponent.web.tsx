/**
 * Web-only stub for BannerAdComponent
 * Native ads don't work on web preview
 */

import React from 'react';

interface BannerAdComponentProps {
  style?: any;
}

export const BannerAdComponent: React.FC<BannerAdComponentProps> = () => {
  // Return null on web - no ads available
  return null;
};

export default BannerAdComponent;
