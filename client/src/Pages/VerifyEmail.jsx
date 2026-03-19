import React, { useEffect, useState } from "react";
import logo from "../assets/Logomark.png";
import { NavLink, useNavigate, useParams } from "react-router-dom";

export default function VerifyEmail() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("Verifying Your Email...");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const verify = async () => {
      try {
        const baseUrl = import.meta.env.VITE_BASE_URL;
        const res = await fetch(`${baseUrl}/verifyemail/${token}`);
        const data = await res.json();

        if (res.ok) {
          setSuccess(true);
          setMessage(data.message);
          setTimeout(() => navigate("/signin"), 3000);
        } else {
          setMessage(data.message || "Verification failed!");
        }
      } catch (error) {
        console.error(error, "Server error");
        setMessage("Server error. Please Try Again");
      }
    };

    verify();
  }, [token, navigate]);

  return (
    <>
      <div className="flex min-h-screen items-center justify-center ">
        <div className="max-w-96 space-y-4 bg-white border border-gray-300 rounded-2xl shadow-md p-8 text-center w-full">
          <div className="flex justify-center">
            <img src={logo} alt="Logo Image" className="w-14" />
          </div>
          <h1 className="text-2xl font-bold">Email Verification</h1>
          <p
            className={`font-semibold text-sm ${success ? "text-green-500" : "text-gray-600"}`}
          >
            {message}
          </p>

          {success && (
            <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-400 ">
              Redirecting to Sign in
              <span className="w-4 h-4 bg-[#464eda] rounded-full animate-pulse [delay:animation-delay-0ms]"></span>
              <span className="w-4 h-4 bg-[#464eda] rounded-full animate-pulse [delay:animation-delay-200ms]"></span>
              <span className="w-4 h-4 bg-[#464eda] rounded-full animate-pulse [delay:animation-delay-400ms]"></span>
              <NavLink
                to={"/signin"}
                className="text-[#4f46e5] font-semibold text-sm underline"
              >
                Go to sign in
              </NavLink>
            </div>
          )}

          {!success && message !== "Verifying Your Email..." && (
            <NavLink className='text-[#4f46e5] text-sm underline font-semibold'>
                Back to sign in
            </NavLink>
          )}
        </div>
      </div>
    </>
  );
}
