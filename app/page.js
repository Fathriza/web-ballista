import Image from "next/image";
import React from "react";
import Head from "next/head";
import "../styles/main.scss";

export default function Home() {
  return (
    <div className="flex items-center justify-center flex-col min-h-screen bg-black">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <div className="bg-black rounded-2xl shadow-xl flex flex-row w-2/3 max-w-4xl border border-lime-400">
          <div className="w-2/5 rounded-tl-2xl rounded-bl-2xl py-36 px-12">
            <h2 className="text-xl font-bold mb-2 text-white">
              WELCOME TO BALLISTA
            </h2>
            <div className="border-2 w-10 border-white inline-block mb-2"></div>
            <img
              src="/BALLISTA LOGO 1.png"
              alt="User Profile"
              width={1000}
              height={1000}
              className="w-200 h-200"
            />
            <p>Management Information System with BallisAI</p>
          </div>
          <div className="w-3/5 p-5 bg-white rounded-tr-2xl rounded-br-2xl">
            <div className="py-36 px-12">
              <h2 className="text-xl font-bold text-black mb-2">
                Login to Account
              </h2>
              <div className="border-2 w-10 border-white inline-block mb-1"></div>
              <div className="flex flex-col items-center">
                <input
                  type="email"
                  name="email"
                  placeholder="Enter Your Email"
                  className="bg-gray-100 text-black p-2 mt-2 rounded-lg shadow flex items-center outline-none text-sm w-64"
                />
                <input
                  type="password"
                  name="pass"
                  placeholder="Enter Your Password"
                  className="bg-gray-100 text-black p-2 mt-2 rounded-lg shadow flex items-center outline-none text-sm w-64 mb-4"
                />
                <div className="flex justify-between w-64 mb-5">
                  <label className="flex items-center text-xs text-slate-950 "><input type="checkbox" name="remember" className="mr-1 "/>Remember Me? </label>
                  <a href="#" className="text-xs text-slate-950">Forgot Password</a>
                </div>
                <button
                  type="button"
                  className="rounded-lg mt-5 px-10 py-2.5 text-sm font-medium text-white bg-slate-900 hover:bg-lime-400 focus:ring-4 focus:outline-none flex-grow"
                >
                  Login
                </button>
                <p className="text-xs text-slate-400 mt-4"> Or Login With</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
