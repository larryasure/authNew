import React, { useContext, createContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

export const ThemeContext = createContext();

export default function ThemeProvider({ children }) {
  const { user } = useContext(AuthContext);
  const userId = user?.id || "guest";

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem(`theme_${userId}`) || "light";
  });

  const [accentColor, setAccentColor] = useState(() => {
    return localStorage.getItem(`accentColor_${userId}`) || "#4f46e5";
  });

  const [fontSize, setFontSize] = useState(() => {
    return localStorage.getItem(`fontSize_${userId}`) || "medium";
  });

  useEffect(() => {
    if (userId === "guest") return;
    localStorage.setItem(`theme_${userId}`, theme);
  }, [theme, userId]);

  useEffect(() => {
    if (userId === "guest") return;
    localStorage.setItem(`accentColor_${userId}`, accentColor);
  }, [accentColor, userId]);

  useEffect(() => {
    if (userId === "guest") return;
    localStorage.setItem(`fontSize_${userId}`, fontSize);
  }, [fontSize, userId]);

  useEffect(() => {
    if (userId === "guest") {
      document.documentElement.style.setProperty("--brand", "#4f46e5");
      document.documentElement.style.fontSize = "16px";
      document.documentElement.classList.remove("dark");
      return;
    }

    const savedAccent =
      localStorage.getItem(`accentColor_${userId}`) || "#4f46e5";
    const savedFont = localStorage.getItem(`fontSize_${userId}`) || "medium";
    const savedTheme = localStorage.getItem(`theme_${userId}`) || "light";

    document.documentElement.style.setProperty("--brand", savedAccent);
    const sizes = { small: "14px", medium: "16px", large: "18px" };
    document.documentElement.style.fontSize = sizes[savedFont];
    if (savedTheme === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");

    setAccentColor(savedAccent);
    setFontSize(savedFont);
    setTheme(savedTheme);
  }, [userId]);

  useEffect(() => {
    if (userId === "guest") return;
    document.documentElement.style.setProperty("--brand", accentColor);
  }, [accentColor]);

  useEffect(() => {
    if (userId === "guest") return;
    const sizes = { small: "14px", medium: "16px", large: "18px" };
    document.documentElement.style.fontSize = sizes[fontSize];
  }, [fontSize]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        accentColor,
        setAccentColor,
        fontSize,
        setFontSize,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
