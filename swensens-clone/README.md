# Swensen's Clone

## Tech Stack

- **React** + **Vite**
- **Tailwind CSS**
- **React Router DOM**
- **React Icons**

---

## การติดตั้ง

### ความต้องการของระบบ
- Node.js >= 18
- npm หรือ yarn

### ขั้นตอน

```bash
# 1. Clone โปรเจกต์
git clone https://github.com/your-username/swensens-clone.git
cd swensens-clone

# 2. ติดตั้ง dependencies
npm install

# 3. ติดตั้ง packages เพิ่มเติม
npm install react-router-dom
npm install react-icons
```

---

## การรัน

# Frontend
```bash
npm run dev
```

เปิดเบราว์เซอร์ที่ \`http://localhost:5173\`

---

## Backend (API)

### ติดตั้ง

```bash
cd backend
pip install fastapi uvicorn sqlalchemy python-jose passlib bcrypt python-dotenv
```

### ตั้งค่า .env

```env
DATABASE_URL=mysql+pymysql://user:password@localhost/dbname
SECRET_KEY=your_secret_key
```

### รัน

```bash
uvicorn main:app --reload
```

โปรเจกต์นี้ต้องการ Backend API ที่ \`http://127.0.0.1:8000\` โดยมี endpoints ดังนี้:

### Endpoints

| Method | Endpoint | คำอธิบาย |
|--------|----------|-----------|
| POST | `/register` | สมัครสมาชิก |
| POST | `/login` | เข้าสู่ระบบด้วยเบอร์+PIN หรืออีเมล+รหัสผ่าน |
| GET | `/check-phone/:phone` | ตรวจสอบว่าเบอร์มีในระบบ |
| GET | `/check-email/:email` | ตรวจสอบว่าอีเมลมีในระบบ |
| POST | `/reset-pin` | รีเซ็ต PIN |
| GET | `/users` | ดึงข้อมูล users ทั้งหมด |

---