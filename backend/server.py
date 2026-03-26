from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
import uuid
from datetime import datetime
import random

# Import level data from separate file
from levels_data import LEVEL_DATA

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Expanded English word dictionary for validation
VALID_WORDS = set([
    # 3 letter words
    "the", "and", "for", "are", "but", "not", "you", "all", "can", "had",
    "her", "was", "one", "our", "out", "day", "get", "has", "him", "his",
    "how", "its", "let", "may", "new", "now", "old", "see", "two", "way",
    "who", "boy", "did", "own", "say", "she", "too", "use", "art", "cat",
    "dog", "eat", "end", "far", "few", "got", "hot", "job", "key", "man",
    "men", "run", "sit", "sun", "top", "try", "war", "win", "yes", "yet",
    "act", "add", "age", "ago", "air", "arm", "ask", "bad", "bag", "bed",
    "big", "bit", "box", "bus", "buy", "car", "cup", "cut", "die", "dry",
    "due", "ear", "egg", "eye", "fan", "fat", "fit", "fix", "fly", "fun",
    "gas", "gun", "guy", "hat", "hit", "ice", "ill", "kid", "lay", "led",
    "leg", "lie", "lip", "lot", "low", "map", "met", "mix", "mom", "mud",
    "net", "nor", "nut", "odd", "oil", "pay", "pen", "pet", "pie", "pin",
    "pot", "put", "ran", "raw", "red", "rid", "row", "sad", "sat", "sea",
    "set", "sir", "six", "sky", "son", "sum", "tea", "ten", "tie", "tip",
    "tom", "toy", "van", "via", "wet", "won", "cap", "cow", "dam", "den",
    "dew", "dim", "dip", "dot", "era", "eve", "fed", "fee", "fig", "fin",
    "foe", "fog", "fur", "gap", "gem", "gin", "gum", "ham", "hen", "hid",
    "hip", "hog", "hop", "hug", "hut", "ink", "inn", "ivy", "jam", "jar",
    "jaw", "jet", "jog", "joy", "jug", "kit", "lab", "lap", "law", "lid",
    "lit", "log", "mad", "mat", "mop", "nap", "nod", "oak", "oar", "ore",
    "owe", "owl", "pad", "pal", "pan", "pat", "paw", "pea", "peg", "pig",
    "pit", "pop", "pub", "pup", "rag", "ram", "rap", "rat", "ray", "rib",
    "rig", "rim", "rip", "rob", "rod", "rot", "rub", "rug", "rut", "sap",
    "saw", "sew", "shy", "sin", "sip", "sob", "sod", "sow", "spy", "tab",
    "tag", "tan", "tap", "tar", "tax", "tin", "tub", "tug", "urn", "wag",
    "web", "wed", "wig", "wit", "woe", "yam", "yap", "zip", "zoo", "ape",
    "bee", "cab", "cud", "cod", "gal", "gee", "cop", "cub", "flo", "toe",
    "ace", "ach", "bah", "gum", "rum", "ton", "tow", "sow", "vow", "wow",
    "aim", "cob", "fad", "jab", "lob", "mob", "nab", "orb", "rib", "sob",
    # 4 letter words
    "that", "with", "have", "this", "will", "your", "from", "they", "been",
    "call", "come", "each", "find", "give", "good", "hand", "here", "just",
    "know", "last", "life", "like", "long", "look", "made", "make", "most",
    "much", "must", "name", "need", "next", "only", "over", "part", "same",
    "such", "take", "than", "them", "then", "time", "very", "want", "well",
    "what", "when", "work", "year", "also", "back", "even", "many", "more",
    "some", "were", "able", "away", "best", "both", "came", "case", "city",
    "down", "fact", "felt", "four", "goes", "gone", "grow", "half", "hard",
    "head", "help", "high", "home", "hour", "idea", "into", "keep", "kept",
    "kind", "knew", "land", "late", "lead", "left", "less", "line", "live",
    "love", "mean", "mind", "move", "near", "once", "open", "past", "play",
    "read", "real", "rest", "room", "said", "seem", "self", "show", "side",
    "soon", "stop", "talk", "tell", "told", "took", "tree", "true", "turn",
    "upon", "used", "view", "walk", "week", "went", "word", "area", "army",
    "baby", "ball", "bank", "bear", "beat", "bill", "bird", "boat", "body",
    "book", "born", "boss", "card", "care", "cold", "cool", "cost", "dark",
    "date", "deal", "dear", "deep", "door", "draw", "drop", "drug", "dust",
    "easy", "edge", "else", "fall", "farm", "fast", "fear", "feel", "fill",
    "film", "fire", "fish", "five", "flat", "food", "foot", "form", "free",
    "full", "fund", "game", "girl", "glad", "goal", "gold", "gray", "grey",
    "hair", "hang", "heat", "held", "hide", "hill", "hold", "hole", "hope",
    "huge", "hunt", "hurt", "jack", "jail", "join", "jump", "jury", "kill",
    "king", "knee", "lack", "lady", "lake", "large", "list", "load", "lock",
    "lone", "lose", "loss", "lost", "luck", "main", "mark", "mass", "meet",
    "milk", "mine", "miss", "moon", "neck", "news", "nice", "none", "note",
    "okay", "pain", "pair", "park", "pass", "path", "pick", "plan", "pool",
    "poor", "pull", "push", "race", "rain", "rise", "risk", "road", "rock",
    "role", "roof", "rule", "safe", "sale", "salt", "sand", "save", "seat",
    "seek", "sell", "send", "ship", "shop", "shot", "shut", "sign", "site",
    "size", "skin", "slow", "soft", "soil", "sold", "song", "sort", "soul",
    "spot", "star", "stay", "step", "sure", "task", "team", "term", "test",
    "thus", "tiny", "town", "trip", "twin", "type", "unit", "user", "wait",
    "wake", "wall", "warm", "wash", "wave", "ways", "wear", "wide", "wife",
    "wild", "wind", "wine", "wish", "wood", "yard", "zero", "zone",
    # 5 letter words
    "about", "after", "again", "being", "bring", "could", "every", "first",
    "found", "great", "house", "large", "learn", "never", "night", "other",
    "place", "plant", "point", "right", "small", "sound", "spell", "still",
    "study", "their", "there", "these", "thing", "think", "three", "under",
    "water", "where", "which", "while", "white", "world", "would", "write",
    "above", "added", "allow", "among", "began", "begin", "below", "black",
    "board", "break", "build", "carry", "cause", "child", "class", "close",
    "color", "cover", "cross", "earth", "enter", "equal", "event", "field",
    "final", "force", "front", "given", "green", "group", "happy", "heart",
    "heavy", "horse", "human", "known", "later", "leave", "level", "light",
    "local", "money", "month", "music", "north", "often", "order", "paper",
    "party", "peace", "phone", "piece", "power", "press", "price", "quick",
    "quite", "reach", "ready", "river", "round", "rules", "serve", "short",
    "shown", "since", "south", "space", "spend", "stand", "start", "state",
    "story", "table", "taken", "today", "total", "town", "trade", "train",
    "tried", "truth", "until", "using", "usual", "value", "voice", "watch",
    "whole", "woman", "words", "works", "wrong", "wrote", "young", "youth",
    "angel", "angry", "apple", "award", "beach", "blood", "brain", "bread",
    "brown", "chair", "cheap", "chest", "chief", "china", "civil", "claim",
    "clean", "clear", "clock", "cloud", "coast", "count", "court", "cream",
    "crime", "crowd", "dance", "death", "doubt", "draft", "dream", "dress",
    "drink", "drive", "early", "enemy", "enjoy", "error", "exact", "exist",
    "extra", "faith", "false", "fault", "favor", "fight", "floor", "focus",
    "fresh", "fruit", "glass", "grace", "grade", "grain", "grand", "grant",
    "grass", "grave", "guess", "guide", "habit", "hello", "hoped", "hotel",
    "hours", "ideal", "image", "index", "inner", "issue", "joint", "judge",
    "knife", "labor", "layer", "legal", "limit", "liver", "loose", "lower",
    "lucky", "lunch", "magic", "major", "maker", "march", "match", "maybe",
    "meant", "media", "metal", "might", "minor", "model", "moral", "motor",
    "mount", "mouth", "movie", "nerve", "noise", "novel", "nurse", "occur",
    "ocean", "offer", "older", "opera", "owner", "paint", "panel", "plain",
    "plane", "plate", "prime", "print", "prior", "proof", "proud", "prove",
    "queen", "radio", "raise", "range", "rapid", "ratio", "react", "refer",
    "relax", "reply", "scale", "scene", "score", "sense", "seven", "shape",
    "share", "sharp", "sheet", "shell", "shift", "shine", "shirt", "shock",
    "shoot", "shore", "sight", "skill", "slave", "sleep", "slide", "smile",
    "smoke", "solid", "solve", "sorry", "speak", "speed", "split", "sport",
    "staff", "stage", "stake", "steam", "steel", "stick", "stock", "stone",
    "store", "storm", "strip", "stuck", "style", "sugar", "sweet", "swing",
    "taste", "teach", "teeth", "theme", "thick", "throw", "tight", "tired",
    "title", "touch", "tough", "tower", "track", "treat", "trend", "trial",
    "tribe", "trick", "truck", "truly", "trust", "twice", "union", "upper",
    "urban", "video", "virus", "visit", "vital", "voter", "waste", "wheel",
    "whose", "woman", "worry", "worse", "worst", "worth", "wound", "yield",
    # 6 letter words
    "across", "action", "actual", "advice", "affect", "afford", "almost",
    "always", "amount", "animal", "appear", "around", "attack", "beauty",
    "become", "before", "behind", "better", "beyond", "border", "bottom",
    "branch", "bridge", "bright", "broken", "budget", "burden", "camera",
    "cancer", "cannot", "career", "center", "centre", "chance", "change",
    "charge", "choice", "choose", "church", "circle", "client", "closed",
    "coffee", "common", "corner", "county", "couple", "course", "create",
    "credit", "crisis", "critic", "custom", "damage", "danger", "debate",
    "decade", "decide", "defeat", "defend", "define", "degree", "demand",
    "depend", "desert", "design", "desire", "detail", "device", "direct",
    "doctor", "dollar", "double", "driver", "during", "easily", "eating",
    "editor", "effect", "effort", "either", "emerge", "enable", "ending",
    "energy", "engage", "engine", "enough", "ensure", "entire", "entity",
    "escape", "estate", "ethnic", "except", "expand", "expect", "expert",
    "extend", "extent", "fabric", "facing", "factor", "failed", "fairly",
    "fallen", "family", "famous", "farmer", "father", "fellow", "female",
    "figure", "finger", "finish", "flight", "follow", "forced", "forest",
    "forget", "formal", "former", "friend", "future", "garden", "gather",
    "gender", "global", "golden", "ground", "growth", "guilty", "handle",
    "happen", "hardly", "health", "heaven", "height", "hidden", "higher",
    "highly", "holder", "honest", "hungry", "hunter", "ignore", "impact",
    "import", "income", "indeed", "injury", "inside", "intend", "invest",
    "island", "itself", "jacket", "jewish", "joined", "junior", "keeper",
    "killed", "killer", "kindly", "knight", "landed", "lately", "latest",
    "latter", "launch", "lawyer", "leader", "league", "legacy", "length",
    "lesson", "letter", "likely", "listen", "little", "living", "longer",
    "losing", "lovely", "mainly", "making", "manage", "manner", "marked",
    "market", "master", "matter", "medium", "member", "memory", "mental",
    "merely", "method", "middle", "miller", "minute", "mirror", "mobile",
    "modern", "moment", "monkey", "mother", "motion", "moving", "murder",
    "muscle", "museum", "myself", "narrow", "nation", "native", "nature",
    "nearby", "nearly", "nobody", "normal", "notice", "notion", "number",
    "object", "obtain", "office", "online", "option", "origin", "others",
    "output", "parent", "partly", "passed", "pastor", "patent", "patron",
    "paying", "people", "period", "permit", "person", "phrase", "picked",
    "planet", "player", "please", "plenty", "pocket", "poetry", "police",
    "policy", "pool", "popular", "prayer", "prefer", "pretty", "prince",
    "prison", "profit", "proper", "proven", "public", "pursue", "raised",
    "random", "rarely", "rather", "rating", "reader", "really", "reason",
    "recall", "recent", "record", "reduce", "reform", "regard", "region",
    "reject", "relate", "relief", "remain", "remind", "remote", "remove",
    "repeat", "report", "resist", "resort", "result", "retain", "retire",
    "return", "reveal", "review", "reward", "richer", "riding", "rising",
    "ritual", "ruling", "runner", "sacred", "safety", "salary", "sample",
    "saving", "scheme", "school", "screen", "search", "season", "second",
    "secret", "sector", "secure", "seeing", "Select", "seller", "senate",
    "senior", "series", "server", "settle", "severe", "sexual", "shadow",
    "shaped", "shared", "silver", "simple", "simply", "singer", "single",
    "sister", "slight", "slowly", "smooth", "soccer", "social", "solely",
    "sought", "source", "Soviet", "speech", "spirit", "spread", "spring",
    "square", "stable", "status", "steady", "stolen", "strain", "stream",
    "street", "stress", "strict", "strike", "string", "strong", "studio",
    "submit", "sudden", "suffer", "summer", "summit", "supply", "surely",
    "survey", "switch", "symbol", "system", "taking", "talent", "target",
    "taught", "temple", "tennis", "thanks", "theory", "thirty", "threat",
    "thrown", "ticket", "timing", "tissue", "toward", "travel", "treaty",
    "tribal", "troop", "trying", "turned", "twenty", "unable", "unique",
    "united", "unless", "unlike", "update", "useful", "valley", "varied",
    "vendor", "versus", "victim", "vision", "visual", "volume", "walker",
    "wealth", "weapon", "weekly", "weight", "wholly", "widely", "window",
    "winner", "winter", "wisdom", "within", "wonder", "wooden", "worker",
    "worthy", "writer", "yellow",
    # Game-specific words that might appear in puzzles
    "rain", "train", "rant", "tarn", "anti", "lair", "liar", "rail",
    "wonders", "wonder", "world", "words", "sword", "sworn", "drown",
    "crown", "clown", "blown", "grown", "known", "shown", "tower",
    "power", "lower", "mower", "sower", "bower", "cower", "vowed",
    "rowed", "towed", "sowed", "mowed", "bowed", "cowed", "wowed",
    "pyramid", "sphinx", "egypt", "giza", "rome", "roman", "italy",
    "paris", "france", "london", "england", "china", "wall", "great",
    "machu", "picchu", "peru", "india", "taj", "mahal", "petra",
    "jordan", "christ", "rio", "brazil", "colosseum", "arena",
    "ancient", "stone", "stones", "temple", "temples", "ruin", "ruins"
])

