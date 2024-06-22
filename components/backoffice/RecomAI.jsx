"use client";
import React, { useEffect, useState } from "react";
import { css } from "@emotion/react";
import { BarLoader } from "react-spinners"; // Menggunakan BarLoader untuk contoh

export default function RecomAI() {
  const [aiResult, setAiResult] = useState(() => {
    const savedResult = localStorage.getItem("aiResult");
    return savedResult ? savedResult : "Loading...";
  });

  useEffect(() => {
    const fetchAiResult = async () => {
      try {
        const response = await fetch("http://localhost:3002/askAI");
        const data = await response.json();
        setAiResult(data.msg);
        localStorage.setItem("aiResult", data.msg); 
      } catch (error) {
        console.error("Error fetching AI result:", error);
        setAiResult("Failed to load AI result.");
      }
    };

    
    if (aiResult === "Loading...") {
      fetchAiResult();
    }
  }, []);

 
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
        {aiResult === "Loading..." ? (
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
      </div>
    </div>
  );
}
