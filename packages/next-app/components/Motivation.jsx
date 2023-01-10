import React from "react";
import Image from "next/image";
import Img2 from "../public/assets/first.png";

export const Motivation = () => {
  return (
    <div id="motivation">
      <div className="relative">
        <Image
          src={Img2}
          className="ml-72"
          width={1005}
          height={676}
          alt="mot"
        />
        <div className="absolute bottom-56 left-0 right-2/4 h-64 flex items-center justify-center text-white text-4xl sm:text-3xl md:text-2xl lg:text-xl xl:text-2xl sm:block">
          <p className="capitalize tracking-widest leading-loose text-center">
            Programmers keep the
            <br />
            world running smoothly,
            <br />
            but their own health is at
            <br /> risk due to sedentary
            <br />
            lifestyles.
          </p>
        </div>
      </div>
    </div>
  );
};
