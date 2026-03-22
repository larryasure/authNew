import React, { useContext, useEffect, useState } from "react";
import { Outlet, ScrollRestoration, useNavigate } from "react-router-dom";
import Sidebar from "../../Components/Sidebar";
import DashNavbar from "../../Components/DashNavbar";
import { AuthContext } from "../../Context/AuthContext";

export default function Layout() {
  const [transactions, setTransactions] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrasaction = async () => {
      try {
        const token = localStorage.getItem("token");
        const apiUrl = import.meta.env.VITE_API_URL;

        const [transRes, budgetRes] = await Promise.all([
          fetch(`${apiUrl}/api/transactions`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${apiUrl}/api/budgets`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        const transData = await transRes.json();
        const budgetData = await budgetRes.json();

        if (transRes.ok) setTransactions(transData.transactions);
        if (budgetRes.ok) setBudgets(budgetData.budgets || []);
      } catch (error) {
        console.error("Failed to fetch for Transaction!", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTrasaction();
  }, []);

  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex flex-1 flex-col overflow-hidden h-screen">
        <DashNavbar budgets={budgets} transactions={transactions} />
        {!user?.emailVerified && (
          <div className="flex items-center justify-between bg-yellow-50 border-b border-yellow-200 px-6 py-2.5  ">
            <p className="text-yellow-700 text-sm font-semibold ">
              Hey {user?.name?.split(" ")[0]}, Email not Verified. Check your
              box or resend link the link.
            </p>
            <button
              onClick={() => navigate("/dashboard/settings")}
              className="text-yellow-700 text-xs font-semibold underline cursor-pointer active:text-bold"
            >
              Go back to Profile
            </button>
          </div>
        )}
        <main className="flex-1 overflow-y-auto ">
          <div className="p-5">
            <ScrollRestoration />
            <Outlet context={{ transactions, setTransactions,budgets, setBudgets ,loading }} />
          </div>
        </main>
      </div>
    </div>
  );
}
