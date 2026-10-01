"""A tiny in-memory sliding-window rate limiter (per key).

NOTE: This is per-process. For multi-instance deployments, move to a shared
store (e.g. Supabase table or Redis). Documented as a known limitation.
"""
from __future__ import annotations

import threading
import time
from collections import defaultdict, deque


class RateLimiter:
    def __init__(self, max_events: int, window_seconds: int):
        self.max = max_events
        self.window = window_seconds
        self._events: dict[str, deque[float]] = defaultdict(deque)
        self._lock = threading.Lock()

    def allow(self, key: str) -> bool:
        now = time.time()
        with self._lock:
            dq = self._events[key]
            while dq and now - dq[0] > self.window:
                dq.popleft()
            if len(dq) >= self.max:
                return False
            dq.append(now)
            return True

    def reset(self) -> None:
        with self._lock:
            self._events.clear()
