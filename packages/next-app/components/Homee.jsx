import React from "react";
import Image from "next/image";
// import I3 from "../public/assets/sec.png";

export const Homee = () => {
  return (
    <div>
      <div className="relative">
        <Image
          src="/assets/sec.png"
          className="sm:block"
          width={1184}
          height={848}
          alt="/"
        />
        <div className="absolute top-1/4 right-1/4 flex items-center justify-center text-white sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl sm:block">
          <p className="text-center tracking-widest leading-loose font-quicksand">
            Gamify Your <br />
            Programmer&#39;s,
            <br /> Fitness Journey
          </p>
        </div>
      </div>
      <div></div>
    </div>
  );
};
