/** @format */

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavbarComponent from "@/components/NavbarComponent";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <ThemeProvider theme={theme}>
        <body className={inter.className}>
          <header>
            <NavbarComponent />
          </header>
          {children}
        </body>
      </ThemeProvider>
    </html>
  );
}
