import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { TaxContext } from '../context/TaxContext';

const IncomeDeclaration = () => {
  const { setIncome } = useContext(TaxContext);
  const [incomeSources, setIncomeSources] = useState([{ type: '', amount: '' }]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (index, event) => {
    const values = [...incomeSources];
    values[index][event.target.name] = event.target.value;
    setIncomeSources(values);
  };

  const handleAddIncomeSource = () => {
    setIncomeSources([...incomeSources, { type: '', amount: '' }]);
  };

  const handleRemoveIncomeSource = (index) => {
    const values = [...incomeSources];
    values.splice(index, 1);
    setIncomeSources(values);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const totalIncome = incomeSources.reduce((acc, source) => acc + parseFloat(source.amount), 0);
      setIncome(totalIncome);
      navigate('/taxdeduction');
    } else {
      setError('Please fill out all fields correctly.');
    }
  };

  const validateForm = () => {
    return incomeSources.every(source => source.type && source.amount && !isNaN(source.amount));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-4 text-center text-blue-600">Income Declaration</h1>
        <p className="text-center text-gray-700 mb-6">
          Please disclose your different income sources and their amounts.
        </p>
        <form onSubmit={handleSubmit}>
  {incomeSources.map((source, index) => (
    <div key={index} className="relative mb-4">
      <label htmlFor={`type-${index}`} className="block text-gray-700 font-bold mb-2">Income Source Type:</label>
      <select
        id={`type-${index}`}
        name="type"
        value={source.type}
        onChange={event => handleInputChange(index, event)}
        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
      >
        <option value="">Select Income Source</option>
        <option value="Salary">Salary</option>
        <option value="Business">Business</option>
        <option value="Rental Income">Rental Income</option>
        <option value="Investment">Investment</option>
        <option value="Agriculture">Agriculture</option>
        <option value="Freelancing">Freelancing</option>
        <option value="Other">Other</option>
      </select>
      <label htmlFor={`amount-${index}`} className="block text-gray-700 font-bold mb-2">Amount:</label>
      <input
        type="text"
        id={`amount-${index}`}
        name="amount"
        value={source.amount}
        onChange={event => handleInputChange(index, event)}
        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
      />
      <button
        type="button"
        onClick={() => handleRemoveIncomeSource(index)}
        className="bg-red-600 hover:bg-red-400 p-2 rounded-md shadow-sm text-white"
      >
        Remove
      </button>
    </div>
  ))}
  <button
    type="button"
    onClick={handleAddIncomeSource}
    className="w-full bg-blue-gray-400 text-white py-2 rounded hover:bg-blue-gray-700 transition duration-200 mb-4"
  >
    Add Income Source
  </button>
  <button
    type="submit"
    className="w-full bg-blue-800 text-white py-2 rounded hover:bg-blue-500 transition duration-200"
  >
    Submit
  </button>
</form>
      </div>
    </div>
  );
};

export default IncomeDeclaration;