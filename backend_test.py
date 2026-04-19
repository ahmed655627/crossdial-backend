#!/usr/bin/env python3
"""
Backend API Testing for Words of Wonders - Cloud Sync Endpoints
Testing the new cloud sync and user data endpoints
"""

import requests
import json
from datetime import datetime

# Configuration
BASE_URL = "https://crossword-solver-6.preview.emergentagent.com/api"
TEST_DEVICE_ID = "test-device-123"

def test_create_progress():
    """Test POST /api/progress - Create new user progress"""
    print("\n=== Testing POST /api/progress - Create new user progress ===")
    
    url = f"{BASE_URL}/progress"
    payload = {
        "device_id": TEST_DEVICE_ID
    }
    
    try:
        response = requests.post(url, json=payload)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 200:
            data = response.json()
            print("✅ Progress creation successful")
            print(f"   Device ID: {data.get('device_id')}")
            print(f"   Current Level: {data.get('current_level')}")
            print(f"   Coins: {data.get('coins')}")
            print(f"   Daily Streak: {data.get('daily_streak')}")
            return True
        else:
            print(f"❌ Progress creation failed: {response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ Error testing progress creation: {e}")
        return False

def test_sync_progress():
    """Test POST /api/progress/{device_id}/sync - Sync user data with streak calculation"""
    print(f"\n=== Testing POST /api/progress/{TEST_DEVICE_ID}/sync - Sync user data ===")
    
    url = f"{BASE_URL}/progress/{TEST_DEVICE_ID}/sync"
    payload = {
        "total_words_found": 25,
        "total_time_played": 1800,
        "words_found_today": 5
    }
    
    try:
        response = requests.post(url, json=payload)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 200:
            data = response.json()
            print("✅ Progress sync successful")
            print(f"   Daily Streak: {data.get('daily_streak')}")
            print(f"   Best Streak: {data.get('best_streak')}")
            print(f"   Last Login Date: {data.get('last_login_date')}")
            print(f"   Total Words Found: {data.get('total_words_found')}")
            print(f"   Total Time Played: {data.get('total_time_played')}")
            
            # Verify streak logic - first login should set streak to 1
            if data.get('daily_streak') == 1:
                print("✅ Streak logic working correctly - first login sets streak to 1")
            else:
                print(f"⚠️  Streak logic issue - expected 1, got {data.get('daily_streak')}")
            
            return True
        else:
            print(f"❌ Progress sync failed: {response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ Error testing progress sync: {e}")
        return False

def test_update_settings():
    """Test POST /api/progress/{device_id}/update-settings - Update user settings"""
    print(f"\n=== Testing POST /api/progress/{TEST_DEVICE_ID}/update-settings - Update settings ===")
    
    url = f"{BASE_URL}/progress/{TEST_DEVICE_ID}/update-settings"
    
    # Test with query parameters as the endpoint expects
    params = {
        "sound_enabled": True,
        "notifications_enabled": False,
        "avatar": "🎮",
        "theme_preference": "dark",
        "selected_language": "es"
    }
    
    try:
        response = requests.post(url, params=params)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 200:
            data = response.json()
            print("✅ Settings update successful")
            print(f"   Success: {data.get('success')}")
            print(f"   Message: {data.get('message')}")
            return True
        else:
            print(f"❌ Settings update failed: {response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ Error testing settings update: {e}")
        return False

def test_add_achievement():
    """Test POST /api/progress/{device_id}/add-achievement - Add achievement"""
    print(f"\n=== Testing POST /api/progress/{TEST_DEVICE_ID}/add-achievement - Add achievement ===")
    
    url = f"{BASE_URL}/progress/{TEST_DEVICE_ID}/add-achievement"
    
    # Test adding first achievement
    params = {"achievement_id": "first_word_found"}
    
    try:
        response = requests.post(url, params=params)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 200:
            data = response.json()
            print("✅ Achievement addition successful")
            print(f"   Success: {data.get('success')}")
            print(f"   New Achievement: {data.get('new_achievement')}")
            print(f"   Achievement ID: {data.get('achievement_id')}")
            
            # Test adding duplicate achievement
            print("\n--- Testing duplicate achievement prevention ---")
            response2 = requests.post(url, params=params)
            print(f"Status Code: {response2.status_code}")
            print(f"Response: {response2.text}")
            
            if response2.status_code == 200:
                data2 = response2.json()
                if not data2.get('new_achievement'):
                    print("✅ Duplicate achievement prevention working correctly")
                else:
                    print("⚠️  Duplicate achievement was added when it shouldn't have been")
            
            return True
        else:
            print(f"❌ Achievement addition failed: {response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ Error testing achievement addition: {e}")
        return False

