from fastapi import APIRouter
from app.api.v1.endpoints import lighthouses, images

api_router = APIRouter()

api_router.include_router(lighthouses.router, prefix="/lighthouses", tags=["lighthouses"])
api_router.include_router(images.router, prefix="/image", tags=["image"]) 