import type { Metadata } from "next";
import { Geist, Geist_Mono, Fraunces } from "next/font/google";
import "./globals.css";
import toast, { Toaster } from "react-hot-toast";
import ReactQueryProvider from "@/providers/react.query.provider";
import AuthProvider from "@/providers/auth.provider";
import { ProductModalProvider } from "@/context/productmodal.context";
import { ProductModal } from "@/components/forms/admin/products/product-modal";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Grey Matter | Shop the Best",
  description: "Discover featured products, new arrivals, and more at Grey Matter.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} min-h-screen h-full antialiased tracking-wider`}
    >
      <body className="h-screen min-h-full flex flex-col">
        <ReactQueryProvider>
          <AuthProvider> 
            <ProductModalProvider>
              {children}
              <ProductModal/>
            </ProductModalProvider>            
            </AuthProvider>
            </ReactQueryProvider>
        <Toaster toastOptions={{duration: 2500}} />
      </body>
    </html>
  );
}
