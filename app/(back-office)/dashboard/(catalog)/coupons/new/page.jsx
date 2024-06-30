"use client";
import React from "react";
import FormHeader from "@/components/backoffice/FormHeader";
import Textinput from "@/components/Forminputs/Textinput";
import SubmitButton from "@/components/Forminputs/SubmitButton";
import TextAreainput from "@/components/Forminputs/TextAreainput";
import { generateSlug } from "@/lib/generateSlug";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { generateCouponCode } from "@/lib/generateCouponCode";
import ImageInput from "@/components/Forminputs/ImageInput";

export default function NewCoupon() {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const couponCode = generateCouponCode(data.title, data.expiryDate);
      const formData = {
        ...data,
        couponCode: couponCode,
      };
      const response = await fetch("http://localhost:3002/api/coupons", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Failed to create coupon");
      }
      setLoading(false);
      reset(); // Reset form after successful submission
    } catch (error) {
      console.error("Error creating coupon:", error);
      setLoading(false);
      // Handle error state if needed
    }
  };

  return (
    <div className="rounded-lg">
      <FormHeader className="rounded-lg" title="New Coupon" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-lg
        shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3 "
      >
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 rounded-lg">
          <Textinput
            label="Coupon Title"
            name="title"
            register={register}
            errors={errors}
            className="w-full"
          />
          <Textinput
            label="Coupon Expired Date"
            name="expiryDate"
            register={register}
            type="date"
            errors={errors}
            className="w-full"
          />
        </div>

        <SubmitButton
          isLoading={loading}
          buttonTitle="Create Coupon"
          LoadingButtonTitle="Creating Coupon Please Wait..."
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
