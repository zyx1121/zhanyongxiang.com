// app/layout.tsx

import DraggableProvider from "@/components/dnd/provider";
import Footer from "@/components/footer";
import Header from "@/components/header";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Fira_Code } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-code",
});

const elffontFern = localFont({
  src: "./elffont-fern.otf",
  display: "swap",
  variable: "--font-elffont-fern",
});

const elffontRock = localFont({
  src: "./elffont-rock.otf",
  display: "swap",
  variable: "--font-elffont-rock",
});

export const metadata: Metadata = {
  title: "zhanyongxiang.com",
  description: "zhanyongxiang.com",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${firaCode.className} ${elffontFern.variable} ${elffontRock.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <DraggableProvider>
            <Header />
            {children}
            <Footer />
          </DraggableProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
