from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from models import User
from schemas import ResetPinRequest

router = APIRouter()

@router.post("/reset-pin")
def reset_pin(data: ResetPinRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.phone == data.phone).first()
    if not user:
        return {"success": False, "message": "ไม่พบเบอร์นี้ในระบบ"}
    
    user.pin = data.new_pin
    db.commit()
    return {"success": True, "message": "เปลี่ยนรหัส PIN สำเร็จ"}