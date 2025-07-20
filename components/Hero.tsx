import React from 'react';

export default function Hero() {
  return (
    <section className="relative h-72 md:h-96 flex items-center justify-center bg-gray-900 text-white overflow-hidden">
      <img
        src="/hero-bg.jpg"
        alt="Live performance background"
        className="absolute inset-0 w-full h-full object-cover opacity-40 dark:opacity-30 pointer-events-none"
      />
      <div className="relative z-10 text-center px-4">
        <h1 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-lg">Music Performance Availability</h1>
        <p className="mb-6 text-lg md:text-2xl drop-shadow">Sign up to let us know when you can play!</p>
        <a href="#signup" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded shadow transition">Sign Up / Update Availability</a>
      </div>
    </section>
  );
} 