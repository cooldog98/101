from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from models import User

router = APIRouter()

@router.get("/check-phone/{phone}")
def check_phone(phone: str, db: Session = Depends(get_db)):
    existing_phone = db.query(User).filter(User.phone == phone).first()
    return {"exists": bool(existing_phone)}

@router.get("/check-email/{email}")
def check_email(email: str, db: Session = Depends(get_db)):
    existing_email = db.query(User).filter(User.email == email).first()
    return {"exists": bool(existing_email)}