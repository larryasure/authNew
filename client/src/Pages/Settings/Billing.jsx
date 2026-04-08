import { Check, Clock, WalletCards } from "lucide-react";
import React from "react";

export default function Billing() {
  return (
    <>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Billing & Plans</h1>
          <p className="text-sm text-gray-400">
            Manage your subscription and upgrade your plan
          </p>
        </div>

        <div className="flex justify-between items-center border border-gray-100 w-full p-10 bg-white shadow-sm rounded-xl">
          <div className="flex items-center gap-5  ">
            <div className="bg-[#eaeaff] px-3 py-3 rounded-lg shadow-sm ">
              <WalletCards className="w-5 h-5 text-[var(--brand)] " />
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-800 ">Free Plan</p>
              <p className="text-sm text-gray-500 font-medium -mt-1.5">
                You are currently on the free plan
              </p>
            </div>
          </div>

          <div className="bg-[#eaeaff] rounded-lg px-5 py-1 shadow-sm ">
            <p className="text-[var(--brand)] font-semibold text-sm ">Active</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 my-5 px-4 max-w-2xl mx-auto  sm:max-w-3xl">
          <div className="grid-cols-1  shadow-xl border-2 cursor-pointer border-gray-100 p-6 rounded-xl max-h-100  flex  space-y-3 flex-col pb-15 transition-all duration-300 hover:border-[var(--brand)]">
            <div className="flex flex-col gap-0.5">
              <h3 className="font-semibold text-xl text-gray-800 ">Free</h3>
              <p className="font-semibold text-2xl">
                $0{" "}
                <span className="font-normal text-base text-gray-600">
                  / month
                </span>
              </p>
              <p className="text-sm font-semibold text-gray-700">
                Great for getting started
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="flex gap-3 items-center">
                <div className="bg-[#eaeaff] px-1.5 py-1.5 rounded-full ">
                  <Check className="w-3 h-3 text-[var(--brand)] " />
                </div>

                <p className="text-sm font-medium text-gray-600">
                  Up to 50 transactions
                </p>
              </div>

              <div className="flex gap-3 items-center">
                <div className="bg-[#eaeaff] px-1.5 py-1.5 rounded-full">
                  <Check className="w-3 h-3 text-[var(--brand)]" />
                </div>

                <p className="text-sm font-medium text-gray-600">
                  Basic Reports
                </p>
              </div>

              <div className="flex gap-3 items-center">
                <div className="bg-[#eaeaff] px-1.5 py-1.5 rounded-full">
                  <Check className="w-3 h-3 text-[var(--brand)]" />
                </div>

                <p className="text-sm font-medium text-gray-600">
                  3 budget categories
                </p>
              </div>
            </div>

            <button className="border border-gray-400 rounded-lg py-2.5  cursor-pointer">
              Current Plan
            </button>
          </div>

          <div className="grid-cols-1  shadow-xl border-2 cursor-pointer border-gray-100 transition-all duration-300  p-4 rounded-xl max-h-100 hover:border-[var(--brand)]">
            <span className="bg-[#eaeaff] text-[var(--brand)] px-3 py-0.5 text-sm font-semibold rounded-xl">
              Most popular
            </span>

            <div className="flex flex-col gap-0.5 mt-1 ">
              <h3 className="font-semibold text-xl text-gray-800">Pro</h3>
              <p className="font-semibold text-2xl">
                $5{" "}
                <span className="font-normal text-base text-gray-600">
                  / month
                </span>
              </p>
              <p className="text-sm font-semibold text-gray-700">
                For serious money tracker
              </p>
            </div>
            <div className="space-y-1.5">
              <div className="flex gap-3 items-center mt-3">
                <div className="bg-[#eaeaff] px-1.5 py-1.5 rounded-full ">
                  <Check className="w-3 h-3 text-[var(--brand)] " />
                </div>

                <p className="text-sm font-medium text-gray-600">
                  Unlimited transactions
                </p>
              </div>

              <div className="flex gap-3 items-center">
                <div className="bg-[#eaeaff] px-1.5 py-1.5 rounded-full ">
                  <Check className="w-3 h-3 text-[var(--brand)] " />
                </div>

                <p className="text-sm font-medium text-gray-600">
                  Advanced reports
                </p>
              </div>

              <div className="flex gap-3 items-center ">
                <div className="bg-[#eaeaff] px-1.5 py-1.5 rounded-full ">
                  <Check className="w-3 h-3 text-[var(--brand)] " />
                </div>

                <p className="text-sm font-medium text-gray-600">
                  Unlimited budget
                </p>
              </div>

              <div className="flex gap-3 items-center ">
                <div className="bg-[#eaeaff] px-1.5 py-1.5 rounded-full ">
                  <Check className="w-3 h-3 text-[var(--brand)] " />
                </div>

                <p className="text-sm font-medium text-gray-600">CSV export</p>
              </div>
            </div>

            <button className="border border-gray-400 rounded-lg py-2.5 w-full   mt-4 cursor-pointer">
              Upgrade to Pro
            </button>
          </div>

          <div className="grid-cols-1  shadow-xl border-2 cursor-pointer border-gray-100 p-4 rounded-xl max-h-100 hover:border-[var(--brand)] transition-all duration-300">
            <div className="flex flex-col gap-0.5">
              <h3 className="font-semibold text-xl text-gray-800 ">Business</h3>
              <p className="font-semibold text-2xl">
                $12{" "}
                <span className="font-normal text-base text-gray-600">
                  / month
                </span>
              </p>
              <p className="text-sm font-semibold text-gray-700">
                For Teams and businesses
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="flex gap-3 items-center mt-3">
                <div className="bg-[#eaeaff] px-1.5 py-1.5 rounded-full ">
                  <Check className="w-3 h-3 text-[var(--brand)] " />
                </div>

                <p className="text-sm font-medium text-gray-600">
                  Everythin in Pro
                </p>
              </div>

              <div className="flex gap-3 items-center">
                <div className="bg-[#eaeaff] px-1.5 py-1.5 rounded-full ">
                  <Check className="w-3 h-3 text-[var(--brand)] " />
                </div>

                <p className="text-sm font-medium text-gray-600">
                  Team Collaboration
                </p>
              </div>

              <div className="flex gap-3 items-center ">
                <div className="bg-[#eaeaff] px-1.5 py-1.5 rounded-full ">
                  <Check className="w-3 h-3 text-[var(--brand)] " />
                </div>

                <p className="text-sm font-medium text-gray-600">
                  Priority Support
                </p>
              </div>

              <div className="flex gap-3 items-center ">
                <div className="bg-[#eaeaff] px-1.5 py-1.5 rounded-full ">
                  <Check className="w-3 h-3 text-[var(--brand)] " />
                </div>

                <p className="text-sm font-medium text-gray-600">
                  Custom Integrations
                </p>
              </div>
            </div>

            <button className="border border-gray-400 rounded-lg py-2.5  w-full   mt-4 cursor-pointer">
              Upgrade to Business
            </button>
          </div>
        </div>
        <div className="bg-white border border-gray-100 mt-4 shadow-sm rounded-xl p-10 flex flex-col items-center justify-center gap-3 text-center">
          <div className="bg-[#eaeaff] p-3 rounded-xl">
            <Clock className="w-6 h-6 text-[var(--brand)]" />
          </div>
          <div className="flex items-center gap-3 ">
            <h3 className="text-lg font-semibold text-gray-800">
              Payments coming soon
            </h3>
            
            <div className="flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-full bg-[var(--brand)] animate-bounce" style={{animationDelay: '0ms'}}></span>
              <span className="w-4 h-4 rounded-full bg-[var(--brand)]   animate-bounce"style={{animationDelay: '150ms'}}></span>
              <span className="w-4 h-4 rounded-full bg-[var(--brand)] animate-bounce" style={{animationDelay: '300ms'}}></span>

            </div>
          </div>
          <p className="text-sm text-gray-400 font-medium max-w-sm leading-relaxed">
            We are working on integrating secure payments. You will be notified
            as soon as billing goes live.
          </p>
        </div>
      </div>
    </>
  );
}
