import React, { useState } from "react";
import HappyImg from "../assets/icons/happy.png";
import SadImg from "../assets/icons/sad.png";
import AmazeImg from "../assets/icons/amaze.png";
import IdleImg from "../assets/icons/idle.png";
import SpeakImg from "../assets/icons/speak.png";

function Options({ setCurrAction, setIsPlayingMusic }) {
  const [visiblePopup, setVisiblePopup] = useState(null);

  // buttons constants
  const btnConstants = [
    {
      name: "idle",
      img: IdleImg,
      text: "Idle",
      action: "idle",
    },
    {
      name: "hello",
      img: SpeakImg,
      text: "Hello",
      action: "hello",
    },
    {
      name: "sad",
      img: SadImg,
      text: "Sad",
      action: "sad",
    },

    {
      name: "amaze",
      img: AmazeImg,
      text: "Amaze",
      action: "amaze",
    },
    {
      name: "happy",
      img: HappyImg,
      text: "Happy",
      action: "happy",
    },
  ];

  // on button click
  const onClick = (data) => {
    setCurrAction(data.action);
    if (data.action === "hello") {
      setIsPlayingMusic(true);
    }
  };

  // trigger popup handler
  const handleMouseEnter = (id) => {
    setVisiblePopup(id);
  };

  // remove popup handler
  const handleMouseLeave = () => {
    setVisiblePopup(null);
  };

  return (
    <div className="bg-white flex flex-row space-x-4 relative items-center justify-center border-t py-2 overflow-auto flex-wrap overflow-x-auto hideScrollbar">
      {/* mapping each buttons */}
      {btnConstants.map((data, index) => (
        <div
          key={index}
          title={data.name}
          onMouseEnter={() => handleMouseEnter(data.name)}
          onMouseLeave={handleMouseLeave}
          onClick={() => onClick(data)}
          className={`${"bg-gray-200"} flex items-center justify-center cursor-pointer relative p-2 rounded-full w-fit h-fit border hover:bg-gray-200`}
        >
          <img src={data.img} alt="" className="object-contain w-6 h-6" />
          <Popup isPopupVisible={visiblePopup === data.name} text={data.text} />
        </div>
      ))}
    </div>
  );
}

export default Options;

// popup on button hover
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
