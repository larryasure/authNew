import { Facebook, Instagram, Twitter } from "lucide-react";
import React from "react";
import { FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-50 border-t border-gray-300 py-5 px-8">
      <div className="max-w-7xl mx-auto">
        {/* Main Content */}
        <div className="grid grid-cols-4 gap-8 mb-12">
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-[var(--brand)] transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-[var(--brand)] transition-colors"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-[var(--brand)] transition-colors"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-[var(--brand)] transition-colors"
                >
                  Pricing
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-[var(--brand)] transition-colors"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-[var(--brand)] transition-colors"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-[var(--brand)] transition-colors"
                >
                  Help Center
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-[var(--brand)] transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-[var(--brand)] transition-colors"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-[var(--brand)] transition-colors"
                >
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">Newsletter</h3>
            <form className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Enter your email..."
                className="h-10 px-4 border border-gray-300 rounded-2xl outline-0 text-sm focus:border-[var(--brand)] transition-colors"
              />
              <button
                type="submit"
                className="bg-[var(--brand)] text-white font-semibold py-2 rounded-2xl hover:opacity-90 transition-all"
              >
                Subscribe
              </button>
              <p className="text-sm text-gray-600">
                Get updates delivered to your inbox
              </p>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-300 my-5"></div>

        {/* Socials & Copyright */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-gray-700 font-medium">Follow Us:</span>
            <a
              href="#"
              className="text-gray-600 hover:text-[var(--brand)] transition-colors"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-[var(--brand)] transition-colors"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-[var(--brand)] transition-colors"
            >
              <FaWhatsapp className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-[var(--brand)] transition-colors"
            >
              <Instagram className="w-5 h-5" />
            </a>
          </div>

          <p className="text-gray-600 text-sm">
            © {new Date().getFullYear()} Sloth. All rights reserved. |
            support@Sloth.com
          </p>
        </div>
      </div>
    </footer>
  );
}
