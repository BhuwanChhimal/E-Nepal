import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { TaxContext } from '../context/TaxContext';

const TaxDeduction = () => {
  const { setDeductions } = useContext(TaxContext);
  const [selectedDeductions, setSelectedDeductions] = useState([]);
  const [deductionAmounts, setDeductionAmounts] = useState({});
  const [otherDeduction, setOtherDeduction] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const taxDeductions = [
    'Medical Expenses',
    'Education Expenses',
    'Home Loan Interest',
    'Insurance Premiums',
    'Charitable Donations',
    'Retirement Savings',
    'Business Expenses',
    'Other'
  ];

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedDeductions([...selectedDeductions, value]);
    } else {
      setSelectedDeductions(selectedDeductions.filter(deduction => deduction !== value));
      const updatedAmounts = { ...deductionAmounts };
      delete updatedAmounts[value];
      setDeductionAmounts(updatedAmounts);
      if (value === 'Other') {
        setOtherDeduction('');
      }
    }
  };

  const handleAmountChange = (event) => {
    const { name, value } = event.target;
    setDeductionAmounts({ ...deductionAmounts, [name]: value });
  };

  const handleOtherDeductionChange = (event) => {
    setOtherDeduction(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const totalDeductions = selectedDeductions.reduce((acc, deduction) => acc + parseFloat(deductionAmounts[deduction]), 0);
      setDeductions(totalDeductions);
      navigate('/tax-calculation');
    } else {
      setError('Please fill out all fields correctly.');
    }
  };

  const validateForm = () => {
    return selectedDeductions.length > 0 && selectedDeductions.every(deduction => {
      if (deduction === 'Other') {
        return otherDeduction && deductionAmounts[deduction] && !isNaN(deductionAmounts[deduction]);
      }
      return deductionAmounts[deduction] && !isNaN(deductionAmounts[deduction]);
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold mb-4 text-center text-blue-600">Tax Deductions</h1>
        <p className="text-center text-gray-700 mb-6">
          Please select the types of tax deductions you are eligible for and enter the amount for each.
        </p>
        <form onSubmit={handleSubmit}>
          {taxDeductions.map((deduction, index) => (
            <div key={index} className="mb-4">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  value={deduction}
                  onChange={handleCheckboxChange}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span className="ml-2 text-gray-700">{deduction}</span>
              </label>
              {selectedDeductions.includes(deduction) && deduction !== 'Other' && (
                <input
                  type="text"
                  name={deduction}
                  value={deductionAmounts[deduction] || ''}
                  onChange={handleAmountChange}
                  placeholder="Enter amount"
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2"
                />
              )}
              {selectedDeductions.includes(deduction) && deduction === 'Other' && (
                <>
                  <input
                    type="text"
                    name="otherDeduction"
                    value={otherDeduction}
                    onChange={handleOtherDeductionChange}
                    placeholder="Specify other deduction"
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2"
                  />
                  <input
                    type="text"
                    name={deduction}
                    value={deductionAmounts[deduction] || ''}
                    onChange={handleAmountChange}
                    placeholder="Enter amount"
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2"
                  />
                </>
              )}
            </div>
          ))}
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <button type="submit" className="w-full bg-blue-gray-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default TaxDeduction;