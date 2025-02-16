import React from "react";
import { useState } from "react";
import ReactBeforeSliderComponent from "react-before-after-slider-component";
import "react-before-after-slider-component/dist/build.css";
import AiOutputDialog from "./AiOutputDialog";
const RoomDesignCard = ({ room }) => {
  // const [openDialog, setOpenDialog] = useState(false);
  // const onClickHandlder = () => {
  //   setOpenDialog(true);
  // };
  return (
    <div
      className="border border-gray-200 rounded-md shadow-md"
      // onClick={onClickHandlder}
    >
      <ReactBeforeSliderComponent
        firstImage={{ imageUrl: room?.orgImage }}
        secondImage={{ imageUrl: room?.aiImage }}
      />
      <div className="p-4">
        <h3>Room Type: {room?.roomType}</h3>
        <h3>Design Type: {room?.designType}</h3>
      </div>
      {/* <AiOutputDialog
        aiImage={room?.aiImage}
        orgImage={room.orgImage}
        closeDialog={() => setOpenDialog(false)}
        openDialog={openDialog}
      /> */}
    </div>
  );
};

export default RoomDesignCard;
