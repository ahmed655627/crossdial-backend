from fastapi import APIRouter, HTTPException
from typing import List, Dict, Any
from multilingual_levels import (
    MULTILINGUAL_LEVELS,
    LANGUAGE_CONFIG,
    get_levels_by_language,
    get_all_supported_languages,
    get_level_by_language_and_id
)

router = APIRouter(tags=["Multilingual Levels"])

@router.get("/languages")
async def get_supported_languages():
    """Get all supported languages with their metadata"""
    return {
        "languages": [
            {
                "code": code,
                "name": config["name"],
                "flag": config["flag"],
                "direction": config["direction"],
                "levelCount": len(MULTILINGUAL_LEVELS.get(code, []))
            }
            for code, config in LANGUAGE_CONFIG.items()
            if code != "en"  # English is default in main levels
        ]
    }

@router.get("/languages/{language_code}/levels")
async def get_language_levels(language_code: str):
    """Get all levels for a specific language"""
    if language_code not in LANGUAGE_CONFIG:
        raise HTTPException(status_code=404, detail=f"Language '{language_code}' not supported")
    
    levels = get_levels_by_language(language_code)
    if not levels:
        raise HTTPException(status_code=404, detail=f"No levels available for '{language_code}'")
    
    return {
        "language": LANGUAGE_CONFIG[language_code],
        "levels": [{
            "id": level["id"],
            "category": level.get("category", "Puzzle"),
            "theme": level.get("theme", "Challenge"),
            "letters": level["letters"],
            "targetWords": level["targetWords"],
            "grid": level["grid"],
            "bonusWords": level.get("bonusWords", [])
        } for level in levels]
    }

@router.get("/languages/{language_code}/levels/{level_id}")
async def get_language_level(language_code: str, level_id: int):
    """Get a specific level by language and ID"""
    if language_code not in LANGUAGE_CONFIG:
        raise HTTPException(status_code=404, detail=f"Language '{language_code}' not supported")
    
    level = get_level_by_language_and_id(language_code, level_id)
    if not level:
        raise HTTPException(status_code=404, detail=f"Level {level_id} not found for '{language_code}'")
    
    return {
        "language": LANGUAGE_CONFIG[language_code],
        "level": {
            "id": level["id"],
            "category": level.get("category", "Puzzle"),
            "theme": level.get("theme", "Challenge"),
            "letters": level["letters"],
            "targetWords": level["targetWords"],
            "grid": level["grid"],
            "bonusWords": level.get("bonusWords", [])
        }
    }

@router.post("/languages/{language_code}/validate-word")
async def validate_multilingual_word(language_code: str, request: Dict[str, Any]):
    """Validate a word for a specific language level"""
    word = request.get("word", "").upper()
    level_id = request.get("level_id", 1)
    
    if language_code not in LANGUAGE_CONFIG:
        raise HTTPException(status_code=404, detail=f"Language '{language_code}' not supported")
    
    level = get_level_by_language_and_id(language_code, level_id)
    if not level:
        raise HTTPException(status_code=404, detail=f"Level {level_id} not found")
    
    # Check target words
    target_words = [w.upper() for w in level["targetWords"]]
    if word in target_words:
        return {
            "valid": True,
            "is_target_word": True,
            "is_bonus_word": False,
            "message": "Correct! You found a target word."
        }
    
    # Check bonus words
    bonus_words = [w.upper() for w in level.get("bonusWords", [])]
    if word in bonus_words:
        return {
            "valid": True,
            "is_target_word": False,
            "is_bonus_word": True,
            "message": "Bonus word! +5 coins"
        }
    
    return {
        "valid": False,
        "is_target_word": False,
        "is_bonus_word": False,
        "message": "Not a valid word"
    }
