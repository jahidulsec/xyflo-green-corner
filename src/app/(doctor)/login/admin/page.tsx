import LoginForm from "@/feature/admin/components/login-form";
import React from "react";

export default function AdminLoginPage() {
  return (
    <div>
      <main className=" w-full flex flex-col justify-center items-center px-6 relative min-h-[calc(100vh-30rem)]">
        <LoginForm />
      </main>
    </div>
  );
}
