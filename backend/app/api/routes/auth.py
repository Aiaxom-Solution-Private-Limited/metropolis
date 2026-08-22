from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.db.models.admin import Admin
from app.schemas.auth import LoginRequest, TokenResponse, AdminUserOut, UpdateProfileRequest
from app.services.auth_service import authenticate_admin
from app.core.security import create_access_token, verify_password, get_password_hash
from app.core.dependencies import get_current_admin
from app.core.rate_limiter import admin_auth_rate_limiter

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/login", response_model=TokenResponse, dependencies=[Depends(admin_auth_rate_limiter)])
def login(payload: LoginRequest, db: Session = Depends(get_db)):
    admin = authenticate_admin(db, email=payload.email, password=payload.password)
    if not admin:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password."
        )
    
    access_token = create_access_token(subject=admin.id)
    return TokenResponse(access_token=access_token)

@router.get("/me", response_model=AdminUserOut)
def get_me(current_admin: Admin = Depends(get_current_admin)):
    return current_admin

@router.put("/profile", response_model=AdminUserOut)
def update_profile(
    payload: UpdateProfileRequest,
    current_admin: Admin = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    if not verify_password(payload.current_password, current_admin.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Current password is incorrect."
        )

    if payload.email and payload.email != current_admin.email:
        existing_other = db.query(Admin).filter(Admin.email == payload.email, Admin.id != current_admin.id).first()
        if existing_other:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email is already in use by another admin account."
            )
        current_admin.email = payload.email

    if payload.new_password:
        if len(payload.new_password) < 6:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="New password must be at least 6 characters long."
            )
        current_admin.hashed_password = get_password_hash(payload.new_password)

    db.add(current_admin)
    db.commit()
    db.refresh(current_admin)
    return current_admin
