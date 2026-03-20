import { Trash2 } from "lucide-react";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";

export default function Transactions() {
  const [currentPage, setCurrentPage] = useState(1);
  const { transactions, setTransactions, loading } = useOutletContext();

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const apiUrl = import.meta.env.VITE_API_URL;

      const res = await fetch(`${apiUrl}/api/transactions/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setTransactions(transactions.filter((t) => t._id !== id));
      }
    } catch (error) {
      console.error("Failed to load Transactions", error);
    }
  };

  const pageSize = 10;
  const totalPages = Math.ceil(transactions.length / pageSize);

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentTransaction = transactions.slice(startIndex, endIndex);

  const totalIncome = transactions
    .filter((t) => t.type === "Income")
    .reduce((acct, t) => acct + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === "Expense")
    .reduce((acct, t) => acct + t.amount, 0);

  const totalBalance = totalIncome - totalExpense;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="flex items-center gap-2">
          <span className="h-5 w-5 border border-[var(--brand)] border-t-transparent rounded-full animate-spin "></span>
          Loading Trasactions...
        </p>
      </div>
    );
  }
  return (
    <>
      <div className="space-y-6 p-6">
        <h1 className="text-3xl font-bold">Transactions</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500">Total Income</p>
            <p className="text-2xl font-bold text-green-600 mt-2">
              ${totalIncome}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500 ">Total Expense</p>
            <p className="text-2xl font-bold animate-pulse text-red-500 mt-2">
              ${totalExpense}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500">Net Balance</p>
            <p
              className={`text-2xl font-bold mt-2 ${
                totalBalance >= 0 ? "text-green-600" : "text-red-500"
              }`}
            >
              ${totalBalance}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full  text-sm">
            <thead className="bg-gray-50 text-gray-500 uppercase text-xs ">
              <tr>
                <th className="px-6 py-4 text-left">Date</th>
                <th className="px-6 py-4 text-left">Description</th>
                <th className="px-6 py-4 text-left">Category</th>
                <th className="px-6 py-4 text-left">Type</th>
                <th className="px-6 py-4 text-right">Amount</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {currentTransaction.map((t) => (
                <tr key={t._id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 text-gray-500">{t.date}</td>
                  <td className="px-6 py-4 font-medium text-gray-800">
                    {t.description}
                  </td>
                  <td className="px-6 py-4 text-gray-500">{t.category}</td>

                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        t.type === "Income"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {t.type}
                    </span>
                  </td>

                  <td
                    className={`px-6 py-4 text-right font-semibold ${
                      t.type === "Income" ? "text-green-600" : "text-red-500"
                    }`}
                  >
                    {t.type === "Income" ? "+" : "-"}${t.amount}
                  </td>

                  <td className="px-6 py-4 text-right ">
                    <button
                      onClick={() => handleDelete(t._id)}
                      className="p-2 text-red-400 hover:bg-red-50 hover:text-red-600 transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center gap-2 items-center">
          <span>
            page {currentPage} of {totalPages}
          </span>
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            className="px-3 py-1.5 border rounded-lg duration-300 transition-all hover:bg-gray-200 font-medium disabled:opacity-40"
          >
            Prev
          </button>

          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1.5 border rounded-lg duration-300 transition-all hover:bg-gray-200 font-medium disabled:opacity-40
           "
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}
