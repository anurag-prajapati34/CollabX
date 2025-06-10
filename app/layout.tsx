import type { Metadata } from "next";
import "./globals.css";
import { ConvexClientProvider } from "@/components/providers/convex-client-provider";
import { Toaster } from "@/components/ui/sonner";
import { Suspense } from "react";
import { Loading } from "./board/[boardId]/_components/canvas-loading";

export const metadata: Metadata = {
  title: "CollabX",
  description: "Realtime Collaboration Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Suspense fallback={<Loading />}>
          <ConvexClientProvider>
            <Toaster />

            {children}
          </ConvexClientProvider>
        </Suspense>
      </body>
    </html>
  );
}
