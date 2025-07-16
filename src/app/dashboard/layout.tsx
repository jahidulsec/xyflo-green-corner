import AppNav from "@/components/dashboard/app-nav";
import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Dashboard - Xyflo",
};

export default function AdminLayout({ children }: React.PropsWithChildren) {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <AppNav />
          {children}
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
