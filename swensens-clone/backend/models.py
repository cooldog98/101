from database import Base
from sqlalchemy import Column, String, Integer, Date

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True)
    name = Column(String(100))
    lastname = Column(String(100))
    phone = Column(String(20), unique=True)
    email = Column(String(100))
    birthday = Column(Date)
    gender = Column(String(10))
    pin = Column(String(6))