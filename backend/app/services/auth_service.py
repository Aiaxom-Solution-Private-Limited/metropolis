import logging
from sqlalchemy.orm import Session
from app.db.models.admin import Admin
from app.core.security import get_password_hash, verify_password

logger = logging.getLogger("auth_service")

def seed_initial_admin(db: Session):
    try:
        admin_count = db.query(Admin).count()
        if admin_count == 0:
            default_email = "admin"
            default_pwd = "Metrodental@admin321"
            hashed_pwd = get_password_hash(default_pwd)
            new_admin = Admin(
                email=default_email,
                hashed_password=hashed_pwd,
            )
            db.add(new_admin)
            db.commit()
            logger.info(f"Initial admin '{default_email}' seeded successfully with bcrypt password hash.")
        else:
            logger.info("Admin account already exists in database.")
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
