import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "./components/Navbar"


export const metadata: Metadata = {
  title: "Game Store",
  description: "Best online games at the best prices",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div id='wrapper'>
          <Navbar/>
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
