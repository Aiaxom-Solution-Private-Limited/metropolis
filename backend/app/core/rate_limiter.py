import time
from collections import defaultdict
from fastapi import Request, HTTPException, status

class IPRateLimiter:
    def __init__(self, requests_limit: int = 5, window_seconds: int = 600):
        self.requests_limit = requests_limit
        self.window_seconds = window_seconds
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
                detail="Too many appointment requests submitted from this connection. Please wait a few minutes before trying again."
            )

        self.requests[client_ip].append(now)

# Limit public appointment submissions to 5 requests per IP every 10 minutes (600 seconds)
appointment_rate_limiter = IPRateLimiter(requests_limit=5, window_seconds=600)
