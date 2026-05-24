import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { CgChevronLeft } from "react-icons/cg";
import { IoPhonePortraitOutline } from "react-icons/io5";
import { IoMdMail } from "react-icons/io";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Footer from "../components/Footer";

function Login() {
    const navigate = useNavigate();
    const [phonenum, setPhonenum] = useState("");
    const [email, setEmail] = useState("");
    const [iserror, setIsError] = useState("");
    const vaildEmail = (value) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regex.test(value)) {
            setIsError("กรุณากรอกอีเมลให้ถูกต้อง");
        } else {
            setIsError("");
        }
        setEmail(value);
    };

    const [password, setPassword] = useState("");
    const [see, setSee] = useState(false);
    const [passwordError, setPasswordError] = useState("");
    const vaildPassword = (value) => {
        setPassword(value);
        if (!value) {
            setPasswordError("กรุณากรอกรหัสผ่าน");
            return;
        }
        else {setPasswordError("");}
    };

    const [isusePhone, setIsUsePhone] = useState(true);
    const [iserrornumphone, setIsErrorNumPhone] = useState("");
    const vaildPhone = (value) => {
        const digital = value.replace(/[^0-9]/g,'').slice(0,10);
        let formatted = digital;
    
        if (digital.length >= 7) {
            formatted = digital.slice(0, 3) + '-' + digital.slice(3, 6) + '-' + digital.slice(6);
        }
        else if (digital.length >= 4) {
            formatted = digital.slice(0, 3) + '-' + digital.slice(3)
        }
        setPhonenum(formatted);
    };
    
    const [chooseGmail, setChooseGmail] = useState(false);

    const handleLogin = () => {
        // Implement login logic here
        console.log("Phone Number:", phonenum);
        console.log("Email:", email);
        console.log("Password:", password);
        };

    const [isLandscape, setIsLandscape] = useState(true);
    useEffect(() => {
        const check = () => setIsLandscape(window.innerWidth > window.innerHeight);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    return (
        <div>
            <div className="flex min-h-screen bg-gray-100">
                <div className={`w-full lg:w-1/2 items-center bg-gray-100 `}>
                    <div className="flex flex-col justify-center bg-white px-10 p-8 rounded-2xl shadow-md mx-0 lg:mx-auto mt-6 mb-2 
                         lg:mr-4 w-full lg:max-w-xl gap-4 sm:mb-3"
                    >

                        <button className="hover:bg-gray-200 w-20 h-[6vh] rounded-xl transition-colors duration-200"
                            onClick={() => navigate('/')} >
                            <span className="flex items-center gap-1 text-xl leading-none mt-2"> <CgChevronLeft /> กลับ </span>
                        </button>

                        <span className="text-4xl">ยินดีต้อนรับสมาชิก Swensen's เข้าสู่ระบบแล้วเริ่มสั่งไอศกรีมกันเลย!</span>

                        {isusePhone && (
                            <div>
                                <div className="flex items-center gap-1 leading-none mt-2"> 
                                    <span>เบอร์โทรศัพท์</span>
                                    <span className="text-red-600">*</span>
                                </div>

                                <input type="tel" 
                                    value={phonenum}
                                    maxLength={12}
                                    onChange={(e) => vaildPhone(e.target.value)}
                                    required
                                    className="w-full h-[6vh] rounded-xl border-gray-300 border-2 px-4 mt-2 focus:outline-none focus:ring-2 focus:ring-gray-500 hover:bg-gray-200"
                                    placeholder="กรอกเบอร์โทรศัพท์" />
                                
                                <button
                                    className={`w-full h-[6vh] rounded-full font-medium 
                                    ${phonenum || !vaildPhone ? 'bg-red-600 hover:opacity-80 text-white' : 'bg-gray-300 cursor-not-allowed text-gray-400' } mt-4 transition-colors duration-200`}
                                    onClick={handleLogin}
                                    disabled={!phonenum}
                                >
                                    ดำเนินการต่อ
                                </button>  
                            </div>
                        )}

                        {!isusePhone && (
                            <div>
                                <div className="flex items-center gap-2 leading-none mt-2">
                                    <span>อีเมล</span>
                                    <span className="text-red-600">*</span>
                                </div>
                                
                                <input
                                    type="email"
                                    value={email}
                                    required
                                    onChange={(e) => vaildEmail(e.target.value)}
                                    className="w-full h-[6vh] rounded-xl border-gray-300 border-2 px-4 mt-2 focus:outline-none focus:ring-2 focus:ring-gray-500 hover:bg-gray-200"
                                    placeholder="กรอกอีเมลของคุณ"
                                />

                                {iserror && (
                                    <span className="text-red-600 text-sm mt-1">{iserror}</span>
                                )}

                                <div className="relative">
                                    <div className="flex items-center gap-2 leading-none mt-2">
                                        <span>รหัสผ่าน</span>
                                        <span className="text-red-600">*</span>
                                    </div>

                                    <input
                                        type={`${see ? 'text' : 'password'}`}
                                        value={password}
                                        required
                                        onChange={(e) => vaildPassword(e.target.value)}
                                        className="w-full h-[6vh] rounded-xl border-gray-300 border-2 px-4 mt-2 focus:outline-none focus:ring-2 focus:ring-gray-500 hover:bg-gray-200"
                                        placeholder="รหัสผ่าน"
                                    />

                                    {passwordError && (
                                        <span className="text-red-600 text-sm mt-1">{passwordError}</span>
                                    )}
                                    
                                    <button className="absolute right-3 top-[4.8vh] -translate-y-1/2 text-gray-400"
                                        onClick={() => setSee(!see)}
                                    >
                                        {see ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>

                                <button className="hover:bg-gray-100 w-25 h-[4vh] rounded-xl transition-colors duration-200 mt-2 px-2"
                                    style={{color:'rgb(22, 111, 244)'}}
                                    onClick={() => navigate('/')} >
                                    <span className="flex items-center gap-1 text-sm leading-none mt-2"> ลืมรหัสผ่าน?</span>
                                </button>

                                <button
                                    className={`w-full h-[6vh] rounded-full font-medium 
                                    ${email && password && !iserror && !passwordError ? 'bg-red-600 hover:opacity-80 text-white' : 'bg-gray-300 cursor-not-allowed text-gray-400' } mt-4 transition-colors duration-200`}
                                    onClick={handleLogin}
                                    disabled={!email || !password || iserror || passwordError}
                                >
                                    เข้าสู่ระบบ
                                </button>  
                            </div>
                        )}

                        <div className="flex items-center gap-1 leading-none mt-2">
                            <span className="flex-1 h-px bg-gray-200"></span>
                            <span className="px-4 text-gray-400">หรือ</span>
                            <span className="flex-1 h-px bg-gray-200"></span>
                        </div>

                        <button className={`flex items-center justify-center gap-2 leading-none mt-2 w-full h-[6vh] border-gray-400 border-2 rounded-full font-medium text-gray-400 
                        hover:bg-red-600 hover:text-white transition-colors duration-200`}
                            onClick={() => {setChooseGmail(!chooseGmail); setIsUsePhone(!isusePhone)}}
                        >
                            {chooseGmail 
                                ? <>
                                    <IoPhonePortraitOutline />
                                    <span>
                                        เลือกใช้เบอร์โทรศัพท์
                                    </span>
                                </>
                                : <>
                                    <IoMdMail />
                                    <span>
                                        เข้าสู่ระบบด้วยอีเมล
                                    </span>
                                </>
                            }
                        </button>

                        <div className="flex items-center justify-center gap-1 leading-none mt-2">
                            <span >ยังไม่มีบัญชีใช่หรือไม่</span>
                            <div className="flex items-center justify-center hover:bg-gray-200 h-[3vh] rounded transition-colors duration-200">
                                <div onClick={() => navigate('/register')}>
                                    <button className="underline px-2">สร้างบัญชี</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="hidden lg:flex w-1/2 h-10 flex justify-end min-h-screen bg-gray-100 pr-4">
                    <img src="/picin-login.png" className="h-full object-top" />
                </div>
            </div>
            <Footer />
        </div>
    )
  }
  
  export default Login;