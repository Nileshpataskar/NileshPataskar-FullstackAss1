'use client'

import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl mb-6">Select View</h1>
      <Link href="/Pages/admin">
        <button className="bg-blue-500 text-white px-4 py-2 m-2 rounded">
          Admin
        </button>
      </Link>
      <Link href="/Pages/user">
        <button className="bg-green-500 text-white px-4 py-2 m-2 rounded">
          User
        </button>
      </Link>
    </div>
  );
}
