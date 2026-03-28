#!/usr/bin/env python3
"""
Backend Authentication Testing for Words of Wonders
Tests all authentication endpoints as specified in the review request
"""

import requests
import json
import sys
from typing import Dict, Any

# Backend URL from frontend .env
BACKEND_URL = "https://crossword-solver-6.preview.emergentagent.com"
BASE_URL = f"{BACKEND_URL}/api"

class AuthTester:
    def __init__(self):
        self.session_token = None
        self.test_user_email = "test@example.com"
        self.test_user_password = "Test123!"
        self.test_user_name = "Test User"
        
    def log_test(self, test_name: str, success: bool, details: str = ""):
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status} {test_name}")
        if details:
            print(f"   Details: {details}")
        print()
        
    def make_request(self, method: str, endpoint: str, data: Dict = None, headers: Dict = None) -> tuple:
        """Make HTTP request and return (success, response_data, status_code)"""
        url = f"{BASE_URL}{endpoint}"
        
        try:
            if method.upper() == "GET":
                response = requests.get(url, headers=headers, timeout=10)
            elif method.upper() == "POST":
                response = requests.post(url, json=data, headers=headers, timeout=10)
            elif method.upper() == "PUT":
                response = requests.put(url, json=data, headers=headers, timeout=10)
            else:
                return False, {"error": f"Unsupported method: {method}"}, 0
                
            try:
                response_data = response.json()
            except:
                response_data = {"text": response.text}
                
            return response.status_code < 400, response_data, response.status_code
            
        except requests.exceptions.RequestException as e:
            return False, {"error": str(e)}, 0
    
    def test_register_new_user(self):
        """Test 1: Register a new user"""
        print("🧪 Testing: Register new user")
        
        data = {
            "email": self.test_user_email,
            "password": self.test_user_password,
            "name": self.test_user_name
        }
        
        success, response, status_code = self.make_request("POST", "/auth/register", data)
        
        if success and status_code == 200:
            if "session_token" in response and "user" in response:
                self.session_token = response["session_token"]
                user = response["user"]
                if (user.get("email") == self.test_user_email.lower() and 
                    user.get("name") == self.test_user_name):
                    self.log_test("Register new user", True, 
                                f"User registered successfully with session_token")
                    return True
                else:
                    self.log_test("Register new user", False, 
                                f"User data mismatch: {user}")
                    return False
            else:
                self.log_test("Register new user", False, 
                            f"Missing session_token or user in response: {response}")
                return False
        else:
            self.log_test("Register new user", False, 
                        f"Status: {status_code}, Response: {response}")
            return False
    
    def test_login_with_registered_user(self):
        """Test 2: Login with the registered user"""
        print("🧪 Testing: Login with registered user")
        
        data = {
            "email": self.test_user_email,
            "password": self.test_user_password
        }
        
        success, response, status_code = self.make_request("POST", "/auth/login", data)
        
        if success and status_code == 200:
            if "session_token" in response and "user" in response:
                self.session_token = response["session_token"]
                user = response["user"]
                if (user.get("email") == self.test_user_email.lower() and 
                    user.get("name") == self.test_user_name):
                    self.log_test("Login with registered user", True, 
                                f"Login successful with session_token")
                    return True
                else:
                    self.log_test("Login with registered user", False, 
                                f"User data mismatch: {user}")
                    return False
            else:
                self.log_test("Login with registered user", False, 
                            f"Missing session_token or user in response: {response}")
                return False
        else:
            self.log_test("Login with registered user", False, 
                        f"Status: {status_code}, Response: {response}")
            return False
    
    def test_get_current_user(self):
        """Test 3: Get current user with token"""
        print("🧪 Testing: Get current user with token")
        
        if not self.session_token:
            self.log_test("Get current user", False, "No session token available")
            return False
            
        headers = {"Authorization": f"Bearer {self.session_token}"}
        success, response, status_code = self.make_request("GET", "/auth/me", headers=headers)
        
        if success and status_code == 200:
            if (response.get("email") == self.test_user_email.lower() and 
                response.get("name") == self.test_user_name):
                self.log_test("Get current user", True, 
                            f"User details retrieved successfully")
                return True
            else:
                self.log_test("Get current user", False, 
                            f"User data mismatch: {response}")
                return False
        else:
            self.log_test("Get current user", False, 
                        f"Status: {status_code}, Response: {response}")
            return False
    
    def test_logout(self):
        """Test 4: Logout"""
        print("🧪 Testing: Logout")
        
        if not self.session_token:
            self.log_test("Logout", False, "No session token available")
            return False
            
        headers = {"Authorization": f"Bearer {self.session_token}"}
        success, response, status_code = self.make_request("POST", "/auth/logout", headers=headers)
        
        if success and status_code == 200:
            if response.get("success") == True:
                self.log_test("Logout", True, "Logout successful")
                return True
            else:
                self.log_test("Logout", False, f"Unexpected response: {response}")
                return False
        else:
            self.log_test("Logout", False, 
                        f"Status: {status_code}, Response: {response}")
            return False
    
    def test_login_wrong_password(self):
        """Test 5: Login with wrong password"""
        print("🧪 Testing: Login with wrong password")
        
        data = {
            "email": self.test_user_email,
            "password": "WrongPassword"
        }
        
        success, response, status_code = self.make_request("POST", "/auth/login", data)
        
        if not success and status_code == 401:
            if "Invalid email or password" in response.get("detail", ""):
                self.log_test("Login with wrong password", True, 
                            f"Correctly rejected with 401 error")
                return True
            else:
                self.log_test("Login with wrong password", False, 
                            f"Wrong error message: {response}")
                return False
        else:
            self.log_test("Login with wrong password", False, 
                        f"Expected 401 error, got Status: {status_code}, Response: {response}")
            return False
    
    def test_register_existing_email(self):
        """Test 6: Register with existing email"""
        print("🧪 Testing: Register with existing email")
        
        data = {
            "email": self.test_user_email,
            "password": "Test456!",
            "name": "Another User"
        }
        
        success, response, status_code = self.make_request("POST", "/auth/register", data)
        
        if not success and status_code == 400:
            if "Email already registered" in response.get("detail", ""):
                self.log_test("Register with existing email", True, 
                            f"Correctly rejected with 400 error")
                return True
            else:
                self.log_test("Register with existing email", False, 
                            f"Wrong error message: {response}")
                return False
        else:
            self.log_test("Register with existing email", False, 
                        f"Expected 400 error, got Status: {status_code}, Response: {response}")
            return False
    
    def run_all_tests(self):
        """Run all authentication tests"""
        print("=" * 60)
        print("🚀 Starting Authentication Flow Tests")
        print("=" * 60)
        print()
        
        test_results = []
        
        # Test 1: Register new user
        test_results.append(self.test_register_new_user())
        
        # Test 2: Login with registered user
        test_results.append(self.test_login_with_registered_user())
        
        # Test 3: Get current user
        test_results.append(self.test_get_current_user())
        
        # Test 4: Logout
        test_results.append(self.test_logout())
        
        # Test 5: Login with wrong password
        test_results.append(self.test_login_wrong_password())
        
        # Test 6: Register with existing email
        test_results.append(self.test_register_existing_email())
        
        # Summary
        print("=" * 60)
        print("📊 TEST SUMMARY")
        print("=" * 60)
        
        passed = sum(test_results)
        total = len(test_results)
        
        print(f"Total Tests: {total}")
        print(f"Passed: {passed}")
        print(f"Failed: {total - passed}")
        print(f"Success Rate: {(passed/total)*100:.1f}%")
        
        if passed == total:
            print("\n🎉 All authentication tests PASSED!")
            return True
        else:
            print(f"\n⚠️  {total - passed} authentication tests FAILED!")
            return False

def main():
    """Main test execution"""
    tester = AuthTester()
    success = tester.run_all_tests()
    
    if success:
        sys.exit(0)
    else:
        sys.exit(1)

if __name__ == "__main__":
    main()