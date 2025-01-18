import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router";

const TaxForm = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
 
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const [formData, setFormData] = useState({
    panNumber: "",
    incomeType: [],
    incomeAmount: "",
    deductionType: [],
    deductionAmount: "",
    taxAmount: 0, // Add taxAmount to the form data
  });

  const [panNumber, setPanNumber] = useState("");
  const [panSubmitted, setPanSubmitted] = useState(false);
  const [panError, setPanError] = useState("");

  const [relationshipStatus, setRelationshipStatus] = useState('Individual');

  const [incomeSources, setIncomeSources] = useState([
    { type: "", amount: "" },
  ]);
  const [incomeSubmitted, setIncomeSubmitted] = useState(false);

  const [deductions, setDeductions] = useState([{ type: "", amount: "" }]);
  const [deductionsSubmitted, setDeductionsSubmitted] = useState(false);

  const [taxDetails, setTaxDetails] = useState({
    totalIncome: 0,
    taxableIncome: 0,
    taxAmount: 0,
  });
  const [loading, setLoading] = useState(false);

  const [taxcalculated, setTaxcalculated] = useState(false);

  const [errors, setErrors] = useState({});

  const validatePanNumber = (pan) => /^[A-Za-z0-9]{9}$/.test(pan);

  const { token } = useAuth();

  const handlePanSubmit = (e) => {
    e.preventDefault();
    if (validatePanNumber(panNumber)) {
      setPanError("");
      setPanSubmitted(true);
    } else {
      setPanError("PAN Number must be a 9-character alphanumeric value.");
    }
  };

  const handleInputChange = (list, setList, index, field, value) => {
    const updatedList = [...list];
    updatedList[index][field] = value;
    setList(updatedList);
  };

  const addIncomeSource = () => {
    setIncomeSources([...incomeSources, { type: "", amount: "" }]);
  };

  const handleIncomeSubmit = (e) => {
    e.preventDefault();
    const totalIncome = incomeSources.reduce(
      (sum, income) => sum + parseFloat(income.amount || 0),
      0
    );
    setTaxDetails((prev) => ({ ...prev, totalIncome }));
    setIncomeSubmitted(true);
  };

  const addDeduction = () => {
    setDeductions([...deductions, { type: "", amount: "" }]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      console.error("No token found");
      setErrors({ msg: "No token found" });
      return;
    }

    // Aggregate income and deduction data
    const incomeAmount = incomeSources.reduce(
      (sum, source) => sum + parseFloat(source.amount || 0),
      0
    );
    const incomeType = incomeSources.map((source) => source.type);

    const deductionAmount = deductions.reduce(
      (sum, deduction) => sum + parseFloat(deduction.amount || 0),
      0
    );
    const deductionType = deductions.map((deduction) => deduction.type);

    const userId = user._id;

    // Populate formData
    const finalFormData = {
      userId,
      panNumber,
      incomeType,
      incomeAmount,
      deductionType,
      deductionAmount,
      taxAmount: taxDetails.taxAmount, // Add tax amount if calculated
    };

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      // console.log('Submitting form with data:', finalFormData);
      const res = await axios.post(
        "http://localhost:5001/api/taxForm",
        finalFormData,
        config
      );
      console.log("Response from backend:", res.data);
      navigate("/form-success");
    } catch (err) {
      console.error("Error from backend:", err.response?.data);
      setErrors(err.response?.data?.errors || { msg: err.response?.data?.msg });
    }
  };

  const handleDeductionSubmit = (e) => {
    e.preventDefault();
    const totalDeductions = deductions.reduce(
      (sum, deduction) => sum + parseFloat(deduction.amount || 0),
      0
    );
    const taxableIncome = taxDetails.totalIncome - totalDeductions;
    setTaxDetails((prev) => ({ ...prev, taxableIncome }));
    setDeductionsSubmitted(true);
  };

  const calculateTax = () => {
    setLoading(true);

    const { taxableIncome } = taxDetails;
    let taxAmount = 0;

    // Tax brackets for Individual and Married
    const taxBrackets = {
      Individual: [
        { limit: 500000, rate: 0.01 },
        { limit: 700000, rate: 0.1 },
        { limit: 1000000, rate: 0.2 },
        { limit: 2000000, rate: 0.3 },
        { limit: 5000000, rate: 0.36 },
        { limit: Infinity, rate: 0.39 },
      ],
      Married: [
        { limit: 600000, rate: 0.01 },
        { limit: 800000, rate: 0.1 },
        { limit: 1100000, rate: 0.2 },
        { limit: 2000000, rate: 0.3 },
        { limit: 5000000, rate: 0.36 },
        { limit: Infinity, rate: 0.39 },
      ],
    };

    const brackets = taxBrackets[relationshipStatus];

    for (let i = 0, prevLimit = 0; i < brackets.length; i++) {
      const { limit, rate } = brackets[i];
      if (taxableIncome > prevLimit) {
        const taxableAtThisRate = Math.min(limit, taxableIncome) - prevLimit;
        taxAmount += taxableAtThisRate * rate;
        prevLimit = limit;
      } else {
        break;
      }
    }

    setTimeout(() => {
      setTaxDetails((prev) => ({ ...prev, taxAmount }));
      setLoading(false);
      setTaxcalculated(true);
    }, 1000);
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="bg-white rounded-xl shadow-blue-gray-200 shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-8">
            <h1 className="text-3xl font-bold text-white text-center">
              Tax Declaration Form
            </h1>
            <p className="text-blue-100 text-center mt-2">
              Financial Year {new Date().getFullYear()-1}-{new Date().getFullYear()-2000}
            </p>
          </div>

          <div className="p-6 sm:p-8">
            {/* PAN Section */}
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <h2 className="text-xl font-semibold text-blue-gray-800 mb-4">Personal Information</h2>
              <form onSubmit={handlePanSubmit} onChange={handleChange}>
                <div className="p-4 space-y-4 bg-blue-gray-200 rounded-lg shadow-sm">
                  <div>
                    <label className="block text-sm font-medium text-blue-gray-700">PAN Number</label>
                    <input
                      name="panNumber"
                      type="text"
                      value={formData.panNumber}
                      onChange={(e) => setPanNumber(e.target.value)}
                      className="mt-1 block w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      disabled={panSubmitted}
                    />
                    {panError && <p className="mt-2 text-sm text-red-600">{panError}</p>}
                  </div>
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50"
                    disabled={panSubmitted}
                  >
                    Verify PAN
                  </button>
                </div>
              </form>
            </div>

            {/* Relationship Status */}
            <div className="bg-blue-gray-50 rounded-lg p-6 mb-4 ml-[1.37rem]">
              <h2 className="text-xl font-semibold text-blue-gray-700 mb-4">Filing Status</h2>
              <div className="flex gap-6">
                {['Individual', 'Married'].map((status) => (
                  <label key={status} className="flex items-center">
                    <input
                      type="radio"
                      name="relationship"
                      value={status}
                      checked={relationshipStatus === status}
                      onChange={(e) => setRelationshipStatus(e.target.value)}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      disabled={!panSubmitted}
                    />
                    <span className="ml-2 text-gray-700">{status}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Income Section */}
            <div className="rounded-lg p-6 mb-8">
              <h2 className="text-xl font-semibold text-blue-gray-800 mb-4">Income Declaration</h2>
              <form onSubmit={handleIncomeSubmit} onChange={handleChange}>
                {incomeSources.map((source, index) => (
                  <div key={index} className="mb-6 p-4 bg-blue-gray-200 rounded-lg shadow-sm">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-blue-gray-700 mb-1">
                          Income Source
                        </label>
                        <select
                          value={source.type}
                          onChange={(e) => handleInputChange(incomeSources, setIncomeSources, index, "type", e.target.value)}
                          className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          disabled={!panSubmitted || incomeSubmitted}
                        >
                          <option value="">Select Income Source</option>
                          {["Salary", "Business", "Rental Income", "Investment", "Agriculture", "Freelancing", "Other"].map(
                            (type) => (
                              <option key={type} value={type}>{type}</option>
                            )
                          )}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Amount (NPR)
                        </label>
                        <input
                          type="number"
                          value={source.amount}
                          onChange={(e) => handleInputChange(incomeSources, setIncomeSources, index, "amount", e.target.value)}
                          className="mt-1 p-2 block w-full rounded-md border-blue-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          disabled={!panSubmitted || incomeSubmitted}
                        />
                      </div>
                    </div>
                  </div>
                ))}
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={addIncomeSource}
                    className="px-4 py-2 bg-blue-gray-600 text-white rounded-md hover:bg-blue-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors disabled:opacity-50"
                    disabled={!panSubmitted || incomeSubmitted}
                  >
                    Add Income Source
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50"
                    disabled={!panSubmitted || incomeSubmitted}
                  >
                    Save Income Details
                  </button>
                </div>
              </form>
            </div>

            {/* Deductions Section */}
            <div className="ml-[1.4rem]">
              <h2 className="text-xl font-semibold text-blue-gray-800 mb-4">Tax Deductions</h2>
              <form onSubmit={handleDeductionSubmit} onChange={handleChange}>
                {deductions.map((deduction, index) => (
                  <div key={index} className="mb-6 p-4 bg-blue-gray-50 rounded-lg shadow-sm">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-blue-gray-700 mb-1">
                          Deduction Type
                        </label>
                        <select
                          value={deduction.type}
                          onChange={(e) => handleInputChange(deductions, setDeductions, index, "type", e.target.value)}
                          className="mt-1 p-2 block w-full rounded-md border-blue-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          disabled={!incomeSubmitted || deductionsSubmitted}
                        >
                          <option value="">Select Deduction Type</option>
                          {["Medical Expenses", "Education Expenses", "Home Loan Interest", "Insurance Premiums", 
                            "Charitable Donations", "Retirement Savings", "Business Expenses", "Other"].map(
                            (type) => (
                              <option key={type} value={type}>{type}</option>
                            )
                          )}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-blue-gray-700 mb-1">
                          Amount (NPR)
                        </label>
                        <input
                          type="number"
                          value={deduction.amount}
                          onChange={(e) => handleInputChange(deductions, setDeductions, index, "amount", e.target.value)}
                          className="mt-1 block w-full p-2 rounded-md bg-blue-gray-100 border-blue-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          disabled={!incomeSubmitted || deductionsSubmitted}
                        />
                      </div>
                    </div>
                  </div>
                ))}
                <div className="flex gap-4 ">
                  <button
                    type="button"
                    onClick={addDeduction}
                    className="px-4 py-2 bg-blue-gray-600 text-white rounded-md hover:bg-blue-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors disabled:opacity-50"
                    disabled={!incomeSubmitted || deductionsSubmitted}
                  >
                    Add Deduction
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50"
                    disabled={!incomeSubmitted || deductionsSubmitted}
                  >
                    Save Deductions
                  </button>
                </div>
              </form>
            </div>

            {/* Tax Calculation Section */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Tax Calculation</h2>
              <button
                onClick={calculateTax}
                className="w-full sm:w-auto px-6 py-3 bg-red-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors disabled:opacity-50"
                disabled={!deductionsSubmitted}
              >
                Calculate Tax Liability
              </button>

              {loading && (
                <div className="flex justify-center mt-6">
                  <ClipLoader size={50} color="#2563eb" />
                </div>
              )}

              {!loading && taxDetails.taxAmount > 0 && (
                <div className="mt-6 bg-white rounded-lg shadow-sm p-6">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Total Income
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Taxable Income
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Tax Amount
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4">NPR {taxDetails.totalIncome.toLocaleString()}</td>
                        <td className="px-6 py-4">NPR {taxDetails.taxableIncome.toLocaleString()}</td>
                        <td className="px-6 py-4">NPR {taxDetails.taxAmount.toLocaleString()}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}

              {taxcalculated && (
                <button
                  onClick={handleSubmit}
                  className="mt-6 w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                >
                  Submit Tax Declaration
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaxForm;
