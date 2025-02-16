"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import EmptyState from "./EmptyState";
import Link from "next/link";
import { AiGeneratedImage } from "@/config/schema";
import { db } from "@/config/db";
import { eq } from "drizzle-orm";
import RoomDesignCard from "./RoomDesignCard";

const Listing = () => {
  const { user } = useUser();
  const [userRoomList, setUserRoomList] = useState([]);

  useEffect(() => {
    if (user && user.primaryEmailAddress) {
      const email = user.primaryEmailAddress.emailAddress;
      fetch(`/api/rooms?email=${email}`)
        .then((res) => res.json())
        .then((data) => setUserRoomList(data))
        .catch((err) => console.error(err));
    }
  }, [user]);
  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className=" font-bold text-3xl"> Hello , {user?.fullName}</h2>
        <Link href={"/dashboard/create-new/"}>
          <Button> + Redsign Your Room</Button>
        </Link>
      </div>

      {userRoomList?.length === 0 ? (
        <EmptyState />
      ) : (
        <div>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {userRoomList.map((room) => (
              <RoomDesignCard key={room.id} room={room} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Listing;
