import React, { useContext } from "react";
import { ThemeContext } from "../../Context/ThemeContext";
import { Moon, Sun, Monitor } from "lucide-react";

const accentColors = [
  { id: "#4f46e5", label: "Indigo" },
  { id: "#0ea5e9", label: "Sky" },
  { id: "#10b981", label: "Emerald" },
  { id: "#f59e0b", label: "Amber" },
  { id: "#ef4444", label: "Red" },
  { id: "#ec4899", label: "Pink" },
  { id: "#8b5cf6", label: "Violet" },
];

export default function Appearances() {
  const {
    theme,
    setTheme,
    fontSize,
    setFontSize,
    accentColor,
    setAccentColor,
  } = useContext(ThemeContext);

  const fontSizeMap = { small: 0, medium: 1, large: 2 };
  const fontSizeKeys = ["small", "medium", "large"];

  return (
    <>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Appearance</h1>
          <p className="mt-1 text-sm text-gray-500">
            Customize how
            <span className="bg-linear-to-r bg-clip-text text-transparent from-[#1f27c9] to-[#41aaaa] font-medium">
              {" "}
              Sloth
            </span>{" "}
            looks for you
          </p>
        </div>

        <div className="bg-white border border-gray-200 p-6 rounded-2xl ">
          <div className="flex justify-between items-center mb-1">
            <h2 className="text-base font-semibold text-gray-800">Theme</h2>
            <span className="bg-gray-100 flex gap-2 items-center rounded-full px-3 py-1 text-gray-500 text-xs font-medium animate-pulse">
              Coming Soon
            </span>
          </div>

          <p className="text-sm text-gray-500 mb-5 ">
            Choose your preferred Color Scheme
          </p>
          <div className="flex gap-4 opacity-40 pointer-events-none ">
            {[
              { id: "light", label: "Light", icon: Sun },
              { id: "dark", label: "Dark", icon: Moon },
              { id: "system", label: "System", icon: Monitor },
            ].map(({ id, label, icon: Icon }) => (
              <div
                key={id}
                className={`flex gap-3 rounded-xl border-2 p-4 items-center w-28 flex-col ${theme === id ? "border-[var(--brand)] bg-[var--brand-light]" : "border-gray-200 bg-gray-50"}`}
              >
                <Icon
                  className={`w-6 h-6   ${theme === id ? "text-[var--brand]" : "text-gray-400"}`}
                />
                <span
                  className={`text-sm font-medium  ${theme === id ? "text-[var--brand]" : "text-gray-500"}`}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <h2 className="text-base font-semibold text-gray-800 mb-1 ">
            Accent Color
          </h2>
          <p className="text-gray-500 mb-5 text-sm">
            Changes the primary color of the entire app
          </p>
          <div className="flex gap-3 flex-wrap">
            {accentColors.map((color) => (
              <button
                key={color.id}
                onClick={() => setAccentColor(color.id)}
                className="relative w-9 h-9 rounded-full transition-all cursor-pointer  duration-200 hover:scale-110"
                style={{ backgroundColor: color.id }}
                title={color.label}
              >
                {accentColor === color.id && (
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="w-3 h-3 bg-white rounded-full"></span>
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-6 ">
          <h2 className="text-gray-800 font-semibold text-base mb-1 ">
            {" "}
            Font Size
          </h2>
          <p className="text-sm mb-5 text-gray-500">
            Adjust the text size accross the app
          </p>

          <div className="flex items-center gap-4 ">
            <span className="text-xs font-medium text-gray-400 w-10">
              Small
            </span>
            <div className="relative flex-1 ">
              <input
                type="range"
                min={0}
                max={2}
                step={1}
                value={fontSizeMap[fontSize]}
                onChange={(e) =>
                  setFontSize(fontSizeKeys[Number(e.target.value)])
                }
                className="w-full accent-[var(--brand)] cursor-pointer"
              />

              <div className="flex justify-between mt-2">
                {fontSizeKeys.map((key) => (
                  <span
                    key={key}
                    className={`text-xs capitalize ${fontSize === key ? "text-[var--brand] font-semibold " : "text-gray-400"}`}
                  >
                    {key}
                  </span>
                ))}
              </div>
            </div>
            <span className="text-base text-gray-400 font-medium w-10 text-right">
              Large
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
