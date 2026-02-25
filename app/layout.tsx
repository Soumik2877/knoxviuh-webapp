import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SmoothScrolling from "@/components/providers/SmoothScrolling";
import CustomCursor from "@/components/ui/CustomCursor";
import AppleDock from "@/components/ui/AppleDock";
import TopNavbar from "@/components/ui/TopNavbar";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Agency Portfolio",
  description: "High-end cinematic creative agency portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased bg-background text-foreground relative overflow-x-hidden selection:bg-white selection:text-black">
        <SmoothScrolling>
          <CustomCursor />
          <TopNavbar />
          {children}
          <AppleDock />
        </SmoothScrolling>
      </body>
    </html>
  );
}
