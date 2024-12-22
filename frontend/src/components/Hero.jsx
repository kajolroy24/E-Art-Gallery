import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import art1 from '../assets/art1.jpg';
import art2 from '../assets/art2.jpg';
import art3 from '../assets/art3.jpg';
import art4 from '../assets/art4.jpg';
import art5 from '../assets/art5.jpg';

const Hero = () => {
  const navigate = useNavigate();

  const images = [art1, art2, art3, art4, art5];
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div className="relative w-full h-[90vh] overflow-hidden">
      <div
        className="absolute inset-0 flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className="w-full h-full flex-shrink-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${image})` }}
          >
            <div className="flex flex-col justify-center items-center w-full h-full bg-black bg-opacity-50">
              <h1 className="text-white text-4xl md:text-6xl font-bold mb-4 text-center">Bring Home the Art You Love</h1>
              <p className="text-white text-lg md:text-xl mb-6 text-center">
                Explore unique and beautiful artworks by talented local artists.
              </p>
              <button onClick={()=>navigate('/collection')} className="bg-yellow-500 text-white px-6 py-3 rounded-lg text-lg hover:bg-red-700">
                Browse Collections
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Left Arrow */}
      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 mt-10 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-lg focus:outline-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-black"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      {/* Right Arrow */}
      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 mt-10 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-lg focus:outline-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-black"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
};

export default Hero;
