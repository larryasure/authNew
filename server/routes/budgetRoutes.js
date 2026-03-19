import express from "express";
import { protect } from "../controller/transactionController.js";
import {
  deleteBudget,
  getBudget,
  setBudget,
} from "../controller/budgetController.js";

const router = express.Router();

router.post("/", protect, setBudget);
router.get("/", protect, getBudget);
router.delete("/:id", protect, deleteBudget);

export default router;
