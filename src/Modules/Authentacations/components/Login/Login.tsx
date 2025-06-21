import { MdAlternateEmail } from "react-icons/md";
import { FaFingerprint } from "react-icons/fa";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { BsApple } from "react-icons/bs";
import { FaXTwitter } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css";

import logo from "../../../../assets/logo.png";
import googleIcon from "../../../../assets/google-icon.png";
import { AUTH_URLS, axiosInstance } from "../../../../api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordView = () => setShowPassword(!showPassword);

  const handleLogin = async () => {
    try {
      const res = await axiosInstance.get(`${AUTH_URLS.login}?email=${email}&password=${password}`);
      if (res.data.length > 0) {
        toast.success("Login successful!");
        navigate("/dashboard");
      } else {
        toast.error("Email or Password is incorrect");
      }
    } catch (err) {
      console.error("Login error:", err);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="background">
      <div className="w-full h-screen flex items-center justify-center">
        <div className="w-[90%] max-w-sm p-5 bg-gray-900 flex-col flex items-center gap-3 rounded-xl shadow-lg">
          <img src={logo} alt="logo" className="w-12" />
          <h1 className="text-xl font-semibold">Welcome Back</h1>
          <p className="text-sm text-gray-500 text-center">
            Don't have an account? <span className="text-white">Sign up</span>
          </p>

          <div className="w-full flex flex-col gap-3">
            <div className="flex items-center gap-2 bg-gray-800 p-2 rounded-xl">
              <MdAlternateEmail />
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-transparent w-full outline-none text-base"
              />
            </div>

            <div className="flex items-center gap-2 bg-gray-800 p-2 rounded-xl relative">
              <FaFingerprint />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-transparent w-full outline-none text-base"
              />
              {showPassword ? (
                <FaRegEyeSlash
                  className="absolute right-5 cursor-pointer"
                  onClick={togglePasswordView}
                />
              ) : (
                <FaRegEye
                  className="absolute right-5 cursor-pointer"
                  onClick={togglePasswordView}
                />
              )}
            </div>
          </div>

          <button
            className="w-full p-2 bg-blue-500 rounded-xl mt-3 hover:bg-blue-600 text-base"
            onClick={handleLogin}
          >
            Login
          </button>

          <div className="relative w-full flex items-center justify-center py-3">
            <div className="w-2/5 h-[2px] bg-gray-800"></div>
            <h3 className="text-sm px-4 text-gray-500">Or</h3>
            <div className="w-2/5 h-[2px] bg-gray-800"></div>
          </div>

          <div className="w-full flex items-center justify-evenly gap-2">
            <div className="p-2 bg-slate-700 cursor-pointer rounded-xl hover:bg-slate-800">
              <BsApple className="text-xl" />
            </div>
            <div className="p-1 bg-slate-700 cursor-pointer rounded-xl hover:bg-slate-800">
              <img src={googleIcon} alt="google-icon" className="w-6" />
            </div>
            <div className="p-2 bg-slate-700 cursor-pointer rounded-xl hover:bg-slate-800">
              <FaXTwitter className="text-xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
