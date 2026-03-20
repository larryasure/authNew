import React, { useEffect, useState } from "react";
import logo from "../assets/Logomark.png";
import email from "../assets/email.png";
import password from "../assets/lockPassword.png";
import { Eye, EyeOff } from "lucide-react";
import arrowRight from "../assets/arroRight.png";
import google from "../assets/Vector (4).png";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState(null);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const { signin, success, error, loading, setSuccess } =
    useContext(AuthContext);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setLocalError(null);

    if (!formData.email || !formData.password) {
      setLocalError("all fields are required");
      return;
    }

    try {
      signin(formData)
        .then((res) => console.log("Success:", res))
        .catch((err) => console.error("Error details:", err));
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    if (success && success === "Login Successful!") {
      const timer = setTimeout(() => {
        navigate("/dashboard");
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [success, navigate]);

  useEffect(() => {
    setSuccess(null);
  }, []);
  return (
    <>
      <div className="min-h-screen py-4 w-full z-10 ">
        <div className="max-w-96 border border-gray-300 shadow-xl  rounded-2xl mx-auto min-h-[50vh] bg-white px-4 py-3  ">
          <div>
            <img src={logo} alt="logo Image" className="w-14" />
          </div>

          <div className="flex flex-col space-y-1">
            <h1 className="text-[26px] font-bold ">Sign In To Your Account.</h1>
            <p className=" tracking-wider text-sm font-semibold text-gray-400">
              Unleash your inner sloth 4.0 right now.
            </p>
          </div>

          <form
            action=""
            onSubmit={handleSubmit}
            id="form"
            className="mt-4 space-y-1"
          >
            <label htmlFor="" className="flex  flex-col space-y-1 ">
              <span className="font-bold text-black/80 text-sm">
                Email Address
              </span>

              <div className="relative">
                <img
                  src={email}
                  alt="email icon"
                  className="w-5 h-5  absolute transform top-1/2 -translate-y-1/2 left-4 "
                />
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                  }
                  placeholder="elementary221b@gmail.com"
                  className="w-full active:outline-0 border border-gray-400 rounded-3xl h-10 outline-0 pl-12 pr-4 placeholder:text-[13px] placeholder:font-medium"
                />
              </div>
            </label>

            <div className="">
              <label htmlFor="" className=" ">
                <span className="font-bold text-black/80 text-sm ">
                  Password
                </span>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="**********"
                    name="password"
                    autoComplete="password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        password: e.target.value,
                      }))
                    }
                    className="w-full active:outline-0 border border-gray-400 rounded-3xl h-10 outline-0 pl-12 pr-10 placeholder:text-[13px] placeholder:font-medium"
                  />
                  <div className="flex  ">
                    <img
                      src={password}
                      alt="password icon"
                      className="w-3.5 h-4  absolute transform top-1/2 left-4 -translate-y-1/2   "
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5 absolute top-1/2 -translate-y-1/2 right-5" />
                      ) : (
                        <Eye className="w-5 h-5 absolute top-1/2 -translate-y-1/2 right-5" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  {loading && (
                    <div className="flex items-center font-semibold text-[var(--brand)] text-sm gap-3">
                      Loading Please wait....
                      <div className="w-4 h-4 border-4 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}

                  {error && !localError && (
                    <div className="text-red-500 font-semibold text-sm">
                      {error}
                    </div>
                  )}

                  {localError && (
                    <div className="text-red-500 font-semibold text-sm">
                      {localError}
                    </div>
                  )}

                  {success && (
                    <div className="text-green-500 text-sm font-semibold">
                      {success}
                    </div>
                  )}
                </div>
              </label>
            </div>

            <div className="space-y-3">
              <div>
                <label
                  htmlFor=""
                  className="flex  items-center justify-between"
                >
                  <div className="flex items-center gap-1">
                    <input
                      type="checkbox"
                      className="accent-[var(--brand)] w-3 h-4"
                    />
                    <span className="text-sm ">Remember Me</span>
                  </div>

                  <button className="text-sm text-[var(--brand)] font-semibold cursor-pointer underline">
                    <NavLink to={"/forgetPassword"}>Forgot Password?</NavLink>
                  </button>
                </label>
              </div>

              <button
                type="submit"
                className="flex items-center gap-3 text-white
             bg-[var(--brand)] justify-center py-1.5 w-full rounded-3xl cursor-pointer active:scale-105 transition-all duration-200 "
              >
                Sign In
                <div>
                  <img src={arrowRight} alt="arrow right" />
                </div>
              </button>

              <p className="flex items-center text-sm justify-center  font-medium gap-3">
                Don’t have an account?{" "}
                <button className="text-[var(--brand)] font-semibold">
                  <NavLink to={"/signup"}>Sign Up</NavLink>
                </button>
              </p>

              <div className="w-full flex items-center gap-2 ">
                <span className=" border-t w-1/2 border-gray-300 "></span>
                <p>Or</p>
                <span className=" border-t w-1/2 border-gray-300"></span>
              </div>

              <div className="flex items-center gap-3 justify-center border border-gray-300 rounded-3xl py-1.5 ">
                <img src={google} alt="google Icon" className="w-5 h-5 " />
                <button>Sign In With Google</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
