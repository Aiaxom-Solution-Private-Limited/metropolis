from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class GalleryImageOut(BaseModel):
    id: int
    object_key: str
    original_filename: str
    title: Optional[str] = None
    category: Optional[str] = None
    description: Optional[str] = None
    mime_type: str
    file_size: int
    display_order: int = 0
    url: str
    created_at: datetime

    class Config:
        from_attributes = True

class ReorderItem(BaseModel):
    id: int
    display_order: int
