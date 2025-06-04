import requests
from fastapi import HTTPException
from typing import List
from app.models.lighthouse import Lighthouse
from app.core.config import OVERPASS_API, SAR_IMAGE_COORDS

async def fetch_lighthouses() -> List[Lighthouse]:
    bbox = f"{min(coord[1] for coord in SAR_IMAGE_COORDS)-0.1},{min(coord[0] for coord in SAR_IMAGE_COORDS)-0.1},{max(coord[1] for coord in SAR_IMAGE_COORDS)+0.1},{max(coord[0] for coord in SAR_IMAGE_COORDS)+0.1}"
    
    query = f"""
    [out:json][timeout:25];
    (
      node["seamark:light:range"]({bbox});
      way["seamark:light:range"]({bbox});
      relation["seamark:light:range"]({bbox});
    );
    out body;
    >;
    out skel qt;
    """
    
    try:
        response = requests.post(OVERPASS_API, data=query)
        response.raise_for_status()
        data = response.json()
        
        lighthouses = []
        for element in data.get('elements', []):
            if 'tags' in element and 'seamark:light:range' in element['tags']:
                try:
                    lighthouse = Lighthouse(
                        latitude=float(element.get('lat', 0)),
                        longitude=float(element.get('lon', 0)),
                        name=element['tags'].get('name', 'Unnamed Lighthouse'),
                        range=element['tags'].get('seamark:light:range', 'Unknown'),
                        type=element['tags'].get('seamark:type', 'Unknown')
                    )
                    lighthouses.append(lighthouse)
                except (ValueError, TypeError):
                    continue
        
        return lighthouses
    except requests.RequestException as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error fetching lighthouse data: {str(e)}"
        ) 