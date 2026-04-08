import { Check, ChevronUp, X } from "lucide-react";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const plans = [
  { name: "Starter", highlight: false },
  { name: "Pro", highlight: true },
  { name: "Business", highlight: false },
];

const features = [
  {
    name: "Transactions",
    values: ["50", "Unlimited", "Unlimited"],
  },
  {
    name: "Support",
    values: ["Email", "Priority", "24/7"],
  },
  {
    name: "CSV Reports",
    values: [false, true, true],
  },
  {
    name: "Budget Categories",
    values: ["3", "Unlimited", "Unlimited"],
  },
  {
    name: "Analytics",
    values: ["Basic", "Advanced", "AI-powered"],
  },
];

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

export default function Pricing() {
  const [openId, setOpenId] = useState(null);

  const handleToggle = (id) => {
    if (openId === id) {
      setOpenId(null);
    } else {
      setOpenId(id);
    }
  };

  return (
    <>
      <div className="min-h-screen px-8 my-15  ">
        <div className="grid sm:grid-cols-2 grid-cols-1 bg-white p-4 rounded-xl  ">
          <div className="flex flex-col gap-2.5  max-w-sm items-start">
            <span className="bg-[#cfceff] text-[var(--brand)] text-xs tracking-wider uppercase px-3 rounded-xl font-bold py-0.5 ">
              Pricing
            </span>
            <h1 className="text-4xl text-gray-700 font-semibold">
              Flexible plans for your
            </h1>
            <h1 className="text-4xl text-gray-700 font-semibold">
              financial proceedings
            </h1>
            <p className="text-gray-500 leading-relaxed text-sm ">
              Choose the perfect plan that fits your needs — Whether you are a
              startup, an agency or a largwe enterprise, Start a 14-day free
              trial, no credit card required.
            </p>
          </div>
        </div>

        <div className=" sm:grid-cols-3 grid grid-cols-1   my-15  bg-white rounded-lg min-h-[500px] ">
          <div className="grid-cols-1  p-5 flex flex-col gap-4 rounded-xl   ">
            <div className="flex flex-col items-center bg-white   gap-1.5  shadow-sm rounded-xl p-3">
              <p className=" text-lg font-semibold text-gray-800">
                Starter Plan
              </p>
              <p className="text-gray-500 text-center font-semibold">
                Perfect for Small businesses and personal use
              </p>
              <p className="text-3xl font-bold  ">
                $0 <span className="text-sm font-normal ">/ month</span>
              </p>
              <NavLink to={"/signup"}>
                <button className="font-semibold my-2 rounded-xl py-2 px-5 bg-gray-300 ">
                  Get Started{" "}
                </button>
              </NavLink>
            </div>

            <div className="flex items-start flex-col gap-3 ">
              <div className="flex gap-3 items-center divide-y divide-gray-200 ">
                <div className="justify-center items-center h-4 w-4   ">
                  <Check className="text-white bg-[var(--brand)]  w-4 h-4 rounded-full" />
                </div>
                <p className="text-gray-500 text-sm font-semibold ">
                  Up to 50 transactions
                </p>
              </div>

              <div className="flex gap-3 items-center divide-y divide-gray-200 ">
                <div className="justify-center items-center h-4 w-4   ">
                  <Check className="text-white bg-[var(--brand)]  w-4 h-4 rounded-full" />
                </div>
                <p className="text-gray-500 text-sm font-semibold ">
                  Email Support
                </p>
              </div>

              <div className="flex gap-3 items-center divide-y divide-gray-200 ">
                <div className="justify-center items-center h-4 w-4   ">
                  <Check className="text-white bg-[var(--brand)]  w-4 h-4 rounded-full" />
                </div>
                <p className="text-gray-500 text-sm font-semibold ">
                  Bar and Pie Chart Support
                </p>
              </div>

              <div className="flex gap-3 items-center ">
                <div className="justify-center items-center h-4 w-4   ">
                  <Check className="text-white bg-[var(--brand)] w-4 h-4 rounded-full" />
                </div>
                <p className="text-gray-500 text-sm font-semibold">
                  Basic reports
                </p>
              </div>

              <div className="flex gap-3 items-center ">
                <div className="justify-center items-center h-4 w-4  ">
                  <Check className="text-white bg-[var(--brand)] w-4 h-4 rounded-full" />
                </div>
                <p className="text-gray-500 text-sm font-semibold">
                  3 budget categories
                </p>
              </div>

              <div className="flex gap-3 items-center  ">
                <div className="justify-center items-center h-4 w-4  ">
                  <X className="text-white bg-red-500 w-4 h-4 rounded-full" />
                </div>
                <p className="text-gray-500 text-sm font-semibold">
                  CSV Reports
                </p>
              </div>
            </div>
          </div>

          <div className="grid-cols-1  p-5 flex flex-col gap-4  text-white rounded-xl   ">
            <div className="flex flex-col items-center bg-[var(--brand)] text-white  gap-1.5  shadow-sm rounded-xl p-3">
              <div className="flex items-center gap-3 ">
                <p className=" text-lg font-semibold ">Pro Plan</p>

                <p className="px-3 py-1 rounded-lg bg- ">Most Popular</p>
              </div>
              <p className=" text-center font-semibold">
                Perfect for growing businesses that need advanced analytics
              </p>
              <p className="text-3xl font-bold  ">
                $5 <span className="text-sm font-normal ">/ month</span>
              </p>
              <NavLink to={"/signup"}>
                <button className="font-semibold text-black  my-2 rounded-xl py-2 px-5 bg-white">
                  Get Started{" "}
                </button>
              </NavLink>
            </div>

            <div className="flex items-start flex-col gap-3 ">
              <div className="flex gap-3 items-center divide-y  ">
                <div className="justify-center items-center h-4 w-4   ">
                  <Check className="text-white bg-[var(--brand)]  w-4 h-4 rounded-full" />
                </div>
                <p className="text-gray-500 text-sm font-semibold ">
                  Everything in starter plan
                </p>
              </div>

              <div className="flex gap-3 items-center divide-y  ">
                <div className="justify-center items-center h-4 w-4   ">
                  <Check className="text-white bg-[var(--brand)]  w-4 h-4 rounded-full" />
                </div>
                <p className="text-gray-500 text-sm font-semibold ">
                  Unlimited transactions
                </p>
              </div>

              <div className="flex gap-3 items-center ">
                <div className="justify-center items-center h-4 w-4   ">
                  <Check className="text-white bg-[var(--brand)] w-4 h-4 rounded-full" />
                </div>
                <p className="text-gray-500 text-sm font-semibold">
                  Advanced reports
                </p>
              </div>

              <div className="flex gap-3 items-center ">
                <div className="justify-center items-center h-4 w-4  ">
                  <Check className="text-white bg-[var(--brand)] w-4 h-4 rounded-full" />
                </div>
                <p className="text-gray-500 text-sm font-semibold">
                  Unlimited budget
                </p>
              </div>

              <div className="flex gap-3 items-center ">
                <div className="justify-center items-center h-4 w-4  ">
                  <Check className="text-white bg-[var(--brand)] w-4 h-4 rounded-full" />
                </div>
                <p className="text-gray-500 text-sm font-semibold">
                  CSV reports
                </p>
              </div>
            </div>
          </div>

          <div className="grid-cols-1  p-5 flex flex-col gap-4 rounded-xl   ">
            <div className="flex flex-col items-center bg-white   gap-1.5  shadow-sm rounded-xl p-3">
              <p className=" text-lg font-semibold text-gray-800">
                Business Plan
              </p>
              <p className="text-gray-500 text-center font-semibold">
                For large-scale businesses & enterprises needing tailored
                solutions.
              </p>
              <p className="text-3xl font-bold  ">Custom</p>
              <NavLink to={"/signup"}>
                <button className="font-semibold my-2 rounded-xl py-2 px-5 bg-gray-300 ">
                  Contact Us
                </button>
              </NavLink>
            </div>

            <div className="flex items-start flex-col gap-3 ">
              <div className="flex gap-3 items-center divide-y divide-gray-200 ">
                <div className="justify-center items-center h-4 w-4   ">
                  <Check className="text-white bg-[var(--brand)]  w-4 h-4 rounded-full" />
                </div>
                <p className="text-gray-500 text-sm font-semibold ">
                  Everything In Pro
                </p>
              </div>

              <div className="flex gap-3 items-center divide-y divide-gray-200 ">
                <div className="justify-center items-center h-4 w-4   ">
                  <Check className="text-white bg-[var(--brand)]  w-4 h-4 rounded-full" />
                </div>
                <p className="text-gray-500 text-sm font-semibold ">
                  Email Support
                </p>
              </div>

              <div className="flex gap-3 items-center divide-y divide-gray-200 ">
                <div className="justify-center items-center h-4 w-4   ">
                  <Check className="text-white bg-[var(--brand)]  w-4 h-4 rounded-full" />
                </div>
                <p className="text-gray-500 text-sm font-semibold ">
                  24/7 priority support
                </p>
              </div>

              <div className="flex gap-3 items-center ">
                <div className="justify-center items-center h-4 w-4   ">
                  <Check className="text-white bg-[var(--brand)] w-4 h-4 rounded-full" />
                </div>
                <p className="text-gray-500 text-sm font-semibold">
                  Dedicated account manager
                </p>
              </div>

              <div className="flex gap-3 items-center ">
                <div className="justify-center items-center h-4 w-4  ">
                  <Check className="text-white bg-[var(--brand)] w-4 h-4 rounded-full" />
                </div>
                <p className="text-gray-500 text-sm font-semibold">
                  AI-driven predictive analytics
                </p>
              </div>

              <div className="flex gap-3 items-center  ">
                <div className="justify-center items-center h-4 w-4  ">
                  <X className="text-white bg-[var(--brand)] w-4 h-4 rounded-full" />
                </div>
                <p className="text-gray-500 text-sm font-semibold">
                  Team collaborations and role-based access
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="my-15 max-w-5xl mx-auto ">
          <div className="flex flex-col items-center gap-2  ">
            <p className="text-sm font-semibold text-[var(--brand)] bg-[#b0aedf] px-3 rounded-xl py-0.5 tracking-wider">
              Plan Comparisons{" "}
            </p>
            <h1 className="sm:text-3xl text-2xl font-semibold text-gray-800 mt-1 ">
              Compare Our Plans
            </h1>
            <p className="text-gray-500 mt-1 leading-relaxed text-xs ">
              Find the perfect plan that fits your needs. Whether you're just
              starting or need enterprise-level insights. Sloth has you covered.
            </p>
          </div>

          <div className="mt-12">
            <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left p-4 font-semibold text-gray-600">
                      Features
                    </th>

                    {plans.map((plan) => (
                      <th
                        key={plan.name}
                        className={`p-4 text-center font-semibold ${
                          plan.highlight
                            ? "bg-indigo-50 text-[var(--brand)]"
                            : "text-gray-700"
                        }`}
                      >
                        <div className="flex flex-col items-center gap-1">
                          {plan.name}

                          {plan.highlight && (
                            <span className="text-xs bg-indigo-100 text-[var(--brand)] px-2 py-0.5 rounded-full">
                              Most Popular
                            </span>
                          )}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>

                {/* BODY */}
                <tbody>
                  {features.map((feature, rowIndex) => (
                    <tr
                      key={feature.name}
                      className={`${
                        rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                      }`}
                    >
                      {/* FEATURE NAME */}
                      <td className="p-4 font-medium text-gray-700 sticky left-0 bg-inherit">
                        {feature.name}
                      </td>

                      {/* VALUES */}
                      {feature.values.map((value, i) => (
                        <td
                          key={i}
                          className={`p-4 text-center ${
                            plans[i].highlight ? "bg-indigo-50/40" : ""
                          }`}
                        >
                          {typeof value === "boolean" ? (
                            value ? (
                              <Check className="mx-auto h-5 w-5 text-green-500" />
                            ) : (
                              <X className="mx-auto h-5 w-5 text-gray-300" />
                            )
                          ) : (
                            <span className="text-gray-600">{value}</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 grid-cols-1 bg-white rounded-xl p-5">
          <div className="grid-cols-1 flex flex-col gap-3 items-start justify-center max-w-sm">
            <p className="bg-[#d6d6fa]  px-3 py-0.5 font-semibold text-[var(--brand)] rounded-lg text-sm">
              FAQ
            </p>

            <h1 className="text-gray-800 sm:text-4xl text-3xl font-bold">
              Frequently Asked Questions
            </h1>

            <p className="text-gray-500 text-sm font-medium ">
              Find answers to the most common Questions about Sloth. pricing
              features and more...
            </p>
          </div>

          <div className="grid-cols-1 ">
            {faqs.map((faq) => (
              <div
                key={faq.id}
                onClick={() => handleToggle(faq.id)}
                className="border-b border-gray-300 space-y-1 py-3"
              >
                <div className="flex items-center justify-between transition-all duration-300 cursor-pointer group">
                  <h3 className="text-lg font-semibold text-gray-800 group-hover:text-[var(--brand)]">
                    {faq.question}
                  </h3>

                  <div>
                    <ChevronUp
                      className={`w-5 h-5 duration-200 transition-all ${openId === faq.id ? "rotate-180" : ""}`}
                    />
                  </div>
                </div>

                <div
                  className={`overflow-hidden transition-all duration-500  ${openId === faq.id ? "max-h-40" : "max-h-0 "}`}
                >
                  <p className="text-sm text-gray-600 ">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="my-15 bg-linear-to-r from-[#e0dffc] to-[#a19cff] flex items-center justify-center gap-4 p-5 flex-col">
          <p className="bg-white/70 px-3 py-0.5 rounded-xl text-[var(--brand)] font-medium">
            Get Started Today
          </p>
          <div className="max-w-lg mx-auto">
            <h1 className="sm:text-4xl  text-3xl font-bold text-gray-800 text-center">
              Take Your Finance Tracking to the Next Level with Sloth
            </h1>
            <p className="text-center text-sm text-gray-600 my-2 ">
              Start your 14-day triall and discover how data-driven decisions
              can fuel your business growth. No credit card required
            </p>
          </div>
          <NavLink 
          to={'/signup'}
          >
            <button className="bg-[var(--brand)] text-white font-medium px-4 py-2 rounded-lg hover:opacity-90 duration-200 transition-all active:scale-115">
              Start Free Trial 
            </button>

          </NavLink>
        </div>
      </div>
    </>
  );
}
