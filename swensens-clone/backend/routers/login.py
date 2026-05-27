from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from models import User
from schemas import LoginRequest
from auth import verify_pin, create_token

router = APIRouter()

@router.post("/login")
def login(data: LoginRequest, db: Session = Depends(get_db)):
    if data.phone:
        user = db.query(User).filter(User.phone == data.phone).first()
        if not user:
            return {"success": False, "message": "ไม่พบผู้ใช้"}
        if data.pin != user.pin:
            return {"success": False, "message": "คุณกรอกเบอร์โทรศัพท์หรือรหัสผ่านไม่ถูกต้อง กรุณาลองอีกครั้ง"}
        
        token = create_token({"id": user.id, "phone": user.phone, "name": user.name})
        return {"success": True, "token": token, "point": user.point}
    
    elif data.email:
        user = db.query(User).filter(User.email == data.email).first()
        if not user or not verify_pin(data.pin, user.pin):
            return {"success": False, "message": "คุณกรอกอีเมลหรือรหัสผ่านไม่ถูกต้อง กรุณาลองอีกครั้ง"}
        token = create_token({"id": user.id, "email": user.email, "name": user.name})
        return {"success": True, "token": token, "point": user.point}
    
    return {"success": False, "message": "กรุณากรอกเบอร์โทรศัพท์หรืออีเมล"}