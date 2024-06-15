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
import { makePostRequest } from "@/lib/apiRequest";

export default function NewCoupon() {
  const [loading, setLoading] = useState(false);
  const [couponCode, setCouponCode] = useState();
  const {
    register,
    reset,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();
  async function onSubmit(data) {
    const couponCode = generateCouponCode(data.title, data.expiryDate);
    data.couponCode = couponCode;
    console.log(data);
    makePostRequest(setLoading, "api/coupons", data, "Coupon", reset);
  }
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
