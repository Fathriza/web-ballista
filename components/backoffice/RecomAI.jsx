"use client";
import React, { useEffect, useState } from "react";
import { css } from "@emotion/react";
import { BarLoader } from "react-spinners";

export default function RecomAI() {
  const [aiResult, setAiResult] = useState("Loading...");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAiResult = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:3002/askAI");
        const data = await response.json();
        setAiResult(data.aiResponse);
      } catch (error) {
        console.error("Error fetching AI result:", error);
        setAiResult("Failed to load AI result.");
      } finally {
        setLoading(false);
      }
    };

    fetchAiResult();
  }, []);

  const handleButtonClick = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3002/askAI");
      const data = await response.json();
      setAiResult(data.aiResponse);
    } catch (error) {
      console.error("Error fetching AI result:", error);
      setAiResult("Failed to load AI result.");
    } finally {
      setLoading(false);
    }
  };

  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

  return (
    <div className="mt-8 px-4">
      <h2 className="text-2xl font-bold mb-4 dark:text-slate-50 text-slate-800">
        BALL IS AI
      </h2>
      <div className="bg-white dark:bg-slate-700 p-6 rounded-lg shadow-lg transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-100">
        <h3 className="text-lg font-semibold mb-2 dark:text-slate-100 text-slate-900">
          Here's Your Recommendation
        </h3>
        {loading ? (
          <div className="flex justify-center items-center">
            <BarLoader
              color={"#3498db"}
              loading={true}
              css={override}
              size={150}
            />
          </div>
        ) : (
          <p className="text-slate-600 dark:text-slate-300">{aiResult}</p>
        )}
        <button
          onClick={handleButtonClick}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        >
          Get New Recommendation
        </button>
      </div>
    </div>
  );
}
