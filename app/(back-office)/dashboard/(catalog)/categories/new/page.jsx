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

export default function NewCategory() {
  const [imageUrl, setImageUrl] = useState("");
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
    makePostRequest(setLoading, "api/categories", data, "category", reset);
    setImageUrl("");
  }
  return (
    <div>
      <FormHeader title="New Category" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-lg
        shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3 "
      >
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 rounded-lg">
          <Textinput
            label="Category Title"
            name="title"
            register={register}
            errors={errors}
          />
          {/* <Selectinput
            label="Select Team"
            name="title"
            register={register}
            errors={errors}
            className="w-full"
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
