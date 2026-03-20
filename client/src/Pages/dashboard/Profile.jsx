  import React, { useContext, useState } from "react";
  import { AuthContext } from "../../Context/AuthContext";
  import { CalendarDays, LocateFixed, Mail } from "lucide-react";

  export default function Profile() {
    const { user, setUser } = useContext(AuthContext);
    const [editMode, setEditMode] = useState(false);
    const [verifyMessage, setVerifyMessage] = useState(null);
    const [verifyLoading, setVerifyLoading] = useState(false);
    const [formData, setFormData] = useState({
      name: user?.name || "",
      displayName: user?.displayName || "",
      email: user?.email || "",
      phone: user?.phone || "",
      country: user?.country || "Nigeria",
      avatar: user?.avatar || "",
      createdAt: user?.createdAt || new Date().toISOString(),
      emailVerified: user?.emailVerified ?? false,
    });

    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAvatarChange = async (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const previewUrl = URL.createObjectURL(file);
      setFormData({ ...formData, avatar: previewUrl });

      const data = new FormData();
      data.append("avatar", file);

      try {
        const token = localStorage.getItem("token");
        const baseUrl = import.meta.env.VITE_BASE_URL;

        const res = await fetch(`${baseUrl}/upload-avatar`, {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: data,
        });

        const result = await res.json();
        setFormData((prev) => ({ ...prev, avatar: result.avatar }));

        const updatedUser = { ...user, avatar: result.avatar };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
      } catch (error) {
        console.error("Failed to upload avatar", error);
      }
    };

    const handleSave = () => {
      const updatedUser = { ...user, ...formData };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      setEditMode(false);
    };

    const createdDate = new Date(formData.createdAt).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });

    const handleVerify = async () => {
      try {
        setVerifyMessage(null);
        setVerifyLoading(true);
        const token = localStorage.getItem("token");
        const baseUrl = import.meta.env.VITE_BASE_URL;

        const res = await fetch(`${baseUrl}/resend-verification`, {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        setVerifyMessage(data.message);
      } catch (error) {
        setVerifyMessage("Something went wrong, try again!");
        console.error(error);
      } finally {
        setVerifyLoading(false);
      }
    };

    return (
      <div className="space-y-8">
        <h1 className="text-3xl font-bold">Profile</h1>

        <div className="grid lg:grid-cols-3 gap-8 sm:grid-cols-1">
          {/* LEFT CARD */}
          <div className="bg-white cursor-pointer rounded-2xl p-6 shadow-sm hover:shadow-xl duration-200 transition-all space-y-8 border border-gray-100 h-100">
            <img
              src={formData.avatar || "https://i.pravatar.cc/150"}
              className="w-24 h-24 rounded-full object-cover mx-auto"
            />

            {editMode && (
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="text-sm"
              />
            )}

            <div className="text-center">
              <p className="font-bold text-lg">{formData.name}</p>
              <p className="text-sm text-gray-500">
                @{formData.displayName || "username"}
              </p>
            </div>

            <div className="text-sm text-gray-600 space-y-1">
              <div className="flex items-center gap-1.5">
                <LocateFixed className="w-4 h-4" />
                <span>{formData.country}</span>
              </div>

              <div className="flex items-center gap-1.5">
                <CalendarDays className="w-4 h-4" />
                <span>Joined {createdDate}</span>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`font-medium ${formData.emailVerified ? "text-green-600" : "text-red-600"}`}
                >
                  {formData.emailVerified ? "Verified " : "Not verified "}
                </span>
                {!formData.emailVerified && (
                  <div className="flex flex-col gap-1">
                    <button
                      className="text-blue-600 text-sm underline disabled:opacity-50"
                      onClick={handleVerify}
                      disabled={verifyLoading}
                    >
                      {verifyLoading ? "Sending..." : "Verify Email"}
                    </button>

                    {verifyMessage && (
                      <p className="text-xs font-semibold text-green-600">
                        {verifyMessage}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="lg:col-span-2 space-y-6 ">
            {/* PERSONAL INFO */}
            <div className="bg-white  rounded-2xl p-6 shadow-sm hover:shadow-xl duration-200 transition-all space-y-6 cursor-pointer border border-gray-100">
              <h2 className="text-xl font-semibold">Personal Information</h2>

              {editMode ? (
                <div className="grid md:grid-cols-2 gap-6">
                  <Input
                    label="Full Name"
                    name="name"
                    value={formData?.name}
                    onChange={handleChange}
                  />
                  <Input
                    label="Display Name"
                    name="displayName"
                    value={formData.displayName}
                    onChange={handleChange}
                  />
                  <Input
                    label="Email"
                    name="email"
                    value={formData?.email}
                    onChange={handleChange}
                  />
                  <Input
                    label="Phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                  <Input
                    label="Country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                  />
                </div>
              ) : (
                <div className="space-y-4">
                  <Row label="Full Name" value={user?.name} />
                  <Row label="Display Name" value={user?.displayName || "-"} />
                  <Row label="Email" value={user?.email} />
                  <Row label="Phone" value={user?.phone || "-"} />
                  <Row label="Country" value={user?.country} />
                </div>
              )}
            </div>

            {/* ACCOUNT INFO */}
            <div className="bg-white  rounded-2xl p-6 shadow-sm hover:shadow-xl duration-200 transition-all space-y-6 cursor-pointer border border-gray-100">
              <h2 className="text-xl font-semibold">Account Information</h2>

              <Row label="Member since" value={createdDate} />
              <Row
                label="Email status"
                value={formData.emailVerified ? "Verified" : "Not verified"}
              />
              <Row label="Account type" value="Free Plan" />
            </div>

            {/* ACTION BUTTONS */}
            <div>
              {editMode ? (
                <div className="flex gap-4">
                  <button
                    onClick={handleSave}
                    className="bg-green-600 text-white px-5 py-2 rounded-lg"
                  >
                    Save Changes
                  </button>

                  <button
                    onClick={() => setEditMode(false)}
                    className="bg-gray-500 text-white px-5 py-2 rounded-lg"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setEditMode(true)}
                  className="bg-[#4f46e5] text-white px-5 py-2 rounded-lg"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* SMALL COMPONENTS */

  function Row({ label, value }) {
    return (
      <div className="flex justify-between  pb-2">
        <p className="text-gray-500 font-medium">{label}</p>
        <p className="font-medium text-black text-right max-w-[70%]">{value}</p>
      </div>
    );
  }

  function Input({ label, ...props }) {
    return (
      <label className="flex flex-col gap-1 text-sm font-semibold">
        {label}
        <input className="border rounded-lg px-3 py-2" {...props} />
      </label>
    );
  }
