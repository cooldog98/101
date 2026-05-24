from pydantic import BaseModel
from typing import Optional

class RegisterRequest(BaseModel):
    name: str
    lastname: str
    phone: str
    email: Optional[str] = None
    birthday: str
    gender: str
    pin: str

class LoginRequest(BaseModel):
    phone: Optional[str] = None
    email: Optional[str] = None
    pin: Optional[str] = None