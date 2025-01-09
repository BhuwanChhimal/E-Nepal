import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { TaxContext } from '../context/TaxContext';

const TaxCalculation = () => {
  const img = "https://images.unsplash.com/photo-1554224154-26032ffc0d07?q=80&w=1526&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  const { income, deductions } = useContext(TaxContext);
  const [taxAmount, setTaxAmount] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const calculateTax = () => {
    setLoading(true);
    setTimeout(() => {
      const taxableIncome = income - deductions;
      const tax = calculateTaxAmount(taxableIncome);
      setTaxAmount(tax);
      setLoading(false);
    }, 2000); // Simulate a delay for calculation
  };

  const calculateTaxAmount = (taxableIncome) => {
    let tax = 0;
    if (taxableIncome <= 400000) {
      tax = taxableIncome * 0.01; // 1% for income up to NPR 400,000
    } else if (taxableIncome <= 500000) {
      tax = 400000 * 0.01 + (taxableIncome - 400000) * 0.1; // 10% for income between NPR 400,001 and NPR 500,000
    } else if (taxableIncome <= 700000) {
      tax = 400000 * 0.01 + 100000 * 0.1 + (taxableIncome - 500000) * 0.2; // 20% for income between NPR 500,001 and NPR 700,000
    } else {
      tax = 400000 * 0.01 + 100000 * 0.1 + 200000 * 0.2 + (taxableIncome - 700000) * 0.3; // 30% for income above NPR 700,000
    }
    return tax;
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <img src={img} alt="background" className="absolute inset-0 w-full h-full object-cover mt-5" />
      <div className="relative max-w-4xl mx-auto my-5 p-8 bg-white rounded-lg shadow-md w-full">
        <h1 className="text-3xl font-bold mb-4 text-center text-blue-600">Tax Calculation</h1>
        <p className="text-center text-gray-700 mb-6">
          Calculating your tax based on your income and deductions.
        </p>
        {loading ? (
          <div className="flex justify-center">
            <ClipLoader size={50} color={"#123abc"} loading={loading} />
          </div>
        ) : taxAmount !== null ? (
          <div className="text-center">
            <p className="text-xl font-bold mb-4">Your calculated tax amount is: NPR <span className='text-light-blue-700'>{taxAmount.toFixed(2)}</span></p>
            <button
              onClick={() => navigate('/tax-payment')}
              className="w-full bg-red-300 hover:bg-red-500 text-white py-2 rounded hover:bg-green-600 transition duration-200"
            >
              Proceed to Pay Tax
            </button>
          </div>
        ) : (
          <div className="text-center">
            <button
              onClick={calculateTax}
              className="w-full bg-red-400 text-white py-2 rounded hover:bg-red-600 transition duration-200"
            >
              Calculate Tax
            </button>
          </div>
        )}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4 text-blue-600">Tax Calculation Details</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Description</th>
                  <th className="py-2 px-4 border-b">Amount (NPR)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2 px-4 border-b">Total Income</td>
                  <td className="py-2 px-4 border-b">{income.toFixed(2)}</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b">Total Deductions</td>
                  <td className="py-2 px-4 border-b">{deductions.toFixed(2)}</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b">Taxable Income</td>
                  <td className="py-2 px-4 border-b">{(income - deductions).toFixed(2)}</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b">Tax Amount</td>
                  <td className="py-2 px-4 border-b">{taxAmount !== null ? taxAmount.toFixed(2) : 'N/A'}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaxCalculation;