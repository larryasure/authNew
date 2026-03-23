import { useMemo } from "react";

export function useNotifications(budgets = [], transactions = []) {
  const notifications = useMemo(() => {
    const result = [];

    budgets.forEach((budget) => {
      const spent = transactions
        .filter((t) => t.type === "Expense" && t.category === budget.category)
        .reduce((acc, t) => acc + t.amount, 0);

      const percentage = budget.amount > 0 ? (spent / budget.amount) * 100 : 0;

      if (percentage >= 100) {
        result.push({
          id: `budget-exceeded-${budget._id}`,
          type: "danger",
          title: "Budget Exceeded",
          description: `You have gone over your ${budget.category} budget by $${(spent - budget.amount).toFixed(2)}`,
          time: "Now",
          read: false,
        });
      } else if (percentage >= 90) {
        result.push({
          id: `budget-90-${budget._id}`,
          type: "danger",
          title: "Budget almost gone",
          description: `You have used ${Math.round(percentage)}% of your ${budget.category} budget`,
          time: "Now",
          read: false,
        });
      } else if (percentage >= 75) {
        result.push({
          id: `budget-warning-${budget._id}`,
          type: "warning",
          title: "Budget Warning",
          description: `You have used ${Math.round(percentage)}% of your ${budget.category} budget`,
          time: "Now",
          read: false,
        });
      }
    });

    const recentTransactions = [...transactions]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 4);

    recentTransactions.forEach((t) => {
      result.push({
        id: `transaction-${t._id}`,
        type: t.type === "Income" ? "success" : "info",
        title: t.type === "Income" ? "Income received" : "Expense logged",
        description: `${t.description} - $${t.amount}`,
        time: new Date(t.date).toLocaleString("en-US", {
          month: "short",
          day: "numeric",
        }),
        read: true,
      });
    });
    return result;
  }, [budgets, transactions]);

  const unreadCount = notifications.filter((n) => !n.read).length;
  return { notifications, unreadCount };
}
