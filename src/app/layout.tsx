import type { Metadata } from "next";
import "./globals.css";
import ProgressProviders from "@/providers/progress";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Green Initiative - Xyflo",
  description: "Green Initialtive - Breathe with Xyflo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-inter antialiased`}>
        <ProgressProviders>
          {children}
          <Toaster closeButton richColors position="top-right" />
        </ProgressProviders>
      </body>
    </html>
  );
}
