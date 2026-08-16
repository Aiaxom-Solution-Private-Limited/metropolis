import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "Metropolis Dental API"
    
    # Database
    DATABASE_URL: str = "postgresql+psycopg2://metropolis:metropolis_pass@postgres:5432/metropolis_db"

    # JWT Authentication
    JWT_SECRET_KEY: str = "metropolis_luxury_secret_key_2026_x89a"
    JWT_ALGORITHM: str = "HS256"
    JWT_ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24  # 24 hours

    # MinIO Storage
    MINIO_ENDPOINT: str = "minio:9000"
    MINIO_ACCESS_KEY: str = "minioadmin"
    MINIO_SECRET_KEY: str = "minioadmin"
    MINIO_SECURE: bool = False
    MINIO_BUCKET: str = "metropolis-dental-assets"

    # Initial Admin Seeder Credentials
    INITIAL_ADMIN_EMAIL: str = "metrodental123@gmail.com"
    INITIAL_ADMIN_PASSWORD: str = "Metro@admin321"

    class Config:
        env_file = ".env"
        extra = "ignore"

settings = Settings()
