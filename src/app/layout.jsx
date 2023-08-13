import Sidebar from "@/components/sidebar/page";
import "./globals.css";
import { Inter } from "next/font/google";
import Menus from "@/lib/Menus";
import Navbar from "@/components/navbar/page";
import NextTopLoader from "nextjs-toploader";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL(`${process.env.NEXTAUTH_URL}`),
  title: {
    default: "Nimaze",
    template: "Nimaze",
  },
  description: "Nonton anime subtitle Indonesia",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Sidebar Menus={Menus}>
          <NextTopLoader color="#ffffff" showSpinner={false} />
          <Navbar />
          {children}
        </Sidebar>
      </body>
    </html>
  );
}
