import React from 'react';
import { assets } from '../assets/assets';

const About = () => {
  return (
    <div className='px-6 md:px-12 lg:px-20 py-14 bg-gray-50'>
      {/* Section Title */}
      <div className='text-center text-3xl font-bold text-gray-800 tracking-wide'>
        <p>ABOUT <span className='text-primary'>US</span></p>
      </div>

      {/* About Content */}
      <div className='my-14 flex flex-col md:flex-row items-center gap-12'>
        <img 
          className='w-full md:max-w-[450px] rounded-xl shadow-lg transition-transform duration-300 hover:scale-105' 
          src={assets.about_image2} 
          alt='About Us' 
        />

        <div className='flex flex-col justify-center gap-6 md:w-3/5 text-[16px] text-gray-700 leading-relaxed'>
          <p className='text-lg'>
            Welcome to <span className='font-semibold text-gray-900'>Tabebak</span>, your trusted partner in managing your healthcare needs 
            with ease and efficiency. At Tabebak, we understand the challenges individuals face when 
            booking medical appointments and keeping track of their health records.
          </p>
          <b className='text-gray-900 text-xl'>Our Vision</b>
          <p className='text-lg'>
            Our vision at <span className='font-semibold text-gray-900'>Tabebak</span> is to create a seamless healthcare experience for every user. 
            We aim to bridge the gap between patients and healthcare providers, making it easier for 
            you to access the care you need, when you need it.
          </p>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className='text-center text-2xl font-bold text-gray-800 my-10 tracking-wide'>
        <p>WHY <span className='text-primary'>CHOOSE US</span></p>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8'>
        {[
          { title: 'Efficiency', description: 'Streamlined appointment scheduling that fits into your busy lifestyle.' },
          { title: 'Convenience', description: 'Access to a network of trusted healthcare professionals in your area.' },
          { title: 'Personalization', description: 'Tailored recommendations and reminders to help you stay on top of your health.' },
        ].map((item, index) => (
          <div 
            key={index} 
            className='border px-8 py-10 flex flex-col gap-4 text-[16px] bg-white text-gray-700 
              cursor-pointer rounded-xl shadow-md hover:bg-primary hover:text-white transition-all 
              duration-300 transform hover:-translate-y-2 hover:shadow-lg'
          >
            <b className='text-lg'>{item.title}:</b>
            <p className='opacity-90'>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
