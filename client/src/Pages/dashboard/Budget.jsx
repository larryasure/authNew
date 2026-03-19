import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Trash2 } from "lucide-react";
const categories = [
  "Food",
  "Rent",
  "Transport",
  "Salary",
  "Shopping",
  "Health",
  "Entertainment",
  "Gadgets",
  "Other",
];

export default function Budget() {
  const { transactions } = useOutletContext();
  const [budgets, setBudgets] = useState([]);
  const [form, setForm] = useState({ category: "", amount: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        const token = localStorage.getItem("token");
        const apiUrl = import.meta.env.VITE_API_URL;

        const res = await fetch(`${apiUrl}/api/budgets`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();

        if (res.ok) {
          setBudgets(data.budgets || []);
          console.log("STATUS:", res.status);
          console.log("DATA FROM BACKEND:", data);
        }
      } catch (error) {
        console.error("Failed to fetch budgets", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBudgets();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.category || !form.amount) return;

    try {
      const token = localStorage.getItem("token");
      const apiUrl = import.meta.env.VITE_API_URL;

      const res = await fetch(`${apiUrl}/api/budgets`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          category: form.category,
          amount: parseFloat(form.amount),
        }),
      });

      const data = await res.json();

      if (res.ok) {
        const exists = budgets.find((b) => b.category === form.category);

        if (exists) {
          setBudgets(
            budgets.map((b) =>
              b.category === form.category ? data.budget : b,
            ),
          );
        } else {
          setBudgets([...budgets, data.budget]);
        }
        setForm({ category: "", amount: "" });
      }
    } catch (error) {
      console.error("Failed to set budget", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const apiUrl = import.meta.env.VITE_API_URL;

      const res = await fetch(`${apiUrl}/api/budgets/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        setBudgets(budgets.filter((b) => b._id !== id));
      }
    } catch (error) {
      console.error("Failed to delete budget", error);
    }
  };

  const getSpent = (category) => {
    return transactions
      .filter((t) => t.type === "Expense" && t.category === category)
      .reduce((acc, t) => acc + t.amount, 0);
  };

  const getBarColor = (spent, budget) => {
    const percentage = (spent / budget) * 100;
    if (percentage >= 90) return "bg-red-500";
    if (percentage >= 60) return "bg-yellow-400";
    return "bg-green-500";
  };

  return (
    <>
      <div className="min-h-screen px-8 py-5">
        <h1 className="text-3xl font-bold mb-1 ">Set Budget</h1>
        <p className="text-gray-500 font-medium mb-6">
          Set and Track your Spending Limits.
        </p>

        <div className="grid grid-cols-3 gap-6  ">
          <div className="bg-white h-90 border border-gray-300 rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-bold mb-4">Set Limit</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-gray-600">
                  Category
                </label>
                <select
                  value={form.category}
                  onChange={(e) =>
                    setForm({ ...form, category: e.target.value })
                  }
                  className="px-3 py-3 border border-[#beaeef] rounded-xl focus:ring-1 focus:ring-[#b0aedf] focus:border-0 transition-all  outline-0 duration-500 cursor-pointer "
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option className="cursor-pointer" value={cat} key={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm text-gray-600 font-semibold">
                  Budget Amount
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-gray-400">
                    $
                  </span>
                  <input
                    type="number"
                    value={form.amount}
                    placeholder="0.00"
                    onChange={(e) =>
                      setForm({ ...form, amount: e.target.value })
                    }
                    step={0.01}
                    min={0}
                    className="pl-7 w-full pr-3 py-3 border border-[#b0aedf] focus:ring-1  focus:border-0 outline-none focus:ring-[#b0aedf] rounded-xl transition-all duration-200  "
                  />
                </div>
              </div>

              <button
                className="bg-[#4f46e5] hover:opacity-80 py-3 rounded-xl text-white font-semibold w-full"
                type="submit"
              >
                Set Budget
              </button>
            </form>
          </div>

          <div className="col-span-2 bg-white p-4 shadow-sm rounded-2xl border border-gray-300">
            <h2 className="text-lg font-bold mb-4">Your Budgets</h2>
            {loading ? (
              <div className="h-40 items-center justify-center flex">
                <p className="flex items-center gap-3.5">
                  Loading
                  <span className="w-2 h-2 bg-[#4f46e5] rounded-full animate-ping [animation-delay:0ms]"></span>
                  <span className="w-2 h-2 bg-[#4f46e5] rounded-full animate-ping [animation-delay:200ms]"></span>
                  <span className="w-2 h-2 bg-[#4f46e5] rounded-full animate-ping [animation-delay:400ms]"></span>
                </p>
              </div>
            ) : budgets.length === 0 ? (
              <div className="flex h-40 items-center justify-center">
                <p>No Budget Set. Add one to get Started!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {budgets.map((budget) => {
                  const spent = getSpent(budget.category);
                  const percentage = Math.min(
                    (spent / budget.amount) * 100,
                    100,
                  );
                  const barColor = getBarColor(spent, budget.amount);

                  return (
                    <div
                      key={budget._id}
                      className="p-4 border border-gray-100 rounded-xl"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <div>
                          <p className="text-gray-600 font-semibold ">
                            {budget.category}
                          </p>
                          <p className="text-gray-500 text-xs ">
                            ${spent} of {budget.amount}
                          </p>
                        </div>

                        <button
                          onClick={() => handleDelete(budget._id)}
                          className="p-2 bg-red-50 hover:text-red-600 text-red-400 rounded-xl transition-all duration-300  "
                        >
                          <Trash2 />
                        </button>
                      </div>

                      <div className="w-full bg-gray-100 rounded-full h-2.5">
                        <div
                          className={`h-2.5 rounded-full transition-all duration-500 ${barColor}`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <div className="flex justify-between mt-1">
                        <p className="text-xs text-gray-400">
                          {Math.round(percentage)}% used
                        </p>
                        <p className="text-xs text-gray-400">
                          ${budget.amount - spent} remaining
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
