"use client";
import { useFormContext } from "react-hook-form";
import { useState, useEffect } from "react";
import { createVisitorDocument, uploadDocument } from "@/lib/api";

export default function Step3({ onPrev, onNext }) {
  const { register, handleSubmit, setValue, getValues } = useFormContext();
  const [uploadedImages, setUploadedImages] = useState([]);

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      id: URL.createObjectURL(file),
      file,
    }));
    setUploadedImages((prev) => [...prev, ...newImages]);

    const existingFiles = getValues("documents") || [];
    setValue("documents", [...existingFiles, ...files]);
  };

  const handleRemoveImage = (id) => {
    setUploadedImages((prev) => prev.filter((img) => img.id !== id));
    const existingFiles = getValues("documents") || [];
    setValue(
      "documents",
      existingFiles.filter((file) => URL.createObjectURL(file) !== id)
    );
  };

  useEffect(() => {
    const existingFiles = getValues("documents") || [];
    const newImages = existingFiles.map((file) => ({
      id: URL.createObjectURL(file),
      file,
    }));
    setUploadedImages(newImages);
  }, []);

  const onSubmit = async (data) => {
    const payload = {
      data: {
        visitor: JSON.parse(localStorage.getItem("visitorId")),
        type: data.documentType,
      },
    };
    console.log("11111zzzzzzzzzzzzz", data);

    const res = await createVisitorDocument(payload);

    let docId = res.data.id;

    if (res && res.data.id) {
      const imageData = new FormData();
      imageData.append("files", data.documents);
      imageData.append("ref", "api::visitor-document.visitor-document");
      imageData.append("refId", docId);
      if (data.photo) {
        imageData.append("field", data.photo);
      }

      let payload = { data: imageData };
      const res = await uploadDocument(imageData);
    }
    onNext(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 px-4 py-6 bg-gray-50 rounded shadow-md max-w-md mx-auto"
    >
      <h2 className="text-2xl font-bold text-center mb-4">
        Create Visitor Gate Pass
      </h2>

      <div className="flex flex-col space-y-2">
        <div>
          <label className="block font-semibold mb-1">
            Select Document Type
          </label>
          <select
            {...register("documentType", { required: true })}
            className="w-full border rounded px-3 py-2"
          >
            <option value="" disabled>
              Select Document Type
            </option>
            <option value="adhar">Aadhaar</option>
            <option value="pan">PAN</option>
            <option value="id">Voter ID</option>
            <option value="license">Driving License</option>
            <option value="Passport">Passport</option>
          </select>
        </div>

        <div className="mt-2">
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileUpload}
            className="hidden"
            id="fileUpload"
          />
          <label
            htmlFor="fileUpload"
            className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer inline-block"
          >
            Add Photo
          </label>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4">
        {uploadedImages.map((img) => (
          <div key={img.id} className="relative">
            <img
              src={img.id}
              alt="Uploaded"
              className="w-full h-24 object-cover rounded shadow"
            />
            <button
              type="button"
              onClick={() => handleRemoveImage(img.id)}
              className="absolute top-0 right-0 bg-red-500 text-white w-6 h-6 flex items-center justify-center rounded-full"
            >
              &times;
            </button>
          </div>
        ))}
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
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Next
        </button>
      </div>
    </form>
  );
}
