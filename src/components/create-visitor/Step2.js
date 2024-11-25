"use client";
import { useFormContext } from "react-hook-form";
import { useState } from "react";

export default function Step2({ onPrev, onNext }) {
  const { register, handleSubmit, setValue, getValues } = useFormContext();
  const [previewImage, setPreviewImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setValue("photo", file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const onSubmit = (data) => {
    onNext(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 px-4 py-6 bg-gray-50 rounded shadow-md "
    >
      <h2 className="text-2xl font-bold text-center mb-4">
        Create Visitor Gate Pass
      </h2>

      <div className="text-center">
        <div className="relative w-24 h-24 mx-auto rounded-full border border-gray-300 overflow-hidden bg-gray-200 flex items-center justify-center">
          {previewImage ? (
            <img
              src={previewImage}
              alt="Profile Preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-gray-500">No Image</span>
          )}
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
          id="profilePhotoInput"
        />
        <label
          htmlFor="profilePhotoInput"
          className="text-blue-500 text-sm cursor-pointer mt-2"
        >
          Upload Photo
        </label>
        <p className="text-red-500 text-xs">Profile Photo is required</p>
      </div>

      <div>
        <label className="block font-semibold mb-1">Mobile</label>
        <input
          type="text"
          value={getValues("mobile") || "9898989898"}
          disabled
          className="w-full border rounded px-3 py-2 bg-gray-100 text-gray-500"
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">Name</label>
        <input
          type="text"
          placeholder="Name"
          {...register("name", { required: true })}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">Email</label>
        <input
          type="email"
          placeholder="Email"
          {...register("email", { required: true })}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">Address</label>
        <input
          type="text"
          placeholder="Address"
          {...register("address", { required: true })}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">Company</label>
        <input
          type="text"
          placeholder="Company"
          {...register("company", { required: true })}
          className="w-full border rounded px-3 py-2"
        />
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
