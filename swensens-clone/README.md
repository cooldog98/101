# Swensen's Clone 🍦

เว็บไซต์สั่งไอศกรีม Swensen's จำลอง สร้างด้วย React + Vite + Tailwind CSS

---

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

\`\`\`bash
# 1. Clone โปรเจกต์
git clone https://github.com/your-username/swensens-clone.git
cd swensens-clone

# 2. ติดตั้ง dependencies
npm install

# 3. ติดตั้ง packages เพิ่มเติม
npm install react-router-dom
npm install react-icons
\`\`\`

---

## การรัน

\`\`\`bash
# Frontend
npm run dev
\`\`\`

\`\`\`bash
# Backend
uvicorn main:app --reload
\`\`\`

เปิดเบราว์เซอร์ที่ \`http://localhost:5173\`

\`\`\`bash
# Build สำหรับ Production
npm run build

# Preview Production build
npm run preview
\`\`\`

---

## Backend (API)

โปรเจกต์นี้ต้องการ Backend API ที่ \`http://127.0.0.1:8000\` โดยมี endpoints ดังนี้:

| Method | Endpoint | คำอธิบาย |
|--------|----------|-----------|
| POST | \`/login\` | เข้าสู่ระบบ |
| GET | \`/check-phone/:phone\` | ตรวจสอบเบอร์โทรศัพท์ |
| POST | \`/reset-pin\` | รีเซ็ต PIN |

---

## โครงสร้างโปรเจกต์

\`\`\`
src/
├── components/
│   ├── Navbar.jsx
│   └── Footer.jsx
├── pages/
│   ├── Home.jsx
│   └── Login.jsx
├── hooks/
│   └── useAuth.js
└── App.jsx
\`\`\`

---