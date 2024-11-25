"use client";
import { useFormContext } from "react-hook-form";
import { useState } from "react";

export default function Step4({ onPrev, onNext }) {
  const { register, handleSubmit } = useFormContext();
  const [activeAccordion, setActiveAccordion] = useState(null);

  const toggleAccordion = (key) => {
    setActiveAccordion(activeAccordion === key ? null : key);
  };

  const onSubmit = (data) => {
    onNext(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h2 className="text-xl font-semibold text-center">
        Create Visitor Gate Pass
      </h2>
      <div className="border rounded">
        <button
          type="button"
          className="w-full text-left px-4 py-2 font-semibold flex justify-between items-center"
          onClick={() => toggleAccordion("department")}
        >
          Select Department
          <span>{activeAccordion === "department" ? "-" : "+"}</span>
        </button>
        {activeAccordion === "department" && (
          <div className="border-t px-4 py-2">
            <input
              type="text"
              placeholder="Type to search Department..."
              {...register("department", { required: true })}
              className="w-full border rounded px-2 py-1"
            />
          </div>
        )}
      </div>
      <div className="border rounded">
        <button
          type="button"
          className="w-full text-left px-4 py-2 font-semibold flex justify-between items-center"
          onClick={() => toggleAccordion("staff")}
        >
          Select Staff
          <span>{activeAccordion === "staff" ? "-" : "+"}</span>
        </button>
        {activeAccordion === "staff" && (
          <div className="border-t px-4 py-2">
            <input
              type="text"
              placeholder="Type to search Staff..."
              {...register("staff")}
              className="w-full border rounded px-2 py-1"
            />
          </div>
        )}
      </div>

      <div className="border rounded">
        <button
          type="button"
          className="w-full text-left px-4 py-2 font-semibold flex justify-between items-center"
          onClick={() => toggleAccordion("visitType")}
        >
          Select Visit Type
          <span>{activeAccordion === "visitType" ? "-" : "+"}</span>
        </button>
        {activeAccordion === "visitType" && (
          <div className="border-t px-4 py-2">
            <select
              {...register("visitType", { required: true })}
              className="w-full border rounded px-2 py-1"
            >
              <option value="">Select Visit Type</option>
              <option value="official">Official</option>
              <option value="personal">Personal</option>
            </select>
          </div>
        )}
      </div>

      <div className="flex justify-between mt-4">
        <button
          type="button"
          onClick={onPrev}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Prev
        </button>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Next
        </button>
      </div>
    </form>
  );
}
