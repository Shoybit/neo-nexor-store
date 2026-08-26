import "./globals.css";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AnnouncementBar />
        <Navbar />
        {children}
      </body>
    </html>
  );
}