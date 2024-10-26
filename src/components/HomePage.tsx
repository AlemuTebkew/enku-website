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
} from "@/utils/fetchData";
import YouTubeThumbnailCarousel from "./YouTubeThumbnailCarousel";
import { useEffect, useState } from "react";

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

const Home = async () => {
  const router = useRouter();
  const [cards, setCards] = useState<Card[]>([]);
  const [tips, setTips] = useState<Tip[]>([]);
  const [videos, setVideos] = useState<Tip[]>([]);
  const [discounts, setDiscounts] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch cards
      const allCards = (await fetchCards()) || [];
      setCards(allCards);

      // Fetch tips
      const allTips = (await fetchTips()) || [];
      setTips(allTips);

      // Fetch videos
      const allVideos = (await fetchVideos()) || [];
      setVideos(allVideos);

      // Fetch videos
      const allDiscounts = (await fetchDiscounts()) || [];
      setDiscounts(allDiscounts);
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
              <div
                onClick={() => {
                  if (card.type === "product") {
                    router.push(`/products/${card.redirectUrl}`);
                  } else {
                    router.push(`/products?categoryId=${card.redirectUrl}`);
                  }
                }}
                key={card.id}
                className="relative group"
              >
                <img
                  src={`http://196.188.249.25:5000/files/${card.imageUrl}`}
                  alt="AI Beauty Assistant"
                  className="w-full h-auto object-cover rounded-lg transition-transform transform"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skin Type Checker */}
      <section className="container rounded-lg py-8">
        {discounts.length > 0 &&
          discounts.map((discount) => (
            <div
              key={discount.id}
              className="relative w-full rounded-lg border-2 mb-4"
            >
              <img
                src={`http://196.188.249.25:5000/files/${discount.image}`}
                alt={``}
                className="w-full  rounded-lg transition-transform transform"
                height={20}
                
              />
            </div>
          ))}
      </section>

      <section className="py-10 bg-[#F3F4F6]">
        <div className="mx-auto container flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <div>
              <h3 className="text-2xl font-semibold">Beauty Tips:</h3>
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
          <h2 className="text-2xl font-semibold">Discover Beauty Hacks</h2>
          <p className="mt-2">
            Explore beauty hacks and tutorials from our YouTube channel.
          </p>
        </div>
        <YouTubeThumbnailCarousel
          videos={videos}
          visibleItems={videos.length}
        />
        {/* Call to Action */}
        <div className="text-center w-min self-center mt-4">
          <Link href="/blogs">
            <Button className="">Watch More Beauty Hacks</Button>
          </Link>
        </div>
      </section>

      <section className="bg-gray-100 py-10">
        <div className="container mx-auto text-center">
          {/* Section Title */}
          <h2 className="text-3xl font-bold mb-6">Join Our Beauty Community</h2>
          <p className="text-gray-600 mb-8">
            Follow us on social media to stay updated with the latest beauty
            tips, tutorials, and more.
          </p>

          {/* Social Media Icons */}
          <div className="flex flex-wrap justify-center gap-6">
            <Link
              href="https://www.facebook.com/yourpage"
              target="_blank"
              rel="noopener noreferrer"
            >
              <p className="bg-white text-primary p-4 rounded-full shadow-lg hover:bg-primary hover:text-white transition duration-300">
                <FaFacebookF className="text-2xl" />
              </p>
            </Link>
            <Link
              href="https://www.instagram.com/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
            >
              <p className="bg-white text-primary p-4 rounded-full shadow-lg hover:bg-primary hover:text-white transition duration-300">
                <FaInstagram className="text-2xl" />
              </p>
            </Link>
            <Link
              href="https://www.tiktok.com/@yourprofile"
              target="_blank"
              rel="noopener noreferrer"
            >
              <p className="bg-white text-primary p-4 rounded-full shadow-lg hover:bg-primary hover:text-white transition duration-300">
                <FaTiktok className="text-2xl" />
              </p>
            </Link>
            <Link
              href="https://t.me/yourchannel"
              target="_blank"
              rel="noopener noreferrer"
            >
              <p className="bg-white text-primary p-4 rounded-full shadow-lg hover:bg-primary hover:text-white transition duration-300">
                <FaTelegramPlane className="text-2xl" />
              </p>
            </Link>
            <Link
              href="https://www.youtube.com/channel/yourchannel"
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
            <h3 className="text-lg font-bold mb-4">About Enku Beauty</h3>
            <p className="text-white text-sm">
              Enku Beauty is your ultimate destination for beauty education and
              AI-powered services. Explore tips, tutorials, and more.
            </p>
          </div>

          {/* Links Section */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <p>Beauty AI Services</p>
              </li>
              <li>
                <p>Blog</p>
              </li>
              <li>
                <p>Privacy Policy</p>
              </li>
              <li>
                <p>Terms & Conditions</p>
              </li>
            </ul>
          </div>

          {/* Community Section */}
          <div>
            <h3 className="text-lg font-bold mb-4">Join Our Community</h3>
            <p className="text-white text-sm mb-4">
              Connect with us on social media to stay updated with the latest
              beauty tips and trends.
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
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-400"
              >
                <FaInstagram className="text-2xl" />
              </a>
              <a
                href="https://youtube.com"
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
                href="https://tiktok.com"
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
              Get Exclusive Beauty Updates
            </h3>
            <p className="text-white text-sm mb-4">
              Join our Telegram community for the latest beauty hacks, tips, and
              product updates.
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
          © {new Date().getFullYear()} Enku Beauty. All rights reserved.
        </div>
      </footer>
    </main>
  );
};

export default Home;
