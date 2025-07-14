import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

export default function AppNav({
  className,
  ...props
}: React.ComponentProps<"header">) {
  return (
    <header className={"w-full bg-primary/10 backdrop-blur-xs border-b border-primary"} {...props}>
      <div
        className={cn(
          "flex justify-between items-center gap-5 container px-6 py-3 lg:p-0 mx-auto w-full",
          className
        )}
      >
        <Image
          src={"/logos/Radiant Digital Health Logo.png"}
          alt="Radiant Digital Health"
          width={150}
          height={100}
        />

        <div className="relative w-16 aspect-video">
          <Image
            src={"/logos/Xyflo logo.svg"}
            alt="Radiant Digital Health"
            fill
          />
        </div>
      </div>
    </header>
  );
}
