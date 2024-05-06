import React from "react";

export default function Sidebar() {
  return (
    <div
      className="bg-slate-700 space-y-6 w-60 h-screen 
    text-slate-50 p-3 fixed left-0 top-0"
    >
      <a className="mb-6" href="#">
        Logo
      </a>
      <div className="space-y-3 flex flex-col">
        <a href="/dashboard">Dashboard</a>
        <a href="/catalog">Catalog</a>
        <a href="/customers">Customers</a>
        <a href="/markets">Markets</a>
        <a href="/teams">Teams</a>
        <a href="/orders">Orders</a>
        <a href="/staff">Staff</a>
        <a href="/settings">Settings</a>
        <a href="/online-store">Online Store</a>
      </div>
    </div>
  );
}
