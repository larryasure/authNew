import {
  AlignHorizontalDistributeCenter,
  ArrowLeftRight,
  ArrowUp,
  BriefcaseBusiness,
  Check,
  ChevronUp,
  Download,
  Hamburger,
  House,
  ShieldCheck,
  TrendingUp,
  UserCircle,
  X,
} from "lucide-react";
import React, { useState } from "react";

const faqs = [
  {
    id: 1,
    question: "Is my financial data safe?",
    answer:
      " Yes. Passwords are hashed with bcrypt and all API routes are protected using JWT tokens. Your data is only accessible to you",
  },

  {
    id: 2,
    question: "Can I use Sloth on mobile?",
    answer:
      "Yes, Sloth is fully responsive and works on phones and tablets just as well as on desktop. ",
  },

  {
    id: 3,
    question: "What categories can I track?",
    answer:
      " Food, Rent, Transport, Salary, Shopping, Health, Entertainment, Gadgets, Uber and more. You can always select 'Other' for anything custom.",
  },

  {
    id: 4,
    question: "Can I export my data?",
    answer:
      "Yes! You can export transactions as a CSV file filtered by This Month, Last 3 Months, or This Year. ",
  },
];

export default function Home() {
  const [openId, setOpenId] = useState(null);

  const faqToggle = (id) => {
    if (openId === id) {
      setOpenId(null);
    } else {
      setOpenId(id);
    }
  };

  return (
    <>
      <div className="px-8 min-h-screen my-15 ">
        <div className="mt-10 text-center">
          <span className="bg-[#efeefd] text-[var(--brand)] text-sm rounded-2xl px-4 py-1.5 font-semibold text-center ">
            Personal Finance Made Simple
          </span>
        </div>

        <div className="text-center mt-10  max-w-lg mx-auto ">
          <h1 className="text-4xl font-bold sm:text-6xl my-3 ">
            Track Spending.
          </h1>
          <h1 className="text-4xl font-bold sm:text-6xl text-[var(--brand)] ">
            Stay In Control.
          </h1>
          <p className="text-lg font-medium text-gray-700 my-3">
            Sloth helps you log transactions, set budgets, and understand your
            money — all in one place. Simple, fast, and free.
          </p>

          <div className="mt-5 flex gap-4 items-center justify-center ">
            <button className="border border-gray-600 bg-[var(--brand)] text-white hover:text-black px-6 py-3 rounded-lg hover:bg-gray-100 cursor-pointer transition-all duration-200  font-medium    ">
              Get Started Free
            </button>
            <button className="border border-gray-400  text-gray-700 px-5 py-3 rounded-lg  hover:bg-gray-100 cursor-pointer transition-all duration-200 font-medium    ">
              See how it Works
            </button>
          </div>
        </div>

        <div className="max-w-4xl mx-auto bg-white  border border-gray-200 shadow-sm rounded-xl space-y-5 my-10 p-8 ">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4  ">
            <div className="grid-cols-1 border border-gray-300 bg-white rounded-xl p-4">
              <p className="text-gray-500 mb-1">Total Balance</p>
              <h1 className="text-2xl font-semibold  text-[var(--brand)] ">
                $3,240.00
              </h1>
            </div>
            <div className="grid-cols-1 border border-gray-300 bg-white rounded-xl p-4">
              <p className="text-gray-500 mb-1">Income</p>
              <h1 className="text-2xl font-semibold  text-green-600 ">
                $5,000.00
              </h1>
            </div>
            <div className="grid-cols-1 border border-gray-300 bg-white rounded-xl p-4">
              <p className="text-gray-500 mb-1">Expenses</p>
              <h1 className="text-2xl font-semibold  text-red-600  animate-pulse">
                $1,760.00
              </h1>
            </div>
          </div>

          <div className="border-t border-gray-300 my-10  ">
            <p className="text-center font-semibold  text-gray-800 mt-5">
              Recent Transactions
            </p>

            <div className="flex flex-col gap-4 my-4">
              <div className="flex items-center justify-between bg-gray-200 p-4  rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 hover:bg-green-50 rounded-lg px-3 py-3 ">
                    <BriefcaseBusiness className="w-5 h-5 text-green-500" />
                  </div>

                  <div className="flex flex-col items-start">
                    <p className="font-medium text-gray-700 ">Salary</p>
                    <p className="text-sm text-gray-500">Salary. Mar 1</p>
                  </div>
                </div>

                <p className="text-green-500 font-medium">+$5,000.00</p>
              </div>

              <div className="flex items-center justify-between bg-gray-200 p-4  rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="bg-red-100 hover:bg-red-50 rounded-lg px-3 py-3 ">
                    <Hamburger className="w-5 h-5 text-red-500" />
                  </div>

                  <div className="flex flex-col items-start ">
                    <p className="font-medium text-gray-700 ">Lunch at Work</p>
                    <p className="text-sm text-gray-500">Lunch. Mar 3</p>
                  </div>
                </div>

                <p className="text-red-500 font-medium">-$45.00</p>
              </div>

              <div className="flex items-center justify-between bg-gray-200 p-4  rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="bg-red-100 hover:bg-red-50 rounded-lg px-3 py-3 ">
                    <House className="w-5 h-5 text-red-500" />
                  </div>

                  <div className="flex flex-col items-start">
                    <p className="font-medium text-gray-700 ">Monthly Rent</p>
                    <p className="text-sm text-gray-500">Rent. Mar 5</p>
                  </div>
                </div>

                <p className="text-red-500 font-medium">-$800.00</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/70 rounded-xl p-5 max-w-5xl mx-auto gap-9 sm:flex sm:flex-row flex-col items-center justify-center">
          <div className="flex flex-col gap-1 items-center">
            <h1 className="text-[var(--brand)] text-4xl font-bold">5k +</h1>
            <p className="text-gray-600 font-semibold text-base ">
              Active Users
            </p>
          </div>

          <div className="flex flex-col gap-1 items-center text-center">
            <h1 className="text-[var(--brand)] text-4xl font-bold">$2M + </h1>
            <p className="text-gray-600 font-semibold text-base ">
              Tracked Monthly{" "}
            </p>
          </div>

          <div className="flex flex-col gap-1 items-center">
            <h1 className="text-[var(--brand)] text-4xl font-bold">10 +</h1>
            <p className="text-gray-600 font-semibold text-base ">Categories</p>
          </div>

          <div className="flex flex-col gap-1 items-center text-center">
            <h1 className="text-[var(--brand)] text-4xl font-bold">99%</h1>
            <p className="text-gray-600 font-semibold text-base ">Uptime</p>
          </div>
        </div>

        <div className="sm:max-w-3xl mx-auto my-15 max-w-xl ">
          <div className="text-center ">
            <h3 className="text-[var(--brand)]   font-semibold tracking-widest text-lg">
              FEATURES
            </h3>
            <h1 className="text-gray-800 font-semibold text-xl sm:text-3xl ">
              Everything you need to manage money!
            </h1>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 px-3 my-10">
            <div className="grid-cols-1 hover:shadow-md shadow-sm  bg-white py-6 px-4 space-y-3 items-start flex flex-col rounded-xl ">
              <div className="px-5 py-3.5 bg-[#f1def9] rounded-lg ">
                <ArrowLeftRight className="w-6 h-6 text-[var(--brand)]" />
              </div>
              <p className="font-semibold text-lg text-gray-800 ">
                Transaction Log
              </p>
              <p className="text-gray-600 leading-relaxed ">
                Add income and expenses in seconds. Categorize and filter them
                easily.
              </p>
            </div>

            <div className="grid-cols-1 hover:shadow-md shadow-sm cursor-pointer bg-white py-6 px-4 space-y-3 items-start flex flex-col rounded-xl ">
              <div className="px-5 py-3.5 bg-[#f1def9] rounded-lg ">
                <AlignHorizontalDistributeCenter className="w-6 h-6 text-[var(--brand)]" />
              </div>
              <p className="font-semibold text-lg text-gray-800 ">
                Budget Limit{" "}
              </p>
              <p className="text-gray-600 leading-relaxed ">
                Set monthly spending limits per category and track how close you
                are.
              </p>
            </div>

            <div className="grid-cols-1 hover:shadow-md shadow-sm cursor-pointer bg-white py-6 px-4 space-y-3 items-start flex flex-col rounded-xl ">
              <div className="px-5 py-3.5 bg-[#f1def9] rounded-lg ">
                <TrendingUp className="w-6 h-6 text-[var(--brand)]" />
              </div>
              <p className="font-semibold text-lg text-gray-800 ">
                Visual Reports{" "}
              </p>
              <p className="text-gray-600 leading-relaxed ">
                Charts and breakdowns showing monthly trends and spending by
                category.
              </p>
            </div>

            <div className="grid-cols-1 hover:shadow-md shadow-sm cursor-pointer bg-white py-6 px-4 space-y-3 items-start flex flex-col rounded-xl ">
              <div className="px-5 py-3.5 bg-[#f1def9] rounded-lg ">
                <UserCircle className="w-6 h-6 text-[var(--brand)]" />
              </div>
              <p className="font-semibold text-lg text-gray-800 ">
                User Profile{" "}
              </p>
              <p className="text-gray-600 leading-relaxed ">
                Customize your profile, upload an avatar, and update your
                account details.
              </p>
            </div>

            <div className="grid-cols-1 hover:shadow-md shadow-sm cursor-pointer bg-white py-6 px-4 space-y-3 items-start flex flex-col rounded-xl ">
              <div className="px-5 py-3.5 bg-[#f1def9] rounded-lg ">
                <Download className="w-6 h-6 text-[var(--brand)]" />
              </div>
              <p className="font-semibold text-lg text-gray-800 ">CSV Export</p>
              <p className="text-gray-600 leading-relaxed ">
                Download your transactions as a CSV file filtered by date range.
              </p>
            </div>

            <div className="grid-cols-1 hover:shadow-md shadow-sm  bg-white py-6 px-4 space-y-3 items-start flex flex-col rounded-xl ">
              <div className="px-5 py-3.5 bg-[#f1def9] rounded-lg ">
                <ShieldCheck className="w-6 h-6 text-[var(--brand)]" />
              </div>
              <p className="font-semibold text-lg text-gray-800 ">
                Secure Auth
              </p>
              <p className="text-gray-600 leading-relaxed ">
                Email verification, password reset, and JWT-based session
                protection.
              </p>
            </div>
          </div>
        </div>

        <div className="my-15 max-w-6xl mx-auto ">
          <div className="text-center">
            <p className="text-[var(--brand)]   font-semibold tracking-widest   text-lg">
              HOW IT WORKS
            </p>
            <h2 className="text-gray-800 font-semibold text-3xl">
              Up and Running In 3 Steps
            </h2>
          </div>

          <div className="p-7 bg-white rounded-xl divide-y mt-10 divide-gray-100">
            <div className="flex items-center gap-5 ">
              <div className="flex items-center justify-center bg-[var(--brand)] h-8 w-8  rounded-full ">
                <p className=" text-white font-bold ">1</p>
              </div>

              <div className="flex flex-col ">
                <h3 className="text-gray-800 text-lg font-semibold">
                  Create Your Account
                </h3>
                <p className="text-gray-600 ">
                  Sign up in seconds. No credit card required. Verify your email
                  and you're in.
                </p>
              </div>
            </div>
          </div>

          <div className="p-7 bg-white rounded-xl my-10 ">
            <div className="flex items-center gap-5 ">
              <div className="flex items-center justify-center bg-[var(--brand)] h-8 w-8  rounded-full ">
                <p className=" text-white font-bold ">2</p>
              </div>

              <div className="flex flex-col ">
                <h3 className="text-gray-800 text-lg font-semibold">
                  Log your Transactions
                </h3>
                <p className="text-gray-600 ">
                  Add income and expenses daily. Pick a category, set an amount,
                  pick a date — done.
                </p>
              </div>
            </div>
          </div>

          <div className="p-7 bg-white rounded-xl my-10 ">
            <div className="flex items-center gap-5 ">
              <div className="flex items-center justify-center bg-[var(--brand)] h-8 w-8  rounded-full ">
                <p className=" text-white font-bold ">3</p>
              </div>

              <div className="flex flex-col ">
                <h3 className="text-gray-800 text-lg font-semibold">
                  Track and Improve
                </h3>
                <p className="text-gray-600 ">
                  View reports, set budgets, and export data. See exactly where
                  your money goes.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="my-15 bg-white max-w-7xl  py-10 mx-auto rounded-lg">
          <div className="text-center">
            <p className="text-[var(--brand)]   font-semibold tracking-widest   text-lg">
              PRICING
            </p>
            <h2 className="text-gray-800 font-semibold text-3xl">
              Simple, honest Pricing
            </h2>
          </div>

          <div className="my-10 max-w-xs  sm:max-w-3xl py-10 mx-auto ">
            <div className="grid sm:grid-cols-3 gap-9 px-8 grid-cols-1 ">
              <div className="grid-cols-1 bg-white px-4 py-5 space-y-2  rounded-xl border border-gray-300 shadow-md flex flex-col items-start ">
                <p className="text-lg  text-gray-700 ">Free</p>
                <h1 className="text-4xl font-bold">$0</h1>
                <p className=" text-gray-600">Forever free</p>

                <div className="mt-7 space-y-2">
                  <div className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-[var(--brand)]" />
                    <p>50 transactions/month</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-[var(--brand)]" />
                    <p>Basic Charts</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-[var(--brand)]" />
                    <p>3 Budget Categories</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <X className="w-4 h-4 text-red-500" />
                    <p>CSV export</p>
                  </div>
                </div>
              </div>

              <div className="grid-cols-1 bg-white px-4 py-5 space-y-2 rounded-2xl shadow-md flex flex-col items-start relative border-2 border-[var(--brand)]  hover:shadow-lg duration-200 transition-all">
                <p className="absolute -top-2.5 text-center py-0.5 left-1/2  -translate-x-1/2 bg-[var(--brand)] text-white px-3 rounded-2xl text-xs font-semibold z-10">
                  Most Popular
                </p>
                <p className="text-lg  text-gray-700 ">Pro</p>
                <h1 className="text-4xl font-bold">$5</h1>
                <p className=" text-gray-600">per Month</p>

                <div className="mt-7 space-y-2">
                  <div className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-[var(--brand)]" />
                    <p>Unlimited transactions</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-[var(--brand)]" />
                    <p>All Charts + Reports</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-[var(--brand)]" />
                    <p>Unlimited Budgets</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-[var(--brand)]" />
                    <p>CSV export</p>
                  </div>
                </div>
              </div>

              <div className="grid-cols-1 bg-white px-4 py-5 space-y-2  rounded-xl border border-gray-300 shadow-md flex flex-col items-start ">
                <p className="text-lg  text-gray-700 ">Team</p>
                <h1 className="text-4xl font-bold">$12</h1>
                <p className=" text-gray-600">Per month</p>

                <div className="mt-7 space-y-2">
                  <div className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-[var(--brand)]" />
                    <p>Everything in Pro</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-[var(--brand)]" />
                    <p>Up to 5 members</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-[var(--brand)]" />
                    <p>Shared Dashboards </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-[var(--brand)]" />
                    <p>Priority Support </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 max-w-7xl mx-auto my-15 p-8 rounded-2xl">
          <div className="text-center">
            <p className="text-[var(--brand)]   font-semibold tracking-widest   text-lg">
              FAQ
            </p>
            <h2 className="text-gray-800 font-semibold text-3xl">
              Common Questions
            </h2>
          </div>

          {faqs.map((faq) => (
            <div
              key={faq.id}
              onClick={() => faqToggle(faq.id)}
              className="py-3.5 space-y-0.5 border-b border-gray-200 "
            >
              <div className="flex items-center justify-between group cursor-pointer  transition-all duration-300 ">
                <h3 className="text-lg text-gray-800 font-semibold  group-hover:text-[var(--brand)]">
                  {faq.question}
                </h3>

                <ChevronUp
                  className={`w-5 h-5 transition-transform duration-300 ${openId === faq.id ? "rotate-180 duration-300" : ""}`}
                />
              </div>

              <div
                className={`overflow-hidden transition-all duration-300 ${openId === faq.id ? "max-h-40 " : "max-h-0 duration-300"}   `}
              >
                <p className="text-gray-600 ">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white max-w-7xl mx-auto py-10 my-15  rounded-xl ">
          <div className="max-w-5xl mx-auto p-5 text-center ">
            <h1 className="sm:text-6xl text-3xl  font-medium text-gray-700">
              Ready to take control of your Money?
            </h1>

            <div className="sm:max-w-xl max-w-md mx-auto p-5 text-center">
              <p className="text-gray-500 leading-relaxed mt-1 text-sm sm:text-lg">
                Join thousands of people using Sloth to track spending, set
                budgets, and build better financial habits.
              </p>

              <NavLink
              
              >
                <button className="bg-[var(--brand)] text-white font-semibold rounded-xl px-8 py-3 hover:opacity-90 transition-all duration-200 mt-6 cursor-pointer">
                  Start for free Today
                </button>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
