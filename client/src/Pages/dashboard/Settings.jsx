import { BellDot, CreditCard, Lock, Palette, User } from "lucide-react";
import React from "react";
import { NavLink, Outlet } from "react-router-dom";

export default function Settings() {
  return (
    <>
      <div className="min-h-screen px-8  py-10 rounded-xl  bg-white ">
        <div className="grid grid-cols-4 gap-15">
          <div className="col-span-1 ">
            <div className="flex flex-col gap-5">
              <NavLink
                to={"/dashboard/settings"}
                end
                className={({ isActive }) =>
                  `flex items-center rounded-lg font-medium transition-all duration-300 px-3 py-1.5 gap-4 ${isActive ? "bg-[#4f46e5] text-white" : "text-gray-700 hover:bg-gray-100"}`
                }
              >
                <User className="w-6 h-6 " />
                Profile
              </NavLink>

              <NavLink
                to={"/dashboard/settings/security"}
                className={({ isActive }) =>
                  `flex items-center rounded-lg font-medium transition-all duration-300 px-3 py-1.5 gap-4 ${isActive ? "bg-[#4f46e5] text-white" : "text-gray-700 hover:bg-gray-100"}`
                }
              >
                <Lock className="w-6 h-6 " />
                Security
              </NavLink>

              <NavLink
                to={"/dashboard/settings/notifications"}
                className={({ isActive }) =>
                  `flex items-center rounded-lg font-medium transition-all duration-300 px-3 py-1.5 gap-4 ${isActive ? "bg-[#4f46e5] text-white" : "text-gray-700 hover:bg-gray-100"}`
                }
              >
                <BellDot className="w-6 h-6 " />
                Notifications
              </NavLink>

              <NavLink
                to={"/dashboard/settings/appearance"}
                className={({ isActive }) =>
                  `flex items-center rounded-lg font-medium transition-all duration-300 px-3 py-1.5 gap-4 ${isActive ? "bg-[#4f46e5] text-white" : "text-gray-700 hover:bg-gray-100"}`
                }
              >
                <Palette className="w-6 h-6 " />
                Appearance
              </NavLink>

              <NavLink
                to={"/dashboard/settings/billing"}
                className={({ isActive }) =>
                  `flex items-center rounded-lg font-medium transition-all duration-300 px-3 py-1.5 gap-4 ${isActive ? "bg-[#4f46e5] text-white" : "text-gray-700 hover:bg-gray-100"}`
                }
              >
                <CreditCard className="w-6 h-6 " />
                Billing
              </NavLink>
            </div>
          </div>

          <div className="col-span-3 border-2 border-gray-200  min-h-screen p-5">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
