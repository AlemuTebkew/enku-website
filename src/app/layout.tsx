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
  title: "Pixel Ecommerce",
  description: "Your trusted online marketplace for quality products. Discover electronics, accessories, and more with excellent customer service and fast delivery. Shop conveniently from home.",
  openGraph: {
    title: "Pixel Ecommerce",
    description: "Your trusted online marketplace for quality products. Discover electronics, accessories, and more with excellent customer service and fast delivery. Shop conveniently from home.",
    images: [
      {
        url: "/logo/logo_primary.png",
        width: 800,
        height: 600,
        alt: "Pixel Ecommerce",
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
  let categories = [];
  let brands = [];
  try {
    const result = await fetchCategoriesAndBrands();
    
    categories = result.categories || [];
    brands = result.brands || [];
    console.log('Fetched categories and brands:', categories, brands);
  } catch (error) {
    console.log('Error fetching categories and brands:', error);
  }

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
