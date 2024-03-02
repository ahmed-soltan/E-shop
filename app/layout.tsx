import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Navbar from "./components/nav/Navbar";
import Footer from "./components/footer/Footer";
import CartProvider from "@/Providers/cartProvider";
import { Toaster } from "react-hot-toast";
import { getCurrentUser } from "@/actions/getCurrentUser";
import CategoryNav from "./components/nav/CategoryNav";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "E-Shop",
  description: "Ecommerce App",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={`${poppins.className} text-slate-700`}>
        <Toaster toastOptions={{
          style:{
            backgroundColor: "rgb(51 65 85)",
            color: "#fff",
            borderRadius: "10px",
            padding: "10px",
            fontSize: "14px",
            fontWeight: "bold",
            textAlign: "center",
          }
        }}/>
        <CartProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <CategoryNav/>
            <main className="flex-grow ">{children}</main>
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
