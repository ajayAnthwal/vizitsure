"use client";
import { useForm, FormProvider } from "react-hook-form";
import { useState, useEffect } from "react";
import Step1 from "@/components/create-visitor/Step1";
import Step2 from "@/components/create-visitor/Step2";
import Step3 from "@/components/create-visitor/Step3";
import Step4 from "@/components/create-visitor/Step4";
import Step5 from "@/components/create-visitor/Step5";

export default function CreateVisitorGatePass() {
  const methods = useForm({
    defaultValues: {
      name: "",
      address: "",
      contact: "",
      companyName: "",
      purpose: "",
      inTime: "",
      outTime: "",
      visitedPerson: "",
      photo: null,
      documentType: "",
      department: "",
      staff: "",
      visitType: "",
    },
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("visitorForm")) || {};
    setFormData(savedData);
  }, []);

  const saveToLocalStorage = (data) => {
    const updatedData = { ...formData, ...data };
    setFormData(updatedData);
    localStorage.setItem("visitorForm", JSON.stringify(updatedData));
  };

  const handleNext = (data) => {
    saveToLocalStorage(data);
    setCurrentStep((prev) => prev + 1);
  };

  const handlePrev = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleConfirm = () => {
    console.log("Final Submitted Data:", formData);
    alert("Visitor Gate Pass Created Successfully!");
    localStorage.removeItem("visitorForm");
  };

  return (
    <FormProvider {...methods}>
      <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
        <div className="w-full max-w-md bg-white p-6 rounded shadow-lg">
          {currentStep === 1 && <Step1 onNext={handleNext} />}
          {currentStep === 2 && (
            <Step2 onPrev={handlePrev} onNext={handleNext} />
          )}
          {currentStep === 3 && (
            <Step3 onPrev={handlePrev} onNext={handleNext} />
          )}
          {currentStep === 4 && (
            <Step4 onPrev={handlePrev} onNext={handleNext} />
          )}
          {currentStep === 5 && (
            <Step5
              data={formData}
              onPrev={handlePrev}
              onConfirm={handleConfirm}
            />
          )}
        </div>
      </div>
    </FormProvider>
  );
}
