import AppNav from "@/components/navbar/app-nav";
import HeaderSection from "@/feature/doctor/components/header-section";
import RegisterForm from "@/feature/doctor/components/register-form";
import Image from "next/image";
import React, { Suspense } from "react";

export default function HomePage() {
  return (
    <div className="relative min-h-svh isolate bg-primary-foreground/95">
      <AppNav />

      <main className="container p-6 mx-auto flex flex-col gap-10">
        <HeaderSection />

        <Suspense>
          <RegisterForm />
        </Suspense>
      </main>

      {/* shapes */}
      <Image
        src={"/images/shapes.svg"}
        alt=""
        width={240}
        height={500}
        className="absolute right-0 bottom-0 h-full w-[2rem] object-cover object-left -z-[1]"
      />

      <Image
        src={"/images/texture.svg"}
        alt=""
        width={240}
        height={500}
        className="absolute top-0 w-full h-full object-cover object-left -z-[2] opacity-15"
      />
    </div>
  );
}
