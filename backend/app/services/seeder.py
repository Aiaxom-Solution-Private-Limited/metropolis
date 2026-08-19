import os
import logging
from sqlalchemy.orm import Session
from app.db.models.gallery import GalleryImage
from app.db.models.course import Course
from app.services.image_service import image_service
from app.services.storage_service import storage_service

logger = logging.getLogger("seeder")

DEFAULT_GALLERY = [
    {
        "filename": "unnamed.jpg",
        "title": "Executive Reception & Waiting Lounge",
        "category": "Infrastructure",
        "description": "Ultra-clean, comfortable, and quiet concierge desk designed for maximum patient privacy and relaxation.",
        "path": "clinic/unnamed.jpg",
    },
    {
        "filename": "unnamed (1).jpg",
        "title": "High-Precision Operatory Suite 1",
        "category": "Infrastructure",
        "description": "Fully sanitized, modern operatory suite equipped with ergonomic treatment chairs and shadowless LED lamps.",
        "path": "clinic/unnamed (1).jpg",
    },
    {
        "filename": "unnamed (2).jpg",
        "title": "State-of-the-Art Dental Implant Suite",
        "category": "Equipment",
        "description": "Dedicated surgical room equipped with computer-guided implant motor units and sterile surgical drape setup.",
        "path": "clinic/unnamed (2).jpg",
    },
    {
        "filename": "unnamed (3).jpg",
        "title": "Class-B Autoclave Sterilization Hub",
        "category": "Equipment",
        "description": "Hospital-grade multi-stage sterilization protocols ensuring 100% infection prevention.",
        "path": "clinic/unnamed (3).jpg",
    },
    {
        "filename": "unnamed (4).jpg",
        "title": "3D Digital Intraoral Scanner & CBCT",
        "category": "Equipment",
        "description": "High-precision digital impression technology eliminating traditional messy impression trays.",
        "path": "clinic/unnamed (4).jpg",
    },
    {
        "filename": "unnamed (5).jpg",
        "title": "Cosmetic Veneers Smile Transformation",
        "category": "Transformations",
        "description": "Full arch porcelain veneer restoration restoring natural aesthetics, symmetry, and confidence.",
        "path": "clinic/unnamed (5).jpg",
    },
    {
        "filename": "unnamed (6).jpg",
        "title": "Microscopic Endodontic Workspace",
        "category": "Equipment",
        "description": "High-magnification surgical microscope for high-precision root canal and micro-restorative procedures.",
        "path": "clinic/unnamed (6).jpg",
    },
    {
        "filename": "unnamed (7).jpg",
        "title": "Implant Bridge Smile Reconstruction",
        "category": "Transformations",
        "description": "Computer-guided immediate loading implant bridge restoring complete masticatory function.",
        "path": "clinic/unnamed (7).jpg",
    },
    {
        "filename": "unnamed (8).jpg",
        "title": "Private Consultation & Diagnostics Office",
        "category": "Clinic Environment",
        "description": "Dedicated office for Dr. Pratim Talukdar to review treatment plans and 3D CBCT scans with patients.",
        "path": "clinic/unnamed (8).jpg",
    },
    {
        "filename": "unnamed (9).jpg",
        "title": "Advanced Teeth Whitening & Hygiene Bay",
        "category": "Clinic Environment",
        "description": "Specialized operatory for laser teeth whitening and pain-free ultrasonic prophylaxis.",
        "path": "clinic/unnamed (9).jpg",
    },
    {
        "filename": "unnamed (10).jpg",
        "title": "Modern Clinical Corridor & Patient Care Area",
        "category": "Infrastructure",
        "description": "Spacious, climate-controlled clinical corridor featuring HEPA air filtration systems.",
        "path": "clinic/unnamed (10).jpg",
    },
]

