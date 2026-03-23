import { useMemo } from "react";

export function useNotifications(budgets = [], transactions = []) {
  const notifications = useMemo(() => {
    const result = [];

    const getTimeAgo = (date) => {
      const now = new Date();
      const diff = Math.floor((now - new Date(date)) / 1000);

      if (diff < 60) return "Just now";

      const minutes = Math.floor(diff / 60);
      if (minutes < 60) return `${minutes}m ago`;

      const hours = Math.floor(minutes / 60);
      if (hours < 24) return `${hours}h ago`;

      const days = Math.floor(hours / 24);
      return `${days}d ago`;
    }

    const THRESHOLDS = {
      warning: 75,
      danger: 90,
      exceeded: 100,
    };

    budgets.forEach((budget) => {
      const relatedExpenses = transactions
        .filter((t) => t.type === "Expense" && t.category === budget.category)
        .sort((a, b) => new Date(b.date) - new Date(a.date));

      const spent = relatedExpenses.reduce((acc, t) => acc + t.amount, 0);

      const percentage = budget.amount > 0 ? spent / budget.amount / 100 : 0;
      const lastExpense = relatedExpenses[0];

      const time = lastExpense ? getTimeAgo(lastExpense.date) : "Just now";

      if (percentage >= THRESHOLDS.exceeded) {
        result.push({
          id: `budget-exceeded-${budget._id}`,
          type: "danger",
          title: "Budget Exceeded",
          description: `You have gone over your ${budget.category} budget by ${(spent - budget.amount).toFixed(2)} `,
          time,
          read: false,
        });
      } else if (percentage >= THRESHOLDS.danger) {
        result.push({
          id: `budget-danger-${budget._id}`,
          type: "danger",
          title: "Budget almost gone",
          description: `You have used ${percentage}% of your ${budget.category} budget`,
          time,
          read: false,
        });
      } else if (percentage >= THRESHOLDS.warning) {
        result.push({
          id: `budget-warning-${budget._id}`,
          type: "warning",
          title: "Budget warning",
          description: `You have used ${Math.round(percentage)}% of your ${budget.category} budget`,
          time,
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
        time: getTimeAgo(t.date),
        read: false,
      });
    });

    return result;
  }, [budgets, transactions]);

  const unreadCount = notifications.filter((n) => !n.read).length;
  return { notifications, unreadCount };
}
