
import { useEffect } from 'react';
import { useForm } from 'react-hook-form'

const NationalId = () => {
  useEffect(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }, []);
    const {
        register,
        handleSubmit,
        formState: { errors },
        // watch,
      } = useForm();
    
      const onSubmit = (data) => {
        console.log("Form Data Submitted:", data);
      };
    
      // const citizenshipImage = watch("citizenshipImage");
      // const passportImage = watch("passportImage");
    
      return (
        <div className="max-w-4xl mx-auto my-5 p-6 bg-gray-light shadow-lg rounded-md">
          <h1 className="text-2xl font-bold text-center text-blue-800 mb-6">National Identity Registration Form</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Personal Details */}
            <div>
              <h2 className="text-lg font-semibold mb-2">Personal Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium">First Name</label>
                  <input
                    type="text"
                    {...register("firstName", { required: "First Name is required" })}
                    className="w-full border border-gray-300 rounded-md p-2"
                  />
                  {errors.firstName && (
                    <span className="text-red-500 text-sm">{errors.firstName.message}</span>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium">Middle Name</label>
                  <input
                    type="text"
                    {...register("middleName")}
                    className="w-full border border-gray-300 rounded-md p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Last Name</label>
                  <input
                    type="text"
                    {...register("lastName", { required: "Last Name is required" })}
                    className="w-full border border-gray-300 rounded-md p-2"
                  />
                  {errors.lastName && (
                    <span className="text-red-500 text-sm">{errors.lastName.message}</span>
                  )}
                </div>
              </div>
            </div>
    
            {/* Date of Birth */}
            <div>
              <label className="block text-sm font-medium">Date of Birth (AD)</label>
              <input
                type="date"
                {...register("dateOfBirth", { required: "Date of Birth is required" })}
                className="w-full border border-gray-300 rounded-md p-2"
              />
              {errors.dateOfBirth && (
                <span className="text-red-500 text-sm">{errors.dateOfBirth.message}</span>
              )}
            </div>
    
            {/* Citizenship Image */}
            <div>
              <label className="block text-sm font-medium">Upload Citizenship Image</label>
              <input
                type="file"
                accept="image/*"
                {...register("citizenshipImage", {
                  required: "Citizenship image is required",
                  validate: (file) =>
                    file && file[0].size <= 5 * 1024 * 1024
                      ? true
                      : "File size must be less than 5MB",
                })}
                className="w-full border border-gray-300 rounded-md p-2"
              />
              {errors.citizenshipImage && (
                <span className="text-red-500 text-sm">{errors.citizenshipImage.message}</span>
              )}
            </div>
    
            {/* Address Details */}
            <div>
              <h2 className="text-lg font-semibold mb-2">Permanent Address</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium">Province</label>
                  <input
                    type="text"
                    {...register("permanentProvince", { required: "Province is required" })}
                    className="w-full border border-gray-300 rounded-md p-2"
                  />
                  {errors.permanentProvince && (
                    <span className="text-red-500 text-sm">{errors.permanentProvince.message}</span>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium">District</label>
                  <input
                    type="text"
                    {...register("permanentDistrict", { required: "District is required" })}
                    className="w-full border border-gray-300 rounded-md p-2"
                  />
                  {errors.permanentDistrict && (
                    <span className="text-red-500 text-sm">{errors.permanentDistrict.message}</span>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium">Ward Number</label>
                  <input
                    type="number"
                    {...register("permanentWardNumber", { required: "Ward Number is required" })}
                    className="w-full border border-gray-300 rounded-md p-2"
                  />
                  {errors.permanentWardNumber && (
                    <span className="text-red-500 text-sm">{errors.permanentWardNumber.message}</span>
                  )}
                </div>
              </div>
            </div>
    
            <div>
              <h2 className="text-lg font-semibold mb-2">Temporary Address</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium">Province</label>
                  <input
                    type="text"
                    {...register("temporaryProvince")}
                    className="w-full border border-gray-300 rounded-md p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">District</label>
                  <input
                    type="text"
                    {...register("temporaryDistrict")}
                    className="w-full border border-gray-300 rounded-md p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Ward Number</label>
                  <input
                    type="number"
                    {...register("temporaryWardNumber")}
                    className="w-full border border-gray-300 rounded-md p-2"
                  />
                </div>
              </div>
            </div>
    
            {/* Passport Size Image */}
            <div>
              <label className="block text-sm font-medium">Upload Passport-Size Image</label>
              <input
                type="file"
                accept="image/*"
                {...register("passportImage", {
                  required: "Passport-size image is required",
                  validate: (file) =>
                    file && file[0].size <= 5 * 1024 * 1024
                      ? true
                      : "File size must be less than 5MB",
                })}
                className="w-full border border-gray-300 rounded-md p-2"
              />
              {errors.passportImage && (
                <span className="text-red-500 text-sm">{errors.passportImage.message}</span>
              )}
            </div>
    
            {/* Submit Button */}
            <div className="text-center flex justify-end">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-800 shadow-lg text-white bg-black font-bold rounded-md hover:bg-blue-600"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      );
    };

export default NationalId