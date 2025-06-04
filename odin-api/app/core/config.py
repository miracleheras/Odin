from typing import List
from pathlib import Path

class Settings:
    PROJECT_NAME = "Odin API"
    VERSION = "1.0.0"
    DESCRIPTION = "API for Odin project"
    API_V1_STR = "/api/v1"
    ALLOWED_ORIGINS = [
        "http://localhost:3000",
        "http://localhost:8000",
    ]

BASE_DIR = Path(__file__).resolve().parent.parent.parent

SAR_IMAGE_COORDS = [
    [22.2908182629724, 59.91614254645401],
    [22.578806773313246, 59.947751078236365],
    [22.638044070378744, 59.809992490984754],
    [22.351391574531174, 59.77847599974091],
]

SHIP_LOCATION = {
    "latitude": 59.89134,
    "longitude": 22.30606
}

OVERPASS_API = "https://overpass-api.de/api/interpreter"

settings = Settings() 