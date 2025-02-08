import React, { useState } from "react";
import RunImg from "../assets/icons/run.png";
import EatImg from "../assets/icons/eat.png";
import WaveImg from "../assets/icons/wave.png";
import SitImg from "../assets/icons/sit.png";
import WalkImg from "../assets/icons/walk.png";
import HappyImg from "../assets/icons/happy.png";
import Run2Img from "../assets/icons/run2.png";

function Options({ setCurrAction }) {
  const [visiblePopup, setVisiblePopup] = useState(null); // State to track visibility of the popup

  const handleMouseEnter = (id) => {
    setVisiblePopup(id);
  };

  const handleMouseLeave = () => {
    setVisiblePopup(null);
  };

  const actions = [
    {
      name: "run",
      img: RunImg,
      text: "Run",
      action: "Armature|Run",
    },
    {
      name: "eat",
      img: EatImg,
      text: "Eat",
      action: "Armature|Eating_one_handed",
    },
    {
      name: "sit",
      img: SitImg,
      text: "Sit",
      action: "Armature|Sitting",
    },
    {
      name: "wave",
      img: WaveImg,
      text: "Wave",
      action: "Armature|Wave",
    },
    {
      name: "walk",
      img: WalkImg,
      action: "Armature|Walk",
      text: "Walk",
    },
    {
      name: "running",
      img: Run2Img,
      action: "running",
      text: "Running",
    },
    {
      name: "happy",
      img: HappyImg,
      action: "happy",
      text: "Happy",
    },
  ];
  const onActionClick = (data) => {
    setCurrAction(data.action);
  };

  return (
    <div className="bg-white flex flex-row space-x-4 relative items-center justify-center border-t py-2 overflow-auto flex-wrap overflow-x-auto hideScrollbar">
      {actions.map((data, index) => (
        <div
          title={data.name}
          onMouseEnter={() => handleMouseEnter(data.name)}
          onMouseLeave={handleMouseLeave}
          onClick={() => onActionClick(data)}
          className={`${"bg-gray-200"} flex items-center justify-center cursor-pointer relative p-2 rounded-full w-fit h-fit border hover:bg-gray-200`}
        >
          <img src={data.img} alt="" className="object-contain w-6 h-6" />
          <Popup isPopupVisible={visiblePopup === data.name} text={data.text} />
        </div>
      ))}
      {/* run */}
      {/* <div
        title="Run"
        onMouseEnter={() => handleMouseEnter("run")}
        onMouseLeave={handleMouseLeave}
        className={`${"bg-gray-200"} flex items-center justify-center cursor-pointer relative p-2 rounded-full w-fit h-fit border hover:bg-gray-200`}
      >
        <img src={RunImg} alt="" className="object-contain w-6 h-6" />
        <Popup isPopupVisible={visiblePopup === "run"} text={"Run"} />
      </div> */}
    </div>
  );
}

export default Options;

export function Popup({ isPopupVisible, text, bottomValue, rightValue }) {
  return (
    <p
      className={`${
        isPopupVisible ? "block" : "hidden"
      } transition duration-1000 absolute ${
        bottomValue ? bottomValue : "bottom-6"
      } 
       ${
         rightValue ? rightValue : "-right-5"
       } px-1 text-nowrap bg-[#dc5a5a] font-medium rounded-md text-white text-xs text-center z-10 select-none`}
    >
      {text}
    </p>
  );
}
