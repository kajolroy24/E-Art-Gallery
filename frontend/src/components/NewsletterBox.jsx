import React, { useState } from 'react';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setMessage('Thank you for subscribing!');
      setEmail('');
    }
  };

  return (
    <section className="bg-gray-100 py-5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-teal-600 sm:text-3xl">
            Join Our Newsletter
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Subscribe to get the latest updates on new artwork, collections, and exclusive offers.
          </p>
        </div>
        <div className="mt-8 sm:flex justify-center">
          <form onSubmit={handleSubmit} className="sm:flex w-full max-w-md">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-600 sm:max-w-xs"
              required
            />
            <button
              type="submit"
              className="mt-3 w-full sm:mt-0 sm:ml-3 px-5 py-3 border border-transparent text-black bg-yellow-500 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-600"
            >
              Subscribe
            </button>
          </form>
        </div>
        {message && (
          <div className="mt-4 text-teal-600 text-center">
            {message}
          </div>
        )}
      </div>
    </section>
  );
};

export default NewsletterSection;
