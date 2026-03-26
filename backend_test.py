#!/usr/bin/env python3
"""
Backend API Test Suite for Words of Wonders Game
Tests all API endpoints with comprehensive validation
"""

import requests
import json
import sys
from typing import Dict, Any, List

# Use the production URL from frontend .env
BASE_URL = "https://crossword-solver-6.preview.emergentagent.com/api"

class BackendTester:
    def __init__(self):
        self.base_url = BASE_URL
        self.test_device_id = "test-device-123"
        self.results = []
        self.session = requests.Session()
        
    def log_result(self, test_name: str, success: bool, message: str, details: Dict = None):
        """Log test result"""
        result = {
            "test": test_name,
            "success": success,
            "message": message,
            "details": details or {}
        }
        self.results.append(result)
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status}: {test_name} - {message}")
        if details and not success:
            print(f"   Details: {details}")
    
    def test_get_all_levels(self):
        """Test GET /api/levels - Should return array of 8 levels"""
        try:
            response = self.session.get(f"{self.base_url}/levels")
            
            if response.status_code != 200:
                self.log_result("GET /api/levels", False, 
                              f"Expected status 200, got {response.status_code}",
                              {"response": response.text})
                return False
            
            data = response.json()
            
            # Validate structure
            if not isinstance(data, list):
                self.log_result("GET /api/levels", False, "Response is not a list")
                return False
            
            if len(data) != 8:
                self.log_result("GET /api/levels", False, 
                              f"Expected 8 levels, got {len(data)}")
                return False
            
            # Validate first level structure
            level = data[0]
            required_fields = ["id", "wonder", "location", "letters", "targetWords", "grid", "bonusWords"]
            for field in required_fields:
                if field not in level:
                    self.log_result("GET /api/levels", False, 
                                  f"Missing field '{field}' in level data")
                    return False
            
            self.log_result("GET /api/levels", True, 
                          f"Successfully returned {len(data)} levels with correct structure")
            return True
            
        except Exception as e:
            self.log_result("GET /api/levels", False, f"Exception: {str(e)}")
            return False
    
    def test_get_specific_level(self):
        """Test GET /api/levels/1 - Should return level 1 data"""
        try:
            response = self.session.get(f"{self.base_url}/levels/1")
            
            if response.status_code != 200:
                self.log_result("GET /api/levels/1", False, 
                              f"Expected status 200, got {response.status_code}",
                              {"response": response.text})
                return False
            
            data = response.json()
            
            # Validate level 1 specific data
            if data.get("id") != 1:
                self.log_result("GET /api/levels/1", False, 
                              f"Expected level id 1, got {data.get('id')}")
                return False
            
            if data.get("wonder") != "Great Pyramid of Giza":
                self.log_result("GET /api/levels/1", False, 
                              f"Expected 'Great Pyramid of Giza', got '{data.get('wonder')}'")
                return False
            
            expected_letters = ["S", "U", "N", "D", "A", "Y"]
            if data.get("letters") != expected_letters:
                self.log_result("GET /api/levels/1", False, 
                              f"Expected letters {expected_letters}, got {data.get('letters')}")
                return False
            
            self.log_result("GET /api/levels/1", True, 
                          "Successfully returned level 1 data with correct structure")
            return True
            
        except Exception as e:
            self.log_result("GET /api/levels/1", False, f"Exception: {str(e)}")
            return False
    
    def test_validate_word_target(self):
        """Test POST /api/validate-word with target word SUN"""
        try:
            payload = {"word": "SUN", "level_id": 1}
            response = self.session.post(f"{self.base_url}/validate-word", json=payload)
            
            if response.status_code != 200:
                self.log_result("POST /api/validate-word (SUN)", False, 
                              f"Expected status 200, got {response.status_code}",
                              {"response": response.text})
                return False
            
            data = response.json()
            
            if not data.get("valid"):
                self.log_result("POST /api/validate-word (SUN)", False, 
                              "SUN should be valid")
                return False
            
            if not data.get("is_target_word"):
                self.log_result("POST /api/validate-word (SUN)", False, 
                              "SUN should be a target word")
                return False
            
            if data.get("is_bonus_word"):
                self.log_result("POST /api/validate-word (SUN)", False, 
                              "SUN should not be a bonus word")
                return False
            
            self.log_result("POST /api/validate-word (SUN)", True, 
                          "SUN correctly validated as target word")
            return True
            
        except Exception as e:
            self.log_result("POST /api/validate-word (SUN)", False, f"Exception: {str(e)}")
            return False
    
    def test_validate_word_bonus(self):
        """Test POST /api/validate-word with bonus word SANDY"""
        try:
            payload = {"word": "SANDY", "level_id": 1}
            response = self.session.post(f"{self.base_url}/validate-word", json=payload)
            
            if response.status_code != 200:
                self.log_result("POST /api/validate-word (SANDY)", False, 
                              f"Expected status 200, got {response.status_code}",
                              {"response": response.text})
                return False
            
            data = response.json()
            
            if not data.get("valid"):
                self.log_result("POST /api/validate-word (SANDY)", False, 
                              "SANDY should be valid")
                return False
            
            if data.get("is_target_word"):
                self.log_result("POST /api/validate-word (SANDY)", False, 
                              "SANDY should not be a target word")
                return False
            
            if not data.get("is_bonus_word"):
                self.log_result("POST /api/validate-word (SANDY)", False, 
                              "SANDY should be a bonus word")
                return False
            
            self.log_result("POST /api/validate-word (SANDY)", True, 
                          "SANDY correctly validated as bonus word")
            return True
            
        except Exception as e:
            self.log_result("POST /api/validate-word (SANDY)", False, f"Exception: {str(e)}")
            return False
    
    def test_validate_word_invalid(self):
        """Test POST /api/validate-word with invalid word XYZ"""
        try:
            payload = {"word": "XYZ", "level_id": 1}
            response = self.session.post(f"{self.base_url}/validate-word", json=payload)
            
            if response.status_code != 200:
                self.log_result("POST /api/validate-word (XYZ)", False, 
                              f"Expected status 200, got {response.status_code}",
                              {"response": response.text})
                return False
            
            data = response.json()
            
            if data.get("valid"):
                self.log_result("POST /api/validate-word (XYZ)", False, 
                              "XYZ should be invalid")
                return False
            
            if data.get("is_target_word"):
                self.log_result("POST /api/validate-word (XYZ)", False, 
                              "XYZ should not be a target word")
                return False
            
            if data.get("is_bonus_word"):
                self.log_result("POST /api/validate-word (XYZ)", False, 
                              "XYZ should not be a bonus word")
                return False
            
            self.log_result("POST /api/validate-word (XYZ)", True, 
                          "XYZ correctly validated as invalid")
            return True
            
        except Exception as e:
            self.log_result("POST /api/validate-word (XYZ)", False, f"Exception: {str(e)}")
            return False
    
    def test_create_progress(self):
        """Test POST /api/progress - Create progress"""
        try:
            payload = {"device_id": self.test_device_id}
            response = self.session.post(f"{self.base_url}/progress", json=payload)
            
            if response.status_code != 200:
                self.log_result("POST /api/progress", False, 
                              f"Expected status 200, got {response.status_code}",
                              {"response": response.text})
                return False
            
            data = response.json()
            
            if data.get("device_id") != self.test_device_id:
                self.log_result("POST /api/progress", False, 
                              f"Expected device_id {self.test_device_id}, got {data.get('device_id')}")
                return False
            
            if data.get("current_level") != 1:
                self.log_result("POST /api/progress", False, 
                              f"Expected current_level 1, got {data.get('current_level')}")
                return False
            
            if data.get("coins") != 100:
                self.log_result("POST /api/progress", False, 
                              f"Expected coins 100, got {data.get('coins')}")
                return False
            
            self.log_result("POST /api/progress", True, 
                          "Progress created successfully with correct initial values")
            return True
            
        except Exception as e:
            self.log_result("POST /api/progress", False, f"Exception: {str(e)}")
            return False
    
    def test_get_progress(self):
        """Test GET /api/progress/{device_id} - Get progress"""
        try:
            response = self.session.get(f"{self.base_url}/progress/{self.test_device_id}")
            
            if response.status_code != 200:
                self.log_result("GET /api/progress/{device_id}", False, 
                              f"Expected status 200, got {response.status_code}",
                              {"response": response.text})
                return False
            
            data = response.json()
            
            if data.get("device_id") != self.test_device_id:
                self.log_result("GET /api/progress/{device_id}", False, 
                              f"Expected device_id {self.test_device_id}, got {data.get('device_id')}")
                return False
            
            self.log_result("GET /api/progress/{device_id}", True, 
                          "Progress retrieved successfully")
            return True
            
        except Exception as e:
            self.log_result("GET /api/progress/{device_id}", False, f"Exception: {str(e)}")
            return False
    
    def test_add_word(self):
        """Test POST /api/progress/{device_id}/add-word - Add found word"""
        try:
            url = f"{self.base_url}/progress/{self.test_device_id}/add-word"
            params = {"level_id": 1, "word": "SUN", "is_bonus": "false"}
            response = self.session.post(url, params=params)
            
            if response.status_code != 200:
                self.log_result("POST /api/progress/{device_id}/add-word", False, 
                              f"Expected status 200, got {response.status_code}",
                              {"response": response.text})
                return False
            
            data = response.json()
            
            if not data.get("success"):
                self.log_result("POST /api/progress/{device_id}/add-word", False, 
                              "Expected success=true")
                return False
            
            # Should have gained coins (initial 100 + 10 for target word)
            if data.get("coins") != 110:
                self.log_result("POST /api/progress/{device_id}/add-word", False, 
                              f"Expected coins 110, got {data.get('coins')}")
                return False
            
            self.log_result("POST /api/progress/{device_id}/add-word", True, 
                          "Word added successfully, coins updated correctly")
            return True
            
        except Exception as e:
            self.log_result("POST /api/progress/{device_id}/add-word", False, f"Exception: {str(e)}")
            return False
    
    def test_complete_level(self):
        """Test POST /api/progress/{device_id}/complete-level - Complete level"""
        try:
            url = f"{self.base_url}/progress/{self.test_device_id}/complete-level"
            params = {"level_id": 1}
            response = self.session.post(url, params=params)
            
            if response.status_code != 200:
                self.log_result("POST /api/progress/{device_id}/complete-level", False, 
                              f"Expected status 200, got {response.status_code}",
                              {"response": response.text})
                return False
            
            data = response.json()
            
            if not data.get("success"):
                self.log_result("POST /api/progress/{device_id}/complete-level", False, 
                              "Expected success=true")
                return False
            
            # Should have gained completion bonus (110 + 50)
            if data.get("coins") != 160:
                self.log_result("POST /api/progress/{device_id}/complete-level", False, 
                              f"Expected coins 160, got {data.get('coins')}")
                return False
            
            # Should advance to level 2
            if data.get("current_level") != 2:
                self.log_result("POST /api/progress/{device_id}/complete-level", False, 
                              f"Expected current_level 2, got {data.get('current_level')}")
                return False
            
            self.log_result("POST /api/progress/{device_id}/complete-level", True, 
                          "Level completed successfully, coins and level updated correctly")
            return True
            
        except Exception as e:
            self.log_result("POST /api/progress/{device_id}/complete-level", False, f"Exception: {str(e)}")
            return False
    
    def test_hint(self):
        """Test POST /api/hint - Use hint"""
        try:
            payload = {"device_id": self.test_device_id, "level_id": 1}
            response = self.session.post(f"{self.base_url}/hint", json=payload)
            
            if response.status_code != 200:
                self.log_result("POST /api/hint", False, 
                              f"Expected status 200, got {response.status_code}",
                              {"response": response.text})
                return False
            
            data = response.json()
            
            if not data.get("success"):
                self.log_result("POST /api/hint", False, 
                              f"Expected success=true, got message: {data.get('message')}")
                return False
            
            # Should have deducted hint cost (160 - 20)
            if data.get("coins_remaining") != 140:
                self.log_result("POST /api/hint", False, 
                              f"Expected coins_remaining 140, got {data.get('coins_remaining')}")
                return False
            
            # Should have revealed a letter
            if not data.get("letter"):
                self.log_result("POST /api/hint", False, 
                              "Expected a letter to be revealed")
                return False
            
            # Should have position information
            if not data.get("position"):
                self.log_result("POST /api/hint", False, 
                              "Expected position information")
                return False
            
            self.log_result("POST /api/hint", True, 
                          f"Hint used successfully, revealed letter '{data.get('letter')}', coins deducted correctly")
            return True
            
        except Exception as e:
            self.log_result("POST /api/hint", False, f"Exception: {str(e)}")
            return False
    
    def run_all_tests(self):
        """Run all backend tests"""
        print(f"🚀 Starting Backend API Tests for Words of Wonders")
        print(f"📍 Testing against: {self.base_url}")
        print("=" * 60)
        
        tests = [
            self.test_get_all_levels,
            self.test_get_specific_level,
            self.test_validate_word_target,
            self.test_validate_word_bonus,
            self.test_validate_word_invalid,
            self.test_create_progress,
            self.test_get_progress,
            self.test_add_word,
            self.test_complete_level,
            self.test_hint
        ]
        
        passed = 0
        failed = 0
        
        for test in tests:
            try:
                if test():
                    passed += 1
                else:
                    failed += 1
            except Exception as e:
                print(f"❌ FAIL: {test.__name__} - Unexpected error: {str(e)}")
                failed += 1
            print()  # Add spacing between tests
        
        print("=" * 60)
        print(f"📊 Test Results: {passed} passed, {failed} failed")
        
        if failed > 0:
            print("\n🔍 Failed Tests Details:")
            for result in self.results:
                if not result["success"]:
                    print(f"   ❌ {result['test']}: {result['message']}")
                    if result["details"]:
                        print(f"      Details: {result['details']}")
        
        return failed == 0

if __name__ == "__main__":
    tester = BackendTester()
    success = tester.run_all_tests()
    sys.exit(0 if success else 1)