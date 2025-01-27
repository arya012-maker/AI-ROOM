import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function EmptyState() {
  return (
    <div className="flex items-center justify-center mt-10 flex-col">
      <Image
        src={"/Placeholder.png"}
        width={400}
        height={400}
        alt="Placeholder"
      />
      <h2 className="font-medium text-xl text-gray-500">
        CREATE A WHOLE NEW WORLD AND EXPERIENCE THE MAGIC OF AI
      </h2>
      <Link href={"/dashboard/create-new/"}>
        <Button className="mt-5"> + Redesign You Room</Button>
      </Link>
    </div>
  );
}

export default EmptyState;
