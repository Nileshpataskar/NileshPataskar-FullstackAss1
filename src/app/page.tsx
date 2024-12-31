'use client'

import Link from "next/link";

export default function Home() {
  return (
    <div className="relative h-screen">
      {/* Diagonal Split Background */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-300/40 to-green-300/40 backdrop-blur-lg" />

      {/* Content */}
      <div className="relative z-10 flex h-full">
        {/* Admin Section */}
        <div className="flex-1 flex flex-col items-center justify-center bg-blue-100/50 backdrop-blur-lg">
          <h1 className="text-2xl mb-6 text-blue-800 font-semibold">Admin View</h1>
          <Link href="/Pages/admin">
            <button className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-600">
              Admin
            </button>
          </Link>
        </div>

        {/* User Section */}
        <div className="flex-1 flex flex-col items-center justify-center bg-green-100/50 backdrop-blur-lg">
          <h1 className="text-2xl mb-6 text-green-800 font-semibold">User View</h1>
          <Link href="/Pages/User">
            <button className="bg-green-500 text-white px-6 py-3 rounded-lg shadow hover:bg-green-600">
              User
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
