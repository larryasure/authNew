import {
  Download,
  KeyRound,
  Lock,
  Mail,
  Plus,
  Shield,
  Target,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Feature() {
  return (
    <>
      <div className="min-h-screen px-8 ">
        <div className="mx-auto max-w-4xl flex flex-col gap-1">
          <div className="max-w-4xl mx-auto text-center pt-6 ">
            <span className="rounded-xl text-sm font-medium px-4 py-1 bg-[#dbdaff] text-[var(--brand)] my-6">
              Features
            </span>
            <h1 className="mt-4 text-4xl sm:text-5xl font-medium ">
              Everything Sloth
            </h1>
            <h1 className="text-4xl sm:text-5xl font-medium text-[var(--brand)]">
              Can do for you
            </h1>

            <div className="max-w-lg  mx-auto text-center mt-6">
              <p className="text-lg text-gray-800 ">
                Six core features, all working together. No fluff, no
                unnecessary complexity — just what you actually need to stay on
                top of your money.
              </p>
            </div>
          </div>
        </div>

        <div className="grid mt-5 grid-cols-1 sm:grid-cols-2 bg-white rounded-xl p-9 my-10 max-w-3xl mx-auto gap-6 ">
          <div className="flex flex-col items-start">
            <span className="rounded-full text-xs font-medium px-3 py-1 bg-[#dbdaff] text-[var(--brand)]">
              01 — Transactions
            </span>

            <h2 className="text-3xl font-semibold text-gray-800 mt-4 leading-snug">
              Log every income and expense
            </h2>

            <p className="mt-4 text-gray-600 leading-relaxed my-2">
              Add any transaction in seconds. Give it a description, pick a
              category, set the amount and date, and choose whether it's income
              or an expense.
            </p>

            <p className="mt-3 text-gray-600 leading-relaxed">
              Your full transaction history lives in one place — searchable,
              filterable, and always up to date.
            </p>
          </div>

          <div className="bg-[#f1f1f1] rounded-2xl p-4 border border-gray-200 ">
            <div className="text-center  flex items-center gap-4 justify-center  ">
              <div className="px-4 py-2 rounded-lg bg-green-100  flex items-center gap-3">
                <TrendingUp className="w-5 h-5  text-green-500 " />
                <button className="text-green-600 font-semibold">Income</button>
              </div>

              <div className="text-center  flex items-center gap-4 justify-center my-3">
                <div className="px-4 py-2 rounded-lg bg-red-100  flex items-center gap-3">
                  <TrendingDown className="w-5 h-5  text-red-500 " />
                  <button className="text-red-600 font-semibold">
                    Expense
                  </button>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="rounded-lg p-4 px-3 bg-white  flex items-center justify-between">
                <p className="text-sm font-semibold  text-gray-800 ">Salary</p>
                <p className="text-green-600 text-xs font-semibold">
                  +$5,000.00
                </p>
              </div>

              <div className="rounded-lg p-4 px-3 bg-white  flex items-center justify-between">
                <p className="text-sm font-semibold  text-gray-800 ">Rent</p>
                <p className="text-red-600 text-xs font-semibold">-$800.00</p>
              </div>

              <div className="rounded-lg p-4 px-3 bg-white  flex items-center justify-between">
                <p className="text-sm font-semibold  text-gray-800 ">
                  Groceries
                </p>
                <p className="text-red-600 text-xs font-semibold">-$120.00</p>
              </div>

              <div className="rounded-lg p-4 px-3 bg-white  flex items-center justify-between">
                <p className="text-sm font-semibold  text-gray-800 ">
                  Freelance
                </p>
                <p className="text-green-600 text-xs font-semibold">+$750.00</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid mt-5 grid-cols-1 sm:grid-cols-2 bg-white rounded-xl p-9 my-10 max-w-4xl mx-auto gap-9 ">
          <div className="rounded-lg p-4 px-3 bg-[#f1f1f1] ">
            <p className="text-sm font-semibold text-gray-800  mb-3 ">
              Budget Tracker
            </p>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-3 justify-between">
                  <p className="text-sm font-medium text-gray-700">Food</p>

                  <p className="text-sm font-medium text-gray-500">
                    $180 of $300
                  </p>
                </div>
                <div className="flex items rounded-xl bg-white ">
                  <p className="w-[60%] bg-green-600 h-2.5 rounded-xl"></p>
                </div>
                <p className="text-sm text-gray-500">60% used</p>
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-3 justify-between">
                  <p className="text-sm font-medium text-gray-700">Transport</p>

                  <p className="text-sm font-medium text-gray-500">
                    $130 of $200
                  </p>
                </div>
                <div className="flex items rounded-xl bg-white ">
                  <p className="w-[65%] bg-yellow-400 h-2.5 rounded-xl"></p>
                </div>
                <p className="text-sm text-gray-500">65% used</p>
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-3 justify-between">
                  <p className="text-sm font-medium text-gray-700">
                    Entertainment
                  </p>

                  <p className="text-sm font-medium text-gray-500">
                    $95 of $100
                  </p>
                </div>
                <div className="flex items rounded-xl bg-white ">
                  <p className="w-[95%] bg-red-500 h-2.5 rounded-xl"></p>
                </div>
                <p className="text-sm text-red-500 text-medium">
                  95% — nearly at limit
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start">
            <span className="rounded-full text-xs font-medium px-3 py-1 bg-[#dbdaff] text-[var(--brand)]">
              02 — Budget
            </span>

            <h2 className="text-3xl font-semibold text-gray-800 mt-4 leading-snug">
              Set limits. Stop overspending.
            </h2>

            <p className="mt-4 text-gray-600 leading-relaxed my-2">
              Assign a monthly spending limit to any category — Food, Rent,
              Transport, Entertainment, and more.
            </p>

            <p className="mt-3 text-gray-600 leading-relaxed">
              A progress bar shows how much of your budget is used. Green means
              you're fine. Yellow means slow down. Red means you've nearly hit
              the limit.
            </p>
          </div>
        </div>

        <div className="grid mt-5 grid-cols-1 sm:grid-cols-2 bg-white rounded-xl p-9 my-10 max-w-4xl mx-auto gap-9 ">
          <div className="flex flex-col items-start">
            <span className="rounded-full text-xs font-medium px-3 py-1 bg-[#dbdaff] text-[var(--brand)]">
              03 — Reports
            </span>

            <h2 className="text-3xl font-semibold text-gray-800 mt-4 leading-snug">
              See where your money actually goes
            </h2>

            <p className="mt-4 text-gray-600 leading-relaxed my-2">
              The Reports page breaks down your spending with charts — a line
              chart for monthly income vs expense trends, a bar chart for
              category spending, and top spending categories with percentage
              bars.
            </p>

            <p className="mt-3 text-gray-600 leading-relaxed">
              Filter by month, category, or custom date range to zoom in on any
              period you want to analyze.
            </p>
          </div>

          <div className="rounded-lg p-4 px-3 bg-[#f1f1f1] ">
            <p className="text-sm font-semibold text-gray-800  mb-3 ">
              Top spending categories
            </p>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-3 justify-between">
                  <p className="text-sm font-medium text-gray-700">Rent</p>

                  <p className="text-sm font-medium text-gray-500">42%</p>
                </div>
                <div className="flex items rounded-xl bg-white ">
                  <p className="w-[42%] bg-[var(--brand)] h-2.5 rounded-xl"></p>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-3 justify-between">
                  <p className="text-sm font-medium text-gray-700">Food</p>

                  <p className="text-sm font-medium text-gray-500">24%</p>
                </div>
                <div className="flex items rounded-xl bg-white ">
                  <p className="w-[24%] bg-[var(--brand)] h-2.5 rounded-xl"></p>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-3 justify-between">
                  <p className="text-sm font-medium text-gray-700">Transport</p>

                  <p className="text-sm font-medium text-gray-500">18%</p>
                </div>
                <div className="flex items rounded-xl bg-white ">
                  <p className="w-[18%] bg-[var(--brand)] h-2.5 rounded-xl"></p>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-3 justify-between">
                  <p className="text-sm font-medium text-gray-700">Shopping</p>

                  <p className="text-sm font-medium text-gray-500">12%</p>
                </div>
                <div className="flex items rounded-xl bg-white ">
                  <p className="w-[12%] bg-[var(--brand)] h-2.5 rounded-xl"></p>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-3 justify-between">
                  <p className="text-sm font-medium text-gray-700">Other</p>

                  <p className="text-sm font-medium text-gray-500">6%</p>
                </div>
                <div className="flex items rounded-xl bg-white ">
                  <p className="w-[6%] bg-[var(--brand)] h-2.5 rounded-xl"></p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid mt-5 grid-cols-1 sm:grid-cols-2 rounded-xl p-9 my-10 max-w-4xl mx-auto gap-15 ">
          <div className="rounded-lg px-4  bg-[#f1f1f1] py-8 ">
            <p className="text-sm font-semibold text-gray-800  mb-3">
              Select date range
            </p>
            <div className="flex items  flex-wrap gap-4">
              <div className="rounded-2xl border border-gray-300 text-white font-semibold px-4 py-2 text-sm bg-[var(--brand)] ">
                This Month
              </div>

              <div className="rounded-2xl border border-gray-300 text-white font-semibold px-4 py-2 text-sm bg-[var(--brand)] ">
                Last 3 Months
              </div>

              <div className="rounded-2xl border border-gray-300 text-white font-semibold px-4 py-2 text-sm bg-[var(--brand)] ">
                This Year
              </div>
            </div>

            <table className="rounded-xl border-collapse border border-gray-300   mt-4 px-4">
              <thead className="bg-gray-200">
                <tr>
                  <th className="text-left text-sm font-medium text-gray-500 px-4 py-3">
                    Date
                  </th>
                  <th className="text-left text-sm font-medium text-gray-500 px-4 py-3">
                    Description
                  </th>
                  <th className="text-left text-sm font-medium text-gray-500 px-4 py-3">
                    Category
                  </th>
                  <th className="text-left text-sm font-medium text-gray-500 px-4 py-3">
                    Amount
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                <tr className="hover:bg-white transition">
                  <td className="px-4 py-3 text-sm text-gray-600">Apr 1</td>
                  <td className="px-4 py-3 text-sm text-gray-800 font-medium">
                    Salary
                  </td>
                  <td className="px-4 py-3 text-sm text-green-600">Income</td>
                  <td className="px-4 py-3 text-sm font-semibold text-green-600">
                    +$5,000
                  </td>
                </tr>

                <tr className="hover:bg-white transition">
                  <td className="px-4 py-3 text-sm text-gray-600">Apr 3</td>
                  <td className="px-4 py-3 text-sm text-gray-800 font-medium">
                    Rent
                  </td>
                  <td className="px-4 py-3 text-sm text-red-600">Expense</td>
                  <td className="px-4 py-3 text-sm font-semibold text-red-600">
                    -$800
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="flex gap-3 items-center bg-[#c9c8fe] p-1.5 my-4 rounded-lg font-semibold">
              <Download className="w-5 h-5 text-[var(--brand)]" />
              <p className="text-[var(--brand)]">
                Download CSV reports — 24 records
              </p>
            </div>
          </div>

          <div className="flex flex-col items-start">
            <span className="rounded-full text-xs font-medium px-3 py-1 bg-[#dbdaff] text-[var(--brand)]">
              04 — Export
            </span>

            <h2 className="text-3xl font-semibold text-gray-800 mt-4 leading-snug">
              Download your data anytime
            </h2>

            <p className="mt-4 text-gray-600 leading-relaxed my-2">
              Export all your transactions as a CSV file — filtered by This
              Month, Last 3 Months, or This Year. Open it in Excel, Google
              Sheets, or any spreadsheet tool.
            </p>

            <p className="mt-3 text-gray-600 leading-relaxed">
              Your data is yours. Download it whenever you want, no
              restrictions.
            </p>
          </div>
        </div>

        <div className="grid mt-5 grid-cols-1 sm:grid-cols-2 rounded-xl p-9 bg-white my-10 max-w-4xl mx-auto gap-15">
          <div className="flex flex-col items-start">
            <span className="rounded-full text-xs font-medium px-3 py-1 bg-[#dbdaff] text-[var(--brand)]">
              05 — Dashboard
            </span>

            <h2 className="text-3xl font-semibold text-gray-800 mt-4 leading-snug">
              Your full financial picture at a glance
            </h2>

            <p className="mt-4 text-gray-600 leading-relaxed my-2">
              The dashboard shows your total balance, total income, and total
              expenses at the top — then charts for income vs expense, monthly
              trends, spending by category, and budget vs actual.
            </p>

            <p className="mt-3 text-gray-600 leading-relaxed">
              Your 5 most recent transactions are always visible, and quick
              action buttons let you jump straight to adding a transaction,
              viewing reports, setting a budget, or exporting data.
            </p>
          </div>

          <div className="rounded-lg  py-6 px-3 bg-[#f1f1f1] ">
            <p className="text-sm font-semibold text-gray-700  my-3">
              Select date range
            </p>
            <div className="flex items  flex-wrap gap-4">
              <div className="rounded-xl border flex flex-col border-gray-300 text-white font-semibold px-6 py-2  bg-indigo-100 text-center shadow-xs">
                <p className="text-[var(--brand)] font-semibold  text-sm">
                  Balance
                </p>
                <p className="text-[var(--brand)] font-semibold text-lg  ">
                  $3,240
                </p>
              </div>

              <div className="rounded-xl border border-gray-300 text-white font-semibold px-4 py-2 text-sm bg-[var(--brand)] bg-green-100 text-center shadow-xs">
                <p className="text-green-600 font-semibold  text-sm">Income</p>
                <p className="text-green-600 font-semibold text-lg ">$5,750</p>
              </div>

              <div className="rounded-xl border border-gray-300 text-white font-semibold px-4 py-2 text-sm bg-[var(--brand)] bg-red-100 shadow-xs ">
                <p className="text-red-500 font-semibold  text-sm">Expenses</p>
                <p className="text-red-500 font-semibold text-lg">$2,510</p>
              </div>
            </div>

            <div className="my-6 flex flex-col gap-2">
              <p className="text-sm text-gray-700 font-medium ">
                Quick actions
              </p>

              <div className="flex items-center justify-center gap-3 flex-wrap">
                <div className="rounded-lg border flex items-center gap-2 border-gray-300 text-white font-semibold px-3 py-3  bg-[var(--brand)] text-center shadow-xs">
                  <Plus className="w-4 h-4 text-white " />
                  <p>Add Transaction</p>
                </div>

                <div className="rounded-lg border flex items-center gap-2 border-gray-300 text-[var(--brand)] font-semibold px-3 py-3  bg-gray-50 text-center shadow-xs">
                  <KeyRound className="w-4 h-4  " />
                  <p>View Reports</p>
                </div>

                <div className="rounded-lg border flex items-center gap-2 border-gray-300 text-[var(--brand)] font-semibold px-3 py-2  bg-gray-50 text-center shadow-xs">
                  <Target className="w-4 h-4  " />
                  <p>Set Budget</p>
                </div>

                <div className="rounded-lg border flex items-center gap-2 border-gray-300 text-[var(--brand)] font-semibold px-3 py-2  bg-gray-50 text-center shadow-xs">
                  <Download className="w-4 h-4  " />
                  <p>Export Data</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid mt-5 grid-cols-1 sm:grid-cols-2 bg-white rounded-xl p-9 my-10 max-w-3xl mx-auto gap-6 ">
          <div className=" flex flex-col items-start gap-4 ">
            <p>Security Features</p>

            <div className="flex items-center gap-3 bg-[#f1f1f1] rounded-xl  p-4">
              <div className="bg-indigo-100 p-2.5 rounded-xl ">
                <Lock className="w-4 h-4 text-[var(--brand)]" />
              </div>
              <div className=" flex items-start flex-col text-sm">
                <p className="font-semibold ">bcrypt password hashing</p>
                <p>Passwords are never stored in plain text</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-[#f1f1f1] rounded-xl  p-4">
              <div className="bg-indigo-100 p-2.5 rounded-xl ">
                <Shield className="w-4 h-4 text-[var(--brand)]" />
              </div>
              <div className=" flex items-start flex-col text-sm">
                <p className="font-semibold ">JWT protected routes</p>
                <p>Every API call verifies your session token</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-[#f1f1f1] rounded-xl  p-4">
              <div className="bg-indigo-100 p-2.5 rounded-xl ">
                <Mail className="w-4 h-4 text-[var(--brand)]" />
              </div>
              <div className=" flex items-start flex-col text-sm">
                <p className="font-semibold ">Email verification</p>
                <p>Verify your email before accessing the app</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-[#f1f1f1] rounded-xl  p-4">
              <div className="bg-indigo-100 p-2.5 rounded-xl ">
                <Mail className="w-4 h-4 text-[var(--brand)]" />
              </div>
              <div className=" flex items-start flex-col text-sm">
                <p className="font-semibold ">Password reset via email</p>
                <p>Secure 15-minute reset link sent to your inbox</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start">
            <span className="rounded-full text-xs font-medium px-3 py-1 bg-[#dbdaff] text-[var(--brand)]">
              06 — Security
            </span>

            <h2 className="text-4xl font-semibold text-gray-800 mt-4 leading-snug">
              Your data <br /> is protected
            </h2>

            <p className="mt-4 text-gray-600 leading-relaxed my-2">
              Every password is hashed with bcrypt before it ever touches the
              database. All API routes are protected with JWT tokens —
              unauthenticated requests are rejected immediately.
            </p>

            <p className="mt-3 text-gray-600 leading-relaxed">
              Email verification, password reset via email, and the ability to
              change your password or delete your account entirely — all built
              in.
            </p>
          </div>
        </div>

        <div className="max-w-2xl mx-auto text-center bg-white rounded-xl  p-5  my-10 ">
          <div className="flex items-center justify-center flex-col   ">
            <h1 className=" text-3xl text-gray-800 font-semibold">
              Ready to try all of this?
            </h1>
          </div>
          <div className="max-w-xs mx-auto mt-3">
            <p className="text-gray-600  font-medium ">
              Free to start. No bank linking. No credit card. Just sign up and
              go.
            </p>
          </div>

          <div className="flex items-center justify-center gap-4 my-6">
            <NavLink to={"/signup"}>
              <button className="px-6 py-2.5 rounded-xl bg-[var(--brand)] active:scale-105 duration-300 transition-all text-white font-semibold shadow-sm hover:opacity-90 ">
                Get Started free
              </button>
            </NavLink>

            <NavLink to={"/pricing"}>
              <button className="px-6 py-2.5 rounded-xl border border-gray-300 text-gray-700 active:scale-105 duration-300 transition-all font-semibold hover:bg-gray-100 ">
                See Pricing
              </button>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}
