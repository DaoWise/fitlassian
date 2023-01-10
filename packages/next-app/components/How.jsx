import React from "react";
import Image from "next/image";
import img4 from "../public/assets/four.png";
import img3 from "../public/assets/3.png";

export const How = () => {
  return (
    <div id="how">
      <div className="relative">
        <div>
          <Image src={img3} alt="how" className="ml-64" height={839} />
        </div>
        <div className="absolute top-1/4 right-1/4 flex items-center justify-center text-white sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl sm:block">
          <p className="text-center tracking-widest leading-loose font-quicksand">
            Programmers run <br /> in real to gain <br />
            points for upgrading <br />
            there virtual avatar.
          </p>
        </div>
      </div>
    </div>
  );
};
