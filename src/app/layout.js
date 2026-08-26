import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import AnnouncementBar from "@/components/AnnouncementBar";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AnnouncementBar />
        <Navbar />
        {children}
      </body>
    </html>
  );
}