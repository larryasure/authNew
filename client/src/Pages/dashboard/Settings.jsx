import {
  BellDot,
  CreditCard,
  Lock,
  Palette,
  User,
} from "lucide-react";
import React from "react";
import { NavLink, Outlet } from "react-router-dom";

export default function Settings() {
  return (
    <div className="min-h-screen px-8 py-10 bg-white">

      {/* TITLE */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Settings
      </h2>

      {/* NAVBAR */}
      <div className="flex items-center gap-6 border-b border-gray-200 pb-4 overflow-x-auto">

        <NavLink
          to="/dashboard/settings"
          end
          className={({ isActive }) =>
            `flex items-center gap-2 text-sm font-medium pb-2 border-b-2 transition-all duration-300 ${
              isActive
                ? "border-[var(--brand)] text-[var(--brand)] "
                : "border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-300"
            }`
          }
        >
          <User className="w-4 h-4" />
          Profile
        </NavLink>

        <NavLink
          to="/dashboard/settings/security"
          className={({ isActive }) =>
            `flex items-center gap-2 text-sm font-medium pb-2 border-b-2 transition-all duration-300 ${
              isActive
                ? "border-[var(--brand)] text-[var(--brand)]"
                : "border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-300"
            }`
          }
        >
          <Lock className="w-4 h-4" />
          Security
        </NavLink>

        <NavLink
          to="/dashboard/settings/notifications"
          className={({ isActive }) =>
            `flex items-center gap-2 text-sm font-medium pb-2 border-b-2 transition-all duration-300 ${
              isActive
                ? "border-[var(--brand)] text-[var(--brand)]"
                : "border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-300"
            }`
          }
        >
          <BellDot className="w-4 h-4" />
          Notifications
        </NavLink>

        <NavLink
          to="/dashboard/settings/appearance"
          className={({ isActive }) =>
            `flex items-center gap-2 text-sm font-medium pb-2 border-b-2 transition-all duration-300 ${
              isActive
                ? "border-[var(--brand)] text-[var(--brand)]"
                : "border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-300"
            }`
          }
        >
          <Palette className="w-4 h-4" />
          Appearance
        </NavLink>

        <NavLink
          to="/dashboard/settings/billing"
          className={({ isActive }) =>
            `flex items-center gap-2 text-sm font-medium pb-2 border-b-2 transition-all duration-300 ${
              isActive
                ? "border-[var(--brand)] text-[var(--brand)]"
                : "border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-300"
            }`
          }
        >
          <CreditCard className="w-4 h-4" />
          Billing
        </NavLink>
      </div>

      <div className="mt-6 border border-gray-200 rounded-xl p-6 min-h-[500px] bg-white shadow-sm">
        <Outlet />
      </div>

    </div>
  );
}