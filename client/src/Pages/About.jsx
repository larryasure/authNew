import React from "react";
import {
  ChartSpline,
  House,
  Shield,
  ShoppingCart,
  Sparkle,
  Sparkles,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const techStar = [
  "React",
  "Tailwind CSS",
  "React Router",
  "Recharts",
  "Node.js",
  "Express",
  "MongoDB",
  "Mongoose",
  "JWT",
  "bcrypt",
  "Nodemailer",
  "Cloudinary",
];

export default function About() {
  return (
    <>
      <div className="min-h-screen px-8 ">
        <div className="max-w-4xl mx-auto text-center pt-6">
          <span className="rounded-xl text-sm font-medium px-4 py-1 bg-[#dbdaff] text-[var(--brand)]">
            About Sloth
          </span>
          <h1 className="mt-1 text-4xl sm:text-5xl font-medium ">
            A smarter way to
          </h1>
          <h1 className="text-4xl sm:text-5xl font-medium text-[var(--brand)]">
            Understand your Money
          </h1>
        </div>
        
        <div className="max-w-lg  mx-auto text-center mt-3">
          <p className="text-lg text-gray-800 ">
            Sloth is a personal finance tracker built for people who want
            clarity on their spending — without the complexity of traditional
            budgeting tools.
          </p>
        </div>
        {/* <div className="max-w-4xl mx-auto bg-white  my-10 rounded-xl  ">
          <div className="grid grid-cols-1  sm:grid-cols-2 gap-7 p-7 max-w-2xl ">
            <div className="flex flex-col items-start grid-cols-1 ">
              <span className="rounded-xl text-sm  font-medium px-2 py-0.5 bg-[#dbdaff] text-[var(--brand)] ">
                What is Sloth ?
              </span>

              <h2 className="text-3xl text-gray-gray-800 text-medium mt-2 ">
                Your finances, finally in one place
              </h2>
              <p className="mt-3 leading-relaxed text-base text-gray-600 font-normal ">
                Sloth lets you log every income and expense, organize them by
                category, set monthly budget limits, and see it all visualized
                in clean charts and reports.
              </p>

              <p className="mt-3 leading-relaxed text-base text-gray-600 font-normal ">
                No bank connections. No subscriptions required to get started.
                Just you, your numbers, and a clear picture of where your money
                goes every month.
              </p>
            </div>

            <div className="p-7 bg-white/50 shadow-sm  grid-cols-1 rounded-xl ">
              <div>
                <span className="text-sm font-semibold text-gray-700 my-2  ">
                  April Overview
                </span>

                <div className="flex flex-col gap-4 ">
                  <div className="bg-green-50 rounded-lg  mt-3 py-4 flex items-center justify-between px-3 ">
                    <div className="flex items-center gap-3 ">
                      <div className="bg-green-200 hover:bg-green-400  h-9 w-9 flex items-center justify-center rounded-lg">
                        <Sparkles className="w-5 h-5  text-green-600" />
                      </div>
                      <div className="flex items-start flex-col">
                        <p className="text-gray-600 font-semibold text-sm">
                          Salary
                        </p>
                        <p className="text-gray-500 font-medium text-sm">
                          Income • Apr 1
                        </p>
                      </div>

                    </div>
                    <p className="text-green-600 font-semibold  text-sm">$5, 000.00</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}

        <div className="max-w-3xl mx-auto my-16 p-6 rounded-xl bg-white ">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="flex flex-col items-start">
              <span className="rounded-full text-sm font-medium px-3 py-1 bg-[#dbdaff] text-[var(--brand)]">
                What is Sloth?
              </span>

              <h2 className="text-3xl font-semibold text-gray-800 mt-4 leading-snug">
                Your finances, finally in one place
              </h2>

              <p className="mt-4 text-gray-600 leading-relaxed">
                Sloth lets you log every income and expense, organize them by
                category, set monthly budget limits, and see it all visualized
                in clean charts and reports.
              </p>

              <p className="mt-3 text-gray-600 leading-relaxed">
                No bank connections. No subscriptions required to get started.
                Just you, your numbers, and a clear picture of where your money
                goes every month.
              </p>
            </div>

            <div className="bg-white shadow-md rounded-2xl p-6 space-y-5 border border-gray-100">
              <span className="text-sm font-semibold text-gray-700">
                April Overview
              </span>

              <div className="bg-green-50 rounded-xl p-4 flex items-center justify-between mt-3">
                <div className="flex items-center gap-3">
                  <div className="bg-green-200 h-10 w-10 flex items-center justify-center rounded-lg transition hover:bg-green-300">
                    <Sparkles className="w-5 h-5 text-green-600" />
                  </div>

                  <div>
                    <p className="text-gray-700 font-semibold text-sm">
                      Salary
                    </p>
                    <p className="text-gray-500 text-xs">Income • Apr 1</p>
                  </div>
                </div>

                <p className="text-green-600 font-semibold text-sm">
                  $5,000.00
                </p>
              </div>

              <div className="bg-red-50 rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-red-200 h-10 w-10 flex items-center justify-center rounded-lg transition hover:bg-red-300">
                    <House className="w-5 h-5 text-red-600" />
                  </div>

                  <div>
                    <p className="text-gray-700 font-semibold text-sm">Rent</p>
                    <p className="text-gray-500 text-xs">Expense • Apr 2</p>
                  </div>
                </div>

                <p className="text-red-600 font-semibold text-sm">$-800.00</p>
              </div>

              <div className="bg-red-50 rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-red-200 h-10 w-10 flex items-center justify-center rounded-lg transition hover:bg-red-300">
                    <ShoppingCart className="w-5 h-5 text-red-600" />
                  </div>

                  <div>
                    <p className="text-gray-700 font-semibold text-sm">
                      Groceries
                    </p>
                    <p className="text-gray-500 text-xs">Expense • Apr 1</p>

                  </div>

                </div>

                {/* AMOUNT */}
                <p className="text-red-600 font-semibold text-sm">$120.00</p>
              </div>

              <div className="bg-[#d5d4fd] p-4 rounded-xl flex items-center justify-between  ">
                <p className="text-[var(--brand)] font-semibold text-sm">
                  Net Balance
                </p>

                <div className="">
                  <p className="text-[var(--brand)] text-sm font-semibold">
                    $4,080
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto my-16 p-6 rounded-xl  ">
          <div className="text-center">
            <span className="rounded-full text-xs font-medium px-3 py-1  bg-[#dbdaff] text-[var(--brand)]">
              The Problem
            </span>

            <h1 className="text-gray-800 font-semibold my-3  text-3xl ">
              Why most people don't track money
            </h1>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 my-8">
            <div className=" border-gray rounded-l-none rounded-xl  bg-white border-l-3 border-red-500 p-4">
              <div className="flex items-start gap-2 flex-col ">
                <p className="text-gray-800 my-1 font-semibold text-lg">
                  Too Complicated
                </p>
                <p className="text-gray-500 font-medium leading-relaxed ">
                  Most finance apps require bank linking, lengthy setups, and
                  learning curves that make people give up before they start.
                </p>
              </div>
            </div>

            <div className=" border-gray rounded-l-none rounded-xl  bg-white border-l-3 border-red-500 p-4">
              <div className="flex items-start gap-2 flex-col ">
                <p className="text-gray-800 my-1 font-semibold text-lg">
                  Too expensive
                </p>
                <p className="text-gray-500 font-medium leading-relaxed">
                  Good budgeting tools often sit behind $10–$15/month paywalls.
                  Tracking your money shouldn't cost you money.
                </p>
              </div>
            </div>

            <div className=" border-gray rounded-l-none rounded-xl  bg-white border-l-3 border-red-500 p-4">
              <div className="flex items-start gap-2 flex-col ">
                <p className="text-gray-800 my-1 font-semibold text-lg">
                  Too Slow
                </p>
                <p className="text-gray-500 font-medium leading-relaxed">
                  Spreadsheets work but nobody keeps them updated. Logging a
                  transaction should take seconds, not minutes.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto my-16 p-6 rounded-xl  bg-white  ">
          <div className="text-center">
            <span className="rounded-full text-xs font-medium px-3 py-1  bg-[#dbdaff] text-[var(--brand)]">
              The Solution
            </span>

            <h1 className="text-gray-800 font-semibold my-3  text-3xl ">
              How Sloth is different
            </h1>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 my-8">
            <div className=" border-gray  grid-cols-1  shadow-lg rounded-xl  bg-white   p-4">
              <div className="flex items-start gap-2 flex-col ">
                <div className=" my-1 font-semibold text-[var(--brand)]">
                  <Sparkle className="w-5 h-5 " />
                </div>
                <p className="text-gray-800 font-semibold ">Log in seconds</p>
                <p className="text-gray-500 font-medium leading-relaxed ">
                  Add a transaction in under 10 seconds. Pick a category, enter
                  an amount, pick a date. Done.
                </p>
              </div>
            </div>

            <div className=" border-gray grid-cols-1  shadow-lg  rounded-xl  bg-white p-4">
              <div className="flex items-start gap-2 flex-col ">
                <p className="text-[var(--brand)] my-1 font-semibold text-lg">
                  <ChartSpline className="w-5 h-5 " />
                </p>

                <p className="text-gray-800 font-semibold">See it Visually</p>
                <p className="text-gray-500 font-medium leading-relaxed">
                  Charts, bar graphs, and monthly trends — your money visualized
                  so patterns are immediately obvious
                </p>
              </div>
            </div>

            <div className=" border-gray grid-cols-1  shadow-lg  rounded-xl  bg-white  p-4">
              <div className="flex items-start gap-2 flex-col ">
                <p className="text-[var(--brand)] my-1 font-semibold text-lg">
                  <Shield className="w-5 h-5 " />
                </p>

                <p className="text-gray-800 font-semibold">Stay in Control</p>
                <p className="text-gray-500 font-medium leading-relaxed">
                  Set budget limits per category. See what's left before you
                  overspend.
                </p>
              </div>
            </div>
          </div>
        </div>

  
        <div className="flex flex-wrap items-center justify-center gap-6 my-10 max-w-4xl mx-auto">
          {[
            { value: "5k+", label: "Active Users" },
            { value: "$2M+", label: "Tracked Monthly" },
            { value: "10+", label: "Categories" },
            { value: "Free", label: "To get Started" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-xl border border-gray-200 p-6 w-36 text-center"
            >
              <h1 className="text-[var(--brand)] text-3xl font-semibold">
                {stat.value}
              </h1>
              <p className="text-gray-600 font-medium text-xs mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <div className=" max-w-4xl bg-white rounded-xl border border-gray-100  my-15 p-6  mx-auto">
          <div className="text-center flex items-center justify-center gap-1.5 flex-col ">
            <span className="rounded-full text-xs font-medium px-3 py-1  bg-[#dbdaff] text-[var(--brand)]">
              Tech Stack
            </span>

            <h1 className="text-gray-800 font-semibold text-3xl">
              What Sloth is built with
            </h1>

            <p className="leading-relaxed text-sm text-gray-600 font-medium">
              A modern, reliable — from the database all the way to the UI
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 mt-4 max-w-3xl mx-auto ">
            {techStar.map((tech, index) => (
              <div
                className="px-3 py-1 rounded-xl border border-gray-300 "
                key={index}
              >
                {tech}
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-2xl mx-auto text-center bg-white rounded-xl  p-5  my-10 ">
          <div className="flex items-center justify-center flex-col   ">
            <h1 className=" text-3xl text-gray-800 font-semibold">
              Start tracking Today. It's Free
            </h1>
          </div>
          <div className="max-w-xs mx-auto mt-3">
            <p className="text-gray-600  font-medium ">
              No credit card. No bank linking. Just sign up and start logging.
            </p>
          </div>

          <div className="flex items-center justify-center gap-4 my-6">
            <NavLink to={"/signup"}>
              <button className="px-6 py-2.5 rounded-xl bg-[var(--brand)] text-white font-semibold shadow-sm hover:opacity-90 transition">
                Get Started
              </button>
            </NavLink>

            <NavLink to={"/feature"}>
              <button className="px-6 py-2.5 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 transition">
                See Features
              </button>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}
