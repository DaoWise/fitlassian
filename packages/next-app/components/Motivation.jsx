import React from "react";
import Image from "next/image";
import Img2 from "../public/assets/first.png";

export const Motivation = () => {
  return (
    <div id="pitch">
      <div className="md:p-12 my-10 flex justify-center items-center w-full">
        <iframe
          src="https://www.youtube.com/embed/cXda6JOUwbw"
          title="FitLassian - Gamifying Scrum Sprints"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
          className="w-full h-full md:h-[497px] md:w-[884px]"
        ></iframe>
      </div>
    </div>
  );
};
