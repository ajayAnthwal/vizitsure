"use client";

import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { login } from "@/lib/api";
import Loader from "@/components/Loader";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("auth");
    if (token) {
      window.location.href = "/";
    }
  }, []);

  const onSubmit = async (data) => {
    setLoading(true);

    const { mobileNumber, password } = data; // Use mobile number instead of email

    try {
      const response = await login(mobileNumber, password); // Send mobile number to API
      if (response.success) {
        toast.success("Login successful!");
        const token = localStorage.getItem("auth");
        if (token) {
          setInterval(() => {
            window.location.href = "/";
          }, 1000);
        }
      } else {
        toast.error(response.message || "Invalid mobile number or password.");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Loader loading={loading} />
      <ToastContainer />
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label
              htmlFor="mobileNumber"
              className="block text-gray-700 font-medium mb-2"
            >
              Mobile Number
            </label>
            <input
              type="text"
              id="mobileNumber"
              placeholder="Enter your mobile number"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              {...register("mobileNumber", {
                required: "Mobile number is required",
                pattern: {
                  value: /^[0-9]{10}$/, // Validate mobile number format
                  message: "Invalid mobile number format",
                },
              })}
            />
            {errors.mobileNumber && (
              <p className="text-red-500 text-sm mt-2">
                {errors.mobileNumber.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-2">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className={`w-full bg-blue-500 text-white py-2 rounded-md mt-4 hover:bg-blue-600 focus:outline-none ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
