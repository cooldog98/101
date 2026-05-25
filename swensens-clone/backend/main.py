from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import login, register, check, reset
from database import Base, engine

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(register.router)
app.include_router(login.router)
app.include_router(check.router)
app.include_router(reset.router)
