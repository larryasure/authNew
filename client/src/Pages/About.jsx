import React from "react";

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
        <div className="max-w-7xl mx-auto bg-white flex gap-6 mt-7 ">
        
        </div>
      </div>
    </>
  );
}
