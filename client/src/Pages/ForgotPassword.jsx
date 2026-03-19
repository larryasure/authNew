import logo from "../assets/Logomark.png";
import email1 from "../assets/email.png";
import arrowRight from "../assets/arroRight.png";
import { NavLink } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../Context/AuthContext";

export default function ForgotPassword() {
  const { forgotpassword, success, error, loading, setSuccess } = useContext(AuthContext);
  const [email, setEmail] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    try {
      forgotpassword({ email })
        .then((res) => console.log("Success:", res))
        .catch((err) => console.error("Error details:", err));
    } catch (error) {
      console.error(error.message);
    }



  }


  useEffect(() => {
    setSuccess(null)
  }, [])
  return (
    <div className="min-h-screen py-4 w-full flex items-center justify-center z-10">
      <div className="max-w-96 border border-gray-300 shadow-xl rounded-2xl bg-white p-6 w-full">
        <div className="flex justify-center mb-4">
          <img src={logo} alt="Logo" className="w-14" />
        </div>

        <div className="flex flex-col space-y-1 mb-6 text-center">
          <h1 className="text-[26px] font-bold">Forgot Your Password?</h1>
          <p className="text-sm font-semibold text-gray-400">
            Enter your email below and we’ll send you a reset link.
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <label className="flex flex-col space-y-1 relative">
            <span className="font-bold text-black/80 text-sm">
              Email Address
            </span>
            <div className="relative">
              <img
                src={email1}
                alt="email icon"
                className="w-5 h-5 absolute top-1/2 left-4 -translate-y-1/2"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full border border-gray-400 rounded-3xl h-10 outline-0 pl-12 pr-4 placeholder:text-[13px] placeholder:font-medium"
              />
            </div>
          </label>

          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center gap-3 w-full py-1.5 bg-[#4f46e5] text-white rounded-3xl cursor-pointer active:scale-105 transition-all duration-200"
          >
            Send Reset Link
            <img src={arrowRight} alt="arrow right" />
          </button>

          {error && (
            <div className="text-red-500 text-sm font-semibold">{error}</div>
          )}

          {loading && (
            <div className="flex items-center gap-3 font-semibold">
              <span className="text-[#4f46e5]">Sending...</span>
              <div className="border-4 border-[#4f46e5] border-t-transparent h-5 w-5 rounded-full animate-spin"></div>
            </div>
          )}

          {success && (
            <div className="text-green-500 text-sm font-semibold">
              {success}
            </div>
          )}

          <p className="flex items-center text-sm justify-center font-medium gap-2">
            Remembered your password?{" "}
            <NavLink to="/signIn" className="text-[#4f46e5] font-semibold">
              Sign In
            </NavLink>
          </p>
        </form>
      </div>
    </div>
  );
}
