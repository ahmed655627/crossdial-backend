/**
 * Expo Config Plugin to fix react-native-unity-ads Gradle compatibility
 * 
 * This plugin patches the react-native-unity-ads build.gradle to use 
 * 'implementation' instead of deprecated 'compile' keyword for Gradle 7+/8+
 */

const { withDangerousMod } = require('@expo/config-plugins');
const fs = require('fs');
const path = require('path');

function withUnityAdsGradleFix(config) {
  return withDangerousMod(config, [
    'android',
    async (config) => {
      const projectRoot = config.modRequest.projectRoot;
      const unityAdsBuildGradlePath = path.join(
        projectRoot,
        'node_modules',
        'react-native-unity-ads',
        'android',
        'build.gradle'
      );

      if (fs.existsSync(unityAdsBuildGradlePath)) {
        console.log('[withUnityAdsGradleFix] Patching react-native-unity-ads build.gradle...');
        
        let gradleContent = fs.readFileSync(unityAdsBuildGradlePath, 'utf8');
        
        // Check if already patched
        if (gradleContent.includes("compile 'com.facebook.react:react-native:+'")) {
          // Replace compile with implementation (Gradle 7+/8+ compatibility)
          gradleContent = gradleContent.replace(
            /compile 'com\.facebook\.react:react-native:\+'/g,
            "implementation 'com.facebook.react:react-native:+'"
          );
          gradleContent = gradleContent.replace(
            /compile fileTree\(dir: "libs", include: \["\*\.jar"\]\)/g,
            'implementation fileTree(dir: "libs", include: ["*.jar"])'
          );
          
          fs.writeFileSync(unityAdsBuildGradlePath, gradleContent);
          console.log('[withUnityAdsGradleFix] Successfully patched compile -> implementation');
        } else {
          console.log('[withUnityAdsGradleFix] Already patched or unexpected content');
        }
      } else {
        console.log('[withUnityAdsGradleFix] react-native-unity-ads not found, skipping');
      }

      return config;
    },
  ]);
}

module.exports = withUnityAdsGradleFix;
