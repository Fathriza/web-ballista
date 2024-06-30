import React from "react";
import { Pencil } from "lucide-react";
import Image from "next/image";

export default function ImageInput({
  label,
  imageUrl = "",
  setImageUrl,
  className = "col-span-full",
})

{
const handleFileChange = async (event) => {
  const file = event.target.files[0];
  const formData = new FormData();
  formData.append("image", file);

  try {
    const response = await fetch(`http://localhost:3002/upload-image`, {
      method: "POST",
      body: formData,
    });
    if (!response.ok) {
      throw new Error("Failed to upload image");
    }
    const data = await response.json();
    setImageUrl(data.url);
    console.log("Image uploaded successfully:", data);
  } catch (error) {
    console.error("Error uploading image:", error);
  }
};



  return (
    <div className={className}>
      <div className="flex justify-between items-center mb-4 mt-5 rounded-lg">
        <label
          htmlFor="course-image"
          className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-50"
        >
          {label}
        </label>
        {imageUrl && (
          <button
            onClick={() => setImageUrl("")}
            type="button"
            className="flex space-x-2 bg-slate-900 rounded-md shadow text-slate-50 py-2 px-4"
          >
            <Pencil className="w-5 h-5" />
            <span>Change Image</span>
          </button>
        )}
      </div>
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt="Item image"
          width={1000}
          height={667}
          className="w-full h-64 object-contain"
        />
      ) : (
        <input
          type="file"
          id="course-image"
          accept="image/*"
          onChange={handleFileChange}
        />
      )}
    </div>
  );
}
