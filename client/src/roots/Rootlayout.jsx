import React from "react";
import { Outlet, ScrollRestoration, useLocation } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

export default function Rootlayout() {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith("/dashboard");
  return (
    <div>
      {!isDashboard  && <Navbar />}
      <main>
        <ScrollRestoration />
        <Outlet />
      </main>
      {!isDashboard  && <Footer />}
    </div>
  );
}
