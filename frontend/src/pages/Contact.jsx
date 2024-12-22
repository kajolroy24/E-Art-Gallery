import React from 'react';
import { assets } from '../assets/assets';
import NewsletterBox from '../components/NewsletterBox';

const Contact = () => {
  return (
    <>
      <div
        className="relative bg-cover bg-center h-[80vh] flex items-center justify-center "
        style={{ backgroundImage: `url(${assets.contact_img})` }}
      >
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        {/* Content Container */}
        <div className="relative z-10 max-w-2xl text-center p-8 bg-white bg-opacity-80 rounded-lg shadow-lg mx-10">
          {/* Heading */}
          <h1 className="text-4xl font-bold text-teal-900">Contact Us</h1>
          <p className="mt-4 text-lg text-gray-700">
            We would love to hear from you! Reach out using the details below.
          </p>

          {/* Contact Details */}
          <div className="mt-8">
            <p className="text-lg font-medium text-teal-800">Location:</p>
            <p className="text-gray-700">
              123 Art Street, <br />
              Lorem ipsum dolor sit, <br />
              Lorem, ipsum dolor, <br />
              Lorem.
            </p>

            <p className="text-lg font-medium text-teal-800 mt-6">Contact details:</p>
            <p className="text-gray-700">Phone: +123 456 7890</p>
            <p className="text-gray-700">Email: contact@eartgallery.com</p>
          </div>
        </div>
      </div>

      <NewsletterBox />
    </>
  );
};

export default Contact;
