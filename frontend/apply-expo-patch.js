/**
 * Combined patch script for EAS builds
 * This script applies all necessary patches including:
 * 1. RCTReleaseLevel patches for Expo SDK 54+
 * 2. patch-package patches for third-party modules (like react-native-unity-ads)
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// ============================================
// PART 1: Apply RCTReleaseLevel patches (Expo SDK 54+)
// ============================================
console.log('Applying RCTReleaseLevel patches...');

const nodeModulesPath = path.join(__dirname, 'node_modules');

// Patch ExpoReactNativeFactory.swift
const expoFactoryPath = path.join(nodeModulesPath, 'expo/ios/Expo/ExpoReactNativeFactory.swift');
if (fs.existsSync(expoFactoryPath)) {
  let content = fs.readFileSync(expoFactoryPath, 'utf8');
  if (!content.includes('// Patched for RCTReleaseLevel')) {
    console.log('Patching ExpoReactNativeFactory.swift...');
    content = content.replace(
      /RCTReleaseLevel\.releaseLevelType/g,
      'RCTReleaseLevel.releaseLevel'
    );
    content = '// Patched for RCTReleaseLevel\n' + content;
    fs.writeFileSync(expoFactoryPath, content);
    console.log('  ExpoReactNativeFactory.swift patched');
  } else {
    console.log('  ExpoReactNativeFactory.swift already patched');
  }
} else {
  console.log('  ExpoReactNativeFactory.swift not found (iOS only)');
}

// Patch EXDevLauncherController.m if present
const devLauncherPath = path.join(nodeModulesPath, 'expo-dev-launcher/ios/EXDevLauncherController.m');
if (fs.existsSync(devLauncherPath)) {
  let content = fs.readFileSync(devLauncherPath, 'utf8');
  if (!content.includes('// Patched for RCTReleaseLevel')) {
    console.log('Patching EXDevLauncherController.m...');
    content = content.replace(
      /RCTReleaseLevel\.releaseLevelType/g,
      'RCTReleaseLevel.releaseLevel'
    );
    content = '// Patched for RCTReleaseLevel\n' + content;
    fs.writeFileSync(devLauncherPath, content);
    console.log('  EXDevLauncherController.m patched');
  } else {
    console.log('  EXDevLauncherController.m already patched');
  }
} else {
  console.log('  EXDevLauncherController.m not found');
}

console.log('RCTReleaseLevel patches applied successfully');

// ============================================
// PART 2: Apply react-native-unity-ads Gradle patch
// ============================================
console.log('\nApplying react-native-unity-ads Gradle patch...');

const unityAdsBuildGradlePath = path.join(
  nodeModulesPath, 
  'react-native-unity-ads/android/build.gradle'
);

if (fs.existsSync(unityAdsBuildGradlePath)) {
  let gradleContent = fs.readFileSync(unityAdsBuildGradlePath, 'utf8');
  
  // Check if already patched
  if (gradleContent.includes("compile 'com.facebook.react:react-native:+'")) {
    console.log('Patching react-native-unity-ads build.gradle...');
    
    // Replace compile with implementation (Gradle 7+ compatibility)
    gradleContent = gradleContent.replace(
      /compile 'com\.facebook\.react:react-native:\+'/g,
      "implementation 'com.facebook.react:react-native:+'"
    );
    gradleContent = gradleContent.replace(
      /compile fileTree\(dir: "libs", include: \["\*\.jar"\]\)/g,
      'implementation fileTree(dir: "libs", include: ["*.jar"])'
    );
    
    fs.writeFileSync(unityAdsBuildGradlePath, gradleContent);
    console.log('  react-native-unity-ads build.gradle patched (compile -> implementation)');
  } else if (gradleContent.includes("implementation 'com.facebook.react:react-native:+'")) {
    console.log('  react-native-unity-ads build.gradle already patched');
  } else {
    console.log('  react-native-unity-ads build.gradle has unexpected content');
  }
} else {
  console.log('  react-native-unity-ads not found (skipping)');
}

// ============================================
// PART 3: Run patch-package if available
// ============================================
console.log('\nRunning patch-package for any additional patches...');

const patchesDir = path.join(__dirname, 'patches');
if (fs.existsSync(patchesDir)) {
  const patches = fs.readdirSync(patchesDir).filter(f => f.endsWith('.patch'));
  if (patches.length > 0) {
    console.log(`Found ${patches.length} patch file(s): ${patches.join(', ')}`);
    try {
      execSync('npx patch-package', { 
        cwd: __dirname, 
        stdio: 'inherit',
        timeout: 60000 
      });
      console.log('patch-package completed successfully');
    } catch (err) {
      // patch-package might fail if patches were already applied inline above
      console.log('patch-package skipped (patches may have been applied inline)');
    }
  } else {
    console.log('No .patch files found in patches directory');
  }
} else {
  console.log('No patches directory found');
}

console.log('\nAll patches applied successfully');
