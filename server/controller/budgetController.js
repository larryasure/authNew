import Budget from "../models/budgetModel.js";

export const setBudget = async (req, res) => {
  try {
    const { category, amount } = req.body;

    if (!category || !amount)
      return res.status(400).json({ message: "All Fields are required!" });

    const existingBudget = await Budget.findOne({
      userId: req.userId,
      category,
    });

    if (existingBudget) {
      existingBudget.amount = amount;
      await existingBudget.save();
      return res
        .status(200)
        .json({ message: "Budget Updated", budget: existingBudget });
    }

    const budget = new Budget({
      userId: req.userId,
      category,
      amount,
    });

    await budget.save();
    res.status(201).json({ message: "Budget Set", budget });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const getBudget = async (req, res) => {
  try {
    const budgets = await Budget.find({ userId: req.userId });
    res.status(200).json({ budgets });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const deleteBudget = async (req, res) => {
  try {
    const budget = await Budget.findById(req.params.id);
    if (!budget) return res.status(404).json({ message: "Budget Not Found" });

    if (budget.userId.toString() !== req.userId.toString())
      return res.status(403).json({ message: "Not Allowed" });
    await budget.deleteOne();
    res.status(200).json({ message: "Budget Deleted" });
  } catch (error) {
    res.status(500).json({message: "Server Error"})
  }
};
