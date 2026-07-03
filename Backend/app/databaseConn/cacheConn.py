import redis

redis_client = redis.Redis(
            host="192.168.15.4",
            port=6379,
            decode_responses=True
        )