import Transaction from "../models/transactionModel.js";
import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token)
    return res.status(401).json({
      message: "Not Authorized",
    });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export const addTransaction = async (req, res) => {
  try {
    const { description, category, amount, type, date } = req.body;
    if (!description || !category || !amount || !type || !date)
      return res.status(400).json({ message: "All fields are required " });

    const transaction = new Transaction({
      userId: req.userId,
      description,
      category,
      amount,
      type,
      date,
    });

    await transaction.save();

    res
      .status(201)
      .json({ message: "Transaction Added Successfully!", transaction });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.userId });
    res.status(200).json({ transactions });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction)
      return res.status(404).json({ message: "Transaction Not found" });

    if (transaction.userId.toString() !== req.userId.toString())
      return res.status(403).json({ message: "Not Allowed" });

    await transaction.deleteOne();

    res.status(200).json({ message: "Transaction Deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const monthlyData = async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.userId });
    const monthlyMap = {};

    transactions.forEach((t) => {
      const date = new Date(t.date);
      const month = date.toLocaleString("default", { month: "short" });
      const year = date.getFullYear();
      const key = `${month} ${year}`;

      if (!monthlyMap[key]) {
        monthlyMap[key] = { month: key, income: 0, expense: 0 };
      }

      if (t.type === "Income") {
        monthlyMap[key].income += t.amount;
      } else {
        monthlyMap[key].expense += t.amount;
      }
    });

    const result = Object.values(monthlyMap);

    res.status(200).json({ monthlyData: result });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const updateTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction)
      return res.status(404).json({ message: "Transaction not found" });

    if (transaction.userId.toString() !== req.userId.toString())
      return res.status(403).json({ message: "Not allowed" });

    const { description, category, amount, type, date } = req.body;

    transaction.description = description;
    transaction.category = category;
    transaction.amount = amount;
    transaction.type = type;
    transaction.date = date;

    await transaction.save();

    res.status(200).json({ message: "Transaction updated", transaction });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
    console.error(error);
  }
};
