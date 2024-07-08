import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "./StoreProvider";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sistema de Gestión Hospitalaria",
  description: "EL día a día de tu centro clínico",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <html lang="en" className="bg-primary-50 text-primary-950 dark:bg-primary-950 dark:text-primary-50">
        <body className={inter.className}>
          {children}
          <Toaster />
        </body>
      </html>
    </StoreProvider>

  );
}
