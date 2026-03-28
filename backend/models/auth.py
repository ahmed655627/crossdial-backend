from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime, timezone

class UserRegister(BaseModel):
    email: str
    password: str
    name: str

class UserLogin(BaseModel):
    email: str
    password: str

class GoogleCallbackRequest(BaseModel):
    session_id: str

class User(BaseModel):
    user_id: str
    email: str
    name: str
    picture: Optional[str] = None
    provider: str = "email"
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
