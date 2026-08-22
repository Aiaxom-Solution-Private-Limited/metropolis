import time
from collections import defaultdict
from fastapi import Request, HTTPException, status

class IPRateLimiter:
    def __init__(
        self,
        requests_limit: int = 5,
        window_seconds: int = 600,
        error_message: str = "Too many requests. Please try again later."
    ):
        self.requests_limit = requests_limit
        self.window_seconds = window_seconds
        self.error_message = error_message
        self.requests = defaultdict(list)

    def __call__(self, request: Request):
        client_ip = request.client.host if request.client else "unknown"
        now = time.time()
        # Filter timestamps within active sliding window
        timestamps = [ts for ts in self.requests[client_ip] if now - ts < self.window_seconds]
        self.requests[client_ip] = timestamps

        if len(timestamps) >= self.requests_limit:
            raise HTTPException(
                status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                detail=self.error_message
            )

        self.requests[client_ip].append(now)

# Limit public appointment submissions to 5 requests per IP every 10 minutes (600 seconds)
appointment_rate_limiter = IPRateLimiter(
    requests_limit=5,
    window_seconds=600,
    error_message="Too many appointment requests submitted from this connection. Please wait a few minutes before trying again."
)

# Limit admin login attempts to 3 requests per IP every 5 minutes (300 seconds)
admin_auth_rate_limiter = IPRateLimiter(
    requests_limit=3,
    window_seconds=300,
    error_message="Too many login attempts from this connection. Please wait 5 minutes before trying again."
)
