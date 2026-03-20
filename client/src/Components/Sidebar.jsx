import {
  AlignHorizontalDistributeCenter,
  ArrowLeftRight,
  ClipboardMinus,
  Download,
  LayoutDashboard,
  ListPlus,
  LogOut,
  Menu,
  Settings,
  X,
} from "lucide-react";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <div
        className={` relative flex shrink-0 h-screen transition-all  flex-col shadow-sm  border-gray-200 border-r ${isOpen ? "w-52" : "w-18"} `}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
          {isOpen && (
            <p className="text-lg font-bold bg-linear-to-r from-[var(--brand)] to-[#46ef9d] bg-clip-text text-transparent ">
              Sloth
            </p>
          )}

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1.5 text-gray-500 hover:bg-gray-200 hover:text-[var(--brand)] shadow-sm rounded-lg cursor-pointer transition-all "
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        <nav className="overflow-y-auto mt-5 py-2 px-4 space-y-3 flex-1 ">
          <NavLink
            to={"/dashboard"}
            end
            title="Dashboard"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 shadow-xs rounded-lg font-medium transition-all  ${isOpen ? "justify-start" : "justify-center"} ${isActive ? "bg-[var(--brand)] text-white" : "text-gray-500 hover:bg-gray-100 hover:text-[var(--brand)] "}`
            }
          >
            <LayoutDashboard className="w-6 h-6  shrink-0" />

            {isOpen && <span>Dashboard</span>}
          </NavLink>

          <NavLink
            to={"/dashboard/transactions"}
            title="Transactions"
            className={({ isActive }) =>
              `flex items-center px-3 gap-3 py-2 shadow-xs font-medium transition-all  rounded-lg ${isOpen ? "justify-start" : "justify-center"} ${isActive ? "text-white bg-[var(--brand)]" : "text-gray-500 hover:bg-gray-100 hover:text-[var(--brand)]"}`
            }
          >
            <ArrowLeftRight className="shrink-0 w-5 h-5" />

            {isOpen && <span>Transactions</span>}
          </NavLink>

          <NavLink
            to={"/dashboard/addtransactions"}
            title="Add Transactions"
            className={({ isActive }) =>
              `flex items-center px-3 gap-3 py-2 rounded-lg shadow-xs font-medium  transition-all  ${isOpen ? "justify-start" : "justify-center"} ${isActive ? "text-white bg-[var(--brand)]" : "text-gray-500 hover:bg-gray-100 hover:text-[var(--brand)]"}`
            }
          >
            <ListPlus className="shrink-0 w-5 h-5" />
            {isOpen && <span>Add Transaction</span>}
          </NavLink>

          <NavLink
            to={"/dashboard/reports"}
            title="Reports"
            className={({ isActive }) =>
              `flex gap-3 items-center py-2 px-3 transition-all font-medium rounded-lg shadow-xs ${isOpen ? "justify-start" : "justify-center"} ${isActive ? "text-white bg-[var(--brand)]" : "text-gray-500 hover:bg-gray-100 hover:text-[var(--brand)]"} `
            }
          >
            <ClipboardMinus className="h-5 w-5 shrink-0" />

            {isOpen && <span>Reports</span>}
          </NavLink>

          <NavLink
            to={"/dashboard/budget"}
            title=" Set Budget"
            className={({ isActive }) =>
              `flex items-center gap-3 py-2 px-3 transitions-all font-medium shadow-xs rounded-lg ${isOpen ? "justify-start" : "justify-center"} ${isActive ? "text-white bg-[var(--brand)]" : "text-gray-500 hover:bg-gray-100 hover:text-[var(--brand)]"}  `
            }
          >
            <AlignHorizontalDistributeCenter className="w-5 h-5 shrink-0 " />

            {isOpen && <span>Set Budget</span>}
          </NavLink>

          <NavLink
            to={"/dashboard/export"}
            title="Export"
            className={({ isActive }) =>
              `flex gap-3 px-3 py-2 shadow-xs rounded-lg transition-all font-medium items-center ${isOpen ? "justify-start" : "justify-center"} ${isActive ? "text-white bg-[var(--brand)]" : "text-gray-500 hover:bg-gray-100 hover:text-[var(--brand)]"}`
            }
          >
            <Download className="w-5 h-5 shrink-0" />

            {isOpen && <span>Export</span>}
          </NavLink>
        </nav>

        <div className="space-y-3  border-t border-gray-200 px-4 py-4">
          <NavLink
            to={"/dashboard/settings"}
            title="Settings"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 shadow-xs rounded-lg font-medium transition-all ${isOpen ? "justify-start" : "justify-center"} ${isActive ? "text-white bg-[#464fe5]" : "text-gray-500 hover:bg-gray-100 hover:text-[var(--brand)]"}`
            }
          >
            <Settings className="shrink-0 w-5 h-5 " />
            {isOpen && <span>Settings</span>}
          </NavLink>

          <NavLink
            to={"/dashboard/logout"}
            title="Log Out"
            className={({ isActive }) =>
              `flex gap-3 px-3 py-2 rounded-lg shadow-xs font-medium transition-all items-center ${isOpen ? "justify-start" : "justify-center"} ${isActive ? "text-white bg-red-600" : "text-red-500 hover:bg-red-50 hover:text-red-400"}`
            }
          >
            <LogOut className="w-5 h-5 shrink-0 " />

            {isOpen && <span>Log Out</span>}
          </NavLink>
        </div>
      </div>
    </>
  );
}
