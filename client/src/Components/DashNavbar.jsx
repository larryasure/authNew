import { Bell, LogOut, Menu, Settings, User, X } from "lucide-react";
import React, { useEffect, useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

export default function DashNavbar() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const navigate = useNavigate();
  const profileRef = useRef(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    function handleOutsideClick(e) {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setIsProfileOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <>
      <nav className="flex justify-between items-center bg-white px-8 py-4 border border-gray-300 ">
        <div className="flex items-center gap-5 ">
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="md:hidden text-gray-700"
          >
            {isMobileOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>

          <h1 className="text-lg font-bold text-[var(--brand)]">Sloth</h1>
          <div className="hidden md:flex">
            <input
              type="text"
              placeholder="Search Transactions..."
              className="bg-gray-100 py-2 px-4 outline-0  rounded-lg focus:border-gray-300 focus:bg-[#e9e7fd] transition-all duration-500 "
            />
          </div>
        </div>

        <div className=" flex items-center gap-6 cursor-pointer">
          <button className="relative text-gray-700 hover:text-[var(--brand)] ">
            <Bell className="w-7 h-7 cursor-pointer" />
            <span className="w-4 h-4 absolute text-xs bg-red-500 text-white flex items-center justify-center rounded-full -top-3 -right-1">
              2
            </span>
          </button>

          <div ref={profileRef} className="relative  ">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="px-3 py-1.5 gap-2 flex items-center rounded-lg hover:bg-gray-100 transition-all duration-200 cursor-pointer active:scale-105"
            >
              <div className="w-8 h-8  bg-[var(--brand)] rounded-full text-white  font-bold flex items-center justify-center">
                {user?.name
                  ?.split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase() || "U"}
              </div>
              <span className="text-sm font-semibold  hidden sm:block">
                {user?.name || "User"}
              </span>
            </button>

            {isProfileOpen && (
              <div className="absolute z-10 right-0 mt-2 border border-gray-300 w-48 rounded-xl bg-white shadow-lg">
                {/* <button
                  onClick={() => { navigate("/dashboard/settings");  setIsProfileOpen(false)}}
                  className="w-full flex items-center gap-4 px-4 py-2 hover:bg-gray-100 border-b border-gray-200 transition-all duration-300 cursor-pointer"
                >
                  <User className="w-4 h-4" />
                  Profile
                </button> */}

                <button
                  onClick={() => {
                    navigate("/dashboard/settings");
                    setIsProfileOpen(false);
                  }}
                  className="w-full flex items-center gap-4 px-4 py-2 hover:bg-gray-100 border-b border-gray-200 transition-all duration-300 cursor-pointer"
                >
                  <Settings className="w-4 h-4" />
                  Settings
                </button>

                <button
                  onClick={() => {
                    navigate("/dashboard/logout");
                    setIsProfileOpen(false);
                  }}
                  className="w-full flex items-center gap-4 px-4 py-2 hover:bg-gray-100 text-red-600 transition-all duration-300 cursor-pointer "
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
