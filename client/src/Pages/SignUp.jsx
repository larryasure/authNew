import React, { useContext, useEffect, useState } from "react";
import logo from "../assets/Logomark.png";
import email from "../assets/email.png";
import password from "../assets/lockPassword.png";
import { Eye, EyeOff } from "lucide-react";
import arrowRight from "../assets/arroRight.png";
import google from "../assets/Vector (4).png";
import profile from "../assets/profile.png";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [localError, setLocalError] = useState(null);

  const { signup, success, error, loading, setSuccess } = useContext(AuthContext);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    setLocalError(null);

    if (
      !formData.email ||
      !formData.name ||
      !formData.password ||
      !confirmPassword
    ) {
      setLocalError("All fields are required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email)) {
      setLocalError("Please enter a valid email");
      return;
    }

    if (formData.password !== confirmPassword) {
      setLocalError("Passwords Do not match!");
      return;
    }
    try {
      signup(formData);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (success && success === "User Created Successfully... Please Wait!") {
      const timer = setTimeout(() => {
        navigate("/dashboard");
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [success, navigate]);

  useEffect(() => {
  setSuccess(null);
}, []);

  
  const passwordStrength = (password) => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    return score;
  };

  const strenthLabels = ["Weak", "Fair", "Strong", "Very Strong"];

  const strengthColors = [
    "bg-red-500",
    "bg-orange-300",
    "bg-yellow-600",
    "bg-green-500",
  ];
    const strengthTextColors = [
    "text-red-500",
    "text-orange-300",
    "text-yellow-500",
    "text-green-500",
  ];




  const strengthScore = passwordStrength(formData.password);
  return (
    <>
      <div className="min-h-screen py-4 w-full z-10 ">
        <div className="max-w-96 border border-gray-300 shadow-xl  rounded-2xl mx-auto min-h-[50vh] bg-white p-6  ">
          <div>
            <img src={logo} alt="logo Image" className="w-14" />
          </div>

          <div className="flex flex-col space-y-1">
            <h1 className="text-[26px] font-bold ">Sign Up To Your Account.</h1>
            <p className=" tracking-wider text-sm font-semibold text-gray-400">
              Unleash your inner sloth 4.0 right now.
            </p>
          </div>

          <form action="" onSubmit={handleSubmit} className="mt-4 space-y-1">
            <label htmlFor="name" className="flex  flex-col space-y-1 ">
              <span className="font-bold text-black/80 text-sm">Full Name</span>

              <div className="relative">
                <img
                  src={profile}
                  alt="Name"
                  className="w-5 h-5  absolute transform top-1/2 -translate-y-1/2 left-4 "
                />
                <input
                  type="text"
                  name="name"
                  autoComplete="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  placeholder="John Doe"
                  className="w-full active:outline-0 border border-gray-400 rounded-3xl h-10 outline-0 pl-12 pr-4 placeholder:text-[13px] placeholder:font-medium"
                />
              </div>
            </label>

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
                  // name="email"
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
                    autoComplete="current-password"
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
              </label>
            </div>

            <label htmlFor="" className=" ">
              <span className="font-bold text-black/80 text-sm ">
                Confirm Password
              </span>

              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="**********"
                  name="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  autoComplete="current-password"
                  className="w-full active:outline-0 border border-gray-400 rounded-3xl h-10 outline-0 pl-12 pr-10 placeholder:text-[13px] placeholder:font-medium"
                />
                <div className="flex  ">
                  <img
                    src={password}
                    alt="password icon"
                    className="w-3.5 h-4  absolute transform top-1/2 left-4 -translate-y-1/2    "
                  />

                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5 absolute top-1/2 -translate-y-1/2 right-5 cursor-pointer" />
                    ) : (
                      <Eye className="w-5 h-5 absolute top-1/2 -translate-y-1/2 right-5 cursor-pointer" />
                    )}
                  </button>
                </div>
              </div>
            </label>

            <div>
              <div className="flex gap-2 w-full my-3 px-5">
                {[0, 1, 2, 3].map((index) => (
                  <div
                    key={index}
                    className={`h-1.5 flex-1 border border-gray-300 rounded-2xl ${index < strengthScore ? strengthColors[strengthScore - 1] : ""}`}
                  ></div>
                ))}
              </div>

            <p
              className={`text-xs text-center  font-medium ${formData.password ? strengthTextColors[strengthScore - 1] : "text-gray-500"} `}
            >
              {formData.password ? strenthLabels[strengthScore - 1] : ""}
              </p>
                
            </div>

            <div className="space-y-3">
              <div></div>

              <button
                disabled={loading || strengthScore < 3}
                type="submit"
                className={`flex items-center gap-3 text-white bg-[#4f46e5] justify-center py-1.5 w-full rounded-3xl   active:scale-105 transition-all duration-200 ${loading || strengthScore < 3 ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}`}
              >
                Sign Up
                <div>
                  <img src={arrowRight} alt="arrow right" />
                </div>
              </button>

              {loading && (
                <div className="flex items-center font-semibold text-[#4f46e5] text-sm gap-3">
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

              <p className="flex items-center text-sm justify-center  font-medium gap-3">
                Already have an account?
                <NavLink
                  className="text-[#4f46e5] font-semibold"
                  to={"/signIn"}
                >
                  Sign In
                </NavLink>
              </p>

              <div className="w-full flex items-center gap-2 ">
                <span className=" border-t w-1/2 border-gray-300 "></span>
                <p>Or</p>
                <span className=" border-t w-1/2 border-gray-300"></span>
              </div>

              <div className="flex items-center gap-3 justify-center border border-gray-300 rounded-3xl py-1.5 ">
                <img src={google} alt="google Icon" className="w-5 h-5 " />
                <button>Sign Up With Google</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
