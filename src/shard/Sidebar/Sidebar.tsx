import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  HomeTwoTone,
  PeopleAltTwoTone,
  DashboardTwoTone,
  CalendarMonthTwoTone,
  BookOnlineTwoTone,
  PrecisionManufacturingTwoTone,
  LockOpenTwoTone,
  LogoutTwoTone,
  DoubleArrow,
} from "@mui/icons-material";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContxt";

interface SidebarProps {
  onToggle: () => void;
  collapsed: boolean;
}

export default function SidebarComponent({ onToggle, collapsed }: SidebarProps) {
  const { logout }: any = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isActive = (path: string) => location.pathname.includes(path);

  const menuItems = [
    { label: "Home", path: "/dashboard", icon: <HomeTwoTone /> },
    { label: "Rooms", path: "/rooms", icon: <DashboardTwoTone /> },
    { label: "Change Password", path: "/change-password", icon: <LockOpenTwoTone /> },
  ];

  return (
    <div className="h-screen w-fit bg-[#203FC7] relative">
      {/* Toggle button */}
      <button
        onClick={onToggle}
        className={`absolute top-4 ${collapsed ? "right-[170px]" : "right-2"} transition-transform duration-300 text-white`}
      >
        <DoubleArrow className={`${collapsed ? "rotate-180" : "rotate-0"} transition-transform duration-300`} />
      </button>

      {/* Sidebar menu */}
      <div className="pt-16 flex flex-col">
        {menuItems.map(({ label, path, icon }) => (
          <Link
            key={path}
            to={path}
            className={`flex items-center px-4 py-3 text-white transition-all ${
              isActive(path) ? "bg-black/20" : "hover:bg-black/10"
            }`}
          >
            <span className="text-white">{icon}</span>
            {!collapsed && <span className="ml-4">{label}</span>}
          </Link>
        ))}

        {/* Logout button */}
        <button
          onClick={handleLogout}
          className="flex items-center px-4 py-3 text-white hover:bg-black/10 transition-all"
        >
          <LogoutTwoTone />
          {!collapsed && <span className="ml-4">Logout</span>}
        </button>
      </div>
    </div>
  );
}
