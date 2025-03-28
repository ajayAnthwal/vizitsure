"use client";
import { useFormContext } from "react-hook-form";
import { useState, useRef, useEffect } from "react";
import { createVisitors } from "@/lib/api";

export default function Step2({ onPrev, onNext, visitorData }) {
  const { register, handleSubmit, setValue, getValues } = useFormContext();
  const [cameraActive, setCameraActive] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const isValidMobile = (mobile) => mobile && mobile.length === 10;

  useEffect(() => {
    if (!visitorData || !isValidMobile(visitorData.mobile)) {
      setValue("mobile", "");
      setValue("name", "");
      setValue("email", "");
      setValue("address", "");
      setValue("company_name", "");
      const existingPhoto = getValues("photo");
      if (existingPhoto) {
        const newImageUrl = URL.createObjectURL(existingPhoto);
        setPreviewImage(newImageUrl);
      } else {
        setPreviewImage(null);
      }
    } else {
      setValue("mobile", visitorData.mobile);
      setValue("name", visitorData.name);
      setValue("email", visitorData.email);
      setValue("address", visitorData.address);
      setValue("company_name", visitorData.company_name);
      const existingPhoto = getValues("photo");
      if (existingPhoto) {
        const newImageUrl = URL.createObjectURL(existingPhoto);
        setPreviewImage(newImageUrl);
      } else if (visitorData.profile?.data?.attributes?.url) {
        setPreviewImage(visitorData.profile.data.attributes.url);
      } else {
        setPreviewImage(null);
      }
    }
  }, [visitorData, setValue]);

  const startCamera = async () => {
    try {
      setCameraActive(true);
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
    } catch (err) {
      console.error("Error accessing camera: ", err);
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) {
      console.error("Video or Canvas is not available");
      return;
    }

    setTimeout(() => {
      const video = videoRef.current;
      const canvas = canvasRef.current;

      if (!video.srcObject) {
        console.error("No video stream detected");
        return;
      }

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas
        .getContext("2d")
        .drawImage(video, 0, 0, canvas.width, canvas.height);

      canvas.toBlob((blob) => {
        if (!blob) return;

        const file = new File([blob], `photo_${Date.now()}.png`, {
          type: "image/png",
        });

        const imageUrl = URL.createObjectURL(file);
        setPreviewImage(imageUrl);
        setValue("photo", file);
      }, "image/png");

      stopCamera();
    }, 500);
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    setCameraActive(false);
  };

  const onSubmit = async (data) => {
    const payload = {
      data: {
        email: data.email,
        name: data.mobile,
        address: data.address,
        company_name: data.company,
      },
    };
    const res = await createVisitors(payload);

    if (res.data.id) {
      localStorage.setItem("visitorId", res.data.id);
      onNext(data);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 px-4 py-6 bg-gray-50 rounded shadow-md"
    >
      <h2 className="text-2xl font-bold text-center mb-4">
        Create Visitor Gate Pass
      </h2>
      <div className="text-center">
        <div className="relative w-40 h-40 mx-auto rounded-full border border-gray-300 overflow-hidden bg-gray-200 flex items-center justify-center">
          {previewImage ? (
            <img
              src={previewImage}
              alt="Profile Preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <div>
              {!cameraActive && (
                <span className="text-gray-500">No Image Captured</span>
              )}
              {cameraActive && (
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  autoPlay
                />
              )}
            </div>
          )}
        </div>

        {!cameraActive ? (
          <button
            type="button"
            onClick={startCamera}
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
          >
            Start Camera
          </button>
        ) : (
          <div className="mt-4 flex justify-center space-x-4">
            <button
              type="button"
              onClick={capturePhoto}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Capture Photo
            </button>
            <button
              type="button"
              onClick={stopCamera}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Stop Camera
            </button>
          </div>
        )}
      </div>

      <div>
        <label className="block font-semibold mb-1">Mobile</label>
        <input
          type="text"
          value={getValues("mobile") || ""}
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
          defaultValue={visitorData?.name || ""}
          className="w-full border rounded px-3 py-2"
        />
      </div>
      <div>
        <label className="block font-semibold mb-1">Email</label>
        <input
          type="email"
          placeholder="Email"
          {...register("email", { required: true })}
          defaultValue={visitorData?.email || ""}
          className="w-full border rounded px-3 py-2"
        />
      </div>
      <div>
        <label className="block font-semibold mb-1">Address</label>
        <input
          type="text"
          placeholder="Address"
          {...register("address", { required: true })}
          defaultValue={visitorData?.address || ""}
          className="w-full border rounded px-3 py-2"
        />
      </div>
      <div>
        <label className="block font-semibold mb-1">Company</label>
        <input
          type="text"
          placeholder="Company Name"
          {...register("company_name", { required: true })}
          defaultValue={visitorData?.company_name || ""}
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
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Next
        </button>
      </div>
      <canvas ref={canvasRef} className="hidden"></canvas>
    </form>
  );
}
