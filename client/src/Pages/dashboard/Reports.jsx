import React, { useContext, useMemo, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { useOutletContext } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const categoryColors = [
  "#e07b39",
  "#3977c4",
  "#9b59b6",
  "#c4395e",
  "#39c48a",
  "#f1c40f",
  "#1abc9c",
];

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
export default function Reports() {
  // FEtching data
  const { user } = useContext(AuthContext);
  const { transactions, loading } = useOutletContext();
  const [monthlyData, setMonthlyData] = useState([]);

  // Filter State
  const [selectedMonth, setSelectedMonth] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  // Fectching monthlydata from the api  (useEffect)....

  useEffect(() => {
    const fetchMonthlyData = async () => {
      try {
        const token = localStorage.getItem("token");
        const ApiUrl = import.meta.env.VITE_API_URL;

        const res = await fetch(`${ApiUrl}/api/transactions/monthly`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        if (res.ok) {
          setMonthlyData(data.monthlyData || []);
        }
      } catch (error) {
        console.error("failed to load monthly data: ", error);
      }
    };
    fetchMonthlyData();
  }, []);

  // Filtering by category/date

  const categories = useMemo(() => {
    return [...new Set(transactions.map((t) => t.category))];
  }, [transactions]);

  const filtered = useMemo(() => {
    return transactions.filter((t) => {
      const txDate = new Date(t.date);
      if (selectedMonth !== "All") {
        const txMonth = txDate.toLocaleString("default", { month: "short" });
        if (txMonth !== selectedMonth) return false;
      }
      if (selectedCategory !== "All" && t.category !== selectedCategory)
        return false;
      if (dateFrom && txDate < new Date(dateFrom)) return false;
      if (dateTo && txDate > new Date(dateTo)) return false;
      return true;
    });
  }, [transactions, selectedMonth, selectedCategory, dateFrom, dateTo]);

  // calculating income - expense

  const summary = useMemo(() => {
    const income = filtered
      .filter((t) => t.type === "Income")
      .reduce((acc, t) => acc + t.amount, 0);

    const expenses = filtered
      .filter((t) => t.type === "Expense")
      .reduce((acc, t) => acc + t.amount, 0);
    return { income, expenses, savings: income - expenses };
  }, [filtered]);

  const topCategories = useMemo(() => {
    const map = {};
    filtered
      .filter((t) => t.type === "Expense")
      .forEach((t) => {
        map[t.category] = (map[t.category] || 0) + t.amount;
      });

    const total = Object.values(map).reduce((s, v) => s + v, 0);

    return Object.entries(map)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([cat, amt], i) => ({
        category: cat,
        amount: amt,
        pct: total > 0 ? Math.round((amt / total) * 100) : 0,
        color: categoryColors[i % categoryColors.length],
      }));
  }, [filtered]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className=" flex items-center gap-2">
          <span className="h-5 w-5 rounded-full border-t-transparent border-3 border-[#4f46e5] animate-spin"></span>
          Loading reports
        </p>
      </div>
    );
  }
  return (
    <>
      <div className="space-y-6 p-6 ">
        <div>
          <h1 className="text-3xl font-bold">Reports</h1>
          <p className="font-semibold text-gray-500 mt-1 ">
            Track where your money goes each month.
          </p>
        </div>

        <div className="flex flex-wrap border border-gray-100 shadow-sm items-center rounded-2xl gap-3 p-4 bg-white">
          <span className="font-semibold text-sm text-gray-500">Filter:</span>

          <input
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            className="border border-gray-200 px-3 py-1.5 rounded-lg shadow-sm  text-sm focus:outline-0 focus:ring focus:ring-[#4f46e5] text-gray-700"
          />
          <ArrowRight className="w-5 h-5 text-gray-400" />

          <input
            type="date"
            value={dateTo}
            name="date"
            onChange={(e) => setDateTo(e.target.value)}
            className="border border-gray-200 px-3 py-1.5 rounded-lg shadow-sm text-sm text-gray-700 focus:ring focus:outline-0 focus:ring-[#4f46e5] "
          />
        </div>

        <div className="flex gap-4 flex-wrap  md:justify-center">
          {["All", ...months].map((m) => (
            <button
              key={m}
              onClick={() => setSelectedMonth(m)}
              className={`px-3.5 py-1 font-medium text-xs rounded-2xl transition-all duration-300 cursor-pointer  ${selectedMonth === m ? "text-white bg-[#4f46e5]" : "text-gray-500 bg-gray-100 hover:bg-gray-200"} `}
            >
              {m}
            </button>
          ))}
        </div>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border border-gray-200 text-sm  rounded-lg shadow-sm ml-auto px-3 py-1.5 focus:outline-0  focus:ring-[#4f46e5] text-gray-700 bg-white "
        >
          <option value="All">All Categories</option>
          {categories.map((c) => (
            <option value={c} key={c}>
              {c}
            </option>
          ))}
        </select>

        <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
          <div className="bg-white p-6 shadow-sm rounded-2xl border border-gray-100">
            <p className="text-sm text-gray-500">Total Income</p>
            <p className="text-2xl font-bold text-green-600 mt-2">
              ${summary.income.toLocaleString()}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              {filtered.length} Transactions
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100">
            <p className="text-sm text-gray-500">Total Expense</p>
            <p className="text-2xl font-bold text-red-500 mt-2">
              ${summary.expenses.toLocaleString()}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              {filtered.length} Transactions
            </p>
          </div>

          <div className="bg-white p-6 border border-gray-100 rounded-2xl">
            <p className="text-sm text-gray-500">Net Savings</p>
            <p
              className={`text-2xl font-bold mt-2 ${summary.savings >= 0 ? "text-[#4f46e5]" : "text-red-600"}`}
            >
              {summary.savings >= 0 ? "+" : "-"}$
              {Math.abs(summary.savings).toLocaleString()}
            </p>
            <p className="text-xs text-gray-400  mt-1">income - expense</p>
          </div>
        </div>

        <div className="bg-black text-white rounded-2xl shadow-sm p-6 border-gray-50 border ">
          <h2 className="text-lg font-bold mb-4">
            Income - Expense vs Overtime{" "}
          </h2>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="2 3" stroke="#374151" />
              <XAxis dataKey="month" tick={{ fill: "#9ca3af", fontSize: 12 }} />
              <YAxis
                tick={{ fill: "#9ca3af", fontSize: 12 }}
                tickFormatter={(v) => `$${v}`}
              />
              <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
              <Legend />
              <Line
                type="monotone"
                dataKey="income"
                stroke="#22c55e"
                strokeWidth={2}
                dot={{ r: 4 }}
                name="Income"
              />
              <Line
                type="monotone"
                dataKey="expense"
                stroke="#ef4444"
                strokeWidth={2}
                dot={{ r: 4 }}
                name="Expenses"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
          <div className="rounded-2xl bg-white shadow-sm p-6 border border-gray-100">
            <h2 className="font-bold text-2xl mb-4 ">
              Top Spending Categories
            </h2>

            {topCategories.length === 0 ? (
              <p className="text-gray-400 font-semibold text-sm text-center py-8 ">
                No Expense Data for this period
              </p>
            ) : (
              <div className="space-y-4">
                {topCategories.map((item) => (
                  <div key={item.category}>
                    <div className="flex items-center justify-between mb-1 ">
                      <span className="text-sm text-gray-700">
                        {item.category}
                      </span>
                      <span className="font-semibold text-sm text-gray-800 ">
                        {item.amount.toLocaleString()}
                      </span>
                    </div>

                    <div className="w-full bg-gray-100 h-2 rounded-full ">
                      <div
                        className="h-2 rounded-full transition-all duration-500"
                        style={{
                          width: `${item.pct}%`,
                          backgroundColor: item.color,
                        }}
                      />
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5 ">
                      {item.pct}% percentage of total spendings
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="font-bold mt-2 text-2xl ">Monthly Summary</h2>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tickFormatter={(v) => `$${v}`} />
                <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                <Legend />
                <Bar
                  dataKey="income"
                  fill="#22c55e"
                  name="Income"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="expense"
                  fill="#ef4444"
                  name="Expenses"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
  );
}
