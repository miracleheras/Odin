from fastapi import APIRouter
from typing import List
from app.models.lighthouse import Lighthouse
from app.services.lighthouse_service import fetch_lighthouses

router = APIRouter()

@router.get("/", response_model=List[Lighthouse])
async def get_lighthouses() -> List[Lighthouse]:
    return await fetch_lighthouses() 