import React from "react";
import Image from "next/image";
import Img2 from "../public/assets/first.png";

export const Motivation = () => {
  return (
    <div id="motivation">
      <div className="p-36 mx-36 my-10">
        <iframe
          width="884"
          height="497"
          src="https://www.youtube.com/embed/cXda6JOUwbw"
          title="FitLassian - Gamifying Scrum Sprints"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  );
};
