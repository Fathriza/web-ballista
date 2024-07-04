import {
  AlignJustify,
  Bell,
  LayoutDashboard,
  LogOut,
  Settings2,
  Sun,
  User,
  X,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Layout from "@/app/(back-office)/layout";
import ThemeSwitcherBtn from "../ThemeSwitcher";

export default function NavBar({ setShowSidebar, showSidebar }) {
  const [lowStockProducts, setLowStockProducts] = useState([]);

  useEffect(() => {
    const fetchLowStockProducts = async () => {
      try {
        const response = await fetch(
          "http://localhost:3002/api/low-stock-products"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch low stock products");
        }
        const data = await response.json();
        setLowStockProducts(data);
      } catch (error) {
        console.error("Error fetching low stock products:", error);
      }
    };
    fetchLowStockProducts();
  }, []);

  return (
    <div
      className="flex items-center justify-between bg-white dark:bg-slate-800
        text-slate-50 h-20 px-4 py-4 fixed top-0 w-full left-64 sm:pr-[20rem] 
        "
    >
      <Link href={"/dashboard"} className="sm:hidden">
        Logo
      </Link>
      {/* Icon*/}
      <button
        onClick={() => setShowSidebar(!showSidebar)}
        className="text-green-600 dark:text-green-600 "
      >
        <AlignJustify />
      </button>
      {/* 3 Icon*/}
      <div className="flex space-x-3 ">
        <ThemeSwitcherBtn />

        <DropdownMenu>
          <DropdownMenuTrigger>
            <button
              type="button"
              className="relative inline-flex items-center p-3 text-sm font-medium text-center text-white bg-transparent rounded-lg "
            >
              <Bell className="text-green-600" />
              <span className="sr-only">Notifications</span>
              <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500  rounded-full -top-0 -end-0 dark:border-gray-900">
                {lowStockProducts.length}
              </div>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="py-2 px-4 pr-8 bg-slate-900">
            <DropdownMenuLabel>Notification</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {lowStockProducts.length > 0 ? (
              lowStockProducts.map((product) => (
                <DropdownMenuItem key={product.product_id}>
                  <div className="flex items-center space-x-2 ">
                    <img
                      src={product.image_url}
                      alt={product.product_name}
                      width={200}
                      height={200}
                      className="w-8 h-8 rounded-full"
                    />
                    <div className="flex flex-col space-y-1">
                      <p>{product.product_name} Stock Low</p>
                      <div className="flex items-center space-x-2">
                        <p className="px-3 py-0.5 bg-red-700 text-white rounded-full text-sm">
                          Stock: {product.stock}
                        </p>
                        <p>{new Date().toLocaleDateString()}</p>
                      </div>
                    </div>
                    <button>
                      <X />
                    </button>
                  </div>
                </DropdownMenuItem>
              ))
            ) : (
              <p>No low stock products</p>
            )}
            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <button>
              <img
                src="/profile.jpg"
                alt="User Profile"
                width={200}
                height={200}
                className="w-8 h-8 rounded-full"
              />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="py-2 px-4 pr-8">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <button className="flex items-center space-x-2">
                <LayoutDashboard className="mr-2 h-4 w-4" />
                <span>Dashboard</span>
              </button>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <button className="flex items-center space-x-2">
                <Settings2 className="mr-2 h-4 w-4" />
                <span>Edit Profile</span>
              </button>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <button className="flex items-center space-x-2">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log Out</span>
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
