from fastapi import APIRouter
from fastapi.responses import RedirectResponse
from app.services.storage_service import storage_service

router = APIRouter(prefix="/media", tags=["Media Proxy"])

@router.get("/{object_key:path}")
def get_media_object(object_key: str):
    """
    Redirects legacy /api/media/{object_key} requests directly to Supabase Storage CDN URL.
    """
    public_url = storage_service.get_public_url(object_key)
    return RedirectResponse(url=public_url, status_code=307)
