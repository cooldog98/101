import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export const useAuth = () => {
    const token = localStorage.getItem("token");
    if (!token) {
        return { isLoggedIn: false, user: null };
    }
    const user = jwtDecode(token);
    const points = localStorage.getItem("point") || 0;
    return { isLoggedIn: true, user: { ...user, points } };
}
