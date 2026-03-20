import {
  ClipboardMinus,
  Download,
  ListPlus,
  Target,
  TrendingDown,
  TrendingUp,
  Wallet,
} from "lucide-react";

import React, { useContext, useEffect, useState } from "react";

import { useNavigate, useOutletContext } from "react-router-dom";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { AuthContext } from "../../Context/AuthContext";

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { loading, transactions } = useOutletContext();
  const [monthlyData, setMonthlyData] = useState([]);
  const [budgets, setBudgets] = useState([]);

  const totalIncome = transactions
    .filter((t) => t.type === "Income")
    .reduce((acc, t) => acc + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === "Expense")
    .reduce((acc, t) => acc + t.amount, 0);

  const totalBalance = totalIncome - totalExpense;

  const categoryData = transactions
    .filter((t) => t.type === "Expense")
    .reduce((acc, t) => {
      const existing = acc.find((item) => item.category === t.category);
      if (existing) {
        existing.amount += t.amount;
      } else {
        acc.push({ category: t.category, amount: t.amount });
      }
      return acc;
    }, []);

  useEffect(() => {
    const fetchMonthlyData = async () => {
      try {
        const token = localStorage.getItem("token");
        const apiUrl = import.meta.env.VITE_API_URL;

        const res = await fetch(`${apiUrl}/api/transactions/monthly`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (res.ok) {
          setMonthlyData(data.monthlyData);
        }
      } catch (error) {
        console.error("Failed to fetch monthly Data! ", error);
      }
    };

    fetchMonthlyData();
  }, []);

  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        const token = localStorage.getItem("token");
        const apiUrl = import.meta.env.VITE_API_URL;

        const res = await fetch(`${apiUrl}/api/budgets`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();

        if (res.ok || []) {
          setBudgets(data.budgets || []);
        }
      } catch (error) {
        console.error("Failed to fecth budgets", error);
      }
    };

    fetchBudgets();
  }, []);

  const budgetData = budgets.map((b) => {
    const actual = transactions
      .filter((t) => t.type === "Expense" && t.category === b.category)
      .reduce((acc, t) => acc + t.amount, 0);

    return {
      category: b.category,
      budget: b.amount,
      actual,
    };
  });

  const pieData = [
    { name: "Income", value: totalIncome },
    { name: "Expense", value: totalExpense },
  ];

  console.log("MonthlyData in state:", monthlyData);

  return (
    <>
      <div className="min-h-screen mx-8 py-5 ">
        <h1 className="text-3xl font-bold mb-3 ">Dashboard</h1>
        <h3 className="text-lg  mb-3 text-gray-600 font-medium">
          <span className=" text-black font-bold">Welcome, </span>{" "}
          {user?.name || "User"}
        </h3>

        <div className="grid grid-cols-3 gap-6 mb-5 ">
          <div className=" bg-white border border-gray-300 rounded-2xl shadow-sm p-6 flex items-center gap-4 ">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#eef2ff]">
              <Wallet className="w-6 h-6 text-[var(--brand)]" />
            </div>
            <p className="font-semibold text-sm text-gray-600 mb-2">Total</p>
            <p
              className={`font-bold text-3xl ${totalBalance >= 0 ? "text-[var(--brand)]" : "text-red-600"} `}
            >
              ${totalBalance}
            </p>
          </div>

          <div className=" bg-white border border-gray-300 rounded-2xl shadow-sm p-6 gap-4.5 flex items-center justify-center">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#eef2ff]">
              <TrendingUp className="h-6 w-6 text-green-600 " />
            </div>
            <p className="font-semibold text-sm text-gray-600 mb-2">
              Total Income
            </p>
            <p className="font-bold text-3xl text-green-500">${totalIncome}</p>
          </div>

          <div className=" bg-white border border-gray-300 rounded-2xl shadow-sm p-6 gap-4 flex items-center justify-center  ">
            <div className="w-12 h-12 bg-[#eef2ff] rounded-xl flex items-center justify-center">
              <TrendingDown className="w-6 h-6 animate-ping text-red-500 " />
            </div>
            <p className="font-semibold text-sm text-gray-600 mb-2">
              Total Expense
            </p>
            <p className="font-bold text-3xl text-red-500 animate-pulse">
              ${totalExpense}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-7">
          <div className="bg-white  border border-gray-300 rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-bold mb-4 ">Income vs Expense</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={pieData} dataKey="value" outerRadius={100} label>
                  <Cell fill="#11a11a" />
                  <Cell fill="#ef4444" />
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-black text-white border border-gray-300 shadow-sm p-6  rounded-2xl">
            <h2 className="text-lg font-bold mb-4 ">Monthly Trend</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="2 3" stroke="#acc" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />

                <Line
                  type="monotone"
                  dataKey="income"
                  stroke="#22c55e"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="expense"
                  stroke="#ef4444"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="flex md:flex-row flex-col rounded-2xl  bg-white my-15">
          <div className=" flex-1 p-6">
            <h2 className="text-lg font-bold mb-4">Spending by Category</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="amount" fill="var(--brand)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className=" p-6 flex-1  border-l-2 border-gray-300  ">
            <h2 className="text-lg font-bold mb-4">Budget vs Actual</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={budgetData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="budget" fill="#22c55e" />
                <Bar dataKey="actual" fill="#ef4444" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6 mt-6">
          {/* Recent Transactions */}
          <div className="md:col-span-2 sm:co bg-white border border-gray-300 rounded-2xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Recent Transactions</h2>
              <button
                onClick={() => navigate("/dashboard/transactions")}
                className="text-sm text-[var(--brand)] font-semibold cursor-pointer hover:underline"
              >
                View all
              </button>
            </div>
            <div className="space-y-3">
              {transactions.slice(0, 5).map((transaction) => (
                <div
                  key={transaction._id}
                  className="flex  justify-between items-center p-3 border border-gray-100 rounded-xl hover:bg-gray-50 transition-all duration-200"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center ${transaction.type === "Income" ? "bg-green-50" : "bg-red-50"}`}
                    >
                      {transaction.type === "Income" ? (
                        <TrendingUp className="w-4 h-4 text-green-500" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-red-500" />
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 text-sm">
                        {transaction.description}
                      </p>
                      <p className="text-xs text-gray-400">
                        {transaction.date}
                      </p>
                    </div>
                  </div>
                  <p
                    className={`font-bold text-sm ${transaction.type === "Income" ? "text-green-500" : "text-red-500"}`}
                  >
                    {transaction.type === "Income" ? "+" : "-"}$
                    {transaction.amount}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white border border-gray-300 rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-bold mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <button
                onClick={() => navigate("/dashboard/addtransactions")}
                className="w-full flex items-center gap-3 bg-[var(--brand)] text-white font-semibold py-3 px-4 rounded-xl hover:opacity-90 transition-all"
              >
                <ListPlus className="w-5 h-5" />
                Add Transaction
              </button>

              <button
                onClick={() => navigate("/dashboard/reports")}
                className="w-full flex items-center gap-3 bg-gray-50 text-gray-700 font-semibold py-3 px-4 rounded-xl hover:bg-gray-100 transition-all"
              >
                <ClipboardMinus className="w-5 h-5" />
                View Reports
              </button>

              <button
                onClick={() => navigate("/dashboard/budget")}
                className="w-full flex items-center gap-3 bg-gray-50 text-gray-700 font-semibold py-3 px-4 rounded-xl hover:bg-gray-100 transition-all"
              >
                <Target className="w-5 h-5" />
                Set Budget
              </button>

              <button
                onClick={() => navigate("/dashboard/export")}
                className="w-full flex items-center gap-3 bg-gray-50 text-gray-700 font-semibold py-3 px-4 rounded-xl hover:bg-gray-100 transition-all"
              >
                <Download className="w-5 h-5" />
                Export Data
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
