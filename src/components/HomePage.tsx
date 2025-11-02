/* eslint-disable @next/next/no-async-client-component */
"use client";
/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaTelegramPlane,
  FaYoutube,
} from "react-icons/fa";
import { Separator } from "./ui/separator";
import CustomCarousel from "./CustomCarousel";
import { Button } from "./ui/button";
import {
  fetchCards,
  fetchDiscounts,
  fetchTips,
  fetchVideos,
  fetchBestSellingProducts,
  fetchMostViewedProducts,
} from "@/utils/fetchData";
import YouTubeThumbnailCarousel from "./YouTubeThumbnailCarousel";
import ProductCarousel from "./ProductCarousel";
import { useEffect, useState } from "react";
import { buildFileUrl } from "@/utils/apiBase";
import { Product } from "@/models/product";

type Card = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  type: string;
  redirectUrl: string;
  active: boolean;
};

interface Tip {
  id: number;
  title: string;
  description: string;
  content: string; // Assuming this is a reference or identifier for the content, e.g., a UUID.
  type: string; // Example: "tip"
  status: string; // Example: "draft"
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

const Home = () => {
  const router = useRouter();
  const [cards, setCards] = useState<Card[]>([]);
  const [tips, setTips] = useState<Tip[]>([]);
  const [videos, setVideos] = useState<Tip[]>([]);
  const [discounts, setDiscounts] = useState<any[]>([]);
  const [bestSellingProducts, setBestSellingProducts] = useState<Product[]>([]);
  const [mostViewedProducts, setMostViewedProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const [allCards, allTips, allVideos, allDiscounts, bestSelling, mostViewed] = await Promise.all([
        fetchCards(),
        fetchTips(),
        fetchVideos(),
        fetchDiscounts(),
        fetchBestSellingProducts(10),
        fetchMostViewedProducts(10),
      ]);
      setCards(allCards || []);
      setTips(allTips || []);
      setVideos(allVideos || []);
      setDiscounts(allDiscounts || []);
      setBestSellingProducts(bestSelling || []);
      setMostViewedProducts(mostViewed || []);
    };

    fetchData();
  }, []);

  return (
    <main className="flex flex-col gap-0">
      {/* Hero Section with 3 Cards */}
      <section className="pt-4">
        {/* <div className="container mx-auto lg:hidden">
          <CustomCarousel tips={tips} visibleItems={tips.length} />
        </div> */}
        <div className=" mx-auto container lg:block">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Card 1 - AI Beauty Assistant */}
            {cards.map((card) => (
              <Link href={card.type === "product" ? `/products/${card.redirectUrl}` : `/products?categoryId=${card.redirectUrl}`}
                key={card.id}
                className="relative group"
              >
                <img
                  src={buildFileUrl(card.imageUrl)}
                  alt="AI Beauty Assistant"
                  className="w-full h-auto object-cover rounded-lg transition-transform transform"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Skin Type Checker */}
      <section className="container rounded-lg py-8">
        {discounts.length > 0 && (
          <div
            key={discounts[0].id}
            className="relative w-full rounded-lg border-2 mb-4"
          >
            <img
              src={buildFileUrl(discounts[0].image)}
              alt=""
              className="w-full rounded-lg transition-transform transform"
              style={{ maxHeight: "20px" }}
            />
          </div>
        )}
      </section>

      {/* Best Selling Products Section */}
      {bestSellingProducts.length > 0 && (
        <ProductCarousel 
          products={bestSellingProducts} 
          title="Best Selling Products"
        />
      )}

      {/* Most Viewed Products Section */}
      {mostViewedProducts.length > 0 && (
        <ProductCarousel 
          products={mostViewedProducts} 
          title="Most Viewed"
        />
      )}

      <section className="py-10 bg-[#F3F4F6]">
        <div className="mx-auto container flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <div>
              <h3 className="text-2xl font-semibold">Featured Tips:</h3>
              <p>Today&apos;s featured tips</p>
            </div>
            <Separator className="bg-black/10 font-bold" />
          </div>
          <div className="px-4">
            <CustomCarousel tips={tips} visibleItems={tips.length} />
          </div>
        </div>
      </section>

      <section className="container mx-auto py-10 flex flex-col gap-2">
        {/* Section Title */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold">Discover Tips & Tutorials</h2>
          <p className="mt-2">
            Explore helpful tips and tutorials from our YouTube channel.
          </p>
        </div>
        <YouTubeThumbnailCarousel
          videos={videos}
          visibleItems={videos.length}
        />
        {/* Call to Action */}
        <div className="text-center w-min self-center mt-4">
          <Link href="/blogs">
            <Button className="">Watch More Videos</Button>
          </Link>
        </div>
      </section>

      <section className="bg-gray-100 py-10">
        <div className="container mx-auto text-center">
          {/* Section Title */}
          <h2 className="text-3xl font-bold mb-6">Join Our Community</h2>
          <p className="text-gray-600 mb-8">
            Follow us on social media to stay updated with the latest products,
            deals, and updates.
          </p>

          {/* Social Media Icons */}
          <div className="flex flex-wrap justify-center gap-6">
            <Link
              href="https://www.facebook.com/enkuBeauty"
              target="_blank"
              rel="noopener noreferrer"
            >
              <p className="bg-white text-primary p-4 rounded-full shadow-lg hover:bg-primary hover:text-white transition duration-300">
                <FaFacebookF className="text-2xl" />
              </p>
            </Link>
            <Link
              href="https://instagram.com/enkubeautyshop"
              target="_blank"
              rel="noopener noreferrer"
            >
              <p className="bg-white text-primary p-4 rounded-full shadow-lg hover:bg-primary hover:text-white transition duration-300">
                <FaInstagram className="text-2xl" />
              </p>
            </Link>
            <Link
              href="https://tiktok.com/@enku.beauty"
              target="_blank"
              rel="noopener noreferrer"
            >
              <p className="bg-white text-primary p-4 rounded-full shadow-lg hover:bg-primary hover:text-white transition duration-300">
                <FaTiktok className="text-2xl" />
              </p>
            </Link>
            <Link
              href="https://t.me/enku_beauty"
              target="_blank"
              rel="noopener noreferrer"
            >
              <p className="bg-white text-primary p-4 rounded-full shadow-lg hover:bg-primary hover:text-white transition duration-300">
                <FaTelegramPlane className="text-2xl" />
              </p>
            </Link>
            <Link
              href="https://www.youtube.com/@EnkuBeauty"
              target="_blank"
              rel="noopener noreferrer"
            >
              <p className="bg-white text-primary p-4 rounded-full shadow-lg hover:bg-primary hover:text-white transition duration-300">
                <FaYoutube className="text-2xl" />
              </p>
            </Link>
          </div>

          {/* Call to Action */}
          <div className="mt-8">
            <p className="text-gray-600">
              Be part of our community and get the latest updates right in your
              feed!
            </p>
          </div>
        </div>
      </section>

      <footer className="bg-primary text-white py-10">
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-bold mb-4">About Pixel Ecommerce</h3>
            <p className="text-white text-sm">
              Pixel Ecommerce is your trusted online marketplace offering a wide range of quality products including electronics, accessories, and more. Shop with confidence and enjoy excellent service.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Join Our Community</h3>
            <p className="text-white text-sm mb-4">
              Connect with us on social media to stay updated with the latest
              products, deals, and trends.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/enkuBeauty"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-400"
              >
                <FaFacebookF className="text-2xl" />
              </a>
              <a
                href="https://instagram.com/enkubeautyshop"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-400"
              >
                <FaInstagram className="text-2xl" />
              </a>
              <a
                href="https://www.youtube.com/@EnkuBeauty"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-400"
              >
                <FaYoutube className="text-2xl" />
              </a> 
              <a
                href="https://t.me/enku_beauty"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-400"
              >
                <FaTelegramPlane className="text-2xl" />
              </a>
              <a
                href="https://tiktok.com/@enku.beauty"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-400"
              >
                <FaTiktok className="text-2xl" />
              </a>
            </div>
          </div>

          {/* Join Telegram Section */}
          <div>
            <h3 className="text-lg font-bold mb-4">
              Get Exclusive Updates
            </h3>
            <p className="text-white text-sm mb-4">
              Join our Telegram community for the latest product launches, deals, and
              updates.
            </p>
            <a
              href="https://t.me/enku_beauty"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="px-4 py-2 bg-white hover:bg-pink-400 hover:text-white rounded-lg text-primary flex items-center space-x-2">
                <FaTelegramPlane className="text-lg" />
                <span>Join Our Telegram</span>
              </button>
            </a>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-10 border-t border-white pt-6 text-center text-white text-sm">
          © {new Date().getFullYear()} Pixel Ecommerce. All rights reserved.
        </div>
      </footer>
    </main>
  );
};

export default Home;
