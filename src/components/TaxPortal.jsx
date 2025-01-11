import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TaxPortal = () => {
  const img = "https://images.unsplash.com/photo-1554224155-a1487473ffd9?q=80&w=1570&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  const [panNumber, setPanNumber] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validatePan(panNumber)) {
      navigate('/incomedeclaration'); // Replace with the actual path of the next page
    } else {
      setError('Invalid PAN number');
    }
  };

  const validatePan = (pan) => {
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    return panRegex.test(pan);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <img src={img} alt="img" className="absolute mt-5 inset-0 w-full h-full object-cover backdrop-blur-xl" />
      <div className="relative max-w-4xl mx-auto my-5 p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-4xl font-bold text-center mb-8 text-blue-800">Tax Portal</h1>
        <p className="text-center mb-8 text-gray-700">
          Welcome to the Tax Portal. Please enter your PAN number to access your tax information and services.
        </p>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium mb-1">PAN Number</label>
            <input
              type="text"
              name="panNumber"
              value={panNumber}
              onChange={(e) => setPanNumber(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
              placeholder="Enter your PAN number"
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>
          <button type="submit" className="w-full bg-blue-800 hover:bg-blue-600 text-white py-2 roundedtransition duration-200">
            Submit
          </button>
        </form>
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4 text-blue-600">Services</h2>
          <ul className="list-disc list-inside text-gray-700">
            <li>Income Declarations</li>
            <li>Tax Deductions</li>
            <li>Tax Calculation</li>
            <li>Tax Payment History</li>
            <li>Download Tax Forms</li>
          </ul>
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4 text-blue-600">Contact Support</h2>
          <p className="text-gray-700">
            If you have any questions or need assistance, please contact our support team at <a href="mailto:support@taxportal.gov.np" className="text-blue-600">support@taxportal.gov.np</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TaxPortal;