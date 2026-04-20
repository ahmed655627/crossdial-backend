from motor.motor_asyncio import AsyncIOMotorClient
from .config import MONGO_URL, DB_NAME
import logging

logger = logging.getLogger(__name__)

# MongoDB connection
client = AsyncIOMotorClient(MONGO_URL)
db = client[DB_NAME]


async def create_indexes():
    """Create database indexes for optimized query performance"""
    try:
        # User progress indexes
        await db.user_progress.create_index("device_id", unique=True)
        await db.user_progress.create_index("total_score")  # For global leaderboard sorting
        await db.user_progress.create_index([("mode_id", 1), ("total_score", -1)])  # Compound index for mode leaderboards
        await db.user_progress.create_index("current_level")  # For level-based queries
        await db.user_progress.create_index("last_active_date")  # For active player queries
        
        # Leaderboard-specific indexes
        await db.user_progress.create_index([("total_score", -1), ("updated_at", -1)])  # Optimized leaderboard sorting
        
        logger.info("✅ Database indexes created successfully")
    except Exception as e:
        logger.warning(f"Index creation warning (may already exist): {e}")
