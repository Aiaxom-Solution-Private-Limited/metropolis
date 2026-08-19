from pydantic import BaseModel, EmailStr
from datetime import datetime

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"

class AdminUserOut(BaseModel):
    id: int
    email: str
    created_at: datetime

    class Config:
        from_attributes = True

class UpdateProfileRequest(BaseModel):
    email: EmailStr | None = None
    current_password: str
    new_password: str | None = None

