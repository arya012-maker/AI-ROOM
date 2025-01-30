import { storage } from "@/config/appwriteConfig";
import { NextResponse } from "next/server";
import Replicate from "replicate";
import axios from "axios";
import { db } from "@/config/db";
import { AiGeneratedImage } from "@/config/schema";

const replicate = new Replicate({
  auth: process.env.NEXT_PUBLIC_REPLICATE_API_TOKEN,
});

export async function POST(req) {
  try {
    const { imageUrl, roomType, designType, additionalReq, userEmail } =
      await req.json();

    const input = {
      image: imageUrl,
      prompt: `A ${roomType} with a ${designType} style interior ${additionalReq}`,
    };

    // Call the Replicate API to generate the AI image
    const output = await replicate.run(
      "adirik/interior-design:76604baddc85b1b4616e1c6475eca080da339c8875bd4996705440484a6eac38",
      { input }
    );
    console.log("Output Image URL:", output);

    // Convert the output image URL to a base64 string
    const base64Image = await ConvertImageToBase64(output);
    // console.log("Base64 Image:", base64Image);

    // Convert base64 image to Blob
    const blob = base64ToBlob(base64Image);
    console.log("Blob Object:", blob);

    if (!blob || !blob.size) {
      throw new Error("Failed to convert base64 to Blob or Blob is empty");
    }
    // Upload the file to Appwrite Storage
    const file = new File([blob], "image.png", { type: "image/png" });
    const response = await storage.createFile(
      "67982542003e5e0255b2", // Replace with your Appwrite bucket ID
      "unique()", // Use Appwrite's `unique()` to generate a unique file ID
      file
    );

    console.log("File uploaded successfully:", response);

    // Get the file URL for viewing or downloading
    const fileUrl = storage.getFileView("67982542003e5e0255b2", response.$id); // Use the same bucket ID

    const dbResult = await db
      .insert(AiGeneratedImage)
      .values({
        userEmail: userEmail,
        roomType: roomType,
        designType: designType,
        additionalReq: "",
        orgImage: imageUrl,
        aiImage: fileUrl,
      })
      .returning({ id: AiGeneratedImage.id });
    return NextResponse.json({ result: dbResult[0] });
  } catch (e) {
    console.error("Error:", e);
    return NextResponse.json({ error: e.message });
  }
}

async function ConvertImageToBase64(imageUrl) {
  const resp = await axios.get(imageUrl, { responseType: "arraybuffer" });
  const base64ImageRaw = Buffer.from(resp.data).toString("base64");
  return "data:image/png;base64," + base64ImageRaw;
}

function base64ToBlob(base64) {
  const [header, data] = base64.split(",");
  const byteString = atob(data);
  const mimeString = header.split(":")[1].split(";")[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: mimeString });
}
