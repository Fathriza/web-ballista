"use client"
import React, { useState, useEffect } from "react";
import PageHeader from "@/components/backoffice/PageHeader";
import TableAction from "@/components/backoffice/TableAction";

export default function UpdateCategory() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch categories data from backend API
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:3002/api/categories");
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
        // Handle error state if needed
      }
    };

    fetchCategories();
  }, []);

  return (
    <div>
      <PageHeader
        heading="Categories"
        href="/dashboard/categories/new"
        linkTitle="Add Category"
      />
      <TableAction categories={categories} />
      <div className="py-8">
        <h2>Category Table</h2>
        <table className="table-auto w-full border-collapse border border-gray-800">
          <thead>
            <tr className="bg-slate-600">
              <th className="border border-gray-600 px-4 py-2">Title</th>
              <th className="border border-gray-600 px-4 py-2">Description</th>
              <th className="border border-gray-600 px-4 py-2">Image</th>
              {/* Add more headers as needed */}
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id}>
                <td className="border border-gray-600 px-4 py-2">
                  {category.title}
                </td>
                <td className="border border-gray-600 px-4 py-2">
                  {category.description}
                </td>
                <td className="border border-gray-600 px-4 py-2">
                  <img
                    src={category.imageUrl}
                    alt={category.title}
                    className="h-16"
                  />
                </td>
                {/* Render more fields as needed */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
