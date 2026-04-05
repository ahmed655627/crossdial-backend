/**
 * Expo Config Plugin to fix react-native-unity-ads Gradle compatibility
 * 
 * This plugin patches the react-native-unity-ads build.gradle to:
 * 1. Use 'implementation' instead of deprecated 'compile' keyword for Gradle 7+/8+
 * 2. Update compileSdkVersion to 34 (required for Java 9+ source compilation)
 * 3. Update buildToolsVersion and targetSdkVersion for modern Android builds
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
        let patchApplied = false;
        
        // Fix 1: Replace compile with implementation (Gradle 7+/8+ compatibility)
        if (gradleContent.includes("compile 'com.facebook.react:react-native:+'")) {
          gradleContent = gradleContent.replace(
            /compile 'com\.facebook\.react:react-native:\+'/g,
            "implementation 'com.facebook.react:react-native:+'"
          );
          gradleContent = gradleContent.replace(
            /compile fileTree\(dir: "libs", include: \["\*\.jar"\]\)/g,
            'implementation fileTree(dir: "libs", include: ["*.jar"])'
          );
          console.log('[withUnityAdsGradleFix] Patched compile -> implementation');
          patchApplied = true;
        }
        
        // Fix 2: Update compileSdkVersion to 34 (required for Java 9+ source)
        if (gradleContent.match(/compileSdkVersion\s+\d+/) && !gradleContent.includes('compileSdkVersion 34')) {
          gradleContent = gradleContent.replace(
            /compileSdkVersion\s+\d+/g,
            'compileSdkVersion 34'
          );
          console.log('[withUnityAdsGradleFix] Patched compileSdkVersion -> 34');
          patchApplied = true;
        }
        
        // Fix 3: Update buildToolsVersion to match modern Android SDK
        if (gradleContent.match(/buildToolsVersion\s+["']\d+\.\d+\.\d+["']/) && !gradleContent.includes('buildToolsVersion "34.0.0"')) {
          gradleContent = gradleContent.replace(
            /buildToolsVersion\s+["']\d+\.\d+\.\d+["']/g,
            'buildToolsVersion "34.0.0"'
          );
          console.log('[withUnityAdsGradleFix] Patched buildToolsVersion -> 34.0.0');
          patchApplied = true;
        }
        
        // Fix 4: Update targetSdkVersion to 34
        if (gradleContent.match(/targetSdkVersion\s+\d+/) && !gradleContent.includes('targetSdkVersion 34')) {
          gradleContent = gradleContent.replace(
            /targetSdkVersion\s+\d+/g,
            'targetSdkVersion 34'
          );
          console.log('[withUnityAdsGradleFix] Patched targetSdkVersion -> 34');
          patchApplied = true;
        }
        
        // Fix 5: Update minSdkVersion to at least 21 (Android 5.0, required for modern builds)
        if (gradleContent.match(/minSdkVersion\s+\d+/)) {
          const minSdkMatch = gradleContent.match(/minSdkVersion\s+(\d+)/);
          if (minSdkMatch && parseInt(minSdkMatch[1]) < 21) {
            gradleContent = gradleContent.replace(
              /minSdkVersion\s+\d+/g,
              'minSdkVersion 21'
            );
            console.log('[withUnityAdsGradleFix] Patched minSdkVersion -> 21');
            patchApplied = true;
          }
        }
        
        if (patchApplied) {
          fs.writeFileSync(unityAdsBuildGradlePath, gradleContent);
          console.log('[withUnityAdsGradleFix] Successfully applied all patches!');
        } else {
          console.log('[withUnityAdsGradleFix] All patches already applied or file has unexpected format');
        }
      } else {
        console.log('[withUnityAdsGradleFix] react-native-unity-ads not found, skipping');
      }

      return config;
    },
  ]);
}

module.exports = withUnityAdsGradleFix;
