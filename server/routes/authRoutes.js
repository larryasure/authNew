import express from "express";
import {
  changePassword,
  deleteAccount,
  forgotPassword,
  resendVerification,
  resetPassword,
  signin,
  signup,
  updateProfile,
  uploadAvatar,
  verifyEmail,
} from "../controller/authController.js";
import { upload } from "../config/multer.js";
import { protect } from "../controller/transactionController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/resetpassword/:token", resetPassword);
router.post("/forgotpassword", forgotPassword);
router.post("/change-password", protect, changePassword);
router.post("/resend-verification", protect, resendVerification);
router.post("/upload-avatar", protect, upload.single("avatar"), uploadAvatar);
router.get("/verifyemail/:token", verifyEmail);
router.delete('/delete-account', protect, deleteAccount)
router.put('/update-profile', protect, updateProfile)

export default router;
