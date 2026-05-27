import { data, useLocation } from "react-router-dom";
import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { MdShoppingBag } from "react-icons/md";
import { useAuth } from "../hooks/useAuth";
import { CgProfile } from "react-icons/cg";
import { GoSignOut } from "react-icons/go";
import { TbLicense } from "react-icons/tb";
import { AiFillCaretDown } from "react-icons/ai";
import { TfiClose } from "react-icons/tfi";
import { HiUserCircle } from "react-icons/hi2";
import { MdPeopleAlt } from "react-icons/md";
import { is } from "date-fns/locale";

function Navbar () {
    const navigate = useNavigate();
    const [manuOpen, setManuOpen] = useState(false);
    const ishome = useLocation().pathname === "/";
    const [thai, setThai] = useState(true);
    const [showDropdown, setShowDropdown] = useState(false);
    const [showDropdown_shop, setShowDropdown_shop] = useState(false);
    const [showDropdownProfile, setShowDropdownProfile] = useState(false);

    const [isLandscape, setIsLandscape] = useState(true);
    useEffect(() => {
        const check = () => setIsLandscape(window.innerWidth > window.innerHeight);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);
    
    const [isOpening, setIsOpening] = useState(false);
    const handleOpen = () => {
        setIsOpening(true);
        setShowDropdown_shop(true);
        setTimeout(() => {
            setIsOpening(false);
        }, 10);
    };

    const [isClosing, setIsClosing] = useState(false);
    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            setShowDropdown_shop(false);
            setIsClosing(false);
        }, 300);
    };

    const { isLoggedIn, user } = useAuth();

    useEffect(() => {
        const handleClickOutside = (e) => {
            if(showDropdownProfile) {
                setShowDropdownProfile(false);
            }

            if(showDropdown) {
                setShowDropdown(false);
            }

            if(manuOpen) {
                setManuOpen(false);
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => { document.removeEventListener("click", handleClickOutside) };
    }, [showDropdownProfile, showDropdown, manuOpen]);

    const [lanage, setLanage] = useState(false);

    return (
        <nav className="flex justify-between items-center px-4 py-3 bg-white shadow-md"> 
            <button className="lg:hidden text-2xl" 
                onClick={(e) => {
                    e.stopPropagation();
                    setManuOpen(true);                
                }
            }
            >
                ☰
            </button>
            {manuOpen && (
                <div 
                    className="fixed inset-0 z-40"
                    onClick={(e) => {
                        if (isLoggedIn) {
                            e.stopPropagation();
                            setManuOpen(false);
                        }
                        else {
                            e.stopPropagation();
                            navigate('/');
                            setManuOpen(false);
                        }
                    }}
                    style={{ backgroundColor: isLandscape ? 'transparent' : 'rgba(48, 60, 85, 0.76)' }}
                >
                    <div className={`fixed bg-white shadow-2xl z-50 top-0 left-0 w-3/4 h-full transition-all duration-300`}>
                        <button className="right-4 text-red-600 absolute top-2 text-xl text-bold">
                            <TfiClose />
                        </button>
                        {isLoggedIn ? (
                            <>
                                <span className="block ml-4 mt-16 text-2xl"> สวัสดี, {user.name} 🍦 </span>
                                <div className="flex items-center leading-none">
                                    <img src="/star.png" className="px-2 py-3 h-14"></img>
                                    <span className="flex items-center text-xl font-medium">{user.points} แต้ม</span>
                                </div>
                                <div className="flex-1 h-px  mt-4 bg-gray-200 my-1"></div>
                            </>
                        ) : (
                            <span className="block ml-4 mt-16 text-2xl text-bold-xl mb-2"> Login to begin your ice cream journey </span>
                        )}

                        <div className="px-4">
                            <button 
                                onClick={(e) => {
                                    if (isLoggedIn) {
                                        e.stopPropagation();
                                        setManuOpen(false);
                                    }
                                    else {
                                        e.stopPropagation();
                                        navigate('/');
                                        setManuOpen(false);
                                    }
                                }}
                                className={`flex items-center gap-3 w-full px-4 py-3 text-lg text-left hover:bg-gray-200 rounded-xl`}
                            >
                                <TbLicense />
                                คำสั่งซื้อและสั่งอีกครั้ง
                            </button>

                            <button 
                                onClick={(e) => {
                                    if (isLoggedIn) {
                                        e.stopPropagation();
                                        setManuOpen(false);
                                    }
                                    else {
                                        e.stopPropagation();
                                        navigate('/');
                                        setManuOpen(false);
                                    }
                                }}
                                className="flex items-center gap-3 w-full px-4 py-3 text-lg text-left hover:bg-gray-200 rounded-xl"
                            >
                                <HiUserCircle />
                                โปรไฟล์
                            </button>

                            <button 
                                onClick={(e) => {
                                    if (isLoggedIn) {
                                        e.stopPropagation();
                                        setManuOpen(false);
                                        navigate('/login', { state: { step: 2 } });
                                    }
                                    else {
                                        e.stopPropagation();
                                        navigate('/');
                                        setManuOpen(false);
                                    }
                                }}
                                className="flex items-center gap-3 w-full px-12 py-3 text-lg text-left hover:bg-gray-200 rounded-xl"
                            >
                                {isLoggedIn ? "เปลี่ยน PIN" : "เปลี่ยนรหัสผ่าน"}
                            </button>

                            {!isLoggedIn && (
                                <button 
                                    onClick={(e) =>{
                                        e.stopPropagation();
                                        setManuOpen(false);
                                        navigate('/');
                                    }}
                                    className="flex items-center gap-3 w-full px-12 py-3 text-lg text-left hover:bg-gray-200 rounded-xl"
                                >
                                    จัดการ PIN
                                </button>
                            )}

                            <button 
                                onClick={(e) => {
                                    if (isLoggedIn) {
                                        e.stopPropagation();
                                        setManuOpen(false);
                                    }
                                    else {
                                        e.stopPropagation();
                                        navigate('/');
                                        setManuOpen(false);
                                    }
                                }}
                                className="flex items-center gap-3 w-full px-12 py-3 text-lg text-left hover:bg-gray-200 rounded-xl"
                            >
                                บัตรเครดิตของฉัน
                            </button>
                            <button 
                                onClick={(e) => {
                                    if (isLoggedIn) {
                                        e.stopPropagation();
                                        setManuOpen(false);
                                    }
                                    else {
                                        e.stopPropagation();
                                        navigate('/');
                                        setManuOpen(false);
                                    }
                                }}
                                className="flex items-center gap-3 w-full px-12 py-3 text-lg text-left hover:bg-gray-200 rounded-xl"
                            >
                                สมุดที่อยู่
                            </button>

                            <div className="relative">
                                <button 
                                    onClick={(e) => {
                                            e.stopPropagation();
                                            setLanage(!lanage);
                                        }}
                                    className="flex items-center justify-between gap-3 w-full px-4 py-3 text-lg text-left"
                                >
                                    ภาษา - {thai ? "TH" : "EN"}
                                    <AiFillCaretDown className="text-gray-600 h-[1.4vh]"/>
                                </button>
                                {lanage && (
                                    <div className="left-0 w-full bg-white">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setLanage(!lanage);
                                                setThai(true);
                                            }}
                                            className="flex items-center gap-3 w-full px-6 py-3 text-left text-lg"
                                        >
                                            {thai && <span className="w-1 h-6 bg-red-600 rounded-full"/>}
                                            ภาษาไทย
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setLanage(!lanage);
                                                setThai(false);
                                            }}
                                            className="flex items-center gap-3 w-full px-6 py-3 text-left"
                                        >
                                            {!thai && <span className="w-1 h-6 bg-red-600 rounded-full"/>}
                                            ENGLISH
                                        </button>
                                    </div>
                                )}
                            </div>

                            {isLoggedIn ? (
                                <>
                                    <div className="flex-1 h-px  mt-4 bg-gray-200 my-1"></div>

                                    <button 
                                        onClick={(e) =>{
                                            localStorage.removeItem('token');
                                            setManuOpen(false)
                                            e.stopPropagation();
                                        }}
                                        className={`flex items-center gap-3 w-full px-4 py-3 text-lg text-left text-red-600`}
                                    >
                                        <GoSignOut />
                                        ออกจากระบบ
                                    </button>
                                </>
                            ) : (
                                <>
                                    <div className="leaning-none">
                                        <button className="flex items-center justify-center bg-red-600 mt-4 hover:opacity-80 text-white text-xl w-full gap-2 py-2 rounded-full font-medium transition-opacity duration-300"
                                           onClick={(e) => {
                                                e.stopPropagation();
                                                setManuOpen(false);
                                                navigate('/login');
                                           }}
                                        >
                                            <MdPeopleAlt />
                                            เข้าสู่ระบบ / ลงทะเบียน
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}

            <img src="/Swensens_Logo.png" className="lg:px-4 py-3 h-16 absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0 cursor-pointer" onClick={() => navigate('/')}/>

            <div className="flex items-center gap-4"></div>

            <div className="flex items-center gap-4">
                {isLoggedIn && (
                    <div className="hidden lg:flex flex items-center leading-none">
                        <img src="/star.png" className="px-2 py-3 h-14"></img>
                        <span className="flex items-center text-xl font-medium">{user.points} แต้ม</span>
                    </div>
                )}

                {ishome && (
                    <button className="hover:opacity-60 transition-opacity duration-300" 
                        onClick={() => showDropdown_shop ? handleClose() : handleOpen()}>
                        <img src="/market.png" className="px-4 py-3 h-14" />
                    </button>
                )}

                {showDropdown_shop && (
                    <div className={`fixed inset-0 z-40`}
                        onClick={() => showDropdown_shop ? handleClose() : handleOpen()}
                        style={{ backgroundColor: isLandscape ? 'transparent' : 'rgba(48, 60, 85, 0.76)' }}
                    >
                        <div 
                            className= {`fixed bg-white shadow-2xl z-50 transition-all duration-300 ${
                                isLandscape
                                    ? `top-1/2 right-0 -translate-y-1/2 w-80 h-[75vh] rounded-l-2xl
                                        ${isOpening || isClosing ? 'translate-x-full' : 'translate-x-0'}`
                                    : `bottom-0 left-0 right-0 w-full h-[60vh] rounded-t-2xl
                                         ${isOpening || isClosing ? 'translate-y-full' : 'translate-y-0'}`
                                }`}
                            onClick={e => e.stopPropagation()}
                        >

                            {!isLandscape && (
                                < div className="flex justify-center pt-4" >
                                    <div className="w-8 h-1 bg-gray-200 rounded-full hover:bg-gray-300"></div>
                                </div>
                            )}
                                
                            {isLandscape && (
                                <button 
                                    className="absolute bg-gray-700 top-4 left-4 text-white rounded-full w-8 h-8 grid place-items-center"
                                    onClick={() => handleClose()}
                                >
                                    <TfiClose />
                                </button>
                            )}

                            <div className="flex flex-col items-center justify-center mt-60 text-gray-400">
                                <img src="/add-to-cart.png" className="h-24 mb-4" />
                                <span className="text-lg font-medium">เริ่มเพิ่มสินค้าลงในรถเข็นของคุณ</span>
                            </div>
                        </div>
                    </div>
                )}
                
                <div className="hidden lg:flex relative">
                    {isLoggedIn ? (
                        <button className="hidden lg:flex bg-red-600 hover:opacity-80 text-white text-xl px-4 py-2 rounded-full font-medium transition-opacity duration-300"
                            onClick={(e) => {
                                e.stopPropagation();
                                setShowDropdownProfile(!showDropdownProfile)}}
                        >
                            {user.name}
                        </button>
                    ) : (
                        <button className="hidden lg:flex bg-red-600 hover:opacity-80 text-white text-xl px-4 py-2 rounded-full font-medium transition-opacity duration-300"
                            onClick={() => navigate('/login')}
                        >
                            เข้าสู่ระบบ / ลงทะเบียน
                        </button>
                    )}

                    {showDropdownProfile && (
                        <div className="absolute right-0 top-full mt-2 z-50 bg-white shadow-lg overflow-hidden w-[25vh] p-2 rounded-2xl">
                            <button 
                                onClick={() =>{setShowDropdownProfile(!showDropdownProfile)}}
                                className={`flex leading-none gap-2 mt-4 w-full px-4 py-2 text-sm text-left hover:bg-gray-100`}
                            >
                                <TbLicense />
                                คำสั่งซื้อและสั่งอีกครั้ง
                            </button>
                            <button 
                                onClick={() =>{setShowDropdownProfile(!showDropdownProfile)}}
                                className={`flex leading-none gap-2 mt-4 w-full px-4 py-2 text-sm text-left hover:bg-gray-100`}
                            >
                                <CgProfile />
                                โปรไฟล์
                            </button>

                            <div className="flex-1 h-px  mt-4 bg-gray-200 my-1"></div>

                            <button 
                                onClick={() =>{
                                    localStorage.removeItem('token');
                                    setShowDropdownProfile(!showDropdownProfile)
                                }}
                                className={`flex leading-none gap-2  mt-4 w-full px-4 py-2 text-sm text-left  text-red-500 hover:bg-gray-100`}
                            >
                                <GoSignOut />
                                ออกจากระบบ
                            </button>
                        </div>
                    )}
                </div>

                <div className="hidden lg:flex relative">
                    <button 
                        onClick={(e) => {
                            e.stopPropagation();
                            setShowDropdown(!showDropdown)
                        }}
                        className="flex items-center gap-1 ext-sm front-medum"
                    >
                        <img src="/world.png" className="px-4 py-3 h-10" />
                        {thai ? "TH" : "EN"}
                    </button>

                    {showDropdown && (
                        <div className="absolute right-0 top-full mt-2 z-50 bg-white shadow-lg overflow-hidden w-32 p-2 rounded-2xl">
                            <button 
                                onClick={(e) =>{
                                    e.stopPropagation();
                                    setThai(true); 
                                    setShowDropdown(false)
                                }}
                                className={`w-full px-4 py-2 text-sm hover:bg-gray-100 ${thai ? 'bg-red-100' : ''}`}
                            >
                                TH
                            </button>
                            <button 
                                onClick={(e) =>{
                                    e.stopPropagation();
                                    setThai(false); 
                                    setShowDropdown(false)
                                }}
                                className={`w-full px-4 py-2 text-sm hover:bg-gray-100 ${!thai ? 'bg-red-100' : ''}`}
                            >
                                EN
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {ishome && (
                <button 
                    className="hidden lg:flex fixed right-0 top-1/2 -translate-y-1/2 bg-red-600 hover:scale-x-110 
                    text-white p-4 rounded-l-xl flex flex-col items-center gap-1 transition-transform duration-200 z-30"
                    onClick={() => showDropdown_shop ? handleClose() : handleOpen()}>
                    <MdShoppingBag className="text-4xl"/>
                    <span className="text-sm font-medium">ตะกร้า</span>
                </button>
            )}

        </nav>
    )
}
export default Navbar;