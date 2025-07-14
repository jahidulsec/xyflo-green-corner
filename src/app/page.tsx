import AppNav from "@/components/navbar/app-nav";
import RegisterForm from "@/feature/doctor/components/register-form";
import Image from "next/image";
import React from "react";

export default function HomePage() {
  return (
    <div className="relative min-h-svh isolate bg-primary-foreground/95">
      <AppNav />

      <main className="container p-6 mx-auto flex flex-col gap-10">
        <div className="flex justify-center items-center flex-col gap-10 mt-10">
          <div className="relative mix-blend-multiply w-[5rem] aspect-square">
            <Image
              fill
              src={"/logos/Green Savers.jpg"}
              alt=""
              objectFit="cover"
            />
          </div>

          <h1 className="text-2xl font-title text-chart-3 font-semibold">Welcome</h1>
        </div>

        <RegisterForm />
      </main>

      {/* shapes */}
      <Image
        src={"/images/shapes.svg"}
        alt=""
        width={240}
        height={500}
        className="absolute right-0 bottom-0 h-full w-[3rem] object-cover object-left -z-[1]"
      />

      <Image
        src={"/images/texture.svg"}
        alt=""
        width={240}
        height={500}
        className="absolute top-0 w-full h-full object-cover object-left -z-[2] opacity-15"
      />
      <div className=""></div>
    </div>
  );
}