DEFAULT_COURSES = [
    {
        "title": "Advanced Implant Treatment Planning",
        "category": "Implantology & Surgical Dentistry",
        "duration": "3 Days Intensive Hands-On",
        "description": "CBCT-based diagnosis, bone assessment, implant positioning, and comprehensive treatment planning.",
        "image_file": "implant_course.png",
    },
    {
        "title": "Immediate Implant Placement & Loading",
        "category": "Implantology & Surgical Dentistry",
        "duration": "2 Days Masterclass",
        "description": "Clinical principles for placing implants immediately after extraction and understanding immediate loading protocols.",
        "image_file": "smile_course.png",
    },
    {
        "title": "Full-Mouth Implant Rehabilitation",
        "category": "Implantology & Prosthodontics",
        "duration": "4 Days Comprehensive Module",
        "description": "Treatment planning and prosthetic rehabilitation for patients requiring multiple implants or complete-arch restoration.",
        "image_file": "prostho_course.png",
    },
    {
        "title": "Advanced Prosthodontic Rehabilitation",
        "category": "Prosthodontics & Restorative",
        "duration": "3 Days Intensive Hands-On",
        "description": "Comprehensive treatment planning for crowns, bridges, veneers, dentures, and complex restorative cases.",
        "image_file": "endo_course.png",
    },
    {
        "title": "Digital Smile Design & Esthetic Rehabilitation",
        "category": "Cosmetic & Esthetic Dentistry",
        "duration": "2 Days Masterclass",
        "description": "Digital planning, smile analysis, facial aesthetics, and designing predictable cosmetic restorations.",
        "image_file": "smile_course.png",
    },
    {
        "title": "Full-Mouth Rehabilitation",
        "category": "Prosthodontics & Restorative",
        "duration": "4 Days Comprehensive Module",
        "description": "Occlusion, treatment sequencing, vertical dimension, and comprehensive restorative treatment planning.",
        "image_file": "prostho_course.png",
    },
]

def find_image_path(rel_path: str) -> str:
    possible_roots = [
        "/app/public/images",
        "/app/frontend/public/images",
        "/home/evara/Metropolis_Dental_portfolio-main/frontend/public/images",
        "../frontend/public/images",
        "frontend/public/images",
    ]
    for r in possible_roots:
        full = os.path.join(r, rel_path)
        if os.path.isfile(full):
            return full
    return ""

