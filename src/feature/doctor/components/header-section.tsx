import Image from "next/image";
import React from "react";

export default function HeaderSection() {
  return (
    <div className="flex justify-center items-center flex-col gap-5 mt-10">
      <div className="relative mix-blend-multiply w-[5rem] aspect-square">
        <Image fill src={"/logos/Green Savers.jpg"} alt="" objectFit="cover" />
      </div>

      <div className="text-center">
        <h1 className="text-2xl font-title text-chart-3 font-semibold">
          Welcome
        </h1>
        <p className="font-title font-bold text-primary -mt-1">
          Xyflo - Green Corner
        </p>
      </div>
    </div>
  );
}
