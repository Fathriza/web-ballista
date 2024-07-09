// products/update/page.jsx
"use client"
import React, { useEffect, useState } from "react";
import PageHeader from "@/components/backoffice/PageHeader";
import TableAction from "@/components/backoffice/TableAction";

export default function Products() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:3002/api/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
        // Handle error state if needed
      }
    };
    fetchProducts();
  }, []);

  return (
    <div>
      {/* Header */}
      <PageHeader
        heading="Products"
        href="/dashboard/products/new"
        linkTitle="Add Product"
      />
      {/* Table Actions*/}
      {/* Export || Search || Bulk Delete */}
      <TableAction />
      <div className="py-8">
        <h2>Product Table</h2>
        <table className="table-auto w-full border-collapse border border-gray-800">
          <thead>
            <tr className="bg-slate-600">
              <th className="border border-gray-600 px-4 py-2">ID</th>
              <th className="border border-gray-600 px-4 py-2">Name</th>
              <th className="border border-gray-600 px-4 py-2">Description</th>
              <th className="border border-gray-600 px-4 py-2">Price</th>
              <th className="border border-gray-600 px-4 py-2">Stock</th>
              <th className="border border-gray-600 px-4 py-2">Image</th>
              {/* Add more headers as needed */}
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.product_id}>
                <td className="border border-gray-600 px-4 py-2 text-slate-900 dark:text-slate-50">
                  {product.product_id}
                </td>
                <td className="border border-gray-600 px-4 py-2 text-slate-900 dark:text-slate-50">
                  {product.product_name}
                </td>
                <td className="border border-gray-600 px-4 py-2 text-slate-900 dark:text-slate-50">
                  {product.description}
                </td>
                <td className="border border-gray-600 px-4 py-2 text-slate-900 dark:text-slate-50">
                  {product.price}
                </td>
                <td className="border border-gray-600 px-4 py-2 text-slate-900 dark:text-slate-50">
                  {product.stock}
                </td>
                <td className="border border-gray-600 px-4 py-2 text-slate-900 dark:text-slate-50">
                  <img
                    src={product.image_url}
                    alt={product.product_name}
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
