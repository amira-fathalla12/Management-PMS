import React, { useContext, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  FiSearch,
  FiBell,
  FiChevronDown,
} from "react-icons/fi"; 
import { AuthContext } from "../../context/AuthContxt";

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { logout, userName, profileImage }: any = useContext(AuthContext);
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const getNameValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchParams({ ...Object.fromEntries(searchParams), name: value });
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="bg-[#F8F9FB] rounded-[15px] shadow-none">
      <div className="flex items-center justify-between px-6 py-3">
        {/* Search box */}
        <div className="flex items-center bg-white px-4 py-1 rounded-full w-full max-w-md">
          <FiSearch className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search here..."
            value={searchParams.get("name") || ""}
            onChange={getNameValue}
            className="w-full outline-none bg-transparent text-sm text-gray-700"
          />
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4 ml-6 relative">
          {/* Dropdown toggle */}
          <button onClick={() => setMenuOpen((prev) => !prev)}>
            <FiChevronDown className="text-[#2F313F]" />
          </button>

          {/* Dropdown menu */}
          {menuOpen && (
            <div className="absolute top-12 right-0 bg-white rounded-md shadow-md z-10">
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm hover:bg-gray-100 w-full text-left"
              >
                Logout
              </button>
            </div>
          )}

          {/* Notifications */}
          <button className="ml-2">
            <FiBell className="text-[#2F313F] text-xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