def test_get_full_progress():
    """Test GET /api/progress/{device_id}/full - Get full user data"""
    print(f"\n=== Testing GET /api/progress/{TEST_DEVICE_ID}/full - Get full user data ===")
    
    url = f"{BASE_URL}/progress/{TEST_DEVICE_ID}/full"
    
    try:
        response = requests.get(url)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 200:
            data = response.json()
            print("✅ Full progress data retrieval successful")
            print(f"   Device ID: {data.get('device_id')}")
            print(f"   Current Level: {data.get('current_level')}")
            print(f"   Coins: {data.get('coins')}")
            print(f"   Daily Streak: {data.get('daily_streak')}")
            print(f"   Sound Enabled: {data.get('sound_enabled')}")
            print(f"   Notifications Enabled: {data.get('notifications_enabled')}")
            print(f"   Avatar: {data.get('avatar')}")
            print(f"   Theme: {data.get('theme_preference')}")
            print(f"   Language: {data.get('selected_language')}")
            print(f"   Achievements: {data.get('achievements')}")
            print(f"   Total Words Found: {data.get('total_words_found')}")
            print(f"   Total Time Played: {data.get('total_time_played')}")
            
            # Verify all expected fields are present
            expected_fields = [
                'device_id', 'current_level', 'coins', 'hints', 'completed_levels',
                'found_words', 'bonus_words_found', 'daily_streak', 'best_streak',
                'sound_enabled', 'notifications_enabled', 'avatar', 'theme_preference',
                'selected_language', 'achievements', 'total_words_found', 'total_time_played'
            ]
            
            missing_fields = [field for field in expected_fields if field not in data]
            if not missing_fields:
                print("✅ All expected fields present in full progress data")
            else:
                print(f"⚠️  Missing fields in full progress data: {missing_fields}")
            
            return True
        else:
            print(f"❌ Full progress data retrieval failed: {response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ Error testing full progress data retrieval: {e}")
        return False

def verify_settings_persistence():
    """Verify that settings were actually saved by retrieving full progress"""
    print(f"\n=== Verifying Settings Persistence ===")
    
    url = f"{BASE_URL}/progress/{TEST_DEVICE_ID}/full"
    
    try:
        response = requests.get(url)
        if response.status_code == 200:
            data = response.json()
            
            # Check if our settings were saved
            expected_settings = {
                'sound_enabled': True,
                'notifications_enabled': False,
                'avatar': '🎮',
                'theme_preference': 'dark',
                'selected_language': 'es'
            }
            
            all_correct = True
            for key, expected_value in expected_settings.items():
                actual_value = data.get(key)
                if actual_value == expected_value:
                    print(f"✅ {key}: {actual_value} (correct)")
                else:
                    print(f"❌ {key}: expected {expected_value}, got {actual_value}")
                    all_correct = False
            
            if all_correct:
                print("✅ All settings saved correctly")
                return True
            else:
                print("❌ Some settings were not saved correctly")
                return False
        else:
            print(f"❌ Could not verify settings persistence: {response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ Error verifying settings persistence: {e}")
        return False

def main():
    """Run all cloud sync endpoint tests"""
    print("🚀 Starting Cloud Sync Endpoints Testing")
    print(f"Backend URL: {BASE_URL}")
    print(f"Test Device ID: {TEST_DEVICE_ID}")
    
    results = []
    
    # Test all endpoints in sequence
    results.append(("Create Progress", test_create_progress()))
    results.append(("Sync Progress", test_sync_progress()))
    results.append(("Update Settings", test_update_settings()))
    results.append(("Add Achievement", test_add_achievement()))
    results.append(("Get Full Progress", test_get_full_progress()))
    results.append(("Verify Settings Persistence", verify_settings_persistence()))
    
    # Summary
    print("\n" + "="*60)
    print("📊 CLOUD SYNC ENDPOINTS TEST SUMMARY")
    print("="*60)
    
    passed = 0
    failed = 0
    
    for test_name, result in results:
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{test_name:<30} {status}")
        if result:
            passed += 1
        else:
            failed += 1
    
    print(f"\nTotal Tests: {len(results)}")
    print(f"Passed: {passed}")
    print(f"Failed: {failed}")
    
    if failed == 0:
        print("\n🎉 All cloud sync endpoints are working correctly!")
    else:
        print(f"\n⚠️  {failed} test(s) failed. Please check the issues above.")

if __name__ == "__main__":
    main()