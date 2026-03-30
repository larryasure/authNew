import { Trash2, X } from "lucide-react";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";

export default function Transactions() {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [filterCategory, setFilterCategory] = useState("All");
  const [selectedTransactions, setSelectedTransactions] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [updateLoading, setUpdateLoading] = useState(false);
  const [updateError, setUpdateError] = useState(null);
  const { transactions, setTransactions, loading } = useOutletContext();

  const openModal = (transaction) => {
    setSelectedTransactions(transaction);
    setEditForm({
      description: transaction.description,
      category: transaction.category,
      amount: transaction.amount,
      type: transaction.type,
      date: transaction.date,
    });
    setIsEditing(false);
    setUpdateError(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTransactions(null);
    setIsEditing(false);
    setUpdateError(null);
  };

  const handleUpdate = async () => {
    if (
      !editForm.description ||
      !editForm.category ||
      !editForm.amount ||
      !editForm.date
    ) {
      setUpdateError("All fileds are required");
      return;
    }

    try {
      setUpdateLoading(true);
      const token = localStorage.getItem("token");
      const apiUrl = import.meta.env.VITE_API_URL;

      const res = await fetch(
        `${apiUrl}/api/transactions/${selectedTransactions._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...editForm,
            amount: parseFloat(editForm.amount),
          }),
        },
      );

      const data = await res.json();

      if (res.ok) {
        setTransactions(
          transactions.map((t) =>
            t._id === selectedTransactions._id ? data.transaction : t,
          ),
        );
        closeModal();
      } else {
        setUpdateError(data.message || "Update Failed");
      }
    } catch (error) {
      setUpdateError("Something Went Wrong, Try Again!");
      console.error(error);
    } finally {
      setUpdateLoading(false);
    }
  };

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

  const filtered = transactions.filter((t) => {
    const matchSearch =
      t.description.toLowerCase().includes(search.toLowerCase()) ||
      t.category.toLowerCase().includes(search.toLowerCase());

    const matchType = filterType === "All" || t.type === filterType;
    const matchCategory =
      filterCategory === "All" || t.category === filterCategory;

    return matchSearch && matchType && matchCategory;
  });

  const categories = [...new Set(transactions.map((t) => t.category))];

  const pageSize = 10;
  const totalPages = Math.ceil(filtered.length / pageSize);

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentTransaction = filtered.slice(startIndex, endIndex);

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

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 flex flex-wrap items-center gap-3">
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search Transactions..."
            className="flex-1 min-w-48 px-4 py-2 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#b0aedf] focus:border-0 transition-all duration-300"
          />

          <select
            value={filterType}
            onChange={(e) => {
              setFilterType(e.target.value);
              setCurrentPage(1);
            }}
            className="px-4 py-2 border border-gray-200 rounded-xl text-sm outline-none cursor-pointer transition-all duration-300 focus:ring-2 focus:ring-[#b0aedf] "
          >
            <option value="All">All Types</option>
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </select>

          <select
            value={filterCategory}
            onChange={(e) => {
              setFilterCategory(e.target.value);
              setCurrentPage(1);
            }}
            className="px-4 py-2 text-sm rounded-xl border border-gray-200 cursor-pointer transition-all duration-300 focus:ring-2 focus:ring-[#b0aedf]"
          >
            <option value="All">All Categories</option>
            {categories.map((cat) => (
              <option value={cat} key={cat}>
                {cat}
              </option>
            ))}
          </select>

          {(search || filterType !== "All" || filterCategory !== "All") && (
            <button
              onClick={() => {
                setSearch("");
                setFilterType("All");
                setFilterCategory("All");
                setCurrentPage(1);
              }}
              className="px-4 py-2 cursor-pointer font-semibold text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-300"
            >
              Clear Filters
            </button>
          )}
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500 font-medium">
            Showing{" "}
            <span className="text-gray-800 font-bold">{filtered.length}</span>{" "}
            {filtered.length === 1 ? "transaction" : "transactions"}
            {filtered.length !== transactions.length && (
              <span className="text-[var(--brand)]">
                (filtered from {transactions.length})
              </span>
            )}
          </p>
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
              {currentTransaction.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-12 text-center text-gray-400 text-sm "
                  >
                    {" "}
                    No transactions match your search
                  </td>
                </tr>
              ) : (
                currentTransaction.map((t) => (
                  <tr
                    key={t._id}
                    onClick={() => openModal(t)}
                    className="hover:bg-gray-50 transition cursor-pointer"
                  >
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
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(t._id);
                        }}
                        className="p-2 text-red-400 hover:bg-red-50 hover:text-red-600 transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
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
      {console.log("isModalOpen:", isModalOpen, "selected:", selectedTransactions)}
      {isModalOpen && selectedTransactions && (
        <div
          className="fixed bg-black/40 z-50 inset-0 flex items-center justify-center px-4"
          onClick={closeModal}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full rounded-xl shadow-xl bg-white p-6 space-y-4 max-w-md max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between ">
              <h2 className="text-lg font-bold text-gray-800 ">
                {isEditing ? "Edit Transactions" : "Transaction details"}
              </h2>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-gray-100 transition-all duration-200 rounded-xl "
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {isEditing ? (
              <div className="space-y-3">
                <div className="flex gap-3">
                  {["Income", "Expense"].map((type) => (
                    <button
                      key={type}
                      onClick={() => setEditForm({ ...editForm, type })}
                      className={`py-2 flex-1 rounded-xl font-semibold text-sm border ${
                        editForm.type === type
                          ? type === "Income"
                            ? "border-green-400 bg-green-50 text-green-600 "
                            : "border-red-300 bg-red-50 text-red-500 "
                          : "border-transparent bg-gray-50 text-gray-500"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
                <div className="relative ">
                  <span className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400 font-bold">
                    $
                  </span>
                  <input
                    type="number"
                    value={editForm.amount}
                    onChange={(e) =>
                      setEditForm({ ...editForm, amount: e.target.value })
                    }
                    className="w-full pl-7 pr-3 py-2.5 border border-gray-200 rounded-xl outline-none focus:ring-1 focus:ring-[#b0aedf] transition-all duration-200 "
                  />
                </div>

                <input
                  type="text"
                  value={editForm.description}
                  onChange={(e) =>
                    setEditForm({ ...editForm, description: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl outline-none focus:ring-1 focus:ring-[#b0aedf] transition-all duration-200"
                  placeholder="Description"
                />

                <select
                  value={editForm.category}
                  onChange={(e) =>
                    setEditForm({ ...editForm, category: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl outline-none focus:ring-1 focus:ring-[#b0aedf] transition-all duration-200"
                >
                  {[
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
                  ].map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>

                <input
                  type="date"
                  value={editForm.date}
                  onChange={(e) =>
                    setEditForm({ ...editForm, date: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl outline-none focus:ring-1 focus:ring-[#b0aedf] transition-all duration-200"
                />
                {updateError && (
                  <div className="text-xs text-red-500 font-semibold">
                    {updateError}
                  </div>
                )}

                <div className="flex gap-3 pt-2 ">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="flex-1 py-2.5 border border-gray-200 rounded-xl font-semibold text-sm text-gray-600 hover:bg-gray-50 transition-all duration-300 "
                  >
                    Cancel
                  </button>

                  <button
                    onClick={handleUpdate}
                    disabled={updateLoading}
                    className="flex-1 py-2.5 bg-[var(--brand)] text-white rounded-xl text-sm font-semibold disabled:opacity-50 hover:opacity-90 transition-all duration-200"
                  >
                    {updateLoading ? "Saving" : "Save Changes"}
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center just rounded-xl p-4 bg-gray-50 ">
                  <span className="text-sm text-gray-500">Amount</span>
                  <span
                    className={`text-lg font-semibold ${selectedTransactions.type === "Income" ? "text-green-600" : "text-red-600"}`}
                  >
                    {selectedTransactions.type === "Income" ? "+" : "-"}$
                    {selectedTransactions.amount}
                  </span>
                </div>
                {[
                  {
                    label: "Description",
                    value: selectedTransactions.description,
                  },
                  { label: "Category", value: selectedTransactions.category },
                  { label: "Date", value: selectedTransactions.date },
                  { label: "Type", value: selectedTransactions.type },
                ].map(({ label, value }) => (
                  <div
                    className="flex justify-between items-center py-2 border-b border-gray-100 "
                    key={label}
                  >
                    <span className="text-sm text-gray-400">{label}</span>
                    <span className="text-sm font-semibold text-gray-800 capitalize">
                      {value}
                    </span>
                  </div>
                ))}
                <div className="flex gap-3 pt-2 ">
                  <button
                    onClick={() => {
                      handleDelete(selectedTransactions._id);
                      closeModal();
                    }}
                    className="flex-1 py-2.5 border border-red-200 text-red-500 rounded-xl  text-sm font-semibold hover:bg-red-50 transition-all duration-200 "
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex-1 py-2.5 bg-[var(--brand)] text-white rounded-xl font-semibold hover:opacity-90 transition-all duration-200"
                  >
                    Edit
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
