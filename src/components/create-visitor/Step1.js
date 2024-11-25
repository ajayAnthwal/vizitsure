"use client";
import { useFormContext } from "react-hook-form";

export default function Step1({ onNext }) {
  const { register, watch, handleSubmit } = useFormContext();
  const mobile = watch("mobile");

  const onSubmit = (data) => {
    onNext(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center max-w-md mx-auto p-6 bg-white rounded-lg shadow-md space-y-4"
    >
      <h2 className="text-xl font-semibold mb-6 text-gray-800 text-center">
        Create Visitor Gate Pass
      </h2>
      <div className="w-full">
        <input
          type="text"
          {...register("mobile", {
            required: "Mobile number is required",
            maxLength: {
              value: 10,
              message: "Mobile number cannot exceed 10 digits",
            },
            minLength: {
              value: 10,
              message: "Mobile number must be 10 digits",
            },
            pattern: {
              value: /^[0-9]+$/,
              message: "Mobile number must be numeric",
            },
          })}
          placeholder="Enter your mobile number"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-sm"
        />
      </div>
      {mobile && mobile.length !== 10 && (
        <p className="text-sm text-red-500">Mobile number must be 10 digits</p>
      )}
      <button
        type="submit"
        disabled={mobile?.length !== 10}
        className={`w-full py-2 px-4 rounded-lg font-medium text-lg transition-all ${
          mobile?.length === 10
            ? "bg-[#565d6f] text-white hover:bg-blue-600 shadow-lg"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
      >
        Next
      </button>
    </form>
  );
}
