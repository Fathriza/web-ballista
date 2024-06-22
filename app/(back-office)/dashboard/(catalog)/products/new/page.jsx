"use client";
import React from "react";
import FormHeader from "@/components/backoffice/FormHeader";
import Textinput from "@/components/Forminputs/Textinput";
import SubmitButton from "@/components/Forminputs/SubmitButton";
import TextAreainput from "@/components/Forminputs/TextAreainput";
import { generateSlug } from "@/lib/generateSlug";
import { useForm } from "react-hook-form";
import { useState } from "react";
import ImageInput from "@/components/Forminputs/ImageInput";
import { makePostRequest } from "@/lib/apiRequest";
import Selectinput from "../../../../../../components/Forminputs/Selectinput";

export default function NewProduct() {
  const [imageUrl, setImageUrl] = useState("");
  const categories = [
    {
      id: 1,
      title: "Jersey",
    },
    {
      id: 2,
      title: "Ticket",
    },
    {
      id: 3,
      title: "Key Chain",
    },
    {
      id: 4,
      title: "Shawl",
    },
  ];
  const [loading, setLoading] = useState(false);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  async function onSubmit(data) {
    const slug = generateSlug(data.title);
    data.slug = slug;
    data.imageUrl = imageUrl;
    console.log(data);
    makePostRequest(setLoading, "api/products", data, "Product", reset);
    setImageUrl("");
  }
  return (
    <div>
      <FormHeader title="New Product" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-lg
        shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3 "
      >
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 rounded-lg">
          <Textinput
            label="Product Title"
            name="title"
            register={register}
            errors={errors}
          />
          <Textinput
            label="Product ID"
            name="idProduct"
            type="number"
            register={register}
            errors={errors}
            className="w-full"
          />
          <Textinput
            label="Product SKU"
            name="sku"
            register={register}
            errors={errors}
            className="w-full"
          />
          <Textinput
            label="Product Barcode"
            name="barcode"
            register={register}
            errors={errors}
            className="w-full"
          />
          <Textinput
            label="Product Price"
            name="productPrice"
            type="number"
            register={register}
            errors={errors}
            className="w-full"
          />
          <Textinput
            label="Product Sale Price"
            name="salePrice"
            type="number"
            register={register}
            errors={errors}
            className="w-full"
          />
          <Selectinput
            label="Select Category"
            name="categoryId"
            register={register}
            errors={errors}
            className="w-full"
            options={categories}
          />
          <ImageInput
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
            endpoint="productImageUploader"
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
          isLoading={loading}
          buttonTitle="Create Product"
          LoadingButtonTitle="Creating Product Please Wait..."
        />
      </form>

      {/* 
        -id
        -product
        -description
        -size
        -image
        
        */}
    </div>
  );
}
