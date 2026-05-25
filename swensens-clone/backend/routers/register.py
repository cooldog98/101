from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from models import User
from schemas import RegisterRequest

router = APIRouter()

@router.post("/register")
def register(data: RegisterRequest, db: Session = Depends(get_db)):
    existing_phone = db.query(User).filter(User.phone == data.phone).first()
    existing_email = None

    if data.email:
        existing_email = db.query(User).filter(User.email == data.email).first()

    if existing_phone:
        return {"success": False, "message": "เบอร์นี้มีผู้ใช้แล้ว"}
    
    if existing_email:
        return {"success": False, "message": "อีเมลนี้มีผู้ใช้แล้ว"}
    
    user = User(
        name=data.name,
        lastname=data.lastname,
        phone=data.phone,
        email=data.email or None,
        birthday=data.birthday,
        gender=data.gender,
        pin=data.pin
    )
    db.add(user)
    db.commit()
    return {"success": True, "message": "สมัครสมาชิกสำเร็จ"}

@router.get("/users")
def get_users(db: Session = Depends(get_db)):
    users = db.query(User).all()
    return users
