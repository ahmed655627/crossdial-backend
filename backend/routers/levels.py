from fastapi import APIRouter, HTTPException
from typing import List
from models.game import LevelResponse, WordValidationRequest, WordValidationResponse, HintRequest, HintResponse
from core.database import db
from levels_data import LEVEL_DATA
from datetime import datetime

router = APIRouter(tags=["Levels"])

# Word dictionary for validation
VALID_WORDS = set([
    # 3-4 letter words
    "the", "and", "for", "are", "but", "not", "you", "all", "can", "had",
    "her", "was", "one", "our", "out", "day", "get", "has", "him", "his",
    "how", "its", "let", "may", "new", "now", "old", "see", "two", "way",
    "who", "boy", "did", "own", "say", "she", "too", "use", "art", "cat",
    "dog", "eat", "end", "far", "few", "got", "hot", "job", "key", "man",
    "men", "run", "sit", "sun", "top", "try", "war", "win", "yes", "yet",
    "that", "with", "have", "this", "will", "your", "from", "they", "been",
    "call", "come", "each", "find", "give", "good", "hand", "here", "just",
    "know", "last", "life", "like", "long", "look", "made", "make", "most",
    # 5-6 letter words
    "about", "after", "again", "being", "bring", "could", "every", "first",
    "found", "great", "house", "large", "learn", "never", "night", "other",
    "place", "plant", "point", "right", "small", "sound", "spell", "still",
    "across", "action", "actual", "advice", "affect", "afford", "almost",
    "always", "amount", "animal", "appear", "around", "attack", "beauty",
    # Game-specific words
    "wonders", "wonder", "world", "words", "sword", "sworn", "drown",
    "crown", "clown", "blown", "grown", "known", "shown", "tower",
    "pyramid", "sphinx", "egypt", "giza", "rome", "roman", "italy",
    "paris", "france", "london", "england", "china", "wall", "great",
    "machu", "picchu", "peru", "india", "taj", "mahal", "petra",
    "jordan", "christ", "rio", "brazil", "colosseum", "arena",
    "ancient", "stone", "stones", "temple", "temples", "ruin", "ruins",
    "rain", "train", "rant", "tarn", "anti", "lair", "liar", "rail",
    "sand", "sandy", "dusty", "sunny", "dunsy", "synod", "daunt", "stun",
    "sun", "dun", "tan", "ant", "sat", "sad", "ads", "nut", "nuts", "stud"
])

@router.get("/levels", response_model=List[LevelResponse])
async def get_all_levels():
    """Get all available levels"""
    return [{
        "id": level["id"],
        "wonder": level["wonder"],
        "location": level["location"],
        "letters": level["letters"],
        "targetWords": level["targetWords"],
        "grid": level["grid"],
        "bonusWords": level.get("bonusWords", [])
    } for level in LEVEL_DATA]

@router.get("/levels/{level_id}", response_model=LevelResponse)
async def get_level(level_id: int):
    """Get a specific level by ID"""
    for level in LEVEL_DATA:
        if level["id"] == level_id:
            return {
                "id": level["id"],
                "wonder": level["wonder"],
                "location": level["location"],
                "letters": level["letters"],
                "targetWords": level["targetWords"],
                "grid": level["grid"],
                "bonusWords": level.get("bonusWords", [])
            }
    raise HTTPException(status_code=404, detail="Level not found")

@router.post("/validate-word", response_model=WordValidationResponse)
async def validate_word(request: WordValidationRequest):
    """Validate if a word is correct for the given level"""
    word = request.word.upper()
    level_id = request.level_id
    
    level = None
    for l in LEVEL_DATA:
        if l["id"] == level_id:
            level = l
            break
    
    if not level:
        raise HTTPException(status_code=404, detail="Level not found")
    
    target_words = [w.upper() for w in level["targetWords"]]
    if word in target_words:
        return WordValidationResponse(
            valid=True,
            is_target_word=True,
            is_bonus_word=False,
            message="Correct! You found a target word."
        )
    
    bonus_words = [w.upper() for w in level.get("bonusWords", [])]
    if word in bonus_words:
        return WordValidationResponse(
            valid=True,
            is_target_word=False,
            is_bonus_word=True,
            message="Bonus word! +5 coins"
        )
    
    if word.lower() in VALID_WORDS:
        return WordValidationResponse(
            valid=True,
            is_target_word=False,
            is_bonus_word=True,
            message="Valid word! +5 coins"
        )
    
    return WordValidationResponse(
        valid=False,
        is_target_word=False,
        is_bonus_word=False,
        message="Not a valid word"
    )

@router.post("/hint", response_model=HintResponse)
async def use_hint(request: HintRequest):
    """Use a hint to reveal a letter (costs 20 coins)"""
    HINT_COST = 20
    
    progress = await db.user_progress.find_one({"device_id": request.device_id})
    if not progress:
        raise HTTPException(status_code=404, detail="Progress not found")
    
    coins = progress.get("coins", 0)
    
    level = None
    for l in LEVEL_DATA:
        if l["id"] == request.level_id:
            level = l
            break
    
    if not level:
        raise HTTPException(status_code=404, detail="Level not found")
    
    found_words = progress.get("found_words", {}).get(str(request.level_id), [])
    found_words = [w.upper() for w in found_words]
    
    for word_info in level["grid"]:
        word = word_info["word"].upper()
        if word not in found_words:
            letter = word[0]
            position = {
                "word": word,
                "row": word_info["row"],
                "col": word_info["col"],
                "direction": word_info["direction"],
                "letterIndex": 0
            }
            
            hints = progress.get("hints", 0)
            if hints > 0:
                await db.user_progress.update_one(
                    {"device_id": request.device_id},
                    {"$set": {
                        "hints": hints - 1,
                        "hints_used": progress.get("hints_used", 0) + 1,
                        "updated_at": datetime.utcnow()
                    }}
                )
                new_coins = coins
            else:
                if coins < HINT_COST:
                    return HintResponse(
                        success=False,
                        coins_remaining=coins,
                        message=f"Not enough coins. You need {HINT_COST} coins for a hint."
                    )
                new_coins = coins - HINT_COST
                await db.user_progress.update_one(
                    {"device_id": request.device_id},
                    {"$set": {
                        "coins": new_coins,
                        "hints_used": progress.get("hints_used", 0) + 1,
                        "updated_at": datetime.utcnow()
                    }}
                )
            
            return HintResponse(
                success=True,
                letter=letter,
                position=position,
                coins_remaining=new_coins,
                message=f"Hint revealed: '{letter}'"
            )
    
    return HintResponse(
        success=False,
        coins_remaining=coins,
        message="All words already found!"
    )
