import React, {useEffect, useState, useRef} from "react";
import { useNavigate } from "react-router-dom";
import { CgChevronLeft } from "react-icons/cg";
import { CgCheck } from "react-icons/cg";
import Footer from "../components/Footer";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { el, th } from "date-fns/locale";
import "./datepicker.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { CgClose } from "react-icons/cg";

const PinInput = ({label, seePin, onChange, isError, hasError}) => {
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
                        className={`w-10 h-10 text-center border border-gray-400 rounded focus:outline-none transition-colors duration-200
                            ${isInvalid ? 'border-red-800 focus:ring-2 focus:ring-red-900 focus:ring-offset-2' : 'border-gray-400 focus:ring-gray-400'}`}
                    />
                ))}
            </div>
        </div>
    )
}

function Register() {
        const [step, setStep] = useState(() => {
            return parseInt(sessionStorage.getItem('registerStep') || '1');
        });

        const gotoStep = (n) => {
            setStep(n);
            sessionStorage.setItem('registerStep', n);
        };

        const navigate = useNavigate();
        const [name, setName] = useState("");
        const [iserror, setIsError] = useState("");
        const vaildName = (value) => {
            const namelRegex = /^[^\s@0-9]+$/;
            setName(value);
            if(value.length < 2 && value.length > 0) {
                setIsError("กรุณากรอกอย่างน้อย 2 ตัวอักษร");
            }
            else if(!namelRegex.test(value)) {
                setIsError("กรุณากรอกชื่อให้ถูกต้อง");
            }
            else {
                setIsError("");
            }
        }

        const [lastname, setlastname] = useState("");
        const [iserrorlastname, setIsErrorlastname] = useState("");
        const vaildLastName = (value) => {
            setlastname(value);
            const lastnamelRegex = /^[^\s@0-9]+$/;
            if(value.length < 2 && value.length > 0) {
                setIsErrorlastname("กรุณากรอกอย่างน้อย 2 ตัวอักษร");
            }
            else if(!lastnamelRegex.test(value)) {
                setIsErrorlastname("กรุณากรอกนามสกุลให้ถูกต้อง");
            }
            else {
                setIsErrorlastname("");
            }
        }
        const [numphone, setNumPhone] = useState("");
        const [iserrornumphone, setIsErrorNumPhone] = useState("");

        const vaildPhone = async (value) => {
            const digital = value.replace(/[^0-9]/g,'').slice(0,10);
            let formatted = digital;

            if (digital[0] !== '0' && digital.length > 0) {
                setIsErrorNumPhone("กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง");
                setNumPhone(digital);
                return
            };

            if (digital[1] !== '6' && digital[1] !== '8' && digital[1] !== '9' && digital.length > 1) {
                setIsErrorNumPhone("กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง");
                setNumPhone(digital);
                return
            };

            if (digital.length >= 7) {
                formatted = digital.slice(0, 3) + '-' + digital.slice(3, 6) + '-' + digital.slice(6);
            }
            else if (digital.length >= 4) {
                formatted = digital.slice(0, 3) + '-' + digital.slice(3)
            }
            setNumPhone(formatted);

            if(digital.length < 10 && digital.length > 0) {
                setIsErrorNumPhone("กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง");
            }
            else {
                setIsErrorNumPhone("");
            }

            if (digital.length === 10) {
                const res = await fetch(`http://127.0.0.1:8000/check-phone/${digital}`);
                const data = await res.json();
                if (data.exists) {
                    setIsErrorNumPhone("เบอร์โทรศัพท์นี้ได้ถูกใช้ลงทะเบียนแล้ว กรุณาเข้าสู่ระบบ");
                }
            }
        };

        const [bairthday, setBirthday] = useState(null);

        const [email, setEmail] = useState("");
        const [emailError, setEmailError] = useState("");

        const vaildEmail = async (value) => {
            setEmail(value);
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value) && value.length > 0) {
                setEmailError("กรุณากรอกอีเมลให้ถูกต้อง");
            }
            else {
                setEmailError("");
            }

            if (emailRegex.test(value)) {
                const res = await fetch (`http://127.0.0.1:8000/check-email/${value}`)
                const data = await res.json();
                if (data.exists) {
                    setEmailError("อีเมลนี้ถูกใช้แล้ว");
                }
            }
        };
    
        const [isLandscape, setIsLandscape] = useState(true);
        useEffect(() => {
            const check = () => setIsLandscape(window.innerWidth > window.innerHeight);
            check();
            window.addEventListener("resize", check);
            return () => window.removeEventListener("resize", check);
        }, []);

        const [gender, setGender] = useState("");
        const [agreement, setAgreement] = useState(true);
        const [agreementError, setAgreementError] = useState("");
        const vaildAgreement = (value) => {
            setAgreement(value);
            if(!value) {
                setAgreementError("กรุณายอมรับข้อตกลง");
            }
            else {
                setAgreementError("");
            }
        }
        const [agreementscond, setAgreementscond] = useState(false);

        const handleRegister = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: name,
                        lastname: lastname,
                        phone: numphone.replace(/-/g, ''),
                        email: email,
                        birthday: bairthday.toISOString().split('T')[0],
                        gender: gender,
                        pin: pin1,
                    })
                });

                const data = await response.json();
                if (data.success === true) {
                    sessionStorage.removeItem('registerStep');
                    navigate('/');
                }
                else {
                    alert(data.message || "เกิดข้อผิดพลาดในการสมัครสมาชิก");
                }
            } catch (error) {
                console.error('Error:', error);
                alert("เกิดข้อผิดพลาด กรุณาลองใหม่");
            }
        };

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

        const [time, setTime] = useState(600);
        const [timeOut, setTimeOut] = useState(false);
        useEffect(() => {
            if (step !== 3) return;
            // console.log("step:", step, "time:", time)

            if (time <= 0) {
                setTimeOut(true);
                return
            };
            const interval = setInterval(() => {
                setTime(t => t - 1);
            }, 1000);
            return () => clearInterval(interval);
        }, [time, step]);

        const formatTime = (time) => {
            const minutes = Math.floor(time / 60);
            const seconds = time % 60;
            return `${minutes}:${seconds.toString().padStart(2, '0')}`;
        };

        const [OTP, setOTP] = useState("");

        const [openTermsOfUse, setOpenTermsOfUse] = useState(false);
        const [openPrivacyPolicy, setOpenPrivacyPolicy] = useState(false);
        const [openPDPA, setOpenPDPA] = useState(false);

    return (
        <div>
            {step === 1 && (
                <div className="flex min-h-screen bg-gray-100">
                    <div className={`w-full lg:w-1/2 items-center bg-gray-100 `}>
                        <div className="flex flex-col justify-center bg-white px-10 p-8 rounded-2xl shadow-md mx-0 lg:mx-auto mt-6 mb-2 
                            lg:mr-4 w-full lg:max-w-xl gap-4 sm:mb-3"
                        >

                            <button className="hover:bg-gray-200 w-20 h-[6vh] rounded-xl transition-colors duration-200"
                                onClick={() => navigate('/login')} >
                                <span className="flex items-center gap-1 text-xl leading-none mt-2"> <CgChevronLeft /> กลับ </span>
                            </button>

                            <span className="text-4xl mt-4">สมัครสมาชิกฟรี! รับสิทธิประโยชน์และส่วนลดมากมาย</span>

                            <div className="flex w-full justify-between items-start gap-2 mt-2">
                                <div className="flex flex-col gap-2 w-1/2">
                                    <div className="flex items-center gap-2 leading-none text-gray-500">
                                        <span className="text-black">ชื่อ</span>
                                        <span className="text-red-500">*</span>
                                    </div>
                                    
                                    <input
                                        type="text"
                                        value={name}
                                        required
                                        onChange={(e) => vaildName(e.target.value)}
                                        placeholder="ชื่อ"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />

                                    {iserror && (
                                        <span className="text-red-500 text-sm">{iserror}</span>
                                    )}
                                </div>

                                <div className="flex flex-col gap-2 w-1/2">
                                    <div className="flex items-center gap-2 leading-none text-gray-500">
                                        <span className="text-black">นามสกุล</span>
                                        <span className="text-red-500">*</span>
                                    </div>

                                    <input
                                        type="text"
                                        value={lastname}
                                        required
                                        onChange={(e) => vaildLastName(e.target.value)}
                                        placeholder="นามสกุล"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />

                                    {iserrorlastname && (
                                        <span className="text-red-500 text-sm h-4">{iserrorlastname}</span>
                                    )}
                                </div>
                            </div>

                            <div className="flex w-full justify-between items-start gap-2 mt-4">
                                <div className="flex flex-col gap-2 w-1/2">
                                    <div className="flex items-center gap-2 leading-none text-gray-500">
                                        <span className="text-black">เบอร์โทรศัพท์</span>
                                        <span className="text-red-500">*</span>
                                    </div>
                                    
                                    <input
                                        type="tel"
                                        value={numphone}
                                        maxLength={12}
                                        required
                                        onChange={(e) => vaildPhone(e.target.value)}
                                        placeholder="เบอร์โทรศัพท์"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />

                                    {iserrornumphone && (
                                        <span className="text-red-500 text-sm">{iserrornumphone}</span>
                                    )}
                                </div>

                                <div className="flex flex-col gap-2 w-1/2">
                                    <div className="flex items-center gap-2 leading-none text-gray-500">
                                        <span className="text-black">วันเกิด</span>
                                        <span className="text-red-500">*</span>
                                    </div>

                                    <DatePicker
                                        selected={bairthday}
                                        onChange={(date) => setBirthday(date)}
                                        maxDate={new Date()}
                                        dateFormat="dd/MM/yyyy"
                                        placeholderText="วว/ดด/ปปปป"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        showMonthDropdown
                                        showYearDropdown
                                        dropdownMode="select"
                                        locale={th}
                                    />

                                </div>
                            </div>

                            <div className="flex w-full justify-between items-start gap-2 mt-4">
                                <div className="flex flex-col gap-2 w-1/2">
                                    <span className="text-black">อีเมล (ไม่ระบุได้)</span>
                                    
                                    <input
                                        type="text"
                                        value={email}
                                        required
                                        onChange={(e) => vaildEmail(e.target.value)}
                                        placeholder="อีเมล (ไม่ระบุได้)"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />

                                    {emailError && (
                                        <span className="text-red-500 text-sm">{emailError}</span>
                                    )}
                                </div>

                                <div className="flex flex-col gap-2 w-1/2">
                                    <div className="flex items-center gap-2 leading-none text-gray-500">
                                        <span className="text-black">เพศ</span>
                                        <span className="text-red-500">*</span>
                                    </div>

                                    <div className="flex items-center gap-4 mt-4">
                                        {["male", "female", "none"].map((value, i) => {
                                            const label = ["ชาย", "หญิง", "ไม่ระบุ"];
                                            return (
                                                <label key={value} className="flex items-center gap-2 cursor-pointer">
                                                    <div onClick={() => setGender(value)}
                                                        className={`w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center
                                                        ${gender === value ? "border-red-700 bg-red-700" : "border-gray-300 hover:bg-gray-200 transition-all"}`}
                                                    >
                                                        {gender === value && <div className="w-2 h-2 rounded-full bg-white"></div>}
                                                    </div>
                                                    <span>{label[i]}</span>
                                                </label>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-1 leading-none mt-2">
                                <span className="flex-1 h-px bg-gray-400"></span>
                            </div>

                            <div className="flex items-start gap-3 leading-none text-gray-500">
                                <div onClick = {() => vaildAgreement(!agreement)} 
                                    required
                                    className={`w-4 h-4 rounded-sm border-2 flex items-center
                                    justify-center cusror-pointer ${agreement ? "border-red-700 bg-red-700" : "border-gray-300 hover:bg-gray-200 transition-all"}`}
                                >
                                    {agreement && <div><CgCheck className="text-white"/></div>}
                                </div>
                                
                                <div className="flex flex-wrap items-baseline text-sm gap-x-1"
                                    onClick = {() => vaildAgreement(!agreement)}
                                >
                                    <span className={`${agreement ?'text-black' :'text-red-600'} text-sm`}>ฉันได้อ่านและยอมรับ</span>
                                    <button className="text-blue-500 underline text-sm px-1" 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setOpenTermsOfUse(!openTermsOfUse);
                                        }}
                                    >
                                        ข้อกำหนดการใช้งาน
                                    </button>
                                    <span className={`${agreement ?'text-black' :'text-red-600'} text-sm`}>และ</span>
                                    <button className="text-blue-500 underline text-sm px-1" 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setOpenPrivacyPolicy(!openPrivacyPolicy);
                                        }}
                                    >
                                        นโยบายความเป็นส่วนตัว
                                    </button>
                                    <span className={`${agreement ?'text-black' :'text-red-600'} text-sm`}>ของสเวนเซ่นส์</span>
                                    <span className="text-red-500 text-sm">*</span>
                                </ div>
                            </div>
                            {agreementError && (
                                <span className="text-red-500 text-sm">{agreementError}</span>
                            )}

                            {openTermsOfUse && (
                                <div className="fixed inset-0 z-40 bg-gray-700 bg-opacity-50 flex items-center justify-center"
                                    onClick={() => setOpenTermsOfUse(!openTermsOfUse)}>
                                    <div className="bg-white p-6 rounded-lg max-w-lg w-full"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <div className="flex items-center justify-between mb-4">
                                            <span className="text-2xl font-bold">ข้อกำหนดการใช้งาน</span>
                                            <button className="text-2xl text-gray-500 hover:text-gray-700 transition-colors duration-200"
                                                onClick={() => setOpenTermsOfUse(!openTermsOfUse)}
                                            >
                                                <CgClose />
                                            </button>
                                        </div>
                                        <span className="text-gray-600">
                                            นโยบายคุ้มครองข้อมูลส่วนบุคคลนี้ (“นโยบาย”) ใช้อธิบายว่า บริษัท สเวนเซ่นส์ (ไทย) จำกัด (“เรา” หรือ “บริษัท”) และบริษัทร่วม บริษัทย่อย (รวมเรียกว่า “กลุ่มบริษัท”) 
                                            จัดเก็บรวบรวม ใช้ ประมวลผลและเปิดเผยข้อมูลส่วนบุคคลของท่านผ่านการใช้งานแอปพลิเคชันในโทรศัพท์เคลื่อนที่และเว็บไซต์และการให้บริการออนไลน์ของเรา รวมถึง www.swensens1112.com 
                                            และเว็บไซต์ แอปพลิเคชั่นหรือการให้บริการออนไลน์อื่นๆ ที่บริษัทเป็นเจ้าของหรือเป็นผู้ดำเนินการ (รวมเรียกว่า “ไซต์”) หรือกิจกรรมการตลาดอื่นใด ดำเนินการโดยบริษัท, ผลิตภัณฑ์, ฟีเจอร์ 
                                            และบริการใดๆ ทั้งหมดทั่วโลก (รวมเรียกว่า “บริการ”) โดยนโยบายนี้ใช้กับลูกค้า พาร์ทเนอร์ เอเจนซี่ ผู้รับจ้างและผู้ให้บริการ<br/><br/>

                                            “ข้อมูลส่วนบุคคล” หมายถึง ข้อมูลใดๆ เกี่ยวกับบุคคลที่ทำให้สามารถใช้ระบุตัวบุคคลนั้นได้ไม่ว่าทางตรงหรือทางอ้อม ซึ่งรวมถึงแต่ไม่จำกัดเพียง ชื่อ ที่อยู่หมายเลขโทรศัพท์ อีเมลล์ และข้อมูลส่วนบุคคลอื่นๆ 
                                            อย่างไรก็ตามข้อมูลส่วนบุคคลไม่รวมถึงตำแหน่ง สถานที่ทำงาน ที่อยู่ทางธุรกิจหรือข้อมูลอื่นใดที่ไม่รวมอยู่ในคำจำกัดความของข้อมูลส่วนบุคคลตามกฎหมายไทยเมื่อท่านใช้เว็บไซต์
                                            และแอปพลิเคชันของเราถือว่าท่านยอมรับให้ความยินยอม และตกลงตามเงื่อนไขและข้อกำหนดของนโยบายนี้แล้ว
                                        </span>
                                    </div>
                                </div>
                            )}

                            {openPrivacyPolicy && (
                                <div className="fixed inset-0 z-40 bg-gray-700 bg-opacity-50 flex items-center justify-center"
                                    onClick={() => setOpenPrivacyPolicy(!openPrivacyPolicy)}>
                                    <div className="bg-white p-6 rounded-lg max-w-lg w-full"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <div className="flex items-center justify-between mb-4">
                                            <span className="text-2xl font-bold">นโยบายความเป็นส่วนตัว</span>
                                            <button className="text-2xl text-gray-500 hover:text-gray-700 transition-colors duration-200"
                                                onClick={() => setOpenPrivacyPolicy(!openPrivacyPolicy)}
                                            >
                                                <CgClose />
                                            </button>
                                        </div>
                                        <span className="text-gray-600">
                                            นโยบายคุ้มครองข้อมูลส่วนบุคคลนี้ (“นโยบาย”) ใช้อธิบายว่า บริษัท สเวนเซ่นส์ (ไทย) จำกัด (“เรา” หรือ “บริษัท”) และบริษัทร่วม บริษัทย่อย (รวมเรียกว่า “กลุ่มบริษัท”) 
                                            จัดเก็บรวบรวม ใช้ ประมวลผลและเปิดเผยข้อมูลส่วนบุคคลของท่านผ่านการใช้งานแอปพลิเคชันในโทรศัพท์เคลื่อนที่และเว็บไซต์และการให้บริการออนไลน์ของเรา รวมถึง www.swensens1112.com 
                                            และเว็บไซต์ แอปพลิเคชั่นหรือการให้บริการออนไลน์อื่นๆ ที่บริษัทเป็นเจ้าของหรือเป็นผู้ดำเนินการ (รวมเรียกว่า “ไซต์”) หรือกิจกรรมการตลาดอื่นใด ดำเนินการโดยบริษัท, ผลิตภัณฑ์, ฟีเจอร์ และบริการใดๆ 
                                            ทั้งหมดทั่วโลก (รวมเรียกว่า “บริการ”) โดยนโยบายนี้ใช้กับลูกค้า พาร์ทเนอร์ เอเจนซี่ ผู้รับจ้างและผู้ให้บริการ<br/><br/>

                                            “ข้อมูลส่วนบุคคล” หมายถึง ข้อมูลใดๆ เกี่ยวกับบุคคลที่ทำให้สามารถใช้ระบุตัวบุคคลนั้นได้ไม่ว่าทางตรงหรือทางอ้อม ซึ่งรวมถึงแต่ไม่จำกัดเพียง ชื่อ ที่อยู่หมายเลขโทรศัพท์ อีเมลล์ และข้อมูลส่วนบุคคลอื่นๆ 
                                            อย่างไรก็ตามข้อมูลส่วนบุคคลไม่รวมถึงตำแหน่ง สถานที่ทำงาน ที่อยู่ทางธุรกิจหรือข้อมูลอื่นใดที่ไม่รวมอยู่ในคำจำกัดความของข้อมูลส่วนบุคคลตามกฎหมายไทยเมื่อท่านใช้เว็บไซต์และแอปพลิเคชันของเราถือว่าท่านยอมรับให้ความยินยอม 
                                            และตกลงตามเงื่อนไขและข้อกำหนดของนโยบายนี้แล้ว
                                        </span>
                                    </div>
                                </div>
                            )}

                            <div className="flex items-start gap-3 leading-none text-gray-500">
                                <div onClick = {() => setAgreementscond(!agreementscond)} 
                                    required
                                    className={`w-4 h-4 flex-shrink-0 rounded-sm border-2 flex items-center
                                    justify-center cusror-pointer ${agreementscond ? "border-red-700 bg-red-700" : "border-gray-300 hover:bg-gray-200 transition-all"}`}
                                >
                                    {agreementscond && <div><CgCheck className="text-white"/></div>}
                                </div>

                                <div className="flex flex-wrap items-baseline text-sm gap-x-1"
                                    onClick = {() => setAgreementscond(!agreementscond)}
                                >
                                    <span className="text-black">ฉันยินยอมรับข้อมูลข่าวสาร กิจกรรมส่งเสริมการขายต่างๆ จากสเวนเซ่นส์และ</span>
                                    <button className="text-blue-500 underline text-sm px-1" 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setOpenPDPA(!openPDPA);
                                        }}
                                    >
                                        บริษัทในเครือ
                                    </button>
                                    <span className="text-black">โดยเราจะเก็บข้อมูลของท่านไว้เป็นความลับ สามารถศึกษา</span>
                                    <span className="text-black">เงื่อนไขหรือข้อตกลง</span>
                                    <button className="text-blue-500 underline text-sm px-1" 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setOpenPrivacyPolicy(!openPrivacyPolicy);
                                        }}
                                    >
                                        นโยบายความเป็นส่วนตัว
                                    </button>
                                    <span className="text-black">เพิ่มเติมได้ที่เว็บไซต์ของบริษัทฯ</span>
                                </ div>
                            </div>

                            {openPDPA && (
                                <div className="fixed inset-0 z-40 bg-gray-700 bg-opacity-50 flex items-center justify-center"
                                    onClick={() => setOpenPDPA(!openPDPA)}>
                                    <div className="bg-white p-6 rounded-lg max-w-lg w-full"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <div className="flex items-center justify-between mb-4">
                                            <span className="text-2xl font-bold">PDPA</span>
                                            <button className="text-2xl text-gray-500 hover:text-gray-700 transition-colors duration-200"
                                                onClick={() => setOpenPDPA(!openPDPA)}
                                            >
                                                <CgClose />
                                            </button>
                                        </div>
                                        <img src="./PDPA.png" alt="PDPA" className="w-auto h-auto mb-4" />
                                        <span className="text-gray-600">
                                            นโยบายคุ้มครองข้อมูลส่วนบุคคลนี้ (“นโยบาย”) ใช้อธิบายว่า บริษัท สเวนเซ่นส์ (ไทย) จำกัด (“เรา” หรือ “บริษัท”) และบริษัทร่วม บริษัทย่อย (รวมเรียกว่า “กลุ่มบริษัท”) 
                                            จัดเก็บรวบรวม ใช้ ประมวลผล และเปิดเผยข้อมูลส่วนบุคคลของท่าน ผ่านการใช้งานแอปพลิเคชันในโทรศัพท์เคลื่อนที่และเว็บไซต์และการให้บริการออนไลน์ของเรา 
                                            รวมถึง <br/> 
                                            www.swensens1112.com และเว็บไซต์ แอปพลิเคชั่น หรือการให้บริการออนไลน์อื่นๆ ที่บริษัทเป็นเจ้าของหรือเป็นผู้ดำเนินการ (รวมเรียกว่า “ไซต์”) 
                                            หรือกิจกรรมการตลาดอื่นใด ดำเนินการโดยบริษัท, ผลิตภัณฑ์, ฟีเจอร์ และบริการใดๆ ทั้งหมดทั่วโลก (รวมเรียกว่า “บริการ”) โดยนโยบายนี้ใช้กับลูกค้า พาร์ทเนอร์ เอเจนซี่ ผู้รับจ้าง และผู้ให้บริการ
                                        </span>
                                        <button className="w-full h-[6vh] rounded-full font-medium bg-red-600 hover:opacity-80 text-white mt-4 transition-colors duration-200"
                                            onClick={() => setOpenPDPA(!openPDPA)}
                                        >
                                            ตกลง
                                        </button>
                                    </div>
                                </div>
                            )}

                            <button
                                className={`w-full h-[6vh] rounded-full font-medium 
                                    ${name && lastname && !iserror && !iserrorlastname && numphone && bairthday && !iserrornumphone && !emailError && gender && agreement && !agreementError ? 'bg-red-600 hover:opacity-80 text-white' : 'bg-gray-300 cursor-not-allowed text-gray-400' } mt-4 transition-colors duration-200`}
                                onClick={() => gotoStep(2)}
                                disabled={!name || !lastname || iserror ||iserrorlastname || !numphone || !bairthday || iserrornumphone || emailError || !gender || !agreement || agreementError}
                            >
                                สร้างบัญชี
                            </button> 

                            <div className="flex items-center justify-center gap-1 leading-none mt-2">
                                <span >มีบัญชีสมาชิกอยู่แล้วใช่หรือไม่</span>
                                <div className="flex items-center justify-center hover:bg-gray-200 h-[3vh] rounded transition-colors duration-200">
                                    <div onClick={() => navigate('/login')}>
                                        <button className="underline px-2">เข้าสู่ระบบ</button>
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
                                    onClick={() => gotoStep(3)}
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

            {step === 3 && (
                <div onClick={() => setSelectMethod(false)}>
                    <div className="flex min-h-screen bg-gray-100">
                        <div className={`w-full lg:w-1/2 items-center bg-gray-100 `}>
                            <div className="flex flex-col justify-center bg-white px-10 p-8 rounded-2xl shadow-md mx-0 lg:mx-auto mt-6 mb-2 
                                lg:mr-4 w-full lg:max-w-xl gap-4 sm:mb-3"
                            >

                                <button className="hover:bg-gray-200 w-20 h-[6vh] rounded-xl transition-colors duration-200"
                                    onClick={() => gotoStep(2)} >
                                    <span className="flex items-center gap-1 text-xl leading-none mt-2"> <CgChevronLeft /> กลับ </span>
                                </button>

                                <span className="text-4xl mt-4">รหัสยืนยัน OTP</span>
                                <span className="text-sm mt-4 text-gray-600">เราได้ส่งรหัส OTP ที่ส่งไปยังหมายเลข +66 {numphone.replace(/-/g, '').replace(/^0/, '')} กรุณาตรวจสอบที่ข้อความ แล้วกรอกตัวเลขให้ถูกต้อง</span>

                                <div className="flex flex-col items-center fustify-center gap-4 mt-4">
                                    <span className="text-sm text-gray-500"> รหัสอ้างอิง : 
                                        <span className="text-red-600">mock</span>
                                        ({formatTime(time)})
                                    </span>
                                    <PinInput label="" seePin={false} onChange={setOTP} isError={setPinError} hasError={time <= 0}/>
                                </div>

                                {time <= 0 && (
                                    <span className="flex items-center justify-center text-red-500 text-sm mt-2">รหัส OTP ของคุณหมดอายุแล้ว กรุณาขอรหัสใหม่อีกครั้ง</span>
                                )}

                                <div className="flex items-center justify-center gap-2 leading-none">
                                    <span className="text-lg text-gray-600">ไม่ได้รับรหัสยืนยัน?</span>
                                    <span className="text-sm text-gray-400"
                                        onClick={() => {
                                            if (time <= 0) {
                                                setOTP("");
                                                setTime(600);
                                                setTimeOut(false);
                                            };
                                    }}>
                                        ส่งอีกครั้ง
                                    </span>
                                </div>

                                <button
                                    className={`w-full h-[6vh] rounded-full font-medium 
                                        ${OTP.length === 6 && time > 0  ? 'bg-red-600 hover:opacity-80 text-white' : 'bg-gray-300 cursor-not-allowed text-gray-400' } mt-4 transition-colors duration-200`}
                                    onClick={handleRegister}
                                    disabled={OTP.length !== 6 || time <= 0}
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
export default Register;
