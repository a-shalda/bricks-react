import { Inter } from "next/font/google";
import "@/scss/styles.scss";
import Header from "@/components/general/header";
import Footer from "@/components/general/footer";
import { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Bricks eCommerce Shop",
  description: "Bricks eCommerce Shop",
};

export default function RootLayout({ children }: { children: ReactNode}) {
  return (
    <html lang="en">
      <body className="body">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
