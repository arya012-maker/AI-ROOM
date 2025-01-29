import { NextResponse } from "next/server";

export { nextResponse } from "next/server";

export async function POST(req) {
  const { imageUrl, roomType, designType, additionalReq } = await req.json();

  return NextResponse.json({ result: "Hello, World!" });
}
