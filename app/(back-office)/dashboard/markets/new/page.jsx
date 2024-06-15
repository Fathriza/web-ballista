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

export default function NewCategory() {
  const [logoUrl, setLogoUrl] = useState("");
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
    data.logoUrl = logoUrl;
    console.log(data);
    makePostRequest(setLoading, "api/markets", data, "Market", reset);
    setLogoUrl("");
  }
  return (
    <div>
      <FormHeader title="New Market" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-lg
        shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3 "
      >
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 rounded-lg">
          <Textinput
            label="Team Name"
            name="title"
            register={register}
            errors={errors}
          />
          <TextAreainput
            label="Team Description"
            name="description"
            register={register}
            errors={errors}
          />
          <ImageInput
            imageUrl={logoUrl}
            setImageUrl={setLogoUrl}
            endpoint="marketLogoUploader"
            label="Teams Logo"
          />
        </div>

        <SubmitButton
          isLoading={loading}
          buttonTitle="Create Team"
          LoadingButtonTitle="Creating Team Please Wait..."
        />
      </form>
    </div>
  );
}
