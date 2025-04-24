import React from "react";
import { assets } from "../assets/assets";

const Contact = () => {
  return (
    <div className="px-6 md:px-12 lg:px-20 py-16 bg-gray-50">
      {/* Section Title */}
      <div className="text-center text-3xl font-extrabold text-gray-700 tracking-wide">
        <p>
          CONTACT <span className="text-primary">US</span>
        </p>
      </div>

      {/* Contact Content */}
      <div className="my-16 flex flex-col md:flex-row items-center gap-12">
        <img
          className="w-full md:max-w-[400px] rounded-xl shadow-lg transition-transform duration-300 hover:scale-105"
          src={assets.contact_image}
          alt="Contact"
        />

        <div className="flex flex-col justify-center items-start gap-6 text-gray-700 text-base">
          <p className="font-bold text-xl text-gray-800">Our Office</p>
          <p className="text-gray-600">El Sheikh Zayed, Ismailia, Egypt</p>

          <p className="text-gray-600">
            <span className="font-semibold">Phone Number:</span> 01200303866{" "}
            <br />
            <span className="font-semibold">Email:</span> osabdalla881@gmail.com
          </p>

          <p className="font-bold text-xl text-gray-800">Graduation Project</p>
          <p className="text-gray-600">
            Learn more about our teams and job openings.
          </p>

          <button
            className="border border-gray-700 px-6 py-3 text-base font-semibold rounded-lg 
            hover:bg-primary hover:text-white transition-all duration-300"
          >
            Explore Jobs
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
