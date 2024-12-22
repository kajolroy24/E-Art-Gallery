import React from 'react';
import { assets } from '../assets/assets';

const About = () => {
  return (
    <div className="relative ">
      {/* Background Image Section */}
      <div
        className="absolute inset-0 bg-cover bg-center h-[60vh] opacity-30"
        style={{ backgroundImage: `url(${assets.about_img})` }}
      ></div>

      {/* Content Section */}
      <div className="relative z-10 bg-white bg-opacity-90 py-16 px-8 sm:px-12 lg:px-16  shadow-lg">
        {/* Heading */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-teal-900">About Us</h1>
          <p className="mt-4 text-lg text-gray-700">
            Discover the story behind E-ART Gallery and our mission to support local artists.
          </p>
        </div>

        {/* Main Content */}
        <div className="my-10 flex flex-col md:flex-row items-center gap-10">
          {/* Image */}
          <img
            className="w-full md:max-w-[400px] rounded-lg shadow-lg"
            src={assets.about_img}
            alt="about image"
          />

          {/* Text Section */}
          <div className="flex flex-col gap-6 text-gray-700 md:w-2/4">
            <p className="text-base md:text-lg leading-relaxed">
              E-ART Gallery is an online platform that showcases artwork from local artists, helping them share their creativity with a wider audience. Our goal is to connect art lovers with unique, handcrafted pieces that bring personality and beauty into any space. We make it easy for anyone to discover and buy original art while supporting local talent.
            </p>
            <p className="text-base md:text-lg leading-relaxed">
              We believe that every piece of art has a story to tell, and at E-ART Gallery, we’re committed to providing a space where those stories can reach the right audience. Whether you're looking for something to inspire, decorate, or gift, our collection of local art offers something special for everyone.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