# Define Models
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

class GridPosition(BaseModel):
    word: str
    row: int
    col: int
    direction: str  # "horizontal" or "vertical"

class Level(BaseModel):
    id: int
    wonder: str
    location: str
    letters: List[str]
    targetWords: List[str]
    grid: List[GridPosition]
    bonusWords: List[str] = []

class LevelResponse(BaseModel):
    id: int
    wonder: str
    location: str
    letters: List[str]
    targetWords: List[str]
    grid: List[Dict[str, Any]]
    bonusWords: List[str] = []

class UserProgress(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    device_id: str
    current_level: int = 1
    coins: int = 100
    hints: int = 3  # Free hints to start
    completed_levels: List[int] = []
    found_words: Dict[str, List[str]] = {}  # level_id -> list of found words
    bonus_words_found: Dict[str, List[str]] = {}  # level_id -> list of bonus words
    total_bonus_words: int = 0
    hints_used: int = 0
    last_wheel_spin: Optional[datetime] = None
    total_score: int = 0
    username: str = "Player"
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class UserProgressCreate(BaseModel):
    device_id: str

class UserProgressUpdate(BaseModel):
    current_level: Optional[int] = None
    coins: Optional[int] = None
    hints: Optional[int] = None
    completed_levels: Optional[List[int]] = None
    found_words: Optional[Dict[str, List[str]]] = None
    bonus_words_found: Optional[Dict[str, List[str]]] = None
    total_bonus_words: Optional[int] = None
    hints_used: Optional[int] = None
    username: Optional[str] = None

class LeaderboardEntry(BaseModel):
    username: str
    score: int
    levels_completed: int
    rank: int

class MultiplayerMatch(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    player1: str
    player2: Optional[str] = None
    level_id: int
    player1_words: List[str] = []
    player2_words: List[str] = []
    player1_score: int = 0
    player2_score: int = 0
    status: str = "waiting"  # waiting, playing, finished
    winner: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)

class WordValidationRequest(BaseModel):
    word: str
    level_id: int

class WordValidationResponse(BaseModel):
    valid: bool
    is_target_word: bool
    is_bonus_word: bool
    message: str

class HintRequest(BaseModel):
    device_id: str
    level_id: int

class HintResponse(BaseModel):
    success: bool
    letter: Optional[str] = None
    position: Optional[Dict[str, Any]] = None
    coins_remaining: int
    message: str

# API Routes
@api_router.get("/")
async def root():
    return {"message": "Words of Wonders API"}

@api_router.get("/levels", response_model=List[LevelResponse])
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

@api_router.get("/levels/{level_id}", response_model=LevelResponse)
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

@api_router.post("/validate-word", response_model=WordValidationResponse)
async def validate_word(request: WordValidationRequest):
    """Validate if a word is correct for the given level"""
    word = request.word.upper()
    level_id = request.level_id
    
    # Find the level
    level = None
    for l in LEVEL_DATA:
        if l["id"] == level_id:
            level = l
            break
    
    if not level:
        raise HTTPException(status_code=404, detail="Level not found")
    
    # Check if it's a target word
    target_words = [w.upper() for w in level["targetWords"]]
    if word in target_words:
        return WordValidationResponse(
            valid=True,
            is_target_word=True,
            is_bonus_word=False,
            message="Correct! You found a target word."
        )
    
    # Check if it's a bonus word
    bonus_words = [w.upper() for w in level.get("bonusWords", [])]
    if word in bonus_words:
        return WordValidationResponse(
            valid=True,
            is_target_word=False,
            is_bonus_word=True,
            message="Bonus word! +5 coins"
        )
    
    # Check if it's a valid English word (but not in this level)
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

@api_router.post("/progress", response_model=UserProgress)
async def create_or_get_progress(input: UserProgressCreate):
    """Create new progress or get existing progress for a device"""
    existing = await db.user_progress.find_one({"device_id": input.device_id})
    if existing:
        return UserProgress(**existing)
    
    progress = UserProgress(device_id=input.device_id)
    await db.user_progress.insert_one(progress.dict())
    return progress

@api_router.get("/progress/{device_id}", response_model=UserProgress)
async def get_progress(device_id: str):
    """Get progress for a specific device"""
    progress = await db.user_progress.find_one({"device_id": device_id})
    if not progress:
        raise HTTPException(status_code=404, detail="Progress not found")
    return UserProgress(**progress)

@api_router.put("/progress/{device_id}", response_model=UserProgress)
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

@api_router.post("/progress/{device_id}/add-word")
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
            coins += 5  # Bonus for finding extra word
            total_bonus += 1
    else:
        if level_key not in found_words:
            found_words[level_key] = []
        if word not in found_words[level_key]:
            found_words[level_key].append(word)
            coins += 10  # Coins for finding target word
    
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

@api_router.post("/progress/{device_id}/complete-level")
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
        coins += 50  # Bonus for completing level
    
    # Advance to next level if this was the current level
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

@api_router.post("/hint", response_model=HintResponse)
async def use_hint(request: HintRequest):
    """Use a hint to reveal a letter (costs 20 coins)"""
    HINT_COST = 20
    
    progress = await db.user_progress.find_one({"device_id": request.device_id})
    if not progress:
        raise HTTPException(status_code=404, detail="Progress not found")
    
    coins = progress.get("coins", 0)
    if coins < HINT_COST:
        return HintResponse(
            success=False,
            coins_remaining=coins,
            message=f"Not enough coins. You need {HINT_COST} coins for a hint."
        )
    
    # Find the level
    level = None
    for l in LEVEL_DATA:
        if l["id"] == request.level_id:
            level = l
            break
    
    if not level:
        raise HTTPException(status_code=404, detail="Level not found")
    
    # Get already found words
    found_words = progress.get("found_words", {}).get(str(request.level_id), [])
    found_words = [w.upper() for w in found_words]
    
    # Find an unfound word and reveal a letter
    for word_info in level["grid"]:
        word = word_info["word"].upper()
        if word not in found_words:
            # Reveal the first letter of this word
            letter = word[0]
            position = {
                "word": word,
                "row": word_info["row"],
                "col": word_info["col"],
                "direction": word_info["direction"],
                "letterIndex": 0
            }
            
            # Deduct coins or hints
            hints = progress.get("hints", 0)
            if hints > 0:
                # Use a free hint
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
                # Deduct coins
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

# ============== DAILY REWARDS ENDPOINTS ==============

@api_router.post("/progress/{device_id}/spin-wheel")
async def spin_wheel(device_id: str):
    """Mark that the user has spun the daily wheel"""
    progress = await db.user_progress.find_one({"device_id": device_id})
    if not progress:
        raise HTTPException(status_code=404, detail="Progress not found")
    
    await db.user_progress.update_one(
        {"device_id": device_id},
        {"$set": {
            "last_wheel_spin": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        }}
    )
    
    return {"success": True, "message": "Wheel spin recorded"}

@api_router.post("/progress/{device_id}/add-reward")
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

# ============== LEADERBOARD ENDPOINTS ==============

@api_router.get("/leaderboard")
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

@api_router.put("/progress/{device_id}/username")
async def update_username(device_id: str, username: str = None):
    """Update user's display name"""
    progress = await db.user_progress.find_one({"device_id": device_id})
    if not progress:
        raise HTTPException(status_code=404, detail="Progress not found")
    
    if username:
        await db.user_progress.update_one(
            {"device_id": device_id},
            {"$set": {
                "username": username,
                "updated_at": datetime.utcnow()
            }}
        )
    
    return {"success": True}

# ============== MULTIPLAYER ENDPOINTS ==============

# In-memory matchmaking queue (for demo purposes)
matchmaking_queue = []

@api_router.post("/multiplayer/search")
async def search_match(device_id: str = None):
    """Search for a multiplayer match"""
    global matchmaking_queue
    
    if not device_id:
        raise HTTPException(status_code=400, detail="device_id required")
    
    # Check if there's someone waiting
    if matchmaking_queue and matchmaking_queue[0] != device_id:
        opponent = matchmaking_queue.pop(0)
        
        # Create a match
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
        # Add to queue
        if device_id not in matchmaking_queue:
            matchmaking_queue.append(device_id)
        
        return {
            "status": "waiting",
            "message": "Waiting for opponent..."
        }

@api_router.post("/multiplayer/cancel")
async def cancel_match_search(device_id: str):
    """Cancel match search"""
    global matchmaking_queue
    if device_id in matchmaking_queue:
        matchmaking_queue.remove(device_id)
    return {"success": True}

@api_router.post("/multiplayer/submit-word")
async def submit_multiplayer_word(match_id: str, device_id: str, word: str):
    """Submit a word in a multiplayer match"""
    match = await db.multiplayer_matches.find_one({"id": match_id})
    if not match:
        raise HTTPException(status_code=404, detail="Match not found")
    
    word = word.upper()
    
    # Validate word against level
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
    
    # Determine which player
    is_player1 = match["player1"] == device_id
    player_words_key = "player1_words" if is_player1 else "player2_words"
    player_score_key = "player1_score" if is_player1 else "player2_score"
    
    current_words = match.get(player_words_key, [])
    
    if word in current_words:
        return {"valid": False, "message": "Word already found"}
    
    # Add word
    current_words.append(word)
    new_score = match.get(player_score_key, 0) + 10
    
    update_data = {
        player_words_key: current_words,
        player_score_key: new_score
    }
    
    # Check if match is complete (all words found by either player)
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

@api_router.get("/multiplayer/match/{match_id}")
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

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
