import express from "express";
import {
  addTransaction,
  deleteTransaction,
  getTransactions,
  monthlyData,
  protect,
  updateTransaction,
} from "../controller/transactionController.js";

const router = express.Router();

router.post("/", protect, addTransaction);
router.get("/", protect, getTransactions);
router.get("/monthly", protect, monthlyData);
router.delete("/:id", protect, deleteTransaction);
router.put("/:id", protect, updateTransaction);

export default router;
