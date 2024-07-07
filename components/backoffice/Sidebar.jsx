"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image"; // Import next/image
import logoDark from "../../public/ballista-logo.png"; // Impor gambar
import {
  Award,
  Boxes,
  ChevronDown,
  ChevronRight,
  LayoutGrid,
  LayoutList,
  LogOut,
  MonitorPlay,
  PenIcon,
  PersonStanding,
  ScanSearch,
  SendToBack,
  Settings,
  Slack,
  Truck,
  Users2,
  Warehouse,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { usePathname } from "next/navigation";

export default function Sidebar({ showSidebar, setShowSidebar }) {
  const pathname = usePathname();
  const sidebarLinks = [
    {
      title: "Orders",
      icon: Truck,
      href: "/dashboard/orders",
    },
    {
      title: "Design",
      icon: PenIcon,
      href: "/dashboard/generateProduct",
    },
  ];
  const catalogLinks = [
    {
      title: "Products",
      icon: Boxes,
      href: "/dashboard/products",
    },
    {
      title: "Categories",
      icon: LayoutList,
      href: "/dashboard/categories",
    },
    {
      title: "Coupons",
      icon: ScanSearch,
      href: "/dashboard/coupons",
    },
  ];
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <div
      className={
        showSidebar
          ? "sm:block mt-20 sm:mt-0 dark:bg-slate-700 bg-white space-y-6 w-64  text-slate-800 dark:text-slate-50 px-6 py-4 fixed left-0 top-0 shad-md overflow-y-scroll"
          : "mt-20 sm:mt-0 hidden sm:block dark:bg-slate-700 bg-white space-y-6 w-64 h-screen text-slate-800 dark:text-slate-50 px-6 py-4 fixed left-0 top-0 shad-md overflow-y-scroll"
      }
    >
      <div className="mb-6">
        <Link
          onClick={() => setShowSidebar(false)}
          href="/dashboard"
          className="px-6 py-4"
        >
          <Image src={logoDark} alt="ballista" className="w-full" />
        </Link>
      </div>
      <div className="space-y-3 flex flex-col">
        <Link
          onClick={() => setShowSidebar(false)}
          href="/dashboard"
          className={
            pathname === "/dashboard"
              ? "flex items-center space-x-3 px-6 py-2 border-l-4 border-green-600 text-green-600"
              : "flex items-center space-x-3 px-6 py-2"
          }
        >
          <LayoutGrid />
          <span>Dashboard</span>
        </Link>
        <Collapsible className="px-6 py-2">
          <CollapsibleTrigger
            className=""
            onClick={() => setOpenMenu(!openMenu)}
          >
            <button className="flex items-center space-x-6 py-2 ">
              <div className="flex items-center space-x-3">
                <Slack />
                <span>Catalog</span>
              </div>
              {openMenu ? <ChevronDown /> : <ChevronRight />}
            </button>
          </CollapsibleTrigger>
          <CollapsibleContent className="px-3 pl-5 dark:bg-slate-800 bg-gray-100 rounded-lg py-3">
            {catalogLinks.map((item, i) => {
              const Icon = item.icon;
              return (
                <Link
                  onClick={() => setShowSidebar(false)}
                  key={i}
                  href={item.href}
                  className={
                    pathname === item.href
                      ? "flex items-center space-x-3  py-1 text-sm text-green-600"
                      : "flex items-center space-x-3  py-1 text-slate-800 dark:text-slate-50"
                  }
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.title}</span>
                </Link>
              );
            })}
          </CollapsibleContent>
        </Collapsible>

        {sidebarLinks.map((item, i) => {
          const Icon = item.icon;
          return (
            <Link
              onClick={() => setShowSidebar(false)}
              key={i}
              href={item.href}
              className={
                item.href == pathname
                  ? "flex items-center space-x-3 px-6 py-2 border-l-4 border-green-600"
                  : "flex items-center space-x-3 px-6 py-2 text-slate-800 dark:text-slate-50"
              }
            >
              <Icon />
              <span>{item.title}</span>
            </Link>
          );
        })}
        <div className="px-3 py-2">
          <button className="bg-red-600 rounded-md flex items-center space-x-3 px-6 py-3">
            <LogOut />
            <span>Log Out</span>
          </button>
        </div>
      </div>
    </div>
  );
}
