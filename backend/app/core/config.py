import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "Metropolis Dental API"
    
    # Database
    DATABASE_URL: str = "postgresql://postgres:[YOUR-SUPABASE-DATABASE-PASSWORD]@db.rqhyuxvlngqiyhuranhg.supabase.co:5432/postgres"

    # JWT Authentication
    JWT_SECRET_KEY: str = "metropolis_luxury_secret_key_2026_x89a"
    JWT_ALGORITHM: str = "HS256"
    JWT_ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24  # 24 hours

    # CORS Allowed Origins (Comma-separated string or list)
    CORS_ORIGINS: str = "http://localhost:3005,http://localhost:3000,http://127.0.0.1:3005,https://drpratimdental.in,https://www.drpratimdental.in"

    # Supabase Storage & Credentials
    SUPABASE_URL: str = "https://rqhyuxvlngqiyhuranhg.supabase.co"
    SUPABASE_SERVICE_ROLE_KEY: str = ""
    SUPABASE_STORAGE_BUCKET: str = "metropolis-assets"

    @property
    def cors_origins_list(self) -> list[str]:
        if isinstance(self.CORS_ORIGINS, list):
            return self.CORS_ORIGINS
        if not self.CORS_ORIGINS:
            return ["http://localhost:3005"]
        return [origin.strip() for origin in self.CORS_ORIGINS.split(",") if origin.strip()]

    class Config:
        env_file = ".env"
        extra = "ignore"

settings = Settings()
