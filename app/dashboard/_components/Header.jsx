"use client";
import { UserButton } from "@clerk/nextjs";
import React, { useContext } from "react";
import Image from "next/image";
import { UserDetailContext } from "@/app/_context/UserDetailContext";
import { Button } from "@/components/ui/button";

const Header = () => {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);

  return (
    <div className="p-5 shadow-sm flex justify-between items-center">
      <div className="flex items-center gap-2">
        <Image src={"/logo.svg"} width={40} height={40} alt="Logo" />
        <h2 className="font-bold text-lg">AI ROOM DESIGN</h2>
      </div>
      <Button variant="ghost" className="rounded-full text-primary">
        Buy me more credits
      </Button>
      <div className="flex items-center gap-7 ">
        <div className="flex items-center gap-2 p-1 bg-slate-200 px-3 rounded-full">
          <Image src={"/star.png"} width={20} height={20} alt="Star" />
          <h2>{userDetail?.credits}</h2>
        </div>
        <UserButton />
      </div>
    </div>
  );
};

export default Header;
