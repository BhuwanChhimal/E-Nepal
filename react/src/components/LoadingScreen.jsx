import React, { useState, useEffect } from 'react';
import siteLogo from "../assets/flag.gif"

const LoadingScreen = ({ progress, isLoading }) => {
  const [shouldRender, setShouldRender] = useState(isLoading);

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 500);
      return () => clearTimeout(timer);
    }
    setShouldRender(true);
  }, [isLoading]);

  if (!shouldRender) return null;

  return (
    <div 
      className={`
        hero-pattern
        fixed inset-0 z-50 
        flex flex-col items-center justify-center 
        bg-blue-gray-50
        transition-opacity duration-500 ease-in-out
        ${!isLoading ? 'opacity-0' : 'opacity-100'}
      `}
    >
      <div className="w-64 text-center space-y-8">
        {/* Logo Container with visible border */}
        <div className="mx-auto w-24 h-24 rounded-lg flex items-center justify-center shadow-lg">
          {/* Replace with your actual logo */}
          <div className="text-3xl font-bold">
            <img src={siteLogo} alt="logo" />
          </div>
        </div>

        {/* Website Name with more prominent styling */}
        <h1 className="text-3xl font-bold text-blue-800">E-Nepal</h1>

        {/* Progress Bar with more visible styling */}
        <div className="w-full h-5 bg-blue-gray-50 rounded-e- overflow-hidden border border-blue-gray-700">
          <div 
            className="h-full bg-blue-500 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Loading Percentage with better visibility */}
        <p className="text-lg font-semibold text-gray-700">
          Loading... {Math.round(progress)}%
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;