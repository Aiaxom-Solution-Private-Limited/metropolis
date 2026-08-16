from fastapi import APIRouter, HTTPException, status
from fastapi.responses import StreamingResponse
from app.services.minio_service import minio_service

router = APIRouter(prefix="/media", tags=["Media Proxy"])

@router.get("/{object_key:path}")
def get_media_object(object_key: str):
    response = minio_service.get_object_stream(object_key)
    if not response:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Requested media object not found."
        )

    content_type = response.headers.get("content-type", "application/octet-stream")
    
    def iterfile():
        try:
            for chunk in response.stream(32 * 1024):
                yield chunk
        finally:
            response.close()
            response.release_conn()

    return StreamingResponse(iterfile(), media_type=content_type)
