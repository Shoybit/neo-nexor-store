import "./globals.css";
import Navbar from "@/components/Navbar";
import AnnouncementBar from "@/components/AnnouncementBar";
import { StoreProvider } from "@/context/StoreContext";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <AnnouncementBar />
          <Navbar />
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}