import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";

const TaxPortal = () => {
  const [taxDetails, setTaxDetails] = useState({
    taxableIncome: 0,
    taxAmount: 0,
  });

  const taxSlabs = [
    { limit: 400000, rate: 0.01 },
    { limit: 500000, rate: 0.1 },
    { limit: Infinity, rate: 0.2 },
  ];

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // Parse all inputs as numbers, defaulting to 0 if empty
    const grossIncome = parseFloat(data.income) || 0;
    const medicalInsurance = parseFloat(data.medicalInsurance) || 0;
    const providentFund = parseFloat(data.providentFund) || 0;
    const charity = parseFloat(data.charity) || 0;

    // Sum all deductions
    const totalDeductions = medicalInsurance + providentFund + charity;

    // Calculate taxable income
    const taxableIncome = grossIncome - totalDeductions;

    // Initialize tax calculation
    let remainingIncome = taxableIncome > 0 ? taxableIncome : 0;
    let taxAmount = 0;

    // Apply tax slabs
    for (const slab of taxSlabs) {
      if (remainingIncome <= 0) break;
      const taxableAtThisRate = Math.min(remainingIncome, slab.limit);
      taxAmount += taxableAtThisRate * slab.rate;
      remainingIncome -= slab.limit;
    }

    // Update tax details
    setTaxDetails({
      taxableIncome: taxableIncome > 0 ? taxableIncome : 0,
      taxAmount: taxAmount.toFixed(2),
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-50 to-blue-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-lg bg-white p-8 rounded-lg shadow-xl"
      >
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
          Nepali Tax Payment Portal
        </h1>

        {/* PAN Number */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            PAN Number
          </label>
          <input
            type="text"
            {...register("panNumber", {
              required: "PAN Number is required",
              pattern: {
                value: /^[0-9]{9}$/,
                message: "PAN must be a 9-digit number",
              },
            })}
            className={`w-full px-4 py-2 border ${
              errors.panNumber ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:outline-none focus:ring focus:ring-blue-300`}
          />
          {errors.panNumber && (
            <p className="text-red-500 text-sm mt-1">
              {errors.panNumber.message}
            </p>
          )}
        </div>

        {/* Income */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Gross Income (NRs)
          </label>
          <input
            type="number"
            {...register("income", { required: "Gross Income is required" })}
            className={`w-full px-4 py-2 border ${
              errors.income ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:outline-none focus:ring focus:ring-blue-300`}
          />
          {errors.income && (
            <p className="text-red-500 text-sm mt-1">{errors.income.message}</p>
          )}
        </div>

        {/* Deductions */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Deductions
          </label>
          <div className="space-y-2">
            {/* Medical Insurance */}
            <div>
              <label className="block text-gray-600">Medical Insurance</label>
              <input
                type="number"
                defaultValue={0} // Default to 0
                {...register("medicalInsurance")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>

            {/* Provident Fund */}
            <div>
              <label className="block text-gray-600">Provident Fund</label>
              <input
                type="number"
                defaultValue={0} // Default to 0
                {...register("providentFund")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>

            {/* Charity */}
            <div>
              <label className="block text-gray-600">Charity</label>
              <input
                type="number"
                defaultValue={0} // Default to 0
                {...register("charity")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Payment Method
          </label>
          <select
            {...register("paymentMethod", {
              required: "Payment Method is required",
            })}
            className={`w-full px-4 py-2 border ${
              errors.paymentMethod ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:outline-none focus:ring focus:ring-blue-300`}
          >
            <option value="">Select a Payment Method</option>
            <option value="connectIPS">ConnectIPS</option>
            <option value="esewa">eSewa</option>
            <option value="mobileBanking">Mobile Banking</option>
          </select>
          {errors.paymentMethod && (
            <p className="text-red-500 text-sm mt-1">
              {errors.paymentMethod.message}
            </p>
          )}
        </div>

        {/* Tax Details */}
        <div className="mb-4 p-4 bg-gray-100 rounded-lg">
          <p className="text-gray-700 font-medium">
            Taxable Income: NRs {taxDetails.taxableIncome}
          </p>
          <p className="text-gray-700 font-medium">
            Tax Amount: NRs {taxDetails.taxAmount}
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white bg-black py-2 px-4 rounded-lg hover:bg-blue-700 transition"
        >
          Submit & Proceed to Pay
        </button>
      </form>
    </div>
  );
};

export default TaxPortal;
