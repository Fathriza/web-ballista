"use client";
import React, { useEffect, useState } from "react";
import PageHeader from "@/components/backoffice/PageHeader";
import TableAction from "@/components/backoffice/TableAction";

export default function Coupons() {
  const [loading, setLoading] = useState(false);
  const [coupons, setCoupons] = useState([]);

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:3002/api/coupons");
        if (!response.ok) {
          throw new Error("Failed to fetch coupons");
        }
        const data = await response.json();
        setCoupons(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching coupons:", error);
        setLoading(false);
        // Handle error state if needed
      }
    };
    fetchCoupons();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div>
      {/* Header */}
      <PageHeader
        heading="Coupons"
        href="/dashboard/coupons/new"
        linkTitle="Add Coupons"
      />
      {/* Table Actions*/}
      {/* Export || Search || Bulk Delete */}
      <TableAction />
      <div className="py-8">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-5">
          Coupon Table
        </h2>
        <table className="table-auto w-full border-collapse border border-gray-800">
          <thead>
            <tr className="bg-slate-600">
              <th className="border border-gray-600 px-4 py-2">ID</th>
              <th className="border border-gray-600 px-4 py-2">Name</th>
              <th className="border border-gray-600 px-4 py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {coupons.map((coupon) => (
              <tr key={coupon.coup_id}>
                <td className="border border-gray-600 px-4 py-2 text-slate-900 dark:text-slate-50">
                  {coupon.coup_id}
                </td>
                <td className="border border-gray-600 px-4 py-2 text-slate-900 dark:text-slate-50">
                  {coupon.coup_title}
                </td>
                <td className="border border-gray-600 px-4 py-2 text-slate-900 dark:text-slate-50">
                  {formatDate(coupon.coup_date)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
