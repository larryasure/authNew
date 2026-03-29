import React, { useContext, useState } from "react";
import password from "../../assets/lockPassword.png";
import { Eye, EyeOff, TriangleAlert } from "lucide-react";
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Security() {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsloading] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmEmail, setConfirmEmail] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState(null);

  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const passwordStrength = (password) => {
    let score = 0;

    if (password.length > 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  };

  const strengthLabels = ["Weak", "Fair", "Strong", "Very Strong"];

  const strengthColors = [
    "bg-red-500",
    "bg-orange-300",
    "bg-yellow-500",
    "bg-green-500",
  ];
  const strengthTextColors = [
    "text-red-500",
    "text-orange-300",
    "text-yellow-500",
    "text-green-500",
  ];

  const strengthScore = passwordStrength(formData.newPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (
      !formData.currentPassword ||
      !formData.newPassword ||
      !formData.confirmPassword
    ) {
      setError("All fields are required!");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (strengthScore < 4) {
      setError("Password is too weak. Use Uppercase, Characters and Numbers");
      return;
    }
    setIsloading(true);

    try {
      const token = localStorage.getItem("token");
      const baseUrl = import.meta.env.VITE_BASE_URL;

      const res = await fetch(`${baseUrl}/change-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message);
        return;
      }

      setSuccess(data.message);
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      setError("Something went wrong , Try again!");
      console.error(error);
    } finally {
      setIsloading(false);
    }
  };

  const handleDelete = async () => {
    setDeleteError(null);
    setDeleteLoading(true);

    try {
      const token = localStorage.getItem("token");
      const baseUrl = import.meta.env.VITE_BASE_URL;

      const res = await fetch(`${baseUrl}/delete-account`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        setDeleteError(data.message);
        return;
      }

      logout();
      setTimeout(() => navigate("/"));
    } catch (error) {
      console.error(error);
      setDeleteError("Something went wrong, try again");
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <>
      <div className="psace-y-6 p-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold ">Security Settings</h1>
            <p className="text-gray-500 font-medium mt-1 ">
              Manage your password and account Security
            </p>
          </div>

          <p className="text-green-500 bg-green-50 px-3">Active</p>
        </div>
        <div className="bg-white border border-gray-200 p-6 rounded-2xl space-y-4 my-5">
          <h1 className="text-2xl font-semibold "> Change Password</h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">
            <div className="flex flex-col gap-1.5 ">
              <label className="text-sm font-semibold text-gray-700">
                Current Password
              </label>

              <div className="relative sm:w-full md:w-1/2">
                <img
                  src={password}
                  alt="password png"
                  className="absolute top-1/2 -translate-y-1/2 left-3"
                />

                <input
                  onChange={handleChange}
                  value={formData.currentPassword}
                  type={showCurrentPassword ? "text" : "password"}
                  name="currentPassword"
                  placeholder="**********"
                  className="w-full py-2  pl-10  rounded-xl border border-[#464edf] outline-0 "
                />

                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  {showCurrentPassword ? (
                    <EyeOff className="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer hover:opacity-60  duration-200 transition-all" />
                  ) : (
                    <Eye className="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer hover:opacity-60 duration-200 transition-all" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-700">
                New Password
              </label>

              <div className="md:w-1/2 sm:w-full relative ">
                <img
                  src={password}
                  alt="password png"
                  className="absolute top-1/2 -translate-y-1/2 left-3 "
                />

                <input
                  onChange={handleChange}
                  value={formData.newPassword}
                  type={showNewPassword ? "text" : "password"}
                  name="newPassword"
                  placeholder="**********"
                  className="w-full py-2  pl-10  rounded-xl border border-[#464edf] outline-0 "
                />

                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? (
                    <EyeOff className="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer hover:opacity-60  duration-200 transition-all" />
                  ) : (
                    <Eye className="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer hover:opacity-60 duration-200 transition-all" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-700">
                Confirm Password
              </label>

              <div className="md:w-1/2 sm:w-full relative ">
                <img
                  src={password}
                  alt="password png"
                  className="absolute top-1/2 -translate-y-1/2 left-3 "
                />

                <input
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="**********"
                  className="w-full py-2  pl-10  rounded-xl border border-[#464edf] outline-0 "
                />

                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer hover:opacity-60  duration-200 transition-all" />
                  ) : (
                    <Eye className="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer hover:opacity-60 duration-200 transition-all" />
                  )}
                </button>
              </div>
            </div>
            <div className="md:w-1/2 sm:w-full gap-2 flex px-1">
              {[0, 1, 2, 3].map((index) => (
                <div
                  key={index}
                  className={`flex-1 rounded-full h-1.5 border border-gray-200 
                   ${index < strengthScore ? strengthColors[strengthScore - 1] : ""}`}
                ></div>
              ))}
            </div>

            <p
              className={`text-xs text-center  font-medium ${formData.newPassword ? strengthTextColors[strengthScore - 1] : "text-gray-500"} `}
            >
              {formData.newPassword ? strengthLabels[strengthScore - 1] : ""}
            </p>

            <p className="text-red-500 font-semibold text-xs inline ">
              {error}
            </p>
            <p className="text-green-500 font-bold text-xs">{success}</p>

            <button
              type="submit"
              className="bg-[var(--brand)] self-start mt-1 cursor-pointer text-white font-semibold px-6 py-2.5 rounded-xl hover:opacity-90 transition-all"
            >
              {isLoading ? "Updating" : "Update Password"}
            </button>
          </form>
        </div>
      </div>

      <div className="border-2 border-red-200 bg-white p-6 rounded-2xl ">
        <h2 className="text-xl font-bold text-red-500 mb-1">Danger Zone!</h2>
        <p className="text-gray-400 font-medium mb-6 text-sm ">
          These changes are permanent and cannot be undone.
        </p>
        <div className=" flex items-center justify-between bg-red-50 rounded-xl px-5 py-4 border border-red-200">
          <div>
            <p className="font-bold text-gray-800 text-sm"> Delete Account</p>
            <p className="text-gray-400 text-xs mt-1">
              Permanently delete your account, transactions and data
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="border border-red-400 text-red-500 font-semibold  text-sm px-4 py-2 hover:bg-red-500 cursor-pointer hover:text-white transition-all duration-200 rounded-xl   "
          >
            Delete Account
          </button>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 ">
          <div className="bg-white rounded-2xl max-w-md mx-4 p-8 shadow-xl">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-full flex items-center bg-red-100 justify-center">
                <TriangleAlert className="text-red-500 w-7 h-7" />
              </div>
              <p className="text-gray-800 font-semibold text-xl">
                Are you absolutely Sure?
              </p>
            </div>

            <p className="text-gray-500 text-sm mb-3 leading-relaxed">
              This will permanently delete your account and remove all your data
              including transactions, budgets and settings. This action{" "}
              <span className="text-red-500 font-semibold">
                cannot be undone
              </span>
            </p>
            <div className="flex items-center text-sm gap-2 my-3">
              <TriangleAlert className="text-red-500 w-7 h-7" />
              All your Transactions and budgets will be lost forever
            </div>

            <label className="font-semibold block mb-1 text-gray-700 text-sm">
              Type your email to confirm
            </label>
            <input
              type="email"
              name="confirmEmail"
              value={confirmEmail}
              onChange={(e) => setConfirmEmail(e.target.value)}
              placeholder="youremail@gmail.com"
              className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:border-red-400 outline-none focus:ring-1 mb-5 text-sm focus:ring-red-300 duration-200 transition-all"
            />
            {deleteError && (
              <p className="text-red-500 mb-2 font-semibold text-xs">
                {deleteError}
              </p>
            )}

            <div className=" flex gap-3 ">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setConfirmEmail("");
                }}
                className="flex-1 bg-green-200 text-green-700 font-semibold py-2 hover:bg-green-300 transition-all duration-200 rounded-xl active:scale-105 cursor-pointer"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                disabled={confirmEmail !== user?.email || deleteLoading}
                className="flex-1 bg-red-500 text-white font-semibold py-2 rounded-xl transition-all duration-200 active:scale-100 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-red-600 cursor-pointer  "
              >
                {deleteLoading ? "Deleting" : "Yes, delete my account"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
