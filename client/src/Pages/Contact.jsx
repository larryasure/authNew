import { Clock, Mail, Phone } from "lucide-react";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

export default function Contact() {
  return (
    <>
      <div className="min-h-screen px-8 my-15 ">
        <div className="grid sm:grid-cols-2 grid-cols-1 p-4  bg-linear-to-r from-[#e0dffc] to-[#a19cff] rounded-lg">
          <div className="grid-cols-1 p-4 ">
            <div className="flex items-start gap-3 justify-center flex-col max-w-md ">
              <p className="shadow-md rounded-xl px-3 py-0.5 font-medium bg-[#f3f3f3]">
                Contact Us
              </p>
              <h1 className="sm:text4xl text-3xl font-bold ">
                We're here to help
              </h1>
              <p className="text-sm text-gray-600 ">
                Need support or have a question? we are here to help. Email,
                Call, or complete the form to learn how Sloth can solve your
                problem
              </p>
            </div>
            <div className="flex items-start gap-3 mt-7 justify-center flex-col">
              <div className="flex items-center  gap-2">
                <div className="w-5 h-5 rounded-md flex justify-center items-center bg-white">
                  <Mail className="h-3 w-3  text-[var(--brand)] " />
                </div>
                <p className="text-sm text-gray-700 font-medium">
                  support@sloth.com
                </p>
              </div>

              <div className="flex items-center  gap-2">
                <div className="w-5 h-5 rounded-md flex justify-center items-center bg-white">
                  <Phone className="h-3 w-3  text-[var(--brand)] " />
                </div>
                <p className="text-sm text-gray-700 font-medium">
                  (+1) 782 5392 9301
                </p>
              </div>

              <div className="flex items-center  gap-2">
                <div className="w-5 h-5 rounded-md flex justify-center items-center bg-white">
                  <Clock className="h-3 w-3  text-[var(--brand)] " />
                </div>
                <p className="text-sm text-gray-700 font-medium">
                  Monday to Friday, 9 AM - 5 PM(GMT)
                </p>
              </div>
            </div>
          </div>

          <div className="grid-cols-1 p-4 max-w-lg shadow-sm bg-white rounded-xl  ">
            <form
              action=""
              className="flex gap-4 flex-col bg-white rounded-lg shadow-md border border-gray-200 p-4 w-full"
            >
              <h1 className="text-2xl font-semibold ">Let's Talk </h1>

              <div className="flex items-center justify-between ">
                <label htmlFor="" className="flex flex-col gap-1 ">
                  <span className="text-gray-700 font-medium">First Name</span>
                  <input
                    type="text"
                    placeholder="First name"
                    className="active:outline-0 border border-gray-400 rounded-xl h-10 outline-0 py-4 px-3  placeholder:text-[13px] placeholder:font-medium"
                  />
                </label>

                <label htmlFor="" className="flex flex-col gap-1 ">
                  <span className="text-gray-700 font-medium">Last Name</span>
                  <input
                    type="text"
                    name="Last name"
                    placeholder="Last name"
                    className="active:outline-0 border border-gray-400 rounded-xl h-10 outline-0 py-4 px-3  placeholder:text-[13px] placeholder:font-medium"
                  />
                </label>
              </div>

              <label htmlFor="" className="flex flex-col gap-1 ">
                <span className="text-gray-700 font-medium">Email</span>
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  className="active:outline-0 border border-gray-400 rounded-xl h-10 outline-0 py-4 px-3  placeholder:text-[13px] placeholder:font-medium"
                />
              </label>

              <label htmlFor="" className="flex flex-col gap-1 ">
                <span className="text-gray-700 font-medium">Phone number</span>

                <input
                  type="tel"
                  name="phone number"
                  placeholder="phone number"

                  className="active:outline-0 border border-gray-400 rounded-xl h-10 outline-0 py-4 px-3  placeholder:text-[13px] placeholder:font-medium"
                />
              </label>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
