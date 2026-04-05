/**
 * Expo Config Plugin to fix react-native-unity-ads Gradle and Java compatibility
 * 
 * This plugin patches the react-native-unity-ads package to:
 * 1. Use 'implementation' instead of deprecated 'compile' keyword for Gradle 7+/8+
 * 2. Update compileSdkVersion to 34 (required for Java 9+ source compilation)
 * 3. Update buildToolsVersion and targetSdkVersion for modern Android builds
 * 4. Migrate from android.support to AndroidX annotations
 * 5. Fix deprecated React Native API methods (remove createJSModules)
 */

const { withDangerousMod } = require('@expo/config-plugins');
const fs = require('fs');
const path = require('path');

function withUnityAdsGradleFix(config) {
  return withDangerousMod(config, [
    'android',
    async (config) => {
      const projectRoot = config.modRequest.projectRoot;
      const unityAdsBasePath = path.join(
        projectRoot,
        'node_modules',
        'react-native-unity-ads',
        'android'
      );
      const unityAdsBuildGradlePath = path.join(unityAdsBasePath, 'build.gradle');
      const unityAdsModulePath = path.join(unityAdsBasePath, 'src', 'main', 'java', 'me', 'th0th', 'rnunityads', 'RNUnityAdsModule.java');
      const unityAdsPackagePath = path.join(unityAdsBasePath, 'src', 'main', 'java', 'me', 'th0th', 'rnunityads', 'RNUnityAdsPackage.java');

      // ============================================
      // PATCH 1: Fix build.gradle
      // ============================================
      if (fs.existsSync(unityAdsBuildGradlePath)) {
        console.log('[withUnityAdsGradleFix] Patching react-native-unity-ads build.gradle...');
        
        let gradleContent = fs.readFileSync(unityAdsBuildGradlePath, 'utf8');
        let patchApplied = false;
        
        // Fix 1a: Replace compile with implementation (Gradle 7+/8+ compatibility)
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
        
        // Fix 1b: Update compileSdkVersion to 34 (required for Java 9+ source)
        if (gradleContent.match(/compileSdkVersion\s+\d+/) && !gradleContent.includes('compileSdkVersion 34')) {
          gradleContent = gradleContent.replace(
            /compileSdkVersion\s+\d+/g,
            'compileSdkVersion 34'
          );
          console.log('[withUnityAdsGradleFix] Patched compileSdkVersion -> 34');
          patchApplied = true;
        }
        
        // Fix 1c: Update buildToolsVersion to match modern Android SDK
        if (gradleContent.match(/buildToolsVersion\s+["']\d+\.\d+\.\d+["']/) && !gradleContent.includes('buildToolsVersion "34.0.0"')) {
          gradleContent = gradleContent.replace(
            /buildToolsVersion\s+["']\d+\.\d+\.\d+["']/g,
            'buildToolsVersion "34.0.0"'
          );
          console.log('[withUnityAdsGradleFix] Patched buildToolsVersion -> 34.0.0');
          patchApplied = true;
        }
        
        // Fix 1d: Update targetSdkVersion to 34
        if (gradleContent.match(/targetSdkVersion\s+\d+/) && !gradleContent.includes('targetSdkVersion 34')) {
          gradleContent = gradleContent.replace(
            /targetSdkVersion\s+\d+/g,
            'targetSdkVersion 34'
          );
          console.log('[withUnityAdsGradleFix] Patched targetSdkVersion -> 34');
          patchApplied = true;
        }
        
        // Fix 1e: Update minSdkVersion to at least 21 (Android 5.0, required for modern builds)
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
          console.log('[withUnityAdsGradleFix] Successfully applied build.gradle patches!');
        } else {
          console.log('[withUnityAdsGradleFix] build.gradle patches already applied');
        }
      } else {
        console.log('[withUnityAdsGradleFix] react-native-unity-ads build.gradle not found, skipping');
      }

      // ============================================
      // PATCH 2: Fix RNUnityAdsModule.java (AndroidX migration)
      // ============================================
      if (fs.existsSync(unityAdsModulePath)) {
        console.log('[withUnityAdsGradleFix] Patching RNUnityAdsModule.java for AndroidX...');
        
        let moduleContent = fs.readFileSync(unityAdsModulePath, 'utf8');
        let modulePatchApplied = false;
        
        // Fix 2a: Replace android.support.annotation with androidx.annotation
        if (moduleContent.includes('import android.support.annotation.Nullable;')) {
          moduleContent = moduleContent.replace(
            'import android.support.annotation.Nullable;',
            'import androidx.annotation.Nullable;'
          );
          console.log('[withUnityAdsGradleFix] Patched android.support.annotation.Nullable -> androidx.annotation.Nullable');
          modulePatchApplied = true;
        }
        
        if (modulePatchApplied) {
          fs.writeFileSync(unityAdsModulePath, moduleContent);
          console.log('[withUnityAdsGradleFix] Successfully applied RNUnityAdsModule.java patches!');
        } else {
          console.log('[withUnityAdsGradleFix] RNUnityAdsModule.java patches already applied');
        }
      } else {
        console.log('[withUnityAdsGradleFix] RNUnityAdsModule.java not found, skipping');
      }

      // ============================================
      // PATCH 3: Fix RNUnityAdsPackage.java (Remove deprecated createJSModules)
      // ============================================
      if (fs.existsSync(unityAdsPackagePath)) {
        console.log('[withUnityAdsGradleFix] Patching RNUnityAdsPackage.java...');
        
        let packageContent = fs.readFileSync(unityAdsPackagePath, 'utf8');
        let packagePatchApplied = false;
        
        // Fix 3a: Remove the JavaScriptModule import (no longer needed)
        if (packageContent.includes('import com.facebook.react.bridge.JavaScriptModule;')) {
          packageContent = packageContent.replace(
            'import com.facebook.react.bridge.JavaScriptModule;\n',
            ''
          );
          console.log('[withUnityAdsGradleFix] Removed JavaScriptModule import');
          packagePatchApplied = true;
        }
        
        // Fix 3b: Remove the entire createJSModules method (it's deprecated and removed from ReactPackage)
        // Match the exact pattern from the file
        const createJSModulesPattern = /\s*@Override\s*\n\s*public List<Class<\? extends JavaScriptModule>> createJSModules\(\) \{\s*\n\s*return Collections\.emptyList\(\);\s*\n\s*\}/;
        if (packageContent.match(createJSModulesPattern)) {
          packageContent = packageContent.replace(createJSModulesPattern, '');
          console.log('[withUnityAdsGradleFix] Removed deprecated createJSModules method');
          packagePatchApplied = true;
        }
        
        if (packagePatchApplied) {
          fs.writeFileSync(unityAdsPackagePath, packageContent);
          console.log('[withUnityAdsGradleFix] Successfully applied RNUnityAdsPackage.java patches!');
        } else {
          console.log('[withUnityAdsGradleFix] RNUnityAdsPackage.java patches already applied or not needed');
        }
      } else {
        console.log('[withUnityAdsGradleFix] RNUnityAdsPackage.java not found, skipping');
      }

      return config;
    },
  ]);
}

module.exports = withUnityAdsGradleFix;
