import { CheckCircle, TrendingDown, TrendingUp } from "lucide-react";
import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";

const category = [
  "Food",
  "Rent",
  "Transport",
  "Salary",
  "Shopping",
  "Health",
  "Entertainment",
  "Uber",
  "Gadgets",
  "Other",
];

export default function AddTransactions() {
  const { transactions, setTransactions } = useOutletContext();

  const [form, setForm] = useState({
    date: "",
    description: "",
    category: "",
    type: "Income",
    amount: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !form.description ||
      !form.category ||
      !form.date ||
      !form.type ||
      !form.amount
    )
      return;

    try {
      const token = localStorage.getItem("token");
      const apiUrl = import.meta.env.VITE_API_URL;

      const res = await fetch(`${apiUrl}/api/transactions`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...form,
          amount: parseFloat(form.amount),
        }),
      });

      const data = await res.json()

      if (res.ok) {
        setTransactions([...transactions, data.transaction])
        setSubmitted(true)
        setTimeout(() => setSubmitted(false), 2500)
        setForm({
          description: "",
          category: "",
          type: "Income",
          date: "",
          amount: "",
        })
      }
    } catch (error) {
      console.error("Failed to add transaction", error);
      
    }
  };
  const isIncome = form.type === "Income";

  return (
    <>
      <div className="min-h-screen px-8 py-5">
        <h1 className="text-3xl font-bold mb-3">Add Transaction</h1>
        <h3 className="text-lg text-gray-600 font-medium">
          <span className="text-black font-bold">Log </span>a New Income or
          Expense Entry!
        </h3>
        {submitted && (
          <div className="flex items-center  gap-3 my-3 bg-green-50 max-w-xs mx-auto border border-green-200 text-green-700 font-semibold rounded-2xl px-5 py-3 shadow-sm">
            <CheckCircle className="w-5 h-5 text-green-600" />
            Transaction Added Successfully
          </div>
        )}

        <div className="grid grid-cols-3 gap-6 py-5">
          <div className="col-span-2 bg-white border rounded-2xl border-gray-300 p-6 shadow-sm ">
            <div className="flex mb-4 gap-3 ">
              <button
                type="button"
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${
                  isIncome
                    ? "bg-green-50 text-green-600 border-2 border-green-400"
                    : "bg-gray-50 text-gray-500 border-2 border-transparent hover:bg-gray-100"
                }`}
                onClick={() => setForm({ ...form, type: "Income" })}
              >
                <TrendingUp className="w-5 h-5" />
                Income
              </button>
              <button
                onClick={() => setForm({ ...form, type: "Expense" })}
                type="button"
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${form.type === "Expense" ? "bg-red-50 text-red-600 border-2 border-red-300 " : "bg-gray-50 text-gray-500 border-2 border-transparent hover:bg-gray-100"}`}
              >
                <TrendingDown className="w-4 h-4" />
                Expense
              </button>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5 ">
              <div className="flex flex-col  gap-3">
                <label className="mb-1 text-sm font-semibold text-gray-600">
                  Amount
                </label>
                <div className="relative">
                  <span className="absolute  left-3 top-1/2 -translate-y-1/2  text-gray-400 font-bold">
                    $
                  </span>
                  <input
                    type="number"
                    name="amount"
                    placeholder="0.00"
                    value={form.amount}
                    onChange={handleChange}
                    min={0}
                    step={0.01}
                    className="w-full pl-7 pr-3 py-3 border border-gray-200 rounded-xl text-2xl font-bold text-gray-800 focus:ring-2   focus:border-0 focus:ring-[#b0aedf] focus:border-[#4f46e5] outline-none transition-all duration-300"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="mb-1 text-sm font-semibold text-gray-600">
                    Description
                  </label>
                  <input
                    type="text"
                    name="description"
                    placeholder="What's this for?..."
                    value={form.description}
                    onChange={handleChange}
                    className="px-3 py-3 border rounded-2xl focus:ring-2   focus:border-0 focus:ring-[#b0aedf] focus:border-[#4f46e5] outline-none transition-all duration-300"
                  />
                </div>

                <div className="flex gap-4 ">
                  <div className="flex flex-1 flex-col">
                    <label className="mb-2 font-semibold text-sm text-gray-600 ">
                      Category
                    </label>
                    <select
                      name="category"
                      value={form.category}
                      onChange={handleChange}
                      className="px-3 py-3 border rounded-2xl focus:ring-2   focus:border-0 focus:ring-[#b0aedf] focus:border-[#4f46e5] outline-none transition-all duration-300"
                    >
                      <option value="">Select Category...</option>
                      {category.map((cat) => (
                        <option value={cat} key={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-1 flex-col">
                    <label className="text-sm text-gray-600 font-semibold mb-2">
                      Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={form.date}
                      onChange={handleChange}
                      className="px-3 py-3 border rounded-2xl focus:ring-2   focus:border-0 focus:ring-[#b0aedf] focus:border-[#4f46e5] outline-none transition-all duration-300"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-3">
                  <button
                    onClick={() =>
                      setForm({
                        date: "",
                        description: "",
                        amount: "",
                        category: "",
                        type: "Income",
                      })
                    }
                    className="px-6 py-2.5 rounded-xl border border-gray-300 text-gray-600 font-semibold hover:bg-gray-50 transition-all"
                  >
                    Clear
                  </button>

                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-[#4f46e5] text-white font-semibold hover:opacity-90 transition-all"
                  >
                    Add Transaction
                  </button>
                </div>
              </div>
            </form>
          </div>

          <div className="flex flex-col gap-5">
            <div className="bg-white border border-gray-300 rounded-2xl shadow-sm p-6">
              <h2 className="text-lg font-bold mb-4">Preview</h2>
              <div
                className={`flex items-center gap-3 p-3 border rounded-xl ${isIncome ? "border-green-100 bg-green-50" : "border-red-100 bg-red-50"}`}
              >
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center ${isIncome ? "bg-green-100" : "bg-red-100"}`}
                >
                  {isIncome ? (
                    <TrendingUp className="w-4 h-4 text-green-500" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-500" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-800 text-sm truncate">
                    {form.description || "Description"}
                  </p>
                  <p className="text-xs text-gray-400">
                    {form.category || "Category"} · {form.date || "Date"}
                  </p>
                </div>
                <p
                  className={`font-bold text-sm ${isIncome ? "text-green-500" : "text-red-500"}`}
                >
                  {isIncome ? "+" : "-"}${form.amount || "0"}
                </p>
              </div>
            </div>

            <div className="bg-white border border-gray-300 rounded-2xl shadow-sm p-6">
              <h2 className="text-lg font-bold mb-3">Tips</h2>
              <div className="space-y-3 text-sm text-gray-500">
                <p className="flex gap-2">
                  <span className="text-[#4f46e5] font-bold">→</span>
                  Use clear descriptions so you can find transactions later.
                </p>
                <p className="flex gap-2">
                  <span className="text-[#4f46e5] font-bold">→</span>
                  Consistent categories help your charts stay accurate.
                </p>
                <p className="flex gap-2">
                  <span className="text-[#4f46e5] font-bold">→</span>
                  Log expenses the same day to avoid forgetting.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
