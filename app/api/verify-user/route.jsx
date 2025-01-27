import { db } from "@/config/db.js";
import { eq } from "drizzle-orm";
import { Users } from "@/config/schema.js";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { user } = await req.json();

  try {
    const userInfo = await db
      .select()
      .from(Users)
      .where(eq(Users.email, user?.primaryEmailAddress.emailAddress));
    console.log("User Info:", userInfo);

    if (userInfo?.length === 0) {
      const SaveResult = await db
        .insert(Users)
        .values({
          name: user?.fullName,
          email: user?.primaryEmailAddress.emailAddress,
          imageUrl: user?.imageUrl,
          credits: 3,
        })
        .returning({ Users });
      console.log("Save Result:", SaveResult);
      return NextResponse.json({ result: SaveResult[0] });
    }
    return NextResponse.json({ result: userInfo[0] });
  } catch (e) {
    return NextResponse.json({ error: e.message });
  }
}
