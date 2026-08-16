import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.db.database import engine, Base, SessionLocal
from app.services.auth_service import seed_initial_admin
from app.services.minio_service import minio_service
from app.services.seeder import seed_initial_content
from app.api.routes import auth, media, gallery, courses

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("main")

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup sequence
    logger.info("Initializing database tables...")
    Base.metadata.create_all(bind=engine)

    logger.info("Ensuring MinIO bucket exists...")
    minio_service.ensure_bucket_exists()

    logger.info("Seeding initial admin account & content...")
    db = SessionLocal()
    try:
        seed_initial_admin(db)
        seed_initial_content(db)
    except Exception as e:
        logger.error(f"Error during seeding: {e}")
    finally:
        db.close()

    yield
    # Shutdown sequence
    logger.info("Shutting down application...")

app = FastAPI(
    title=settings.PROJECT_NAME,
    lifespan=lifespan,
    docs_url="/api/docs",
    openapi_url="/api/openapi.json",
)

# CORS middleware for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix="/api")
app.include_router(media.router, prefix="/api")
app.include_router(gallery.router, prefix="/api")
app.include_router(courses.router, prefix="/api")

@app.get("/api/health")
def health_check():
    return {"status": "online", "project": settings.PROJECT_NAME}
