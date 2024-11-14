import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Toaster } from "@/components/ui/toaster";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
   title: "Smart Yoga",
   description: "Innovative yoga products for a smarter practice",
};

export default function RootLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   return (
      <html lang="en">
         <body className={inter.className}>
            <Header />
            <main className="container mx-auto px-4 py-8">{children}</main>
         <Footer />
         <Toaster/>
         </body>
      </html>
   );
}
