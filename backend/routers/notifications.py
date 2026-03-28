from fastapi import APIRouter, HTTPException, Header
from typing import Optional
from datetime import datetime, timezone
import httpx
from models.notifications import PushTokenRegister, NotificationSend
from core.database import db

router = APIRouter(prefix="/notifications", tags=["Notifications"])

@router.post("/register")
async def register_push_token(input: PushTokenRegister):
    """Register a device for push notifications"""
    await db.push_tokens.update_one(
        {"device_id": input.device_id},
        {"$set": {
            "push_token": input.push_token,
            "platform": input.platform,
            "updated_at": datetime.now(timezone.utc)
        }},
        upsert=True
    )
    
    return {"success": True}

@router.post("/send")
async def send_notification(input: NotificationSend, authorization: Optional[str] = Header(None)):
    """Send a push notification"""
    push_token = input.push_token
    
    if input.user_id and not push_token:
        token_doc = await db.push_tokens.find_one({"user_id": input.user_id})
        if token_doc:
            push_token = token_doc.get("push_token")
    
    if not push_token:
        raise HTTPException(status_code=400, detail="No push token found")
    
    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(
                "https://exp.host/--/api/v2/push/send",
                json={
                    "to": push_token,
                    "title": input.title,
                    "body": input.body,
                    "data": input.data or {},
                    "sound": "default"
                }
            )
            return {"success": True, "response": response.json()}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to send notification: {str(e)}")

@router.post("/daily-reward")
async def trigger_daily_reward_notification(device_id: str):
    """Send daily reward reminder notification"""
    token_doc = await db.push_tokens.find_one({"device_id": device_id})
    
    if not token_doc:
        return {"success": False, "message": "No push token found"}
    
    try:
        async with httpx.AsyncClient() as client:
            await client.post(
                "https://exp.host/--/api/v2/push/send",
                json={
                    "to": token_doc["push_token"],
                    "title": "Daily Reward Available!",
                    "body": "Spin the wheel to win coins and hints!",
                    "data": {"type": "daily_reward"},
                    "sound": "default"
                }
            )
            return {"success": True}
    except Exception as e:
        return {"success": False, "message": str(e)}

@router.post("/level-unlock")
async def trigger_level_unlock_notification(device_id: str, level: int, wonder_name: str):
    """Send level unlock notification"""
    token_doc = await db.push_tokens.find_one({"device_id": device_id})
    
    if not token_doc:
        return {"success": False, "message": "No push token found"}
    
    try:
        async with httpx.AsyncClient() as client:
            await client.post(
                "https://exp.host/--/api/v2/push/send",
                json={
                    "to": token_doc["push_token"],
                    "title": "New Level Unlocked!",
                    "body": f"Level {level}: {wonder_name} is now available!",
                    "data": {"type": "level_unlock", "level": level},
                    "sound": "default"
                }
            )
            return {"success": True}
    except Exception as e:
        return {"success": False, "message": str(e)}

@router.post("/match-invite")
async def trigger_match_invite_notification(device_id: str, from_player: str):
    """Send multiplayer match invite notification"""
    token_doc = await db.push_tokens.find_one({"device_id": device_id})
    
    if not token_doc:
        return {"success": False, "message": "No push token found"}
    
    try:
        async with httpx.AsyncClient() as client:
            await client.post(
                "https://exp.host/--/api/v2/push/send",
                json={
                    "to": token_doc["push_token"],
                    "title": "Match Invitation",
                    "body": f"{from_player} challenges you to a word battle!",
                    "data": {"type": "match_invite", "from": from_player},
                    "sound": "default"
                }
            )
            return {"success": True}
    except Exception as e:
        return {"success": False, "message": str(e)}
