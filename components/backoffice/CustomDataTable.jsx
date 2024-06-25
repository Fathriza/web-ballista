"use client";
import React, { useState, useEffect } from "react";

export default function CustomDataTable() {
  const PAGE_SIZE = 10;
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, [currentPage]); // Fetch data when currentPage changes

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:3002/orders-data`);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const result = await response.json();

      // Sort data by order_time in descending order (latest first)
      result.sort((a, b) => new Date(b.order_time) - new Date(a.order_time));

      // Format order_date using Date object
      const formattedResult = result.map((item) => ({
        ...item,
        order_date: formatDate(item.order_time),
      }));

      setData(formattedResult);
      const totalItems = formattedResult.length;
      setTotalPages(Math.ceil(totalItems / PAGE_SIZE));
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to format date from ISO 8601 to readable format
  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const formattedDate = `${date.getFullYear()}-${padZero(
      date.getMonth() + 1
    )}-${padZero(date.getDate())}`;
    return formattedDate;
  };

  const padZero = (num) => {
    return num.toString().padStart(2, "0");
  };

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const currentDisplayedData = data.slice(startIndex, startIndex + PAGE_SIZE);
  const itemStartIndex = startIndex + 1;
  const itemEndIndex = Math.min(startIndex + PAGE_SIZE, data.length);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4 ">Recent Orders</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-800">
          <thead className="bg-gray-200 dark:bg-gray-700 ">
            <tr clas>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quantity
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order Date
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {isLoading ? (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center">
                  Loading...
                </td>
              </tr>
            ) : (
              currentDisplayedData.map((item) => (
                <tr key={item.order_id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.order_id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.username}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.product_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.quantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.status}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {formatDate(item.order_time)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Showing{" "}
          <span className="font-medium">
            {itemStartIndex}-{itemEndIndex}
          </span>{" "}
          of <span className="font-medium">{data.length}</span> results
        </p>
        <nav className="space-x-1" aria-label="Pagination">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1 || isLoading}
            className={`px-3 py-1 text-xs rounded-md ${
              currentPage === 1
                ? "bg-gray-200 text-gray-500 cursor-default"
                : "bg-white text-gray-700 hover:bg-gray-100"
            } dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600`}
          >
            Previous
          </button>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages || isLoading}
            className={`px-3 py-1 text-xs rounded-md ${
              currentPage === totalPages
                ? "bg-gray-200 text-gray-500 cursor-default"
                : "bg-white text-gray-700 hover:bg-gray-100"
            } dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600`}
          >
            Next
          </button>
        </nav>
      </div>
    </div>
  );
}
