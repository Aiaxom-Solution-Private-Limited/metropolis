import logging
from sqlalchemy.orm import Session
from app.db.models.admin import Admin
from app.core.config import settings
from app.core.security import get_password_hash, verify_password, create_access_token

logger = logging.getLogger("auth_service")

def seed_initial_admin(db: Session):
    try:
        admin_email = settings.INITIAL_ADMIN_EMAIL
        existing_admin = db.query(Admin).filter(Admin.email == admin_email).first()
        
        if not existing_admin:
            hashed_pwd = get_password_hash(settings.INITIAL_ADMIN_PASSWORD)
            new_admin = Admin(
                email=admin_email,
                hashed_password=hashed_pwd,
            )
            db.add(new_admin)
            db.commit()
            db.refresh(new_admin)
            logger.info(f"Initial admin '{admin_email}' seeded successfully with bcrypt password hash.")
        else:
            logger.info(f"Initial admin '{admin_email}' already exists.")
    except Exception as e:
        db.rollback()
        logger.error(f"Error seeding initial admin: {e}")

def authenticate_admin(db: Session, email: str, password: str) -> Admin | None:
    admin = db.query(Admin).filter(Admin.email == email).first()
    if not admin:
        return None
    if not verify_password(password, admin.hashed_password):
        return None
    return admin
