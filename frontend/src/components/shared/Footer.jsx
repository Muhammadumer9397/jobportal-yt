import React from "react";
import { Facebook, Twitter, Linkedin, Briefcase } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-800 py-12">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between gap-8">
        <div className="flex flex-col gap-2 items-start">
          <div className="flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-[#6A38C2]" />
            <h2 className="text-2xl font-bold text-[#6A38C2]">
              Talent<span className="text-[#6A38C2]">Bridge</span>
            </h2>
          </div>

          <p className="text-sm text-gray-500">
            © 2025 TalentBridge. All rights reserved.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-lg">Quick Links</h3>
          <div className="flex flex-col gap-1">
            <Link to="/" className="hover:text-[#6A38C2] transition">
              Home
            </Link>
            <Link to="/jobs" className="hover:text-[#6A38C2] transition">
              Jobs
            </Link>
            <Link to="/browse" className="hover:text-[#6A38C2] transition">
              Browse
            </Link>
            <Link to="/contact" className="hover:text-[#6A38C2] transition">
              Contact
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-lg">Follow Us</h3>
          <div className="flex space-x-4 mt-2">
            <a
              href="https://facebook.com"
              target="_blank"
              className="hover:text-[#6A38C2] transition"
              aria-label="Facebook"
            >
              <Facebook className="w-6 h-6" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              className="hover:text-[#6A38C2] transition"
              aria-label="Twitter"
            >
              <Twitter className="w-6 h-6" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              className="hover:text-[#6A38C2] transition"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-8 border-t border-gray-300 pt-4 text-center text-gray-500 text-sm">
        Made with ❤️ by Your Company
      </div>
    </footer>
  );
};

export default Footer;
