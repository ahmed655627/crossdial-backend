from fastapi import APIRouter
from datetime import datetime
from core.database import db

router = APIRouter(tags=["Leaderboard"])

@router.get("/leaderboard")
async def get_leaderboard():
    """Get top players on the leaderboard"""
    players = await db.user_progress.find().sort("total_score", -1).limit(100).to_list(100)
    
    leaderboard = []
    for i, player in enumerate(players):
        leaderboard.append({
            "username": player.get("username", "Player"),
            "score": player.get("total_score", 0),
            "levels_completed": len(player.get("completed_levels", [])),
            "rank": i + 1
        })
    
    return leaderboard

@router.put("/progress/{device_id}/username")
async def update_username(device_id: str, username: str = None):
    """Update user's display name"""
    progress = await db.user_progress.find_one({"device_id": device_id})
    if not progress:
        return {"success": False, "message": "Progress not found"}
    
    if username:
        await db.user_progress.update_one(
            {"device_id": device_id},
            {"$set": {
                "username": username,
                "updated_at": datetime.utcnow()
            }}
        )
    
    return {"success": True}
