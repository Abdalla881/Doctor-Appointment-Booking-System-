import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div className="md:mx-10">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        {/* ---------- Left Section ---------- */}
        <div>
          <img className="mb-5 w-40" src={assets.logo} alt="" />
          <p className="w-full md:w-2/3 text-gray-900 leading-6">
            Since ancient times, the printing and publishing industry has relied
            on placeholder texts to test designs and layouts. Throughout the
            ages, publishers and designers have used random texts to simulate
            real content, helping them fine-tune fonts and layouts before the
            final print.
          </p>
        </div>

        {/* ---------- Center Section ---------- */}
        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-2 text-gray-900">
            <li>Home</li>
            <li>About us</li>
            <li>Contact us</li>
            <li>Privacy policy</li>
          </ul>
        </div>

        {/* ---------- Right Section ---------- */}
        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-2 text-gray-900">
            <li>01200303866</li>
            <li>osabdalla881@gmail.com</li>
          </ul>
        </div>
      </div>

      {/* ---------- Copyright Text ---------- */}
      <div>
        <hr />
        <p className="py-5 text-sm text-center">
          Copyright © 2025 - All Right Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
