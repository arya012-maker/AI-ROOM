import React from "react";
import Image from "next/image";
import { useState } from "react";

const DesignType = ({ selectedDesignType }) => {
  const Designs = [
    {
      name: "Modern",
      image: "/modern.png",
    },
    {
      name: "Classic",
      image: "/classic.png",
    },
    {
      name: "Rustic",
      image: "/rustic.png",
    },
    {
      name: "Traditional",
      image: "/traditional.png",
    },
    {
      name: "Bathroom",
      image: "/bathroom.png",
    },
  ];

  const [selectedOption, setSelectedOption] = useState();

  return (
    <div className="mt-5">
      <label className="text-gray-500"> Select an Interior Design Type</label>
      <div className="grid grid-cols-2 md:gird-cols-3 lg:grid-cols-4 gap-5 mt-3">
        {Designs.map((design, index) => (
          <div
            key={index}
            onClick={() => {
              setSelectedOption(design.name);
              selectedDesignType(design.name);
            }}
          >
            <Image
              src={design.image}
              alt={design.name}
              width={100}
              height={100}
              className={`h-[80px] rounded-md hover:scale-110 transition-all cursor-pointer
                ${
                  design.name == selectedOption &&
                  "border-2 border-primary rounded-md p-1"
                }`}
            />
            <p className="text-gray-500">{design.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DesignType;
