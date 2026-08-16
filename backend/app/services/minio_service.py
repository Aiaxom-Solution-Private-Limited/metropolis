import io
import logging
from minio import Minio
from minio.error import S3Error
from app.core.config import settings

logger = logging.getLogger("minio_service")

class MinIOService:
    def __init__(self):
        self.client = Minio(
            endpoint=settings.MINIO_ENDPOINT,
            access_key=settings.MINIO_ACCESS_KEY,
            secret_key=settings.MINIO_SECRET_KEY,
            secure=settings.MINIO_SECURE,
        )
        self.bucket_name = settings.MINIO_BUCKET

    def ensure_bucket_exists(self):
        try:
            if not self.client.bucket_exists(self.bucket_name):
                self.client.make_bucket(self.bucket_name)
                logger.info(f"MinIO bucket '{self.bucket_name}' created successfully.")
            else:
                logger.info(f"MinIO bucket '{self.bucket_name}' already exists.")
        except Exception as e:
            logger.error(f"Error checking/creating MinIO bucket: {e}")

    def upload_bytes(self, object_key: str, data: bytes, content_type: str = "image/webp") -> str:
        self.ensure_bucket_exists()
        data_stream = io.BytesIO(data)
        data_len = len(data)

        self.client.put_object(
            bucket_name=self.bucket_name,
            object_name=object_key,
            data=data_stream,
            length=data_len,
            content_type=content_type,
        )
        return object_key

    def delete_object(self, object_key: str) -> bool:
        try:
            self.client.remove_object(self.bucket_name, object_key)
            return True
        except S3Error as e:
            logger.error(f"Failed to delete object {object_key} from MinIO: {e}")
            return False

    def get_object_stream(self, object_key: str):
        try:
            response = self.client.get_object(self.bucket_name, object_key)
            return response
        except S3Error as e:
            logger.error(f"Failed to get object {object_key} from MinIO: {e}")
            return None

minio_service = MinIOService()
