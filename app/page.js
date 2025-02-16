"use client";
import React, { useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button.jsx";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Home() {
  const { isSignedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn) {
      router.push("/dashboard");
    }
  }, [isSignedIn, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-indigo-700 flex flex-col items-center justify-center">
      <div className="p-5 shadow-sm flex justify-between items-center w-full max-w-6xl bg-purple-600 rounded-lg">
        <div className="flex items-center gap-2">
          <Image src={"/logo.svg"} width={40} height={40} alt="Logo" />
          <h2 className="font-bold text-lg text-white">AI ROOM DESIGN</h2>
        </div>
        <Link href="/sign-in">
          <Button variant="ghost" className="rounded-full text-white">
            Get Started
          </Button>
        </Link>
      </div>
      {!isSignedIn && (
        <div className="text-center p-8 bg-white rounded-lg shadow-2xl mt-10">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
            Welcome to My AI-Room Design App
          </h1>
          <p className="text-lg text-gray-700 mb-8">
            Discover the amazing features of our AI-Room Design App
          </p>
          <Link href="/sign-in">
            <Button className="px-6 py-3 text-lg">Explore Now</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
