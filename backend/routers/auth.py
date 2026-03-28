from fastapi import APIRouter, HTTPException, Header
from typing import Optional
from datetime import datetime, timezone, timedelta
import uuid
import httpx
from models.auth import UserRegister, UserLogin, GoogleCallbackRequest
from core.database import db
from core.security import pwd_context, create_session_token, verify_session_token, get_current_user
from core.config import JWT_EXPIRATION_DAYS

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/register")
async def register(input: UserRegister):
    """Register a new user with email and password"""
    existing = await db.users.find_one({"email": input.email.lower()})
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_password = pwd_context.hash(input.password)
    user_id = f"user_{uuid.uuid4().hex[:12]}"
    
    user = {
        "user_id": user_id,
        "email": input.email.lower(),
        "name": input.name,
        "password_hash": hashed_password,
        "provider": "email",
        "picture": None,
        "created_at": datetime.now(timezone.utc)
    }
    
    await db.users.insert_one(user)
    
    session_token = create_session_token(user_id)
    
    await db.user_sessions.insert_one({
        "user_id": user_id,
        "session_token": session_token,
        "expires_at": datetime.now(timezone.utc) + timedelta(days=JWT_EXPIRATION_DAYS),
        "created_at": datetime.now(timezone.utc)
    })
    
    return {
        "session_token": session_token,
        "user": {
            "user_id": user_id,
            "email": user["email"],
            "name": user["name"],
            "picture": user["picture"],
            "provider": "email"
        }
    }

@router.post("/login")
async def login(input: UserLogin):
    """Login with email and password"""
    user = await db.users.find_one({"email": input.email.lower()}, {"_id": 0})
    
    if not user:
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    if user.get("provider") == "google":
        raise HTTPException(status_code=400, detail="This account uses Google login")
    
    if not pwd_context.verify(input.password, user.get("password_hash", "")):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    session_token = create_session_token(user["user_id"])
    
    await db.user_sessions.insert_one({
        "user_id": user["user_id"],
        "session_token": session_token,
        "expires_at": datetime.now(timezone.utc) + timedelta(days=JWT_EXPIRATION_DAYS),
        "created_at": datetime.now(timezone.utc)
    })
    
    return {
        "session_token": session_token,
        "user": {
            "user_id": user["user_id"],
            "email": user["email"],
            "name": user["name"],
            "picture": user.get("picture"),
            "provider": user.get("provider", "email")
        }
    }

@router.post("/google/callback")
async def google_callback(input: GoogleCallbackRequest):
    """Handle Google OAuth callback"""
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(
                "https://demobackend.emergentagent.com/auth/v1/env/oauth/session-data",
                headers={"X-Session-ID": input.session_id}
            )
            
            if response.status_code != 200:
                raise HTTPException(status_code=401, detail="Invalid session")
            
            google_data = response.json()
    except Exception as e:
        raise HTTPException(status_code=401, detail=f"Failed to verify Google session: {str(e)}")
    
    email = google_data.get("email", "").lower()
    name = google_data.get("name", "")
    picture = google_data.get("picture", "")
    
    existing_user = await db.users.find_one({"email": email}, {"_id": 0})
    
    if existing_user:
        user_id = existing_user["user_id"]
        await db.users.update_one(
            {"email": email},
            {"$set": {
                "name": name,
                "picture": picture,
                "provider": "google"
            }}
        )
    else:
        user_id = f"user_{uuid.uuid4().hex[:12]}"
        user = {
            "user_id": user_id,
            "email": email,
            "name": name,
            "picture": picture,
            "provider": "google",
            "created_at": datetime.now(timezone.utc)
        }
        await db.users.insert_one(user)
    
    session_token = create_session_token(user_id)
    
    await db.user_sessions.insert_one({
        "user_id": user_id,
        "session_token": session_token,
        "expires_at": datetime.now(timezone.utc) + timedelta(days=JWT_EXPIRATION_DAYS),
        "created_at": datetime.now(timezone.utc)
    })
    
    return {
        "session_token": session_token,
        "user": {
            "user_id": user_id,
            "email": email,
            "name": name,
            "picture": picture,
            "provider": "google"
        }
    }

@router.get("/me")
async def get_me(authorization: Optional[str] = Header(None)):
    """Get current authenticated user"""
    user = await get_current_user(authorization)
    
    if not user:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    return {
        "user_id": user["user_id"],
        "email": user["email"],
        "name": user["name"],
        "picture": user.get("picture"),
        "provider": user.get("provider", "email")
    }

@router.post("/logout")
async def logout(authorization: Optional[str] = Header(None)):
    """Logout the current user"""
    if authorization:
        token = authorization.replace("Bearer ", "") if authorization.startswith("Bearer ") else authorization
        user_id = verify_session_token(token)
        
        if user_id:
            await db.user_sessions.delete_one({"session_token": token})
    
    return {"success": True}
