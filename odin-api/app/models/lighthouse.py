from pydantic import BaseModel

class Lighthouse(BaseModel):
    latitude: float
    longitude: float
    name: str
    range: str
    type: str 