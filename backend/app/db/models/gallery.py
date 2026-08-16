from datetime import datetime, timezone
from sqlalchemy import Column, Integer, String, Text, DateTime
from app.db.database import Base

class GalleryImage(Base):
    __tablename__ = "gallery_images"

    id = Column(Integer, primary_key=True, index=True)
    object_key = Column(String, unique=True, index=True, nullable=False)
    original_filename = Column(String, nullable=False)
    title = Column(String, nullable=True)
    category = Column(String, default="Infrastructure", nullable=True)
    description = Column(Text, nullable=True)
    mime_type = Column(String, nullable=False)
    file_size = Column(Integer, nullable=False)
    display_order = Column(Integer, default=0, nullable=False)
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))
