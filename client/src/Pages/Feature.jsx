import React from "react";

export default function Feature() {
  return (
    <>
      <div className="min-h-screen px-8 ">
        <div className="mx-auto max-w-4xl flex flex-col gap-1">
          <div className="max-w-4xl mx-auto text-center pt-6">
            <span className="rounded-xl text-sm font-medium px-4 py-1 bg-[#dbdaff] text-[var(--brand)] mt-3">
              Features
            </span>
            <h1 className="mt-1 text-4xl sm:text-5xl font-medium ">
              Everything Sloth
            </h1>
            <h1 className="text-4xl sm:text-5xl font-medium text-[var(--brand)]">
              Can do for you
            </h1>

            <div className="max-w-lg  mx-auto text-center mt-3">
              <p className="text-lg text-gray-800 ">
                Six core features, all working together. No fluff, no
                unnecessary complexity — just what you actually need to stay on
                top of your money.
              </p>
            </div>
          </div>
        </div>

        <div className="grid mt-5 grid-cols-1 sm:grid-cols-2 bg-white rounded-xl p-5 max-w-3xl mx-auto gap-6 ">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="flex flex-col items-start">
              <span className="rounded-full text-sm font-medium px-3 py-1 bg-[#dbdaff] text-[var(--brand)]">
                01 — Trnasactions
              </span>

              <h2 className="text-3xl font-semibold text-gray-800 mt-4 leading-snug">
                Log every income and expense
              </h2>

              <p className="mt-4 text-gray-600 leading-relaxed">
                Add any transaction in seconds. Give it a description, pick a
                category, set the amount and date, and choose whether it's
                income or an expense.
              </p>

              <p className="mt-3 text-gray-600 leading-relaxed">
                Your full transaction history lives in one place — searchable,
                filterable, and always up to date.
              </p>
            </div>

            <div className="bg-white shadow-md rounded-2xl p-6 space-y-5 border border-gray-100">
              <span className="text-sm font-semibold text-gray-700">
                April Overview
              </span>

              <div className="bg-green-50 rounded-xl p-4 flex items-center justify-between mt-3">
                <div className="flex items-center gap-3">
                  <div className="bg-green-200 h-10 w-10 flex items-center justify-center rounded-lg transition hover:bg-green-300">
                    
                    {/* <Sparkles className="w-5 h-5 text-green-600" /> */}
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
                    {/* <House className="w-5 h-5 text-red-600" /> */}
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
                    {/* <ShoppingCart className="w-5 h-5 text-red-600" /> */}
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
      </div>
    </>
  );
}
