import logging
import httpx
from fastapi import APIRouter, HTTPException, status, Depends
from app.core.config import settings
from app.core.rate_limiter import appointment_rate_limiter
from app.schemas.appointment import AppointmentCreateRequest, AppointmentResponse

logger = logging.getLogger("appointments")

router = APIRouter(prefix="/appointments", tags=["Appointments"])

@router.post(
    "",
    response_model=AppointmentResponse,
    status_code=status.HTTP_200_OK,
    dependencies=[Depends(appointment_rate_limiter)]
)
async def submit_appointment(payload: AppointmentCreateRequest):
    if not settings.GOOGLE_APPS_SCRIPT_URL:
        logger.error("GOOGLE_APPS_SCRIPT_URL is not configured in backend settings.")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Appointment submission system is currently unavailable. Please contact clinic directly."
        )

    target_data = {
        "secret": settings.GOOGLE_APPS_SCRIPT_SECRET or "",
        "patientName": payload.patientName,
        "phone": payload.phone,
        "email": payload.email or "",
        "preferredDate": payload.preferredDate,
        "preferredTime": payload.preferredTime,
        "notes": payload.notes or "",
    }

    try:
        async with httpx.AsyncClient(follow_redirects=True, timeout=15.0) as client:
            response = await client.post(
                settings.GOOGLE_APPS_SCRIPT_URL,
                json=target_data,
                headers={"Content-Type": "application/json"}
            )

        if response.status_code != 200:
            logger.error("Apps Script request failed with HTTP status code: %s", response.status_code)
            raise HTTPException(
                status_code=status.HTTP_502_BAD_GATEWAY,
                detail="Failed to record appointment request. Please try again or contact clinic directly."
            )

        res_json = response.json()
        if not isinstance(res_json, dict) or res_json.get("success") is not True:
            logger.error("Apps Script returned failure status or unexpected format")
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Unable to record appointment request. Please check input details or contact clinic directly."
            )

        return AppointmentResponse(
            success=True,
            message="Your appointment request has been submitted successfully. We will contact you once your appointment is confirmed."
        )

    except HTTPException:
        raise
    except Exception as e:
        logger.error("Unexpected error during appointment processing: %s", type(e).__name__)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An error occurred while submitting your appointment request. Please try again."
        )
