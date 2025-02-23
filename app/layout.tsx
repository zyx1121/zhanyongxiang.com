// app/layout.tsx

import DraggableProvider from "@/components/dnd/provider";
import Footer from "@/components/footer";
import Header from "@/components/header";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Fira_Code } from "next/font/google";
import "./globals.css";

const firaCode = Fira_Code({
  subsets: ["latin"],
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
      <body className={`${firaCode.className} antialiased`}>
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
