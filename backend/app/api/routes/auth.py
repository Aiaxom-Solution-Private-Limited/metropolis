from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.db.models.admin import Admin
from app.schemas.auth import LoginRequest, TokenResponse, AdminUserOut
from app.services.auth_service import authenticate_admin
from app.core.security import create_access_token
from app.core.dependencies import get_current_admin

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/login", response_model=TokenResponse)
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
