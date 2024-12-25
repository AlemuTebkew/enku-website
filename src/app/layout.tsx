import { Suspense } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaTelegramPlane,
  FaYoutube,
} from "react-icons/fa";
import "./globals.css";
import Header from "@/components/Header";
import Nav from "@/components/Nav";
import { fetchCategoriesAndBrands } from "@/utils/fetchData";
import StoreProvider from "./providers";
import Footer from "@/components/Footer";
import SkeletonFilterProductList from "@/features/products/components/SkeletonProductFilter";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Enku Beauty",
  description: "Discover premium beauty products from the USA and Europe, now available in Ethiopia! Our carefully curated collection caters to your skincare, haircare, and cosmetic needs, bringing you the best the world has to offer. Shop conveniently from home and have",
  openGraph: {
    title: "Enku Beauty",
    description: "Discover premium beauty products from the USA and Europe, now available in Ethiopia! Our carefully curated collection caters to your skincare, haircare, and cosmetic needs, bringing you the best the world has to offer. Shop conveniently from home and have",
    images: [
      {
        url: "/logo/logo_primary.png",
        width: 800,
        height: 600,
        alt: "Enku Beauty",
      },
    ],
  },
};

// const dynamicData = await fetch(`https://...`, { cache: "no-store" });

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { categories, brands } = await fetchCategoriesAndBrands();
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#f3f3f3]`}>
        <Suspense fallback={<SkeletonFilterProductList />}>
          <StoreProvider>
            <Nav categories={categories} />
            <div className="bg-white">{children}</div>
            {/* <Footer/> */}
          </StoreProvider>
        </Suspense>
      </body>
    </html>
  );
}
