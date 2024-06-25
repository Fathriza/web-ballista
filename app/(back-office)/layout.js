"use client";
import React, { useState } from "react";
import Sidebar from "@/components/backoffice/Sidebar";
import Navbar from "@/components/backoffice/Navbar";

export default function Layout({ children }) {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />

      <div className="lg:ml-60 ml-0 flex-grow bg-slate-100 min-h-screen">
        {/* Header */}
        <Navbar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />

        {/* Main */}
        <main className="p-8 bg-slate-100 dark:bg-slate-900 text-slate-50 min-h-screen mt-16">
          {children}
        </main>
      </div>
    </div>
  );
}
