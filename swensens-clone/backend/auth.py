from passlib.context import CryptContext
from jose import jwt
import os
from dotenv import load_dotenv

load_dotenv()

pwd_context = CryptContext(schemes=["bcrypt"])
SECRET_KEY = os.getenv("SECRET_KEY")

def hash_pin(pin: str):
    return pwd_context.hash(pin)

def verify_pin(pin: str, hashed: str):
    return pin == hashed

def create_token(data: dict):
    return jwt.encode(data, SECRET_KEY, algorithm="HS256")