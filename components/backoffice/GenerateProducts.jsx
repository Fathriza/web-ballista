// GenerateProduct.jsx

"use client";
import React, { useState, useEffect } from "react";
import MockupDesign from "@/components/backoffice/MockupDesign";

const GenerateProduct = () => {
  const [productType, setProductType] = useState("");
  const [style, setStyle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);
  const [selectedColor, setSelectedColor] = useState("#ffffff");

  const handleGenerate = async () => {
    if (!productType || !style) {
      alert("Please select product type and style");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `http://localhost:3002/api/get-design?productType=${productType}&style=${style}`
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch design: ${response.statusText}`);
      }
      const data = await response.json();
      setImageUrl(data.imageUrl);
    } catch (error) {
      console.error("Error fetching design:", error);
      alert("Failed to fetch design. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = () => {
    setShowCustomize(true);
  };

  const handleDownload = () => {
    // Fungsi untuk mengunduh gambar
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = 300; // Sesuaikan dengan lebar gambar
    canvas.height = 300; // Sesuaikan dengan tinggi gambar

    const img = new Image();
    img.src = imageUrl;

    img.onload = () => {
      // Menggambar gambar asli ke kanvas
      ctx.drawImage(img, 0, 0, 300, 300);

      // Menerapkan overlay warna ke kanvas
      ctx.fillStyle = selectedColor;
      ctx.globalAlpha = 0.5; // Opacity dari overlay warna
      ctx.globalCompositeOperation = "color"; // Mode blend untuk warna
      ctx.fillRect(0, 0, 300, 300);

      // Membuat URL dari gambar yang telah dimodifikasi
      const modifiedImageUrl = canvas.toDataURL("image/png");

      // Membuat anchor element untuk mengunduh gambar
      const anchor = document.createElement("a");
      anchor.href = modifiedImageUrl;
      anchor.download = "modified_design.png"; // Nama file yang akan diunduh
      anchor.click();
    };
  };

  useEffect(() => {
    // Fetch initial product design on component mount
    handleGenerate();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="max-w-sm mx-auto p-4">
      <form className="space-y-4">
        <div>
          <label
            htmlFor="productType"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Select Product Type
          </label>
          <select
            id="productType"
            value={productType}
            onChange={(e) => setProductType(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="">Select Product Type</option>
            <option value="jersey">Jersey</option>
            <option value="tshirt">T-shirt</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="style"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Select Style
          </label>
          <select
            id="style"
            value={style}
            onChange={(e) => setStyle(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="">Select Style</option>
            <option value="classic">Classic</option>
            <option value="modern">Modern</option>
          </select>
        </div>
        <button
          type="button"
          onClick={handleGenerate}
          disabled={loading}
          className={`w-full text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Generating..." : "Generate"}
        </button>
        {imageUrl && (
          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Generated Design
            </h3>
            <MockupDesign imageUrl={imageUrl} color={selectedColor} />
            <button
              type="button"
              onClick={handleEditClick}
              className="mt-4 text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Edit Colors
            </button>
          </div>
        )}
      </form>
      {showCustomize && (
        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Customize Colors
          </h3>
          <div className="flex mt-4 space-x-4">
            <div
              className="w-10 h-10 rounded-full cursor-pointer border border-gray-300"
              style={{ backgroundColor: "#ffffff" }}
              onClick={() => setSelectedColor("#ffffff")}
            ></div>
            <div
              className="w-10 h-10 rounded-full cursor-pointer border border-gray-300"
              style={{ backgroundColor: "#ff0000" }}
              onClick={() => setSelectedColor("#ff0000")}
            ></div>
            <div
              className="w-10 h-10 rounded-full cursor-pointer border border-gray-300"
              style={{ backgroundColor: "#00ff00" }}
              onClick={() => setSelectedColor("#00ff00")}
            ></div>
            <div
              className="w-10 h-10 rounded-full cursor-pointer border border-gray-300"
              style={{ backgroundColor: "#0000ff" }}
              onClick={() => setSelectedColor("#0000ff")}
            ></div>
          </div>
          <button
            type="button"
            onClick={handleDownload} // Tambahkan fungsi onClick untuk unduh gambar
            className="mt-6 ml-13 text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Download Image
          </button>
        </div>
      )}
    </div>
  );
};

export default GenerateProduct;
