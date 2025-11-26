
import "./globals.css";  // tailwind first
import "bootstrap/dist/css/bootstrap.min.css"; // then bootstrap
// import "bootstrap/dist/js/bootstrap.bundle.min.js";

import { type Metadata } from "next";
import { ClerkProvider, } from "@clerk/nextjs";
import ReduxProviderClient from "@/store/providers/ReduxProviderClient";


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <html lang="en" className="min-h-screen">
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </head>

        <body className="text-black" style={{ backgroundColor: "#f6fff6" }}>
          <ReduxProviderClient>
            {children}
          </ReduxProviderClient>
        </body>
      </html>
    </ClerkProvider>
  );
}
