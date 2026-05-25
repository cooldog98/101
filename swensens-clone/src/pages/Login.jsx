import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { CgChevronLeft } from "react-icons/cg";
import { IoPhonePortraitOutline } from "react-icons/io5";
import { IoMdMail } from "react-icons/io";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Footer from "../components/Footer";
import { MdLock } from "react-icons/md";
import { set } from "date-fns";

const PinInput = ({label, seePin, onChange, isError, hasError, rounded}) => {
    const [pin, setPin] = useState(Array(6).fill(''));
    const [wasFulled, setWasFulled] = useState(false);
    const inputsRef = useRef([]);

    const handleChange = (index, value) => {
        if (!/^\d*$/.test(value)) return;
        const newPin = [...pin];
        newPin[index] = value.slice(-1);
        setPin(newPin);
        const filledPin = newPin.filter(p => p !== '').length;
        if (filledPin === 6) {
            setWasFulled(true);
            isError("");
            onChange(newPin.join(''));
        }
        else {
            onChange('');
            if (wasFulled) {
                isError("PIN ต้องมี 6 หลัก");
            }
            else {
                isError("");
            }
        }

        if (value && index < 5) {
            inputsRef.current[index + 1].focus();
        }

        if (newPin.every(p => p !== '')) {
            onChange(newPin.join(''));
        }
        else {
            onChange('');
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !pin[index] && index > 0) {
            inputsRef.current[index - 1].focus();
        }
    };

    const isInvalid = (hasError || (wasFulled && pin.some(p => p === '')));

    return (
        <div className="flex flex-col gap-4">
            <span className="text-lg mt-2 ml-4">{label}</span>
            <div className="flex gap-10 ml-4 sm:justify-center">
                {pin.map((pin, i) => (
                    <input
                        key={i}
                        ref={el => inputsRef.current[i] = el}
                        type={`${seePin ? 'text' : 'password'}`}
                        value={pin}
                        onChange={(e) => handleChange(i, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(i, e)}
                        maxLength={1}
                        className={`text-center border border-gray-400 ${rounded ?'w-6 h-6 rounded-full focus:ring-1 focus:ring-red-500 focus:border-red-500' : 'w-10 h-10 rounded'} focus:outline-none transition-colors duration-200
                            ${isInvalid ? 'border-red-800 focus:ring-2 focus:ring-red-900 focus:ring-offset-2' : 'border-gray-400 focus:ring-gray-400'}`}
                    />
                ))}
            </div>
        </div>
    )
}

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

    const [clickEmailPin, setClickEmailPin] = useState("");
    const [pinAttempts, setPinAttempts] = useState(3);
    const [pinLoginError, setPinLoginError] = useState("");

    const handleLogin = async () => {
        try {
            const res = await fetch('http://127.0.0.1:8000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    phone: isusePhone ? phonenum.replace(/-/g, '') : undefined,
                    email: !isusePhone ? email : undefined,
                    pin: !isusePhone ? password : pin1,
                }),
            });
            const data = await res.json();

            if (data.success) {
                localStorage.setItem('token', data.token)
                console.log('Login successful:', data);
                navigate('/');
            }
            else {
                setClickEmailPin("อีเมลหรือรหัสผ่านไม่ถูกต้อง");
                const remainingAttempts = pinAttempts - 1;
                setPinAttempts(remainingAttempts);
                if (remainingAttempts < 0) {
                    setPinLoginError("เกิดข้อผิดพลาด บัญชีถูกล็อก คุณเข้าใช้งานไม่สำเร็จเกินจำนวนครั้งที่กำหนด กรุณารอ 10 นาที");
                }
                else {
                    setPinLoginError(`รหัส PIN ไม่ถูกต้อง คุณสามารถลองใหม่ได้อีก ${remainingAttempts} ครั้ง`);
                }
            }
        }
        catch (error) {
            setIsError("เกิดข้อผิดพลาด กรุณาลองใหม่");
        }

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

    const [step, setStep] = useState(() => {
        return parseInt(sessionStorage.getItem('loginStep') || '1');
    });
    
    const gotoStep = (n) => {
        setStep(n);
        sessionStorage.setItem('loginStep', n);
    };

    const [comfirmPin, setConfirmPin] = useState("");

    const [seePin, setSeePin] = useState(false);
    const [pin1, setPin1] = useState("");
    const [pin2, setPin2] = useState("");
    const [selectMethod, setSelectMethod] = useState(false);
    const [pinError, setPinError] = useState("");
    const [pinError2, setPinError2] = useState("");
    const handlePin2 = (value) => {
        setPin2(value);
        if (value !== pin1 && value.length === 6) {
            setPinError2("รหัส PIN ไม่ตรงกัน กรุณาลองใหม่อีกครั้ง");
        }
        else {
            setPinError2("");
        }
    };

    const handleResetPin = async () => {
        const res = await fetch('http://127.0.0.1:8000/reset-pin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                phone: phonenum.replace(/-/g, ''),
                new_pin: pin1
            })
        });
        const data = await res.json();
        if (data.success) {
            gotoStep(1);
        }
    };

    const handleCheckPhone = async () => {
        try {
            const res = await fetch(`http://127.0.0.1:8000/check-phone/${phonenum.replace(/-/g, '')}`)
            const data = await res.json();
            if (!data.exists) {
                setIsErrorNumPhone("ไม่พบเบอร์นี้ในระบบ");
                return;
            }
            setIsErrorNumPhone("");
            gotoStep(2);
        } catch (error) {
            setIsErrorNumPhone("เกิดข้อผิดพลาด กรุณาลองใหม่");
        }
    };

    return (
        <div>
            {step === 1 && (
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
                                        className={`w-full h-[6vh] rounded-xl ${iserrornumphone ?'border-red-700' : 'border-gray-300'} border-2 px-4 mt-2 focus:outline-none focus:ring-2 focus:ring-gray-500 hover:bg-gray-200`}
                                        placeholder="กรอกเบอร์โทรศัพท์" />
                                    
                                    {iserrornumphone && (
                                        <span className="text-red-600 text-sm mt-1">{iserrornumphone}</span>
                                    )}
                                    
                                    <button
                                        className={`w-full h-[6vh] rounded-full font-medium 
                                        ${phonenum || !vaildPhone ? 'bg-red-600 hover:opacity-80 text-white' : 'bg-gray-300 cursor-not-allowed text-gray-400' } mt-4 transition-colors duration-200`}
                                        // onClick={handleLogin}
                                        onClick={handleCheckPhone}
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
                                        className={`w-full h-[6vh] rounded-xl ${clickEmailPin ? 'border-red-700' : 'border-gray-300'} border-2 px-4 mt-2 focus:outline-none focus:ring-2 focus:ring-gray-500 hover:bg-gray-200`}
                                        placeholder="กรอกอีเมลของคุณ"
                                    />

                                    {iserror && (
                                        <span className="text-red-600 text-sm mt-1">{iserror}</span>
                                    )}

                                    <div className="relative mt-2">
                                        <div className="flex items-center gap-2 leading-none mt-2">
                                            <span>รหัสผ่าน</span>
                                            <span className="text-red-600">*</span>
                                        </div>

                                        <input
                                            type={`${see ? 'text' : 'password'}`}
                                            value={password}
                                            required
                                            onChange={(e) => vaildPassword(e.target.value)}
                                            className={`w-full h-[6vh] rounded-xl ${clickEmailPin ? 'border-red-700' : 'border-gray-300'} border-2 px-4 mt-2 focus:outline-none focus:ring-2 focus:ring-gray-500 hover:bg-gray-200`}
                                            placeholder="รหัสผ่าน"
                                        />

                                        {passwordError && (
                                            <span className="text-red-600 text-sm mt-1">{passwordError}</span>
                                        )}

                                        {clickEmailPin && (
                                            <span className="text-red-600 text-sm mt-1">{clickEmailPin}</span>
                                        )}
                                        
                                        <button className="absolute right-3 top-10 text-gray-400"
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
            )}

            {step === 2 && (
                <div onClick={() => setSelectMethod(false)}>
                    <div className="flex min-h-screen bg-gray-100">
                        <div className={`w-full lg:w-1/2 items-center bg-gray-100 `}>
                            <div className="flex flex-col justify-center bg-white px-10 p-8 rounded-2xl shadow-md mx-0 lg:mx-auto mt-6 mb-2 
                                lg:mr-4 w-full lg:max-w-xl gap-4 sm:mb-3"
                            >

                                <button className="hover:bg-gray-200 w-20 h-[6vh] rounded-xl transition-colors duration-200"
                                    onClick={() => gotoStep(1)} >
                                    <span className="flex items-center gap-1 text-xl leading-none mt-2"> <CgChevronLeft /> กลับ </span>
                                </button>

                                <span className="flex items-center justify-center text-4xl mt-4 rounded-full bg-gray-200 w-16 h-16 mx-auto">
                                    <MdLock className="text-gray-500"/>
                                </span>

                                <span className="flex items-center justify-center text-3xl mt-4">ใส่รหัส PIN</span>

                                <PinInput label="" seePin={false} onChange={setPin1} isError={setPinError} hasError={!!pinError} rounded={true}/>

                                {pinLoginError && (
                                    <span className="flex items-center justify-center text-red-500 text-sm text-center">
                                        {pinLoginError}
                                    </span>
                                )}

                                <button
                                    className={`w-full h-[6vh] rounded-full font-medium 
                                        ${pin1.length === 6 ? 'bg-red-600 hover:opacity-80 text-white' : 'bg-gray-300 cursor-not-allowed text-gray-400' } mt-4 transition-colors duration-200`}
                                        onClick={() => {
                                            handleLogin();
                                            sessionStorage.removeItem('loginStep');
                                        }}
                                        disabled={pin1.length !== 6 || pinAttempts <= 0}
                                >
                                    ดำเนินการต่อ
                                </button> 

                                <div className="flex items-center gap-2 mt-2 cursor-pointer  w-fit mx-auto hover:bg-gray-200 w-fit py-2 mx-auto px-2 rounded transition-colors duration-200">
                                    <div onClick={() => gotoStep(3)}>
                                        <button className="underline px-2">ลืมรหัส PIN</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="hidden lg:flex w-1/2 h-10 flex justify-end min-h-screen bg-gray-100 pr-4">
                            <img src="/picin-login.png" className="h-full object-top" />
                        </div>
                    </div>
                </div>
            )}

            {step === 3 && (
                <div onClick={() => setSelectMethod(false)}>
                    <div className="flex min-h-screen bg-gray-100">
                        <div className={`w-full lg:w-1/2 items-center bg-gray-100 `}>
                            <div className="flex flex-col justify-center bg-white px-10 p-8 rounded-2xl shadow-md mx-0 lg:mx-auto mt-6 mb-2 
                                lg:mr-4 w-full lg:max-w-xl gap-4 sm:mb-3"
                            >
                
                                <button className="hover:bg-gray-200 w-20 h-[6vh] rounded-xl transition-colors duration-200"
                                    onClick={() => gotoStep(1)} >
                                        <span className="flex items-center gap-1 text-xl leading-none mt-2"> <CgChevronLeft /> กลับ </span>
                                </button>
                
                                <span className="text-4xl mt-4">สร้างรหัส PIN</span>
                                <span className="text-sm mt-4 text-gray-600">รหัส PIN 6 หลักนี้จะช่วยให้คุณทำกิจกรรม ได้อย่างปลอดภัยยิ่งขึ้น</span>
                
                                <div className="flex flex-col gap-4 mt-4">
                                    <PinInput label="สร้างรหัส PIN" seePin={seePin} onChange={setPin1} isError={setPinError}/>
                                    {pinError && (
                                        <span className="flex items-center justify-center text-red-500 text-sm">{pinError}</span>
                                    )}
                                    <PinInput label="ยืนยันรหัส PIN" seePin={seePin} onChange={handlePin2} isError={setPinError2} hasError={!!pinError2}/>
                                        {pinError2 && (
                                            <span className="flex items-center justify-center text-red-500 text-sm">{pinError2}</span>
                                        )}
                                </div>
                
                                <div className={`flex items-center gap-2 mt-2 cursor-pointer  w-fit mx-auto
                                    ${selectMethod ? 'bg-red-100 px-2 py-2 rounded' : 'hover:bg-gray-200 w-fit py-2 mx-auto px-2 rounded transition-colors duration-200'}`} 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setSeePin(!seePin);
                                        setSelectMethod(true);
                                    }}
                                >
                                    {seePin ? <FaEyeSlash className="text-gray-600"/> : <FaEye className="text-gray-600"/>}
                                    <span className={`text-2sm text-gray-600`}>{seePin ? "ซ่อนรหัส PIN" : "แสดงรหัส PIN"}</span>
                                </div>
                
                                <button
                                    className={`w-full h-[6vh] rounded-full font-medium 
                                        ${pin1.length === 6 && pin2.length === 6 && pin1 === pin2 ? 'bg-red-600 hover:opacity-80 text-white' : 'bg-gray-300 cursor-not-allowed text-gray-400' } mt-4 transition-colors duration-200`}
                                        onClick={handleResetPin}
                                    disabled={pin1.length !== 6 || pin2.length !== 6 || pin1 !== pin2}
                                >
                                    ดำเนินการต่อ
                                </button> 
                            </div>
                        </div>
                
                        <div className="hidden lg:flex w-1/2 h-10 flex justify-end min-h-screen bg-gray-100 pr-4">
                            <img src="/picin-login.png" className="h-full object-top" />
                        </div>
                    </div>
                </div>
            )}
            
            <Footer />
        </div>
    )
  }
  
  export default Login;