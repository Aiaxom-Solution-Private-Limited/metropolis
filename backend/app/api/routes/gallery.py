from typing import List, Optional
from fastapi import APIRouter, Depends, UploadFile, File, Form, HTTPException, status
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.db.models.gallery import GalleryImage
from app.db.models.admin import Admin
from app.schemas.gallery import GalleryImageOut, ReorderItem
from app.services.image_service import image_service
from app.services.minio_service import minio_service
from app.core.dependencies import get_current_admin

router = APIRouter(tags=["Gallery"])

def format_gallery_item(img: GalleryImage) -> dict:
    return {
        "id": img.id,
        "object_key": img.object_key,
        "original_filename": img.original_filename,
        "title": img.title or img.original_filename,
        "category": img.category or "Infrastructure",
        "description": img.description or "",
        "mime_type": img.mime_type,
        "file_size": img.file_size,
        "display_order": img.display_order or 0,
        "url": f"/api/media/{img.object_key}",
        "created_at": img.created_at,
    }

# Public Route
@router.get("/gallery", response_model=List[GalleryImageOut])
def get_public_gallery(db: Session = Depends(get_db)):
    images = db.query(GalleryImage).order_by(GalleryImage.display_order.asc(), GalleryImage.id.asc()).all()
    return [format_gallery_item(img) for img in images]

# Admin Protected Routes
@router.get("/admin/gallery", response_model=List[GalleryImageOut])
def get_admin_gallery(
    db: Session = Depends(get_db),
    current_admin: Admin = Depends(get_current_admin)
):
    images = db.query(GalleryImage).order_by(GalleryImage.display_order.asc(), GalleryImage.id.asc()).all()
    return [format_gallery_item(img) for img in images]

@router.post("/admin/gallery", response_model=GalleryImageOut, status_code=status.HTTP_201_CREATED)
async def upload_gallery_image(
    title: Optional[str] = Form(None),
    category: Optional[str] = Form("Infrastructure"),
    description: Optional[str] = Form(None),
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_admin: Admin = Depends(get_current_admin)
):
    raw_bytes = await file.read()
    if not raw_bytes:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="File content is empty."
        )

    processed_bytes, new_filename, mime_type, file_size = image_service.process_and_compress_image(
        file_bytes=raw_bytes,
        original_filename=file.filename or "image.jpg",
        content_type=file.content_type or "image/jpeg"
    )

    object_key = f"gallery/{new_filename}"

    minio_service.upload_bytes(
        object_key=object_key,
        data=processed_bytes,
        content_type=mime_type
    )

    # Highest order + 1
    max_order_img = db.query(GalleryImage).order_by(GalleryImage.display_order.desc()).first()
    new_order = (max_order_img.display_order + 1) if max_order_img else 1

    db_image = GalleryImage(
        object_key=object_key,
        original_filename=file.filename or "image.jpg",
        title=title or file.filename or "Clinic Image",
        category=category or "Infrastructure",
        description=description or "",
        mime_type=mime_type,
        file_size=file_size,
        display_order=new_order,
    )
    db.add(db_image)
    db.commit()
    db.refresh(db_image)

    return format_gallery_item(db_image)

@router.put("/admin/gallery/reorder", status_code=status.HTTP_200_OK)
def reorder_gallery(
    items: List[ReorderItem],
    db: Session = Depends(get_db),
    current_admin: Admin = Depends(get_current_admin)
):
    for item in items:
        db.query(GalleryImage).filter(GalleryImage.id == item.id).update({"display_order": item.display_order})
    db.commit()
    return {"status": "reordered"}

@router.put("/admin/gallery/{id}", response_model=GalleryImageOut)
async def update_gallery_image(
    id: int,
    title: Optional[str] = Form(None),
    category: Optional[str] = Form(None),
    description: Optional[str] = Form(None),
    file: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db),
    current_admin: Admin = Depends(get_current_admin)
):
    img = db.query(GalleryImage).filter(GalleryImage.id == id).first()
    if not img:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Gallery item not found.")

    if title is not None:
        img.title = title
    if category is not None:
        img.category = category
    if description is not None:
        img.description = description

    if file and file.filename:
        raw_bytes = await file.read()
        if raw_bytes:
            processed_bytes, new_filename, mime_type, file_size = image_service.process_and_compress_image(
                file_bytes=raw_bytes,
                original_filename=file.filename,
                content_type=file.content_type or "image/jpeg"
            )
            new_object_key = f"gallery/{new_filename}"
            minio_service.upload_bytes(object_key=new_object_key, data=processed_bytes, content_type=mime_type)

            old_key = img.object_key
            img.object_key = new_object_key
            img.mime_type = mime_type
            img.file_size = file_size
            img.original_filename = file.filename
            minio_service.delete_object(old_key)

    db.commit()
    db.refresh(img)
    return format_gallery_item(img)

@router.delete("/admin/gallery/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_gallery_image(
    id: int,
    db: Session = Depends(get_db),
    current_admin: Admin = Depends(get_current_admin)
):
    db_image = db.query(GalleryImage).filter(GalleryImage.id == id).first()
    if not db_image:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Gallery image not found."
        )

    minio_service.delete_object(db_image.object_key)
    db.delete(db_image)
    db.commit()
    return None
