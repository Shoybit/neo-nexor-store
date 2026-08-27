import "./globals.css";
import Navbar from "@/components/Navbar";
import AnnouncementBar from "@/components/AnnouncementBar";
import { StoreProvider } from "@/context/StoreContext";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import PageLoaderWrapper from "@/components/PageLoaderWrapper";

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
          <PageLoaderWrapper>
            <AnnouncementBar />
            <Navbar />

            {children}

            <Footer />
          </PageLoaderWrapper>
        </StoreProvider>
      </body>
    </html>
  );
}