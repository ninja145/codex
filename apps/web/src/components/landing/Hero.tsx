import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-900 text-white pt-16">
      <div className="text-center max-w-4xl mx-auto px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
          World’s First QR-Based Doctor’s Personal E-Assistant
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-300">
          Streamline your practice, connect with patients effortlessly, and focus on what matters most - their health.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link to="/signup" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300">
            Doctor Signup
          </Link>
          <Link to="/login" className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-lg transition duration-300">
            Doctor Login
          </Link>
          <button className="border border-gray-600 hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-lg transition duration-300">
            Share Website
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
