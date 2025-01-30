import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Confetti from 'react-confetti';
const FormSuccess = () => {
    useEffect(() => {
      window.scrollTo({
        top: 100,
        behavior: 'smooth'
      });
    }, []);
  return (
    <div className="max-w-4xl mx-auto my-[7rem] bg-gray-light p-8 rounded-lg shadow-md text-center">
      <Confetti
        numberOfPieces={200}
        recycle={false}
        gravity={0.3}
      />
      <h1 className="text-4xl font-bold text-green-600 mb-8">Form Submitted Successfully!</h1>
      <p className="text-lg mb-8">Thank you for submitting the form. We will process your request shortly.</p>
      <Link to="/" className="px-6 py-2 bg-blue-800 shadow-lg text-white font-bold rounded-md hover:bg-blue-600">
        Go to Home
      </Link>
    </div>
  );
};

export default FormSuccess;