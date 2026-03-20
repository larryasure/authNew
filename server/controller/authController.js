import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { transporter } from "./emailConfig.js";
import cloudinary from "../config/cloudinary.js";
import Transaction from "../models/transactionModel.js";
import Budget from "../models/budgetModel.js";

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ message: "All fields are required!" });

    // Check if User Exists.
    const existUser = await User.findOne({ email });
    if (existUser)
      return res.status(400).json({ message: "User Already Exists!" });

    // Hash the password.\
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // Create a new User.
    const newUser = new User({ name, email, password: hashPassword });
    await newUser.save();

    const verifyToken = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    const verifyLink = `http://localhost:5173/verifyemail/${verifyToken}`;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Verify Your Email",
      html: `
         <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px; border: 1px solid #e5e7eb; border-radius: 16px;">
      <h1 style="color: #var(--brand)); font-size: 24px; margin-bottom: 4px;">Sloth</h1>
      <hr style="border: none; border-top: 1px solid #e5e7eb; margin-bottom: 24px;" />
      <h2 style="font-size: 20px; color: #111827;">Verify Your Email</h2>
      <p style="color: #6b7280; font-size: 15px;">Thanks ${newUser.name}, for signing up! Click the button below to verify your email address.</p>
      <a href="${verifyLink}" style="display: inline-block; margin: 24px 0; background-color: #var(--brand)); color: white; padding: 12px 28px; border-radius: 20px; text-decoration: none; font-weight: bold; font-size: 15px;">
        Verify Email
      </a>
      <p style="color: #6b7280; font-size: 13px;">This link expires in <strong>24 hours</strong>.</p>
      <hr style="border: none; border-top: 1px solid #e5e7eb; margin-top: 24px;" />
      <p style="color: #9ca3af; font-size: 12px;">© ${new Date().getFullYear()} Sloth. All rights reserved.</p>
    </div>
      
      `,
    });

    res.status(201).json({
      message: "User Created Successfully... Please Wait!",
      user: {
        id: newUser._id,
        email: newUser.email,
        name: newUser.name,
        created: newUser.createdAt,
      },
    });

    // Catching an error.
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error!" });
  }
};

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "All fields are required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid Email" });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return res.status(400).json({ message: "Invalid Password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return res.status(200).json({
      message: "Login Successful!",
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        created: user.createdAt,
        emailVerified: user.emailVerified,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    console.error("SIGNIN ERROR:", error);
    return res.status(500).json({ message: "Server Error, Try Again later!" });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) return res.status(400).json({ message: "Email is required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found!" });

    const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });

    await User.findByIdAndUpdate(
      user._id,
      {
        resetToken: resetToken,
        resetTokenExpiry: new Date(Date.now() + 15 * 60 * 1000),
      },
      { new: true },
    );

    const resetLink = `http://localhost:5173/resetpassword/${resetToken}`;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password  Reset Request",
      html: `
  <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px; border: 1px solid #e5e7eb; border-radius: 16px;">
    
    <h1 style="color: #var(--brand)); font-size: 24px; margin-bottom: 4px;">Sloth</h1>
    <hr style="border: none; border-top: 1px solid #e5e7eb; margin-bottom: 24px;" />
    
    <h2 style="font-size: 20px; color: #111827;">Reset Your Password</h2>
    <p style="color: #6b7280; font-size: 15px;">
      We received a request to reset your password. Click the button below to choose a new one.
    </p>

    <a href="${resetLink}" style="display: inline-block; margin: 24px 0; background-color: #var(--brand)); color: white; padding: 12px 28px; border-radius: 20px; text-decoration: none; font-weight: bold; font-size: 15px;">
      Reset Password
    </a>

    <p style="color: #6b7280; font-size: 13px;">
      This link expires in <strong>15 minutes</strong>. If you didn't request this, you can safely ignore this email.
    </p>

    <hr style="border: none; border-top: 1px solid #e5e7eb; margin-top: 24px;" />
    <p style="color: #9ca3af; font-size: 12px;">© ${new Date().getFullYear()} Sloth. All rights reserved.</p>
  </div>
`,
    });

    return res
      .status(201)
      .json({ message: "Password Reset Link sent to your Email" });
  } catch (error) {
    console.error("FORGOT PASSWORD ERROR", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.resetToken || user.resetToken !== token) {
      return res.status(400).json({ message: "Invalid or Expired Token" });
    }

    if (user.resetTokenExpiry < new Date()) {
      return res.status(400).json({ message: "Invalid Token" });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    user.resetToken = null;
    user.resetTokenExpiry = null;

    await user.save();

    res.status(200).json({ message: "Password reset Successful" });
  } catch (error) {
    res.status(400).json({ message: "Invalid or expired Token" });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.emailVerified)
      return res.status(400).json({ message: "Email already verified" });

    user.emailVerified = true;
    await user.save();
    return res.status(200).json({ message: "Email verified successfully!" });
  } catch (error) {
    return res.status(400).json({ message: "Invalid or Expired token" });
  }
};

