import {
  AlertTriangle,
  Bell,
  Info,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import React, { useState } from "react";

const settingsConfig = [
  {
    id: "budgetWarning",
    icon: AlertTriangle,
    iconColor: "text-yellow-500",
    iconBg: "bg-yellow-50",
    title: "Budget Warnings",
    description:
      "Get notified when you are approaching or exceeding budget limit",
  },

  {
    id: "expenseAlert",
    icon: TrendingDown,
    iconColor: "text-red-500",
    iconBg: "bg-red-50",
    title: "Expense notifications",
    description: "Be notified when a new expense transaction is logged",
  },

  {
    id: "incomeAlert",
    icon: TrendingUp,
    iconColor: "text-green-500",
    iconBg: "bg-green-50",
    title: "Budget Warnings",
    description: "Get alerted when a new income transaction is loggedlimit",
  },

  {
    id: "monthlyReport",
    icon: Info,
    iconColor: "text-[var(--brand)]",
    iconBg: "bg-[#eef2ff]",
    title: "Monthly report",
    description: "Get a summary notification when your monthly report is ready",
  },
];

export default function Notifications() {
  const [settings, setSettings] = useState({
    budgetWarning: true,
    expenseAlert: true,
    incomeAlert: false,
    monthlyReport: true,
  });

  const toggle = (id) => {
    setSettings((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-800">Notification</h1>
        <p className="mt-1 text-sm text-gray-500">
          Control what alerts you want to see in your notification panel
        </p>

        {settingsConfig.map(
          ({ id, icon: Icon, iconBg, iconColor, description, title }) => (
            <div
              key={id}
              className="flex  items-center justify-between px-6 py-5 "
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-10 h-10 flex items-center shadow-xs justify-center rounded-xl shrink-0 ${iconBg}`}
                >
                  <Icon className={`w-5 h-5 ${iconColor} `} />
                </div>
                <div>
                  <p className="font-semibold text-sm text-gray-800">{title}</p>
                  <p className="text-xs text-gray-400 mt-0.5 ">{description}</p>
                </div>
              </div>

              <button
                onClick={() => toggle(id)}
                className={`w-11 h-6 relative rounded-full transition-all duration-300 ${settings[id] ? "bg-[var(--brand)]" : "bg-gray-200"}`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white  rounded-full shadow-sm transition-all duration-all ${settings[id] ? "translate-x-5" : "translate-x-0"}`}
                ></span>
              </button>
            </div>
          ),
        )}

        <div className="bg-[#eef2ff] border border-[#c7d2fe] rounded-2xl px-6 py-3 flex gap-3 items-center ">
          <Bell className="w-5 h-5 shrink-0 text-[var(--brand)] mt-0.5 " />
          <p className="text-sm font-medium leading-relaxed text-[var(--brand)]">
            These settings only affect the in-app notification panel. Email
            notifications are not available yet.
          </p>
        </div>
      </div>
    </>
  );
}
