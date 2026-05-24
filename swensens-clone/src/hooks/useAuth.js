import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default useAuth = () => {
    const token = localStorage.getItem("token");
    return { isLoggedIn: !!token };
}