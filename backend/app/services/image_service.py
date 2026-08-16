import io
import uuid
import os
from PIL import Image, ImageOps
from fastapi import HTTPException, status

ALLOWED_MIME_TYPES = {"image/jpeg", "image/png", "image/webp", "image/jpg"}
MAX_FILE_SIZE = 15 * 1024 * 1024  # 15MB upload limit before processing

class ImageService:
    def process_and_compress_image(
        self,
        file_bytes: bytes,
        original_filename: str,
        content_type: str,
        target_size_kb: int = 200,
        max_dimension: int = 1920,
    ) -> tuple[bytes, str, str, int]:
        """
        Validates, resizes, compresses and converts uploaded image to WebP format.
        Returns: (processed_bytes, new_filename, mime_type, file_size_in_bytes)
        """
        if len(file_bytes) > MAX_FILE_SIZE:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="File size exceeds maximum allowed limit of 15MB."
            )

        try:
            image = Image.open(io.BytesIO(file_bytes))
            image = ImageOps.exif_transpose(image)
        except Exception:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid or corrupt image file."
            )

        # Ensure image is in RGB or RGBA mode
        if image.mode in ("RGBA", "P"):
            image = image.convert("RGBA")
        else:
            image = image.convert("RGB")

        # Resize if dimensions exceed max_dimension (1920px)
        width, height = image.size
        if width > max_dimension or height > max_dimension:
            ratio = min(max_dimension / width, max_dimension / height)
            new_size = (int(width * ratio), int(height * ratio))
            image = image.resize(new_size, Image.Resampling.LANCZOS)

        # Iterative WebP compression targeting ~200KB
        target_size_bytes = target_size_kb * 1024
        quality = 84
        output = io.BytesIO()

        if image.mode == "RGBA":
            image.save(output, format="WEBP", quality=quality, method=6)
        else:
            image.save(output, format="WEBP", quality=quality, method=6)

        compressed_bytes = output.getvalue()

        # Step down quality if image is larger than target size
        while len(compressed_bytes) > target_size_bytes and quality > 45:
            quality -= 10
            output = io.BytesIO()
            image.save(output, format="WEBP", quality=quality, method=4)
            compressed_bytes = output.getvalue()

        base_name, _ = os.path.splitext(original_filename)
        new_filename = f"{base_name}_{uuid.uuid4().hex[:8]}.webp"
        mime_type = "image/webp"
        final_size = len(compressed_bytes)

        return compressed_bytes, new_filename, mime_type, final_size

image_service = ImageService()
