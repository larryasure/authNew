import React, { useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import logo from "../assets/Logomark.png";
import { Eye, EyeOff } from "lucide-react";
export default function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { token } = useParams();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!formData.password || !formData.confirmPassword) {
      setError(" All fields are required");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      const baseUrl = import.meta.env.VITE_BASE_URL;

      const res = await fetch(`${baseUrl}/resetpassword/${token}`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ password: formData.password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Something went wrong");
        return;
      }

      setSuccess("Password reset successful! Redirecting");
      setTimeout(() => navigate("/signin"), 2500);
    } catch (error) {
      setError("Server Error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen px-8 py-5 ">
        <div className=" bg-white/90 max-w-md  mx-auto border border-gray-300 rounded-2xl px-6 py-5 h-130  ">
          <div className="flex justify-center mb-2">
            <img src={logo} alt="Logo" className="w-14" />
          </div>
          <h1 className="font-bold text-3xl text-center ">
            Reset Your Password
          </h1>
          <p className="text-gray-500 font-semibold text-center text-lg my-1 ">
            Enter your new password
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col  mt-7 space-y-2.5"
          >
            <div className="flex flex-col ">
              <label className="text-lg font-semibold ">New Password</label>
              <div className="relative">
                <input
                  onChange={handleChange}
                  value={formData.password}
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="px-3 py-3 rounded-xl outline-none focus:ring-1 focus:ring-[#464edf] border border-[#464edf] transition-all duration-200 w-full"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5 absolute top-1/2 -translate-y-1/2 right-5 hover:opacity-60 cursor-pointer transition-all duration-300 " />
                  ) : (
                    <Eye className="absolute w-5 h-5 top-1/2 -translate-y-1/2 right-5 hover:opacity-60 cursor-pointer transition-all duration-300" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-lg font-semibold ">Confirm Password</label>
              <div className="relative">
                <input
                  onChange={handleChange}
                  value={formData.confirmPassword}
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  className="w-full py-3 px-3 rounded-xl outline-none focus:ring-1 focus:ring-[#464edf] border border-[#464edf] transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5 absolute right-5 top-1/2 -translate-y-1/2 hover:opacity-60 cursor-pointer transition-all duration-300 " />
                  ) : (
                    <Eye className="w-5 h-5 absolute right-5 top-1/2 -translate-y-1/2 hover:opacity-60 cursor-pointer transition-all duration-300 " />
                  )}
                </button>
              </div>
            </div>
            {loading && (
              <div className="flex items-center gap-2">
                Loading Please Wait
                <span className="w-3 h-3 bg-[#464edf] rounded-full animate-pulse [animate-delay:0ms]"></span>
                <span className="w-3 h-3 bg-[#464edf] rounded-full animate-pulse [animate-delay:200ms]"></span>
                <span className="w-3 h-3 bg-[#464edf] rounded-full animate-pulse [animate-delay:400ms]"></span>
              </div>
            )}

            {error && (
              <div className="text-sm text-red-500 font-semibold ">{error}</div>
            )}
            {success && <div>{success}</div>}

            <button
              type="submit"
              className={`flex mt-3 items-center gap-3 self-center px-7 cursor-pointer justify-center text-white bg-[#4f46e5] py-2 rounded-2xl active:scale-105 transition-all duration-200 `}
            >
              Submit
            </button>
            <p></p>

            <p className="flex items-center text-sm justify-center  font-medium gap-3">
              Already have an account?
              <NavLink className="text-[#4f46e5] font-semibold" to={"/signIn"}>
                Sign In
              </NavLink>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
