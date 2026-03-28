from pydantic import BaseModel
from typing import Optional, Dict, Any

class PushTokenRegister(BaseModel):
    device_id: str
    push_token: str
    platform: str  # "ios", "android", "web"

class NotificationSend(BaseModel):
    user_id: Optional[str] = None
    push_token: Optional[str] = None
    title: str
    body: str
    data: Optional[Dict[str, Any]] = None
