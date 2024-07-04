"use client";
import React, { useState } from "react";
import FormHeader from "@/components/backoffice/FormHeader";
import Textinput from "@/components/Forminputs/Textinput";
import SubmitButton from "@/components/Forminputs/SubmitButton";
import TextAreainput from "@/components/Forminputs/TextAreainput";
import { useForm } from "react-hook-form";
import ImageInput from "@/components/Forminputs/ImageInput";
import Selectinput from "@/components/Forminputs/Selectinput";

export default function NewProduct() {
  const [imageUrl, setImageUrl] = useState("");
  const categories = [
    { id: 1, title: "Jersey" },
    { id: 2, title: "Ticket" },
    { id: 3, title: "Key Chain" },
    { id: 4, title: "Shawl" },
  ];
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  
const onSubmit = async (data) => {
  const productData = {
    product_name: data.product_name,
    product_id: data.product_id,
    price: data.price,
    stock: data.stock,
    description: data.description,
    image_url: imageUrl, // Pastikan ini diatur dengan benar
  };

  try {
    const response = await fetch("http://localhost:3002/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });

    if (!response.ok) {
      throw new Error("Failed to create product");
    }

    reset();
    setImageUrl("");
    alert("Product created successfully!");
  } catch (error) {
    console.error("Error creating product:", error);
    // Handle error state if needed
  }
};



  return (
    <div>
      <FormHeader title="New Product" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3"
      >
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 rounded-lg">
          <Textinput
            label="Product Name"
            name="product_name"
            register={register}
            errors={errors}
          />
          <Textinput
            label="Product ID"
            name="product_id"
            type="number"
            register={register}
            errors={errors}
            className="w-full"
          />
          <Textinput
            label="Product Price"
            name="price"
            type="number"
            register={register}
            errors={errors}
            className="w-full"
          />
          <Textinput
            label="Product Stock"
            name="stock"
            type="number"
            register={register}
            errors={errors}
            className="w-full"
          />
          <Selectinput
            label="Select Category"
            name="category_id"
            register={register}
            errors={errors}
            className="w-full"
            options={categories}
          />
          <ImageInput
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
            label="Product Image"
          />
          <TextAreainput
            label="Product Description"
            name="description"
            register={register}
            errors={errors}
          />
        </div>

        <SubmitButton
          buttonTitle="Create Product"
          LoadingButtonTitle="Creating Product Please Wait..."
        />
      </form>
    </div>
  );
}
