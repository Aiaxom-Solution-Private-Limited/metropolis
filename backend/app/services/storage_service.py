import logging
from supabase import create_client, Client
from app.core.config import settings

logger = logging.getLogger("storage_service")

class StorageService:
    def __init__(self):
        self._client: Client | None = None
        self.bucket_name = settings.SUPABASE_STORAGE_BUCKET

    @property
    def client(self) -> Client:
        if self._client is None:
            url = settings.SUPABASE_URL
            key = settings.SUPABASE_SERVICE_ROLE_KEY or "dummy-key"
            self._client = create_client(url, key)
        return self._client

    def ensure_bucket_exists(self):
        """
        Ensures the public bucket exists in Supabase Storage if service role permissions allow.
        """
        try:
            if not settings.SUPABASE_SERVICE_ROLE_KEY or settings.SUPABASE_SERVICE_ROLE_KEY == "YOUR_SUPABASE_SERVICE_ROLE_KEY":
                logger.info("Supabase Service Role Key is not configured yet. Bucket verification skipped.")
                return

            buckets = self.client.storage.list_buckets()
            bucket_names = [b.name for b in buckets] if buckets else []
            if self.bucket_name not in bucket_names:
                self.client.storage.create_bucket(
                    self.bucket_name,
                    options={"public": True}
                )
                logger.info(f"Supabase bucket '{self.bucket_name}' created successfully.")
            else:
                logger.info(f"Supabase bucket '{self.bucket_name}' exists.")
        except Exception as e:
            logger.warning(f"Supabase bucket check status: {e}")

    def upload_bytes(self, object_key: str, data: bytes, content_type: str = "image/webp") -> str:
        """
        Uploads binary bytes to Supabase Storage bucket.
        """
        try:
            self.client.storage.from_(self.bucket_name).upload(
                path=object_key,
                file=data,
                file_options={"content-type": content_type, "upsert": "true"}
            )
            logger.info(f"Uploaded '{object_key}' to Supabase Storage.")
            return object_key
        except Exception as e:
            logger.error(f"Failed to upload '{object_key}' to Supabase Storage: {e}")
            raise e

    def delete_object(self, object_key: str) -> bool:
        """
        Deletes object from Supabase Storage bucket.
        """
        try:
            self.client.storage.from_(self.bucket_name).remove([object_key])
            logger.info(f"Deleted '{object_key}' from Supabase Storage.")
            return True
        except Exception as e:
            logger.error(f"Failed to delete '{object_key}' from Supabase Storage: {e}")
            return False

    def list_objects(self, folder: str = "") -> list[dict]:
        """
        Lists objects in a folder within the bucket, returning list of dicts with 'name', 'size', etc.
        """
        try:
            items = self.client.storage.from_(self.bucket_name).list(folder)
            if not items or not isinstance(items, list):
                return []
            prefix = f"{folder}/" if folder and not folder.endswith("/") else folder
            result = []
            for item in items:
                if isinstance(item, dict) and "name" in item:
                    item_copy = dict(item)
                    item_copy["full_path"] = f"{prefix}{item['name']}" if prefix else item['name']
                    result.append(item_copy)
            return result
        except Exception as e:
            logger.warning(f"Failed to list objects in folder '{folder}': {e}")
            return []

    def get_public_url(self, object_key: str) -> str:
        """
        Returns direct public CDN URL for an object stored in Supabase Storage.
        """
        try:
            return self.client.storage.from_(self.bucket_name).get_public_url(object_key)
        except Exception:
            return f"{settings.SUPABASE_URL}/storage/v1/object/public/{self.bucket_name}/{object_key}"

storage_service = StorageService()
