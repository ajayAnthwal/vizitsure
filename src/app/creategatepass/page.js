"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { createGatePass } from "@/lib/api";
import { useState, useEffect } from "react";
import Loader from "@/components/Loader";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CreateGatePass() {
  const router = useRouter();
  const { register, watch, handleSubmit } = useForm();
  const [visitorData, setVisitorData] = useState(null);
  const [loading, setLoading] = useState(false);
  const mobile = watch("mobile");

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      console.log("Fetching data for mobile:", data.mobile);
      const response = await createGatePass(data.mobile);
      console.log("Visitor Data:", response);
  
      if (response?.data?.length > 0) {
        setVisitorData(response.data[0].attributes);
        toast.success("Visitor found!");
      } else {
        toast.error("No visitor found, redirecting...");
        setTimeout(() => {
          router.push("/visitor-gate-pass");
        }, 2000);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to fetch visitor data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md space-y-4">
        <h2 className="text-xl font-semibold mb-6 text-gray-800 text-center">
          Create Visitor Gate Pass
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            type="text"
            {...register("mobile", {
              required: "Mobile number is required",
              maxLength: { value: 10, message: "Must be 10 digits" },
              minLength: { value: 10, message: "Must be 10 digits" },
              pattern: { value: /^[0-9]+$/, message: "Must be numeric" },
            })}
            placeholder="Enter your mobile number"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-sm"
          />
          {mobile && mobile.length !== 10 && (
            <p className="text-sm text-red-500">
              Mobile number must be 10 digits
            </p>
          )}
          <button
            type="submit"
            disabled={mobile?.length !== 10 || loading}
            className={`w-full py-2 px-4 rounded-lg font-medium text-lg transition-all ${
              mobile?.length === 10
                ? "bg-[#565d6f] text-white hover:bg-blue-600 shadow-lg"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {loading ? <Loader /> : "Next"}
          </button>
        </form>

        {visitorData && (
          <div className="p-4 border border-gray-300 rounded-lg mt-4">
            <h3 className="text-lg font-semibold">Visitor Details</h3>
            {visitorData?.profile?.data?.attributes?.url && (
              <img 
                src={visitorData.profile.data.attributes.url} 
                alt="Visitor Image" 
                className="w-24 h-24 object-cover rounded-full mx-auto mb-4 border"
              />
            )}
            <p><strong>Name:</strong> {visitorData.name || "N/A"}</p>
            <p><strong>Email:</strong> {visitorData.email || "N/A"}</p>
            <p><strong>Mobile:</strong> {visitorData.mobile || "N/A"}</p>
            <p><strong>Address:</strong> {visitorData.address || "N/A"}</p>
            <p><strong>Company:</strong> {visitorData.company?.company_name || "N/A"}</p>
          </div>
        )}
      </div>
    </div>
  );
}
