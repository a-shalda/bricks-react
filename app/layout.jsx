import { Inter } from "next/font/google";
import "@/scss/styles.scss";
import Header from "@/components/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Bricks eCommerce Shop",
  description: "Bricks eCommerce Shop",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="body">
        <Header />
        {children}
      </body>
    </html>
  );
}
