"""
Words of Wonders Backend API
Refactored modular structure
"""
from fastapi import FastAPI, APIRouter
from starlette.middleware.cors import CORSMiddleware
import logging

# Import routers
from routers.levels import router as levels_router
from routers.progress import router as progress_router
from routers.auth import router as auth_router
from routers.multiplayer import router as multiplayer_router
from routers.notifications import router as notifications_router
from routers.leaderboard import router as leaderboard_router
from routers.legal import router as legal_router

# Import database client for shutdown
from core.database import client

# Create the main app
app = FastAPI(
    title="Words of Wonders API",
    description="Backend API for Words of Wonders puzzle game",
    version="2.0.0"
)

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Root endpoint
@api_router.get("/")
async def root():
    return {"message": "Words of Wonders API", "version": "2.0.0"}

# Include all routers
api_router.include_router(levels_router)
api_router.include_router(progress_router)
api_router.include_router(auth_router)
api_router.include_router(multiplayer_router)
api_router.include_router(notifications_router)
api_router.include_router(leaderboard_router)
api_router.include_router(legal_router)

# Include the API router in the main app
app.include_router(api_router)

# CORS Middleware
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
