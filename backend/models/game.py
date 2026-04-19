from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from datetime import datetime
import uuid

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
    hints: int = 3
    completed_levels: List[int] = []
    found_words: Dict[str, List[str]] = {}
    bonus_words_found: Dict[str, List[str]] = {}
    total_bonus_words: int = 0
    hints_used: int = 0
    last_wheel_spin: Optional[datetime] = None
    total_score: int = 0
    username: str = "Player"
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    
    # Enhanced user data fields
    daily_streak: int = 0
    best_streak: int = 0
    last_login_date: Optional[str] = None
    total_words_found: int = 0
    total_time_played: int = 0  # in seconds
    achievements: List[str] = []
    selected_language: str = "en"
    sound_enabled: bool = True
    notifications_enabled: bool = True
    avatar: str = "🦉"
    theme_preference: str = "default"
    daily_spin_count: int = 0
    words_found_today: int = 0
    last_active_date: Optional[str] = None

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
    
    # Enhanced fields
    daily_streak: Optional[int] = None
    best_streak: Optional[int] = None
    last_login_date: Optional[str] = None
    total_words_found: Optional[int] = None
    total_time_played: Optional[int] = None
    achievements: Optional[List[str]] = None
    selected_language: Optional[str] = None
    sound_enabled: Optional[bool] = None
    notifications_enabled: Optional[bool] = None
    avatar: Optional[str] = None
    theme_preference: Optional[str] = None
    words_found_today: Optional[int] = None
    last_active_date: Optional[str] = None

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
    status: str = "waiting"
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
