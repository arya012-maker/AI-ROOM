//
"use client";

import React from "react";
import ImageSelection from "./_components/ImageSelection";
import RoomType from "./_components/RoomType";
import DesignType from "./_components/DesignType";
import AdditionalReq from "./_components/AdditionalReq";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "axios";
import { storage } from "@/config/appwriteConfig";

function CreateNew() {
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({});

  const onHandleInputChange = (value, fieldName) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
    console.log(formData);
  };

  const GenerateAiImage = async () => {
    try {
      const fileData = await SaveRawImageToAppwrite(file);
      const result = await axios.post("/api/redesign-room", {
        imageUrl: fileData?.fileUrl,
        roomType: formData?.roomType,
        designType: formData?.designType,
        additionalReq: formData?.additionalReq,
      });
      console.log(result.data);
    } catch (error) {
      console.error("Error generating AI image:", error);
    }
  };

  const SaveRawImageToAppwrite = async (file) => {
    if (!file || !file.size) {
      console.error("Invalid file object:", file);
      throw new Error("Invalid file object");
    }

    try {
      // Generate a unique file name using the current timestamp
      const fileName = Date.now() + "_raw.png";

      // Upload the file to Appwrite Storage
      const response = await storage.createFile(
        "67982542003e5e0255b2", // Replace with your Appwrite bucket ID
        "unique()", // Use Appwrite's `unique()` to generate a unique file ID
        file // The file object to upload
      );
      console.log("File uploaded successfully:", response);

      // Get the file URL for viewing or downloading
      const fileUrl = storage.getFileView("67982542003e5e0255b2", response.$id); // Use the same bucket ID

      // Return the file ID, name, and URL
      return {
        fileId: response.$id,
        fileName: fileName,
        fileUrl: fileUrl, // The URL to view or download the file
      };
    } catch (error) {
      console.error("Error uploading file to Appwrite:", error);
      throw error; // Re-throw the error for handling in the calling function
    }
  };

  return (
    <div>
      <h2 className="font-bold text-4xl text-primary text-center">
        Experience the Magic of AI Modelling
      </h2>
      <p className="text-center text-gray-500">
        Create A New Whole Room For you using AI
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 mt-10 gap-10">
        <ImageSelection
          selectedImage={(value) => {
            onHandleInputChange(value, "image"); // Update formData
            setFile(value); // Update the file state
          }}
        />
        <div>
          <RoomType
            selectedRoomType={(value) => onHandleInputChange(value, "roomType")}
          />
          <DesignType
            selectedDesignType={(value) =>
              onHandleInputChange(value, "designType")
            }
          />
          <AdditionalReq
            additionalRequirementInput={(value) =>
              onHandleInputChange(value, "additionalReq")
            }
          />
          <Button className="mt-5 w-full" onClick={GenerateAiImage}>
            GENERATE
          </Button>
          <p className="text-sm text-gray-400 mb-52">
            NOTE : 1 Credit will be used to Re-design the Room
          </p>
        </div>
      </div>
    </div>
  );
}

export default CreateNew;
