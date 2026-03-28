from fastapi import APIRouter, HTTPException
import random
from datetime import datetime
from models.game import MultiplayerMatch
from core.database import db
from levels_data import LEVEL_DATA

router = APIRouter(prefix="/multiplayer", tags=["Multiplayer"])

# In-memory matchmaking queue
matchmaking_queue = []

@router.post("/search")
async def search_match(device_id: str = None):
    """Search for a multiplayer match"""
    global matchmaking_queue
    
    if not device_id:
        raise HTTPException(status_code=400, detail="device_id required")
    
    if matchmaking_queue and matchmaking_queue[0] != device_id:
        opponent = matchmaking_queue.pop(0)
        
        match = MultiplayerMatch(
            player1=opponent,
            player2=device_id,
            level_id=random.randint(1, min(10, len(LEVEL_DATA))),
            status="playing"
        )
        
        await db.multiplayer_matches.insert_one(match.dict())
        
        return {
            "id": match.id,
            "player1": match.player1,
            "player2": match.player2,
            "level_id": match.level_id,
            "status": "playing",
            "player1_words": [],
            "player2_words": [],
            "player1_score": 0,
            "player2_score": 0
        }
    else:
        if device_id not in matchmaking_queue:
            matchmaking_queue.append(device_id)
        
        return {
            "status": "waiting",
            "message": "Waiting for opponent..."
        }

@router.post("/cancel")
async def cancel_match_search(device_id: str):
    """Cancel match search"""
    global matchmaking_queue
    if device_id in matchmaking_queue:
        matchmaking_queue.remove(device_id)
    return {"success": True}

@router.post("/submit-word")
async def submit_multiplayer_word(match_id: str, device_id: str, word: str):
    """Submit a word in a multiplayer match"""
    match = await db.multiplayer_matches.find_one({"id": match_id})
    if not match:
        raise HTTPException(status_code=404, detail="Match not found")
    
    word = word.upper()
    
    level = None
    for l in LEVEL_DATA:
        if l["id"] == match["level_id"]:
            level = l
            break
    
    if not level:
        raise HTTPException(status_code=404, detail="Level not found")
    
    target_words = [w.upper() for w in level["targetWords"]]
    
    if word not in target_words:
        return {"valid": False, "message": "Invalid word"}
    
    is_player1 = match["player1"] == device_id
    player_words_key = "player1_words" if is_player1 else "player2_words"
    player_score_key = "player1_score" if is_player1 else "player2_score"
    
    current_words = match.get(player_words_key, [])
    
    if word in current_words:
        return {"valid": False, "message": "Word already found"}
    
    current_words.append(word)
    new_score = match.get(player_score_key, 0) + 10
    
    update_data = {
        player_words_key: current_words,
        player_score_key: new_score
    }
    
    if len(current_words) >= len(target_words):
        update_data["status"] = "finished"
        update_data["winner"] = device_id
    
    await db.multiplayer_matches.update_one(
        {"id": match_id},
        {"$set": update_data}
    )
    
    updated_match = await db.multiplayer_matches.find_one({"id": match_id})
    
    return {
        "valid": True,
        "match": {
            "id": updated_match["id"],
            "player1": updated_match["player1"],
            "player2": updated_match["player2"],
            "level_id": updated_match["level_id"],
            "player1_words": updated_match.get("player1_words", []),
            "player2_words": updated_match.get("player2_words", []),
            "player1_score": updated_match.get("player1_score", 0),
            "player2_score": updated_match.get("player2_score", 0),
            "status": updated_match.get("status", "playing"),
            "winner": updated_match.get("winner")
        }
    }

@router.get("/match/{match_id}")
async def get_match(match_id: str):
    """Get current match state"""
    match = await db.multiplayer_matches.find_one({"id": match_id})
    if not match:
        raise HTTPException(status_code=404, detail="Match not found")
    
    return {
        "id": match["id"],
        "player1": match["player1"],
        "player2": match["player2"],
        "level_id": match["level_id"],
        "player1_words": match.get("player1_words", []),
        "player2_words": match.get("player2_words", []),
        "player1_score": match.get("player1_score", 0),
        "player2_score": match.get("player2_score", 0),
        "status": match.get("status", "playing"),
        "winner": match.get("winner")
    }
