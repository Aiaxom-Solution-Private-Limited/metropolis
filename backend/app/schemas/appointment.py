from pydantic import BaseModel, Field
from typing import Optional

class AppointmentCreateRequest(BaseModel):
    patientName: str = Field(
        ...,
        min_length=2,
        max_length=100,
        description="Full name of patient (2-100 characters)"
    )
    phone: str = Field(
        ...,
        min_length=7,
        max_length=20,
        pattern=r"^[0-9\+\-\s\(\)]+$",
        description="Mobile/Contact phone number"
    )
    email: Optional[str] = Field(
        "",
        max_length=150,
        description="Optional email address"
    )
    preferredDate: str = Field(
        ...,
        min_length=8,
        max_length=20,
        description="Preferred date YYYY-MM-DD"
    )
    preferredTime: str = Field(
        ...,
        min_length=2,
        max_length=50,
        description="Preferred time slot"
    )
    notes: Optional[str] = Field(
        "",
        max_length=1000,
        description="Optional service notes or requests (max 1000 characters)"
    )

class AppointmentResponse(BaseModel):
    success: bool
    message: str
