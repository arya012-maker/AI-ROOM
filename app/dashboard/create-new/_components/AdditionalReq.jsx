import React from "react";
import { Textarea } from "@/components/ui/textarea";

const AdditionalReq = ({ additionalRequirementInput }) => {
  return (
    <div className="mt-5">
      <label className="text-gray-500">Additional Requirements(Optional)</label>
      <Textarea
        className="mt-2"
        onChange={(e) => additionalRequirementInput(e.target.value)}
      ></Textarea>
    </div>
  );
};

export default AdditionalReq;
