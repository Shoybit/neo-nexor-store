"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import PageLoader from "./PageLoader";

export default function PageLoaderWrapper({ children }) {
  const pathname = usePathname();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initial website load
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Page navigation loader
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <>
      {loading && <PageLoader />}

      <div
        className={
          loading
            ? "pointer-events-none"
            : "pointer-events-auto"
        }
      >
        {children}
      </div>
    </>
  );
}