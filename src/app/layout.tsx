import { ReactNode } from "react";
import "./globals.css";
import Navbar from "../app/components/Navbar";
import Footer from "../app/components/Footer";

export const metadata = {
  title: "Cover Letter Updater",
  description: "Generate customized cover letters as PDFs",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col max-h-screen h-screen">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
