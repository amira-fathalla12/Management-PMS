import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { AUTH_URLS, axiosInstance } from "../api";

interface AuthData {
  loginData: any;
  saveLoginData: () => void;
  logout: () => void;
  userName: string | null;
  profileImage: string | null;
}

export const AuthContext = createContext<AuthData | null>(null);

export default function AuthContextProvider({ children }: { children: React.ReactNode }) {
  const [loginData, setLoginData] = useState<any>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const saveLoginData = () => {
    const encodedToken = localStorage.getItem("token");
    if (!encodedToken) return;

    try {
      const decodedToken = jwtDecode(encodedToken);
      setLoginData(decodedToken);
    } catch (error) {
      console.error("Invalid token:", error);
      logout();
    }
  };

  const getCurrentUser = () => {
    if (!loginData?._id) return;

    axiosInstance
      .get(AUTH_URLS.get_current_user(loginData._id))
      .then((response) => {
        const user = response.data?.data?.user;
        setUserName(user?.userName || null);
        setProfileImage(user?.profileImage || null);
      })
      .catch((error) => {
        console.error("Error fetching user:", error);
      });
  };

  useEffect(() => {
    if (loginData?._id) {
      getCurrentUser();
    }
  }, [loginData]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      saveLoginData();
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setLoginData(null);
    setUserName(null);
    setProfileImage(null);
  };

  return (
    <AuthContext.Provider
      value={{
        loginData,
        saveLoginData,
        logout,
        userName,
        profileImage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