export const uploadAvatar = async (req, res) => {
  try {
    if (!req.file)
      return res.status(400).json({ message: "No file Uploaded!" });

    const base64 = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;

    const result = await cloudinary.uploader.upload(base64, {
      folder: "sloth/avatars",
    });

    const user = await User.findByIdAndUpdate(
      req.userId,
      { avatar: result.secure_url },
      { returnDocument: "after" },
    );

    return res.status(200).json({
      message: "Avatar Uploaded Successfully",
      avatar: result.secure_url,
    });
  } catch (error) {
    console.error("Avatar Upload error ", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const resendVerification = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) return res.status(404).json({ message: "User not found!" });

    if (user.emailVerified)
      return res.status(400).json({ message: "Email already verified" });

    const verifyToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    const verifyLink = `http://localhost:5173/verifyemail/${verifyToken}`;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Verify Your Email",
      html: `
      
      <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px; border: 1px solid #e5e7eb; border-radius: 16px;">
          <h1 style="color: #var(--brand)); font-size: 24px; margin-bottom: 4px;">Sloth</h1>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin-bottom: 24px;" />
          <h2 style="font-size: 20px; color: #111827;">Verify Your Email</h2>
          <p style="color: #6b7280; font-size: 15px;">Click the button below to verify your email address.</p>
          <a href="${verifyLink}" style="display: inline-block; margin: 24px 0; background-color: #var(--brand)); color: white; padding: 12px 28px; border-radius: 20px; text-decoration: none; font-weight: bold; font-size: 15px;">
            Verify Email
          </a>
          <p style="color: #6b7280; font-size: 13px;">This link expires in <strong>24 hours</strong>.</p>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin-top: 24px;" />
          <p style="color: #9ca3af; font-size: 12px;">© ${new Date().getFullYear()} Sloth. All rights reserved.</p>
        </div>
      
      `,
    });

    return res.status(200).json({ message: "Verification Email Sent!" });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword)
      return res.status(400).json({ message: "All fields are required" });

    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: "User not Found" });

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Current Passowrd is Incorrect" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password Updated Successsfully." });
  } catch (error) {
    console.error("Chnage Password Eror", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const deleteAccount = async (req, res) => {
  try {
    const userId = req.userId;

    await User.findByIdAndDelete(userId);

    await Transaction.deleteMany({ userId });

    await Budget.deleteMany({ userId });

    return res.status(200).json({ message: "Account deleted successd=fully" });
  } catch (error) {
    console.error("Account Delete Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { displayName, name, country, phone } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      {
        name,
        displayName,
        country,
        phone,
      },
      { new: true },
    );

    return res.status(200).json({
      message: "Profile Updated Successfully",
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        phone: updatedUser.phone,
        displayName: updatedUser.displayName,
        email: updatedUser.email,
        country: updatedUser.country,
        avatar: updatedUser.avatar,
        emailVerified: updatedUser.emailVerified,
        createdAt: updatedUser.createdAt,
      },
    });
  } catch (error) {
    console.error("PROFILE UPDATE ERROR", error);
    res.status(500).json({ message: "Server Error" });
  }
};
