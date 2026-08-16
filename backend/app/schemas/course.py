from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class CourseCreate(BaseModel):
    title: str
    description: str
    category: Optional[str] = "Clinical Residency"
    duration: Optional[str] = "Intensive Masterclass"
    is_active: bool = True

class CourseUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    category: Optional[str] = None
    duration: Optional[str] = None
    is_active: Optional[bool] = None

class CourseOut(BaseModel):
    id: int
    title: str
    category: Optional[str] = None
    duration: Optional[str] = None
    description: str
    image_object_key: str
    image_url: str
    is_active: bool
    display_order: int = 0
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
