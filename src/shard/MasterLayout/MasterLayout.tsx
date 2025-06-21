import { useState } from "react";
import { Outlet } from "react-router-dom";
import SidebarComponent from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";

export default function MasterLayout() {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <nav
        className={`sticky top-0 left-0 h-full transition-all duration-300 overflow-x-hidden bg-gray-100 z-50 ${
          collapsed ? "w-[75px]" : "w-[243px]"
        }`}
      >
        <SidebarComponent onToggle={toggleSidebar} collapsed={collapsed} />
      </nav>

      {/* Main Content */}
      <main className="flex-1 h-screen overflow-y-auto p-4 bg-gray-50">
        <Navbar />
        <Outlet />
      </main>
    </div>
  );
}
