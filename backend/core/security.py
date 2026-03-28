from datetime import datetime, timezone, timedelta
from typing import Optional, Dict
import jwt
from passlib.context import CryptContext
from fastapi import Header
from .config import JWT_SECRET, JWT_ALGORITHM, JWT_EXPIRATION_DAYS
from .database import db

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def create_session_token(user_id: str) -> str:
    """Create a JWT token for the user"""
    expiration = datetime.now(timezone.utc) + timedelta(days=JWT_EXPIRATION_DAYS)
    payload = {
        "user_id": user_id,
        "exp": expiration,
        "iat": datetime.now(timezone.utc)
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)

def verify_session_token(token: str) -> Optional[str]:
    """Verify a JWT token and return the user_id"""
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        return payload.get("user_id")
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None

async def get_current_user(authorization: Optional[str] = Header(None)) -> Optional[Dict]:
    """Get current user from Authorization header"""
    if not authorization:
        return None
    
    token = authorization.replace("Bearer ", "") if authorization.startswith("Bearer ") else authorization
    user_id = verify_session_token(token)
    
    if not user_id:
        return None
    
    user = await db.users.find_one({"user_id": user_id}, {"_id": 0})
    return user
