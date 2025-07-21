import React from 'react';

export default function Hero() {
  return (
    <section className="relative h-80 md:h-96 flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-400 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-pink-400 rounded-full opacity-40 animate-bounce"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-green-400 rounded-full opacity-35 animate-ping"></div>
        <div className="absolute bottom-32 right-1/3 w-24 h-24 bg-orange-400 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-cyan-400 rounded-full opacity-20 animate-spin"></div>
      </div>
      
      {/* Background image with overlay */}
      <img
        src="/hero-bg.jpg"
        alt="Live performance background"
        className="absolute inset-0 w-full h-full object-cover opacity-30 pointer-events-none"
        onError={(e) => {
          // Fallback to gradient if image fails to load
          e.currentTarget.style.display = 'none';
        }}
      />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/60 via-blue-900/60 to-indigo-900/60"></div>
      
      <div className="relative z-10 text-center px-4">
        <div className="mb-4">
          <span className="inline-block px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-400 text-purple-900 font-bold rounded-full text-lg mb-4 animate-bounce shadow-lg">
            🎵 Live Music Signup
          </span>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white drop-shadow-2xl">
          <span className="bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
            Music Performance
          </span>
          <br />
          <span className="text-white">Availability</span>
        </h1>
        <p className="mb-8 text-xl md:text-2xl text-blue-100 drop-shadow-lg max-w-2xl mx-auto">
          Join our vibrant community of musicians! Sign up to let us know when you can bring your talent to the stage.
        </p>
        <a 
          href="#signup" 
          className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400 text-purple-900 font-bold px-8 py-4 rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300 text-lg"
        >
          🎸 Sign Up / Update Availability
        </a>
      </div>
    </section>
  );
} 