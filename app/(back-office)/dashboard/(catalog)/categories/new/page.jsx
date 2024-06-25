"use client";
import React, { useState } from "react";
import FormHeader from "@/components/backoffice/FormHeader";
import Textinput from "@/components/Forminputs/Textinput";
import SubmitButton from "@/components/Forminputs/SubmitButton";
import TextAreainput from "@/components/Forminputs/TextAreainput";
import ImageInput from "@/components/Forminputs/ImageInput";
import Selectinput from "@/components/Forminputs/Selectinput";
import { generateSlug } from "@/lib/generateSlug";
import { useForm } from "react-hook-form";

export default function NewCategory() {
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    const slug = generateSlug(data.title);
    data.slug = slug;
    data.imageUrl = imageUrl;
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3002/api/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Failed to create category");
      }
      setLoading(false);
      // Reset form after successful submission
      // You may need to implement a reset function if using React Hook Form
      // Example: reset();
      setImageUrl("");
    } catch (error) {
      console.error("Error creating category:", error);
      setLoading(false);
      // Handle error state if needed
    }
  };

  return (
    <div>
      <FormHeader title="New Category" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-lg
        shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3"
      >
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 rounded-lg">
          <Textinput
            label="Category Title"
            name="title"
            register={register}
            errors={errors}
          />
          {/* Example of Selectinput usage */}
          {/* <Selectinput
            label="Select Team"
            name="team"
            register={register}
            errors={errors}
          /> */}
          <TextAreainput
            label="Category Description"
            name="description"
            register={register}
            errors={errors}
          />
        </div>
        <ImageInput
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
          endpoint="categoryImageUploader"
          label="Category Image"
        />
        <SubmitButton
          isLoading={loading}
          buttonTitle="Create Category"
          LoadingButtonTitle="Creating Category Please Wait..."
        />
      </form>
    </div>
  );
}
