import { useLocation } from "react-router-dom";
import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { MdShoppingBag } from "react-icons/md";

function Navbar ({ user }) {
    const navigate = useNavigate();
    const [manuOpen, setManuOpen] = useState(false);
    const ishome = useLocation().pathname === "/";
    const [thai, setThai] = useState(true);
    const [showDropdown, setShowDropdown] = useState(false);
    const [showDropdown_shop, setShowDropdown_shop] = useState(false);

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

    return (
        <nav className="flex justify-between items-center px-4 py-3 bg-white shadow-md"> 
            <button className="lg:hidden text-2xl" 
                onClick={() => setManuOpen(!manuOpen)}
            >
                ☰
            </button>

            <img src="/Swensens_Logo.png" className="lg:px-4 py-3 h-16 absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0 cursor-pointer" onClick={() => navigate('/')}/>

            <div className="flex items-center gap-4"></div>

            <div className="flex items-center gap-4">
                {ishome && (
                    <button className="hover:opacity-60 transition-opacity duration-300" 
                        onClick={() => showDropdown_shop ? handleClose() : handleOpen()}>
                        <img src="/market.png" className="px-4 py-3 h-14" />
                    </button>
                )}

                    {showDropdown_shop && (
                        <div className={`fixed inset-0 z-40`}
                            onClick={() => showDropdown_shop ? handleClose() : handleOpen()}
                            style={{ backgroundColor: isLandscape ? 'transparent' : 'rgba(92, 94, 121, 0.76)' }}
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
                                        X
                                    </button>
                                )}

                                <div className="flex flex-col items-center justify-center mt-60 text-gray-400">
                                    <img src="/add-to-cart.png" className="h-24 mb-4" />
                                    <span className="text-lg font-medium">เริ่มเพิ่มสินค้าลงในรถเข็นของคุณ</span>
                                </div>
                            </div>
                        </div>
                    )}

                <button className="hidden lg:flex bg-red-600 hover:opacity-80 text-white text-xl px-4 py-2 rounded-full font-medium transition-opacity duration-300"
                    onClick={() => navigate('/login')}
                >
                    เข้าสู่ระบบ / ลงทะเบียน
                </button>

                <div className="hidden lg:flex relative">
                    <button 
                        onClick={() => setShowDropdown(!showDropdown)}
                        className="flex items-center gap-1 ext-sm front-medum"
                    >
                        <img src="/world.png" className="px-4 py-3 h-10" />
                        {thai ? "TH" : "EN"}
                    </button>

                    {showDropdown && (
                        <div className="absolute right-0 top-full mt-2 z-50 bg-white shadow-lg overflow-hidden w-32 p-2 rounded-2xl">
                            <button 
                                onClick={() =>{setThai(true); setShowDropdown(false)}}
                                className={`w-full px-4 py-2 text-sm hover:bg-gray-100 ${thai ? 'bg-red-100' : ''}`}
                            >
                                TH
                            </button>
                            <button 
                                onClick={() =>{ setThai(false); setShowDropdown(false)}}
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