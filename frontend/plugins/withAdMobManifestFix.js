const { withAndroidManifest } = require("@expo/config-plugins");

/**
 * Config plugin to fix the DELAY_APP_MEASUREMENT_INIT conflict
 * between the app and react-native-google-mobile-ads
 */
module.exports = function withAdMobManifestFix(config) {
  return withAndroidManifest(config, async (config) => {
    const androidManifest = config.modResults;
    const application = androidManifest.manifest.application?.[0];

    if (application) {
      // Find and update or add the meta-data for DELAY_APP_MEASUREMENT_INIT
      let metaDataArray = application["meta-data"] || [];
      
      // Remove any existing DELAY_APP_MEASUREMENT_INIT entries to avoid conflict
      metaDataArray = metaDataArray.filter(
        (item) =>
          item.$?.["android:name"] !== "com.google.android.gms.ads.DELAY_APP_MEASUREMENT_INIT"
      );

      // Add with tools:replace to override the library's value
      metaDataArray.push({
        $: {
          "android:name": "com.google.android.gms.ads.DELAY_APP_MEASUREMENT_INIT",
          "android:value": "false",
          "tools:replace": "android:value",
        },
      });

      application["meta-data"] = metaDataArray;

      // Ensure tools namespace is declared
      if (!androidManifest.manifest.$["xmlns:tools"]) {
        androidManifest.manifest.$["xmlns:tools"] = "http://schemas.android.com/tools";
      }
    }

    return config;
  });
};
