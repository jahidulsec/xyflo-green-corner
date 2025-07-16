import RegisterForm from "@/feature/doctor/components/register-form";
import React, { Suspense } from "react";

export default function HomePage() {
  return (
    <Suspense>
      <RegisterForm />
    </Suspense>
  );
}
