import { Bell, Disc, LogOut, Menu, Settings, X } from "lucide-react";
import React, { useEffect, useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { useNotifications } from "../Hooks/useNotifications";

export default function DashNavbar({ budgets = [], transactions = [] }) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [readIds, setReadIds] = useState([]);
  const [activeTabs, setActiveTabs] = useState("all");

  const navigate = useNavigate();

  const profileRef = useRef(null);
  const notifRef = useRef(null);
  const { user } = useContext(AuthContext);
  const { notifications, unreadCount } = useNotifications(
    budgets,
    transactions,
  );

  const displayNotification = notifications.map((n) => ({
    ...n,
    read: readIds.includes(n.id) ? true : n.read,
  }));

  const displayUnreadCount = displayNotification.filter((n) => !n.read).length;

  const filtered =
    activeTabs === "unread"
      ? displayNotification.filter((n) => !n.read)
      : activeTabs === "system"
        ? displayNotification.filter((n) =>
            ["danger", "warning"].includes(n.type),
          )
        : displayNotification;

  const markAllread = () => {
    setReadIds(notifications.map((n) => n.id));
  };

  useEffect(() => {
    function handleOutsideClick(e) {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setIsProfileOpen(false);
      }

      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setIsNotifOpen(false);
      }
    }

    const handleKeydown = (e) => {
      if (e.key === "Escape") {
        setIsNotifOpen(false);
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleKeydown);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleKeydown);
    };
  }, [setIsNotifOpen, setIsProfileOpen]);

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

        <div className=" flex items-center  gap-6 cursor-pointer">
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setIsNotifOpen(!isNotifOpen)}
              className="relative text-gray-700 hover:text-[var(--brand)] "
            >
              <Bell className="w-6 h-6 cursor-pointer" />
              {displayUnreadCount > 0 && (
                <span className="w-3 h-3 absolute text-xs bg-red-500 text-white flex items-center justify-center rounded-full -top-2 -right-1">
                  {displayUnreadCount}
                </span>
              )}
            </button>
            {isNotifOpen && (
              <div className="absolute w-80 mt-3 right-0 bg-white border border-gray-200 shadow-xl z-50 rounded-xl  ">
                <div className="flex justify-between items-center border-b border-gray-100 px-4 py-2.5 ">
                  <h3 className="font-bold text-sm text-gray-800">
                    Notifications
                  </h3>
                  <button
                    onClick={markAllread}
                    className="text-xs font-semibold text-[var(--brand)] hover:underline"
                  >
                    Mark all as read
                  </button>
                </div>
                <div className="flex border-b border-gray-100 ">
                  {["tab", "unread", "system"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTabs(tab)}
                      className={`flex-1 py-2 font-medium transition-all capitalize duration-200 cursor-pointer ${activeTabs === tab ? "text-[var(--brand)] border-b-2 border-[var(--brand)] " : "text-gray-400 hover:text-gray-600"} `}
                    >
                      {activeTabs === "unread"
                        ? `Unread (${displayUnreadCount})`
                        : tab}
                    </button>
                  ))}
                </div>

                <div className="max-h-72 mx-auto overflow-y-auto py-3">
                  {filtered.length === 0 ? (
                    <div className="flex items-center justify-center py-5 text-sm text-gray-400 ">
                      No Notifications here
                    </div>
                  ) : (
                    filtered.map((notif) => {
                      const styleMap = {
                        danger: { bg: "bg-red-50", color: "text-red-500" },

                        warning: {
                          bg: "bg-yellow-50",
                          color: "text-yellow-500",
                        },

                        success: { bg: "bg-green-50", color: "text-green-500" },

                        info: {
                          bg: "bg-[#eef2ff]",
                          color: "text-[var(--brand)]",
                        },
                      };

                      const style = styleMap[notif.type] || styleMap.info;
                      return (
                        <div
                          key={notif.id}
                          className={`flex gap-3 px-4 py-2.5 border-b border-gray-50 transition-all duration-200 ${!notif.read ? "bg-[#f5f4ff]" : "hover:bg-gray-50"} `}
                        >
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${style.bg} ${style.color}`}
                          >
                            <Bell className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold  text-gray-800 ">
                              {notif.title}
                            </p>
                            <p className="text-xs text-gray-500 capitalize mt-0.5 leading-relaxed ">
                              {notif.description}
                            </p>
                            <p className="text-[11px] mt-1 ">{notif.time}</p>
                          </div>

                          {!notif.read && (
                            <div className="w-2 h-2 rounded-full  bg-[var(--brand)] shrink-0 mt-0 "></div>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            )}
          </div>

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
