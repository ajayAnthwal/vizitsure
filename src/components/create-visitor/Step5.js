"use client";
import { useFormContext } from "react-hook-form";
import { useState, useEffect } from "react";
import {
  FaUser,
  FaClipboardList,
  FaClock,
  FaUserTie,
  FaPrint,
  FaDownload,
  FaCamera,
  FaIdCard,
} from "react-icons/fa";

export default function Step5({ onPrev, onSubmit }) {
  const { getValues, setValue } = useFormContext();
  const [formData, setFormData] = useState({});
  const [showGatePass, setShowGatePass] = useState(false);
  const [gatePassData, setGatePassData] = useState(null);
  const [photoUrls, setPhotoUrls] = useState({
    photo: null,
    securitySignature: null,
    visitorSignature: null,
    visitedPersonSignature: null,
    documents: [],
  });
  useEffect(() => {
    const values = getValues();
    setFormData(values);
    createObjectURLs(values);
  }, [getValues]);
  const createObjectURLs = (data) => {
    const urls = {
      photo: null,
      securitySignature: null,
      visitorSignature: null,
      visitedPersonSignature: null,
      documents: [],
    };
    if (data.photo) {
      if (typeof data.photo === "object") {
        urls.photo = URL.createObjectURL(data.photo);
      } else {
        urls.photo = data.photo;
      }
    }
    if (data.securitySignature) {
      if (typeof data.securitySignature === "object") {
        urls.securitySignature = URL.createObjectURL(data.securitySignature);
      } else {
        urls.securitySignature = data.securitySignature;
      }
    }

    if (data.visitorSignature) {
      if (typeof data.visitorSignature === "object") {
        urls.visitorSignature = URL.createObjectURL(data.visitorSignature);
      } else {
        urls.visitorSignature = data.visitorSignature;
      }
    }

    if (data.visitedPersonSignature) {
      if (typeof data.visitedPersonSignature === "object") {
        urls.visitedPersonSignature = URL.createObjectURL(
          data.visitedPersonSignature
        );
      } else {
        urls.visitedPersonSignature = data.visitedPersonSignature;
      }
    }
    if (
      data.documents &&
      Array.isArray(data.documents) &&
      data.documents.length > 0
    ) {
      urls.documents = data.documents.map((doc) => {
        if (typeof doc === "object") {
          return URL.createObjectURL(doc);
        }
        return doc;
      });
    }

    setPhotoUrls(urls);
  };
  useEffect(() => {
    return () => {
      if (photoUrls.photo && photoUrls.photo.startsWith("blob:")) {
        URL.revokeObjectURL(photoUrls.photo);
      }
      if (
        photoUrls.securitySignature &&
        photoUrls.securitySignature.startsWith("blob:")
      ) {
        URL.revokeObjectURL(photoUrls.securitySignature);
      }
      if (
        photoUrls.visitorSignature &&
        photoUrls.visitorSignature.startsWith("blob:")
      ) {
        URL.revokeObjectURL(photoUrls.visitorSignature);
      }
      if (
        photoUrls.visitedPersonSignature &&
        photoUrls.visitedPersonSignature.startsWith("blob:")
      ) {
        URL.revokeObjectURL(photoUrls.visitedPersonSignature);
      }
      photoUrls.documents.forEach((url) => {
        if (url && url.startsWith("blob:")) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, [photoUrls]);

  const handleFinalSubmit = () => {
    const gatePassInfo = {
      ...formData,
      gatePassNumber: Math.floor(1000 + Math.random() * 9000),
      date: new Date().toISOString().replace("T", " ").substring(0, 19),
    };
    setGatePassData(gatePassInfo);
    const dataToSubmit = {
      ...formData,
      photo: formData.photo,
      securitySignature: formData.securitySignature,
      visitorSignature: formData.visitorSignature,
      visitedPersonSignature: formData.visitedPersonSignature,
      documents: formData.documents,
    };

    onSubmit(dataToSubmit);
  };

  const handleViewGatePass = () => {
    if (!gatePassData) {
      const gatePassInfo = {
        ...formData,
        gatePassNumber: Math.floor(1000 + Math.random() * 9000),
        date: new Date().toISOString().replace("T", " ").substring(0, 19),
      };
      setGatePassData(gatePassInfo);
    }
    setShowGatePass(true);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    alert("Download functionality would be implemented here");
  };

  if (showGatePass) {
    return (
      <div className="max-w-3xl mx-auto">
        <style jsx global>{`
          @media print {
            body * {
              visibility: hidden;
            }
            .gate-pass-container,
            .gate-pass-container * {
              visibility: visible;
            }
            .gate-pass-container {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
            }
            .no-print {
              display: none !important;
            }
          }
        `}</style>
        <div className="gate-pass-container border border-gray-300 p-6 bg-white">
          <div className="flex items-center justify-between mb-4">
            <img
              src="/placeholder.svg?height=60&width=120"
              alt="Company Logo"
              className="h-15"
            />
            <div className="text-center flex-1">
              <h1 className="text-2xl font-bold">Weckerle Cosmetics</h1>
              <h2 className="text-xl font-semibold">India Pvt Ltd</h2>
              <p className="text-sm">Plot No 36, Sector 8A, IIE SIDCUL</p>
            </div>
            <div className="text-5xl font-bold">V</div>
          </div>
          <hr className="border-t border-gray-300 my-4" />
          <div className="flex justify-between mb-4">
            <div>
              <span className="font-semibold">GATE PASS NUMBER : </span>
              <span>{gatePassData?.gatePassNumber || "3004"}</span>
            </div>
            <div>
              <span className="font-semibold">DATE : </span>
              <span>{gatePassData?.date || "2025-03-28 15:09:16"}</span>
            </div>
          </div>
          <hr className="border-t border-gray-300 my-4" />
          <div className="flex mb-4">
            <div className="flex-1">
              <div className="mb-2">
                <span className="font-semibold">Name</span>
                <span className="ml-2">: {formData.name}</span>
              </div>
              <div className="mb-2">
                <span className="font-semibold">Address</span>
                <span className="ml-2">: {formData.address}</span>
              </div>
              <div className="mb-2">
                <span className="font-semibold">Contact No</span>
                <span className="ml-2">: {formData.mobile || "N/A"}</span>
              </div>
              <div className="mb-2">
                <span className="font-semibold">Company Name</span>
                <span className="ml-2">: {formData.company}</span>
              </div>
              <div className="mb-2">
                <span className="font-semibold">Purpose</span>
                <span className="ml-2">: {formData.visitType}</span>
              </div>
            </div>
            <div className="w-32">
              {photoUrls.photo ? (
                <img
                  src={photoUrls.photo || "/placeholder.svg"}
                  alt="Visitor Photo"
                  className="w-32 h-32 object-cover rounded-full border-2 border-gray-300"
                />
              ) : (
                <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center">
                  <FaUser className="text-gray-400 text-4xl" />
                </div>
              )}
            </div>
          </div>
          <div className="mb-4">
            <div className="flex justify-between">
              <div className="w-1/2">
                <span className="font-semibold">In Time</span>
                <span className="ml-2">
                  : {formData.inTime || "2025-03-28 13:42:57"}
                </span>
              </div>
              <div className="w-1/2">
                <span className="font-semibold">Out Time</span>
                <span className="ml-2">
                  : {formData.outTime || "Invalid date"}
                </span>
              </div>
            </div>
            <div className="mt-2">
              <span className="font-semibold">Visited Person</span>
              <span className="ml-2">
                :{" "}
                {formData.visitedPerson ||
                  formData.staff ||
                  "Mr. Gaurav Singhwal"}
              </span>
            </div>
          </div>
          <hr className="border-t border-gray-300 my-4" />
          <div className="flex justify-between mb-4">
            <div className="text-center w-1/3">
              <div className="h-20 mb-2">
                {photoUrls.securitySignature ? (
                  <img
                    src={photoUrls.securitySignature || "/placeholder.svg"}
                    alt="Security Signature"
                    className="h-20 mx-auto object-contain"
                  />
                ) : (
                  <div className="h-20 border-b border-gray-400"></div>
                )}
              </div>
              <p className="font-semibold">Security Signature</p>
            </div>
            <div className="text-center w-1/3">
              <div className="h-20 mb-2">
                {photoUrls.visitorSignature ? (
                  <img
                    src={photoUrls.visitorSignature || "/placeholder.svg"}
                    alt="Visitor Signature"
                    className="h-20 mx-auto object-contain"
                  />
                ) : (
                  <div className="h-20 border-b border-gray-400"></div>
                )}
              </div>
              <p className="font-semibold">Visitor Signature</p>
            </div>
            <div className="text-center w-1/3">
              <div className="h-20 mb-2">
                {photoUrls.visitedPersonSignature ? (
                  <img
                    src={photoUrls.visitedPersonSignature || "/placeholder.svg"}
                    alt="Staff Signature"
                    className="h-20 mx-auto object-contain"
                  />
                ) : (
                  <div className="h-20 border-b border-gray-400"></div>
                )}
              </div>
              <p className="font-semibold">Staff Signature</p>
            </div>
          </div>
          <div className="flex justify-end space-x-4 mt-8 no-print">
            <button
              type="button"
              onClick={() => setShowGatePass(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded flex items-center"
            >
              <FaUser className="mr-2" /> Back to Review
            </button>
            <button
              type="button"
              onClick={handlePrint}
              className="bg-blue-500 text-white px-4 py-2 rounded flex items-center"
            >
              <FaPrint className="mr-2" /> Print
            </button>
            <button
              type="button"
              onClick={handleDownload}
              className="bg-green-500 text-white px-4 py-2 rounded flex items-center"
            >
              <FaDownload className="mr-2" /> Download
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-center">Review Your Details</h2>
      <div className="border rounded p-4 space-y-2">
        <h3 className="text-lg font-medium flex items-center">
          <FaUser className="mr-2 text-gray-600" /> Visitor Details
        </h3>
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
        <h3 className="text-lg font-medium flex items-center">
          <FaClipboardList className="mr-2 text-gray-600" /> Visit Details
        </h3>
        <p>
          <strong>Department:</strong> {formData.department || "N/A"}
        </p>
        <p>
          <strong>In Time:</strong> {formData.inTime || "N/A"}
        </p>
        <p>
          <strong>Out Time:</strong> {formData.outTime || "N/A"}
        </p>
        <p>
          <strong>Visited Person:</strong>{" "}
          {formData.visitedPerson || formData.staff || "N/A"}
        </p>
      </div>
      <div className="border rounded p-4 space-y-2">
        <h3 className="text-lg font-medium flex items-center">
          <FaIdCard className="mr-2 text-gray-600" /> Signatures
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p>
              <strong>Security Signature:</strong>
            </p>
            {photoUrls.securitySignature ? (
              <img
                src={photoUrls.securitySignature || "/placeholder.svg"}
                alt="Security Signature"
                className="w-32 h-32 object-cover"
              />
            ) : (
              "Not provided"
            )}
          </div>
          <div>
            <p>
              <strong>Visitor Signature:</strong>
            </p>
            {photoUrls.visitorSignature ? (
              <img
                src={photoUrls.visitorSignature || "/placeholder.svg"}
                alt="Visitor Signature"
                className="w-32 h-32 object-cover"
              />
            ) : (
              "Not provided"
            )}
          </div>
          <div>
            <p>
              <strong>Person Visited Signature:</strong>
            </p>
            {photoUrls.visitedPersonSignature ? (
              <img
                src={photoUrls.visitedPersonSignature || "/placeholder.svg"}
                alt="Person Visited Signature"
                className="w-32 h-32 object-cover"
              />
            ) : (
              "Not provided"
            )}
          </div>
        </div>
      </div>
      <div className="border rounded p-4">
        <h3 className="text-lg font-medium flex items-center">
          <FaCamera className="mr-2 text-gray-600" /> Photo
        </h3>
        {photoUrls.photo ? (
          <img
            src={photoUrls.photo || "/placeholder.svg"}
            alt="Uploaded Profile Photo"
            className="w-40 h-40 object-cover border"
          />
        ) : (
          <p>No photo uploaded.</p>
        )}
      </div>
      <div className="border rounded p-4 space-y-2">
        <h3 className="text-lg font-medium flex items-center">
          <FaClipboardList className="mr-2 text-gray-600" /> Documents
        </h3>
        {photoUrls.documents && photoUrls.documents.length > 0 ? (
          <div className="flex flex-wrap gap-4">
            {photoUrls.documents.map((docUrl, index) => (
              <div key={index} className="w-40 h-40 border relative">
                <img
                  src={docUrl || "/placeholder.svg"}
                  alt={`Uploaded Document ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-1 rounded">
                  {(formData.documentTypes && formData.documentTypes[index]) ||
                    formData.documentType ||
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
          className="bg-gray-500 text-white px-4 py-2 rounded flex items-center"
        >
          <FaClock className="mr-2" /> Prev
        </button>
        <button
          type="button"
          onClick={handleViewGatePass}
          className="bg-blue-500 text-white px-4 py-2 rounded flex items-center"
        >
          <FaClipboardList className="mr-2" /> View Gate Pass
        </button>
        <button
          type="button"
          onClick={handleFinalSubmit}
          className="bg-green-500 text-white px-4 py-2 rounded flex items-center"
        >
          <FaUserTie className="mr-2" /> Confirm
        </button>
      </div>
    </div>
  );
}
