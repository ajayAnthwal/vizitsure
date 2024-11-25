"use client";
import { useFormContext } from "react-hook-form";

export default function Step5({ onPrev, onSubmit }) {
  const { getValues } = useFormContext();
  const formData = getValues();

  const handleFinalSubmit = () => {
    onSubmit(formData);
  };

  return (
    <div className="space-y-4 ">
      <h2 className="text-xl font-semibold text-center">Review Your Details</h2>
      <div className="border rounded p-4 space-y-2">
        <h3 className="text-lg font-medium">Visitor Details</h3>
        <p>
          <strong>Name:</strong> {formData.name}
        </p>
        <p>
          <strong>Address:</strong> {formData.address}
        </p>
        <p>
          <strong>Contact No.:</strong> {formData.mobile || "N/A"}
        </p>
        <p>
          <strong>Company Name:</strong> {formData.company}
        </p>
        <p>
          <strong>Purpose:</strong> {formData.visitType}
        </p>
      </div>
      <div className="border rounded p-4 space-y-2">
        <h3 className="text-lg font-medium">Visit Details</h3>
        <p>
          <strong>In Time:</strong> {formData.inTime}
        </p>
        <p>
          <strong>Out Time:</strong> {formData.outTime}
        </p>
        <p>
          <strong>Visited Person:</strong> {formData.visitedPerson}
        </p>
      </div>
      <div className="border rounded p-4 space-y-2">
        <h3 className="text-lg font-medium">Signatures</h3>
        <p>
          <strong>Security Signature:</strong>{" "}
          {formData.securitySignature ? (
            <img
              src={URL.createObjectURL(formData.securitySignature)}
              alt="Security Signature"
              className="w-32 h-32 object-cover"
            />
          ) : (
            "Not provided"
          )}
        </p>
        <p>
          <strong>Visitor Signature:</strong>{" "}
          {formData.visitorSignature ? (
            <img
              src={URL.createObjectURL(formData.visitorSignature)}
              alt="Visitor Signature"
              className="w-32 h-32 object-cover"
            />
          ) : (
            "Not provided"
          )}
        </p>
        <p>
          <strong>Person Visited Signature:</strong>{" "}
          {formData.visitedPersonSignature ? (
            <img
              src={URL.createObjectURL(formData.visitedPersonSignature)}
              alt="Person Visited Signature"
              className="w-32 h-32 object-cover"
            />
          ) : (
            "Not provided"
          )}
        </p>
      </div>

      <div className="border rounded p-4">
        <h3 className="text-lg font-medium">Photo</h3>
        {formData.photo ? (
          <img
            src={URL.createObjectURL(formData.photo)}
            alt="Uploaded Profile Photo"
            className="w-40 h-40 object-cover border"
          />
        ) : (
          <p>No photo uploaded.</p>
        )}
      </div>
      <div className="border rounded p-4 space-y-2">
        <h3 className="text-lg font-medium">Documents</h3>
        {formData.documents && formData.documents.length > 0 ? (
          <div className="flex flex-wrap gap-4">
            {formData.documents.map((doc, index) => (
              <div key={index} className="w-40 h-40 border relative">
                <img
                  src={URL.createObjectURL(doc)}
                  alt={`Uploaded Document ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-1 rounded">
                  {(formData.documentTypes && formData.documentTypes[index]) ||
                    "Document"}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p>No documents uploaded.</p>
        )}
      </div>
      <div className="flex justify-between">
        <button
          type="button"
          onClick={onPrev}
          className="bg-gray-500 text-white px-4 py-2"
        >
          Prev
        </button>
        <button
          type="button"
          onClick={handleFinalSubmit}
          className="bg-gray-500 text-white px-4 py-2"
        >
          Confirm
        </button>
      </div>
    </div>
  );
}
