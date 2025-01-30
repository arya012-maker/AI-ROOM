import React from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Image from "next/image";

const CustomLoading = ({ loading }) => {
  return (
    <AlertDialog open={loading}>
      <AlertDialogContent>
        <AlertDialogTitle className="sr-only">Loading</AlertDialogTitle>
        <div className=" bg-white flex flex-col items-center my-10 justify-center">
          <Image src={"/loading.gif"} alt="loading" width={100} height={100} />{" "}
          <h2>AI is doing its work.....Dont Refresh</h2>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CustomLoading;
