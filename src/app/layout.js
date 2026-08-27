import "./globals.css";
import Navbar from "@/components/Navbar";
import AnnouncementBar from "@/components/AnnouncementBar";
import { StoreProvider } from "@/context/StoreContext";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Toaster
      position="bottom-right"
      toastOptions={{
        duration: 2000,
        }}
          />
        <StoreProvider>
          <AnnouncementBar />
          <Navbar />
          {children}
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}