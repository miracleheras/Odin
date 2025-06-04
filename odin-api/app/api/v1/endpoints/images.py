from fastapi import APIRouter, HTTPException
from fastapi.responses import FileResponse
from typing import List, Dict
from app.core.config import BASE_DIR, SAR_IMAGE_COORDS, SHIP_LOCATION

router = APIRouter()

@router.get("/")
async def get_image():
    image_path = BASE_DIR / "static" / "SAR_image_20420212.png"
    if not image_path.exists():
        raise HTTPException(
            status_code=404,
            detail="Image not found"
        )
    return FileResponse(
        image_path,
        media_type="image/png",
        filename="SAR_image_20420212.png"
    )