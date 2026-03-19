import { Download } from "lucide-react";
import React, { useContext, useMemo, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";

export default function Export() {
  const { user } = useContext(AuthContext);
  const { transactions, loading } = useOutletContext();

  const [selectedRange, setSelectedRange] = useState("This Month");
  const ranges = ["This Month", "Last 3 Months", "This Year"];

  const filtered = useMemo(() => {
    const now = new Date();

    return transactions.filter((t) => {
      const txDate = new Date(t.date);

      if (selectedRange === "This Month") {
        return (
          txDate.getMonth() === now.getMonth() &&
          txDate.getFullYear() === now.getFullYear()
        );
      }
      if (selectedRange === "Last 3 Months") {
        const threeMonthsAgo = new Date(
          now.getFullYear(),
          now.getMonth() - 2,
          1,
        );
        return txDate >= threeMonthsAgo;
      }

      if (selectedRange === "This Year") {
        return txDate.getFullYear() === now.getFullYear();
      }

      return true;
    });
  }, [transactions, selectedRange]);

  const summary = useMemo(() => {
    const income = filtered
      .filter((t) => t.type === "Income")
      .reduce((acc, t) => acc + t.amount, 0);

    const expenses = filtered
      .filter((t) => t.type === "Expense")
      .reduce((acc, t) => acc + t.amount, 0);

    return { income, expenses, total: filtered.length };
  }, [filtered]);

  const convertToCSV = (data) => {
    const headers = ["Date", "Description", "Category", "Type", "Amount"];

    const rows = data.map((t) => [
      t.date,
      t.description,
      t.category,
      t.type,
      t.type === "Income" ? `+${t.amount}` : `-${t.amount}`,
    ]);

    const csvContent = [headers, ...rows]
      .map((row) => row.join(","))
      .join("\n");

    return csvContent;
  };

  const handleDownload = () => {
    if (filtered.length === 0) return;

    const csvContent = convertToCSV(filtered);

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("Download", "sloth-transaction.csv");

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="flex items-center gap-2">
          <span className="h-5 w-5 border-3 border-[#4f46e5]   border-t-transparent rounded-full animate-spin" />
          Loading...
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6 p-6">
        <div>
          <h1 className="font-bold text-3xl mb-1">Export Data</h1>
          <p className="text-sm  font-semibold text-gray-500">
            Download your Data as CSV file
          </p>
        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6 border border-gray-100">
          <h2 className="text-lg font-bold mb-1">Select Date Range</h2>
          <p className="text-gray-500 text-sm mb-4 ">
            Choose the period you want to Export
          </p>

          <div className="flex flex-wrap gap-4">
            {ranges.map((range) => (
              <button
                type="button"
                key={range}
                onClick={() => setSelectedRange(range)}
                className={`px-5 py-2.5 text-sm font-semibold transition-all duration-300 rounded-xl cursor-pointer ${selectedRange === range ? "text-white bg-[#4e46e5]" : "text-gray-600 bg-gray-100 hover:bg-gray-200"}`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="font-bold text-lg">Preview</h2>
              <p className="text-sm text-gray-500">
                Showing {filtered.length} records for {selectedRange}
              </p>
            </div>

            <div className="flex gap-4">
              <div className="text-right">
                <p className="text-xs text-gray-400">Total Income</p>
                <p className="text-sm font-bold text-green-600">
                  +${summary.income.toLocaleString()}
                </p>
              </div>

              <div className="text-right">
                <p className="text-xs text-gray-400 ">Total Expenses</p>
                <p className="text-sm font-bold text-red-600">
                  -${summary.expenses.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
          {filtered.length === 0 ? (
            <div className="py-12 flex items-center justify-center ">
              <p className="text-gray-400 text-sm ">
                No Transaction found for {selectedRange}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm ">
                <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
                  <tr>
                    <th className="px-4 py-3 text-left">Date</th>
                    <th className="px-4 py-3 text-left">Description</th>
                    <th className="px-4 py-3 text-left">Category</th>
                    <th className="px-4 py-3 text-left">Type</th>
                    <th className="px-4 py-3 text-left">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filtered.slice(0, 10).map((t) => (
                    <tr
                      className="hover:bg-black/5 cursor-pointer transition-all duration-200"
                      key={t._id}
                    >
                      <td className="px-4 py-3 text-gray-600 ">{t.date}</td>
                      <td className="px-4 py-3 text-gray-800 font-medium capitalize">
                        {t.description}
                      </td>
                      <td className="px-4 py-3 text-gray-500">{t.category}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${t.type === "Income" ? "text-green-700 bg-green-100" : "text-red-600 bg-red-100"}`}
                        >
                          {t.type}
                        </span>
                      </td>
                      <td
                        className={`px-2 py-1 text-right font-semibold  ${t.type === "Income" ? "text-green-700" : "text-red-600"} `}
                      >
                        {t.type === "Income" ? "+" : "-"}$
                        {t.amount.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filtered.length > 10 && (
                <div className="flex items-center gap-3 mt-3">
                  <p className="bg-gray-800 text-xs rounded-lg py-1.5 px-3 text-white ">
                    {filtered.length} records total
                  </p>

                  <p className="text-xs text-gray-400 ">
                    Showing first 10 - all {filtered.length} will be in Download
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold mb-1">Download</h2>
          <p className="text-sm text-gray-500 mb-5">
            Your file will be named
            <span className="font-mono cursor-pointer bg-gray-100 px-1.5 py-0.5 rounded text-gray-700">
              sloth-transactions.csv
            </span>
          </p>

          <button
            onClick={handleDownload}
            disabled={filtered.length === 0}
            className={`flex items-center gap-3 px-5 py-2  rounded-xl transition-all duration-300 font-semibold active:ring-0 text-sm ${filtered.length === 0 ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "text-white bg-[#4f46e5] hover:opacity-90 cursor-pointer"}`}
          >
            <Download className="w-5 h-5 " />
            Download CSV - {filtered.length} Records
          </button>
        </div>
      </div>
    </>
  );
}
