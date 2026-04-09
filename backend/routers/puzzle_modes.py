"""
Puzzle Modes Router
Handles puzzle mode progress persistence
"""
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional, Dict, List
from datetime import datetime
from core.database import db

router = APIRouter(prefix="/puzzle-modes", tags=["Puzzle Modes"])

# Models
class PuzzleModeProgress(BaseModel):
    device_id: str
    mode_id: str
    current_level: int = 1
    completed_levels: List[int] = []
    total_score: int = 0
    highest_streak: int = 0
    last_played: Optional[str] = None

class UpdateProgressRequest(BaseModel):
    device_id: str
    mode_id: str
    level_completed: int
    score_earned: int
    streak: int = 0

class GetProgressRequest(BaseModel):
    device_id: str

# Get all puzzle mode progress for a device
@router.get("/progress/{device_id}")
async def get_puzzle_progress(device_id: str):
    """Get all puzzle mode progress for a device"""
    try:
        collection = db.puzzle_mode_progress
        progress_list = await collection.find({"device_id": device_id}).to_list(100)
        
        # Convert MongoDB documents to dict
        result = {}
        for progress in progress_list:
            mode_id = progress.get("mode_id")
            result[mode_id] = {
                "mode_id": mode_id,
                "current_level": progress.get("current_level", 1),
                "completed_levels": progress.get("completed_levels", []),
                "total_score": progress.get("total_score", 0),
                "highest_streak": progress.get("highest_streak", 0),
                "last_played": progress.get("last_played")
            }
        
        return {"success": True, "progress": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Update puzzle mode progress
@router.post("/progress/update")
async def update_puzzle_progress(request: UpdateProgressRequest):
    """Update progress for a specific puzzle mode"""
    try:
        collection = db.puzzle_mode_progress
        
        # Find existing progress
        existing = await collection.find_one({
            "device_id": request.device_id,
            "mode_id": request.mode_id
        })
        
        current_time = datetime.utcnow().isoformat()
        
        if existing:
            # Update existing progress
            completed_levels = existing.get("completed_levels", [])
            if request.level_completed not in completed_levels:
                completed_levels.append(request.level_completed)
            
            new_total_score = existing.get("total_score", 0) + request.score_earned
            new_highest_streak = max(existing.get("highest_streak", 0), request.streak)
            new_current_level = max(existing.get("current_level", 1), request.level_completed + 1)
            
            await collection.update_one(
                {"_id": existing["_id"]},
                {
                    "$set": {
                        "current_level": new_current_level,
                        "completed_levels": completed_levels,
                        "total_score": new_total_score,
                        "highest_streak": new_highest_streak,
                        "last_played": current_time
                    }
                }
            )
            
            return {
                "success": True,
                "message": "Progress updated",
                "progress": {
                    "mode_id": request.mode_id,
                    "current_level": new_current_level,
                    "completed_levels": completed_levels,
                    "total_score": new_total_score,
                    "highest_streak": new_highest_streak
                }
            }
        else:
            # Create new progress
            new_progress = {
                "device_id": request.device_id,
                "mode_id": request.mode_id,
                "current_level": request.level_completed + 1,
                "completed_levels": [request.level_completed],
                "total_score": request.score_earned,
                "highest_streak": request.streak,
                "last_played": current_time,
                "created_at": current_time
            }
            
            await collection.insert_one(new_progress)
            
            return {
                "success": True,
                "message": "Progress created",
                "progress": {
                    "mode_id": request.mode_id,
                    "current_level": request.level_completed + 1,
                    "completed_levels": [request.level_completed],
                    "total_score": request.score_earned,
                    "highest_streak": request.streak
                }
            }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Reset progress for a specific mode
@router.post("/progress/reset")
async def reset_puzzle_progress(device_id: str, mode_id: str):
    """Reset progress for a specific puzzle mode"""
    try:
        collection = db.puzzle_mode_progress
        
        await collection.delete_one({
            "device_id": device_id,
            "mode_id": mode_id
        })
        
        return {"success": True, "message": f"Progress reset for mode {mode_id}"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Get leaderboard for a specific mode
@router.get("/leaderboard/{mode_id}")
async def get_mode_leaderboard(mode_id: str, limit: int = 10):
    """Get top scores for a specific puzzle mode"""
    try:
        collection = db.puzzle_mode_progress
        
        # Find top scores for this mode
        leaderboard = await collection.find(
            {"mode_id": mode_id}
        ).sort("total_score", -1).limit(limit).to_list(limit)
        
        result = []
        for i, entry in enumerate(leaderboard):
            result.append({
                "rank": i + 1,
                "device_id": entry.get("device_id", "")[:8] + "...",  # Partial ID for privacy
                "total_score": entry.get("total_score", 0),
                "completed_levels": len(entry.get("completed_levels", [])),
                "highest_streak": entry.get("highest_streak", 0)
            })
        
        return {"success": True, "leaderboard": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Get stats for all modes
@router.get("/stats/{device_id}")
async def get_puzzle_stats(device_id: str):
    """Get aggregated stats for all puzzle modes"""
    try:
        collection = db.puzzle_mode_progress
        progress_list = await collection.find({"device_id": device_id}).to_list(100)
        
        total_score = 0
        total_completed = 0
        modes_played = 0
        highest_streak = 0
        
        for progress in progress_list:
            total_score += progress.get("total_score", 0)
            total_completed += len(progress.get("completed_levels", []))
            modes_played += 1
            highest_streak = max(highest_streak, progress.get("highest_streak", 0))
        
        return {
            "success": True,
            "stats": {
                "total_score": total_score,
                "total_levels_completed": total_completed,
                "modes_played": modes_played,
                "highest_streak": highest_streak
            }
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