def seed_initial_content(db: Session):
    # 1. Seed Gallery Images safely and idempotently
    existing_gallery_count = db.query(GalleryImage).count()
    if existing_gallery_count < len(DEFAULT_GALLERY):
        logger.info(f"Seeding default gallery images (current DB count: {existing_gallery_count})...")
        storage_gallery_objects = storage_service.list_objects("gallery")

        for idx, item in enumerate(DEFAULT_GALLERY):
            existing = db.query(GalleryImage).filter(GalleryImage.original_filename == item["filename"]).first()
            if existing:
                continue

            base_name, _ = os.path.splitext(item["filename"])
            matching_storage_obj = None
            for obj in storage_gallery_objects:
                obj_name = obj.get("name", "")
                if obj_name.startswith(f"seed_{base_name}_") or obj_name == f"seed_{base_name}.webp":
                    matching_storage_obj = obj
                    break

            if matching_storage_obj:
                object_key = matching_storage_obj.get("full_path") or f"gallery/{matching_storage_obj['name']}"
                metadata = matching_storage_obj.get("metadata") or {}
                file_size = metadata.get("size") or metadata.get("contentLength") or 10240
                mime_type = metadata.get("mimetype") or "image/webp"

                gallery_entry = GalleryImage(
                    object_key=object_key,
                    original_filename=item["filename"],
                    title=item["title"],
                    category=item["category"],
                    description=item["description"],
                    mime_type=mime_type,
                    file_size=int(file_size),
                    display_order=idx + 1
                )
                try:
                    db.add(gallery_entry)
                    db.commit()
                    logger.info(f"Reused existing Storage object '{object_key}' for gallery entry '{item['title']}'.")
                except Exception as e:
                    db.rollback()
                    logger.error(f"Failed to insert DB entry for reused gallery image '{item['title']}': {e}")
            else:
                img_path = find_image_path(item["path"])
                if img_path and os.path.isfile(img_path):
                    with open(img_path, "rb") as f:
                        raw_bytes = f.read()

                    processed_bytes, new_filename, mime_type, file_size = image_service.process_and_compress_image(
                        file_bytes=raw_bytes,
                        original_filename=item["filename"],
                        content_type="image/jpeg"
                    )

                    object_key = f"gallery/seed_{new_filename}"
                    try:
                        storage_service.upload_bytes(object_key=object_key, data=processed_bytes, content_type=mime_type)
                    except Exception as e:
                        logger.error(f"Storage upload failed for '{item['filename']}': {e}")
                        continue

                    gallery_entry = GalleryImage(
                        object_key=object_key,
                        original_filename=item["filename"],
                        title=item["title"],
                        category=item["category"],
                        description=item["description"],
                        mime_type=mime_type,
                        file_size=file_size,
                        display_order=idx + 1
                    )
                    try:
                        db.add(gallery_entry)
                        db.commit()
                        logger.info(f"Seeded gallery image '{item['title']}' with object_key '{object_key}'.")
                    except Exception as e:
                        db.rollback()
                        logger.error(f"Failed to insert DB entry for '{item['title']}': {e}. Cleaning up storage object '{object_key}'...")
                        storage_service.delete_object(object_key)

    # 2. Seed Courses safely and idempotently
    existing_courses_count = db.query(Course).count()
    if existing_courses_count < len(DEFAULT_COURSES):
        logger.info(f"Seeding default courses (current DB count: {existing_courses_count})...")
        storage_course_objects = storage_service.list_objects("courses")

        for idx, item in enumerate(DEFAULT_COURSES):
            existing = db.query(Course).filter(Course.title == item["title"]).first()
            if existing:
                continue

            base_name, _ = os.path.splitext(item["image_file"])
            matching_storage_obj = None
            for obj in storage_course_objects:
                obj_name = obj.get("name", "")
                if obj_name.startswith(f"seed_{base_name}_") or obj_name == f"seed_{base_name}.webp":
                    matching_storage_obj = obj
                    break

            if matching_storage_obj:
                object_key = matching_storage_obj.get("full_path") or f"courses/{matching_storage_obj['name']}"
                course_entry = Course(
                    title=item["title"],
                    category=item["category"],
                    duration=item["duration"],
                    description=item["description"],
                    image_object_key=object_key,
                    is_active=True,
                    display_order=idx + 1
                )
                try:
                    db.add(course_entry)
                    db.commit()
                    logger.info(f"Reused existing Storage object '{object_key}' for course '{item['title']}'.")
                except Exception as e:
                    db.rollback()
                    logger.error(f"Failed to insert DB entry for course '{item['title']}': {e}")
            else:
                img_path = find_image_path(item["image_file"])
                if img_path and os.path.isfile(img_path):
                    with open(img_path, "rb") as f:
                        raw_bytes = f.read()

                    processed_bytes, new_filename, mime_type, _ = image_service.process_and_compress_image(
                        file_bytes=raw_bytes,
                        original_filename=item["image_file"],
                        content_type="image/png"
                    )

                    object_key = f"courses/seed_{new_filename}"
                    try:
                        storage_service.upload_bytes(object_key=object_key, data=processed_bytes, content_type=mime_type)
                    except Exception as e:
                        logger.error(f"Storage upload failed for course image '{item['image_file']}': {e}")
                        continue

                    course_entry = Course(
                        title=item["title"],
                        category=item["category"],
                        duration=item["duration"],
                        description=item["description"],
                        image_object_key=object_key,
                        is_active=True,
                        display_order=idx + 1
                    )
                    try:
                        db.add(course_entry)
                        db.commit()
                        logger.info(f"Seeded course '{item['title']}' with image_object_key '{object_key}'.")
                    except Exception as e:
                        db.rollback()
                        logger.error(f"Failed to insert DB entry for course '{item['title']}': {e}. Cleaning up storage object '{object_key}'...")
                        storage_service.delete_object(object_key)
