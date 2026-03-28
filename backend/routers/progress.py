from fastapi import APIRouter, HTTPException
from datetime import datetime
from models.game import UserProgress, UserProgressCreate, UserProgressUpdate
from core.database import db
from levels_data import LEVEL_DATA

router = APIRouter(tags=["Progress"])

@router.post("/progress", response_model=UserProgress)
async def create_or_get_progress(input: UserProgressCreate):
    """Create new progress or get existing progress for a device"""
    existing = await db.user_progress.find_one({"device_id": input.device_id})
    if existing:
        return UserProgress(**existing)
    
    progress = UserProgress(device_id=input.device_id)
    await db.user_progress.insert_one(progress.dict())
    return progress

@router.get("/progress/{device_id}", response_model=UserProgress)
async def get_progress(device_id: str):
    """Get progress for a specific device"""
    progress = await db.user_progress.find_one({"device_id": device_id})
    if not progress:
        raise HTTPException(status_code=404, detail="Progress not found")
    return UserProgress(**progress)

@router.put("/progress/{device_id}", response_model=UserProgress)
async def update_progress(device_id: str, update: UserProgressUpdate):
    """Update progress for a specific device"""
    progress = await db.user_progress.find_one({"device_id": device_id})
    if not progress:
        raise HTTPException(status_code=404, detail="Progress not found")
    
    update_data = {k: v for k, v in update.dict().items() if v is not None}
    update_data["updated_at"] = datetime.utcnow()
    
    await db.user_progress.update_one(
        {"device_id": device_id},
        {"$set": update_data}
    )
    
    updated = await db.user_progress.find_one({"device_id": device_id})
    return UserProgress(**updated)

@router.post("/progress/{device_id}/add-word")
async def add_found_word(device_id: str, level_id: int, word: str, is_bonus: bool = False):
    """Add a found word to user's progress"""
    progress = await db.user_progress.find_one({"device_id": device_id})
    if not progress:
        raise HTTPException(status_code=404, detail="Progress not found")
    
    level_key = str(level_id)
    found_words = progress.get("found_words", {})
    bonus_words = progress.get("bonus_words_found", {})
    coins = progress.get("coins", 100)
    total_bonus = progress.get("total_bonus_words", 0)
    
    word = word.upper()
    
    if is_bonus:
        if level_key not in bonus_words:
            bonus_words[level_key] = []
        if word not in bonus_words[level_key]:
            bonus_words[level_key].append(word)
            coins += 5
            total_bonus += 1
    else:
        if level_key not in found_words:
            found_words[level_key] = []
        if word not in found_words[level_key]:
            found_words[level_key].append(word)
            coins += 10
    
    await db.user_progress.update_one(
        {"device_id": device_id},
        {"$set": {
            "found_words": found_words,
            "bonus_words_found": bonus_words,
            "coins": coins,
            "total_bonus_words": total_bonus,
            "updated_at": datetime.utcnow()
        }}
    )
    
    return {"success": True, "coins": coins, "total_bonus_words": total_bonus}

@router.post("/progress/{device_id}/complete-level")
async def complete_level(device_id: str, level_id: int):
    """Mark a level as completed"""
    progress = await db.user_progress.find_one({"device_id": device_id})
    if not progress:
        raise HTTPException(status_code=404, detail="Progress not found")
    
    completed = progress.get("completed_levels", [])
    current_level = progress.get("current_level", 1)
    coins = progress.get("coins", 100)
    
    if level_id not in completed:
        completed.append(level_id)
        coins += 50
    
    if level_id == current_level and level_id < len(LEVEL_DATA):
        current_level = level_id + 1
    
    await db.user_progress.update_one(
        {"device_id": device_id},
        {"$set": {
            "completed_levels": completed,
            "current_level": current_level,
            "coins": coins,
            "updated_at": datetime.utcnow()
        }}
    )
    
    return {
        "success": True,
        "coins": coins,
        "current_level": current_level,
        "next_level_unlocked": current_level <= len(LEVEL_DATA)
    }

@router.post("/progress/{device_id}/spin-wheel")
async def spin_wheel(device_id: str):
    """Mark that the user has spun the daily wheel (max 6 spins per day)"""
    MAX_DAILY_SPINS = 6
    
    progress = await db.user_progress.find_one({"device_id": device_id})
    if not progress:
        raise HTTPException(status_code=404, detail="Progress not found")
    
    # Check if it's a new day - reset spin count
    last_spin = progress.get("last_wheel_spin")
    daily_spins = progress.get("daily_spin_count", 0)
    
    if last_spin:
        last_spin_date = last_spin.date() if hasattr(last_spin, 'date') else datetime.fromisoformat(str(last_spin).replace('Z', '+00:00')).date()
        today = datetime.utcnow().date()
        
        if last_spin_date < today:
            # New day - reset counter
            daily_spins = 0
    
    # Check if user can spin
    if daily_spins >= MAX_DAILY_SPINS:
        return {"success": False, "message": "No more spins left today!", "spins_remaining": 0}
    
    # Increment spin count
    new_spin_count = daily_spins + 1
    
    await db.user_progress.update_one(
        {"device_id": device_id},
        {"$set": {
            "last_wheel_spin": datetime.utcnow(),
            "daily_spin_count": new_spin_count,
            "updated_at": datetime.utcnow()
        }}
    )
    
    return {
        "success": True, 
        "message": "Wheel spin recorded",
        "spins_remaining": MAX_DAILY_SPINS - new_spin_count,
        "spins_used": new_spin_count
    }

@router.get("/progress/{device_id}/spin-status")
async def get_spin_status(device_id: str):
    """Get current spin status for the day"""
    MAX_DAILY_SPINS = 6
    
    progress = await db.user_progress.find_one({"device_id": device_id})
    if not progress:
        raise HTTPException(status_code=404, detail="Progress not found")
    
    last_spin = progress.get("last_wheel_spin")
    daily_spins = progress.get("daily_spin_count", 0)
    
    if last_spin:
        last_spin_date = last_spin.date() if hasattr(last_spin, 'date') else datetime.fromisoformat(str(last_spin).replace('Z', '+00:00')).date()
        today = datetime.utcnow().date()
        
        if last_spin_date < today:
            # New day - reset counter
            daily_spins = 0
    
    return {
        "spins_remaining": MAX_DAILY_SPINS - daily_spins,
        "spins_used": daily_spins,
        "max_daily_spins": MAX_DAILY_SPINS
    }

@router.post("/progress/{device_id}/add-reward")
async def add_reward(device_id: str, type: str, value: int):
    """Add a reward from the daily wheel"""
    progress = await db.user_progress.find_one({"device_id": device_id})
    if not progress:
        raise HTTPException(status_code=404, detail="Progress not found")
    
    update_data = {"updated_at": datetime.utcnow()}
    
    if type == "coins":
        update_data["coins"] = progress.get("coins", 0) + value
    elif type == "hint":
        update_data["hints"] = progress.get("hints", 0) + value
    
    await db.user_progress.update_one(
        {"device_id": device_id},
        {"$set": update_data}
    )
    
    return {"success": True, "type": type, "value": value}
