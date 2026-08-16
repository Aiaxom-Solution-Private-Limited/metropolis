from typing import List, Optional
from fastapi import APIRouter, Depends, UploadFile, File, Form, HTTPException, status
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.db.models.course import Course
from app.db.models.admin import Admin
from app.schemas.course import CourseOut
from app.schemas.gallery import ReorderItem
from app.services.image_service import image_service
from app.services.minio_service import minio_service
from app.core.dependencies import get_current_admin

router = APIRouter(tags=["Courses"])

def format_course_item(course: Course) -> dict:
    return {
        "id": course.id,
        "title": course.title,
        "category": course.category or "Clinical Residency",
        "duration": course.duration or "Intensive Masterclass",
        "description": course.description,
        "image_object_key": course.image_object_key,
        "image_url": f"/api/media/{course.image_object_key}",
        "is_active": course.is_active,
        "display_order": course.display_order or 0,
        "created_at": course.created_at,
        "updated_at": course.updated_at,
    }

# Public Route
@router.get("/courses", response_model=List[CourseOut])
def get_public_courses(db: Session = Depends(get_db)):
    courses = db.query(Course).filter(Course.is_active == True).order_by(Course.display_order.asc(), Course.id.asc()).all()
    return [format_course_item(c) for c in courses]

# Admin Protected Routes
@router.get("/admin/courses", response_model=List[CourseOut])
def get_admin_courses(
    db: Session = Depends(get_db),
    current_admin: Admin = Depends(get_current_admin)
):
    courses = db.query(Course).order_by(Course.display_order.asc(), Course.id.asc()).all()
    return [format_course_item(c) for c in courses]

@router.get("/admin/courses/{id}", response_model=CourseOut)
def get_admin_course_by_id(
    id: int,
    db: Session = Depends(get_db),
    current_admin: Admin = Depends(get_current_admin)
):
    course = db.query(Course).filter(Course.id == id).first()
    if not course:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Course not found."
        )
    return format_course_item(course)

@router.post("/admin/courses", response_model=CourseOut, status_code=status.HTTP_201_CREATED)
async def create_course(
    title: str = Form(...),
    description: str = Form(...),
    category: Optional[str] = Form("Clinical Residency"),
    duration: Optional[str] = Form("Intensive Masterclass"),
    is_active: bool = Form(True),
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_admin: Admin = Depends(get_current_admin)
):
    raw_bytes = await file.read()
    if not raw_bytes:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Course image file is required."
        )

    processed_bytes, new_filename, mime_type, _ = image_service.process_and_compress_image(
        file_bytes=raw_bytes,
        original_filename=file.filename or "course.jpg",
        content_type=file.content_type or "image/jpeg"
    )

    object_key = f"courses/{new_filename}"

    minio_service.upload_bytes(
        object_key=object_key,
        data=processed_bytes,
        content_type=mime_type
    )

    max_order_c = db.query(Course).order_by(Course.display_order.desc()).first()
    new_order = (max_order_c.display_order + 1) if max_order_c else 1

    course = Course(
        title=title,
        description=description,
        category=category or "Clinical Residency",
        duration=duration or "Intensive Masterclass",
        image_object_key=object_key,
        is_active=is_active,
        display_order=new_order,
    )
    db.add(course)
    db.commit()
    db.refresh(course)

    return format_course_item(course)

@router.put("/admin/courses/reorder", status_code=status.HTTP_200_OK)
def reorder_courses(
    items: List[ReorderItem],
    db: Session = Depends(get_db),
    current_admin: Admin = Depends(get_current_admin)
):
    for item in items:
        db.query(Course).filter(Course.id == item.id).update({"display_order": item.display_order})
    db.commit()
    return {"status": "reordered"}

@router.put("/admin/courses/{id}", response_model=CourseOut)
async def update_course(
    id: int,
    title: Optional[str] = Form(None),
    description: Optional[str] = Form(None),
    category: Optional[str] = Form(None),
    duration: Optional[str] = Form(None),
    is_active: Optional[bool] = Form(None),
    file: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db),
    current_admin: Admin = Depends(get_current_admin)
):
    course = db.query(Course).filter(Course.id == id).first()
    if not course:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Course not found."
        )

    if title is not None:
        course.title = title
    if description is not None:
        course.description = description
    if category is not None:
        course.category = category
    if duration is not None:
        course.duration = duration
    if is_active is not None:
        course.is_active = is_active

    if file and file.filename:
        raw_bytes = await file.read()
        if raw_bytes:
            processed_bytes, new_filename, mime_type, _ = image_service.process_and_compress_image(
                file_bytes=raw_bytes,
                original_filename=file.filename,
                content_type=file.content_type or "image/jpeg"
            )
            new_object_key = f"courses/{new_filename}"

            minio_service.upload_bytes(
                object_key=new_object_key,
                data=processed_bytes,
                content_type=mime_type
            )

            old_object_key = course.image_object_key
            course.image_object_key = new_object_key
            minio_service.delete_object(old_object_key)

    db.commit()
    db.refresh(course)
    return format_course_item(course)

@router.delete("/admin/courses/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_course(
    id: int,
    db: Session = Depends(get_db),
    current_admin: Admin = Depends(get_current_admin)
):
    course = db.query(Course).filter(Course.id == id).first()
    if not course:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Course not found."
        )

    minio_service.delete_object(course.image_object_key)
    db.delete(course)
    db.commit()
    return None
