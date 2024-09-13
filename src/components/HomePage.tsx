import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaTiktok, FaTelegramPlane, FaYoutube } from "react-icons/fa";
import { Separator } from "./ui/separator";
import CustomCarousel from "./CustomCarousel";
import { Button } from "./ui/button";

const Home = () => {
  return (
    <main className="flex flex-col gap-0">
      {/* Hero Section with 3 Cards */}
      <section className="pt-4">
        <div className="container mx-auto">

        <CustomCarousel visibleItems={1}/>
        </div>
        <div className="mx-auto container">
          {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4"> */}
            {/* Card 1 - AI Beauty Assistant */}
            {/* <div className="relative group">
              <img
                src="banner/banner1.avif"
                alt="AI Beauty Assistant"
                className="w-full h-auto object-cover rounded-lg transition-transform transform"
              />
            </div> */}

            {/* Card 2 - Beauty Tips & Tutorials */}
            {/* <div className="relative group">
              <img
                src="banner/banner2.avif"
                alt="Beauty Tips & Tutorials"
                className="w-full h-auto object-cover rounded-lg"
              />
            </div> */}

            {/* Card 3 - Original Products */}
            {/* <div className="relative group">
              <img
                src="banner/banner3.avif"
                alt="Original Products"
                className="w-full h-auto object-cover rounded-lg"
              />
            </div> */}
          {/* </div> */}
        </div>
      </section>

     {/* Skin Type Checker */}
      <section className="container rounded-lg py-8">
        <div className="relative w-full rounded-lg border-2">
          <Image
            src="/banner/banner7.avif"
            alt="Skin Type Checker"
            width={1800}
            height={0} // This will auto calculate the height based on the width
            layout="responsive"
            objectFit="contain" // Ensures the image is not cropped
            className="rounded-lg"
          />
        </div>
      </section>

      <section className="py-10 bg-[#F3F4F6]">
        <div className="mx-auto container flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <div>
              <h3 className="text-2xl font-semibold">
                Beauty Tips:
              </h3>
              <p>
                Today's featured tips
              </p>
            </div>
            <Separator className="bg-black/10 font-bold"/>
          </div>
          <div className="px-4">
            <CustomCarousel visibleItems={3}/>
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
        <CustomCarousel visibleItems={1}/>
      {/* Call to Action */}
      <div className="text-center w-min self-center mt-4">
        <Link href="/blog">
          <Button className="">
            Watch More Beauty Hacks
          </Button>
        </Link>
      </div>
    </section>

    <section className="bg-gray-100 py-10">
      <div className="container mx-auto text-center">
        {/* Section Title */}
        <h2 className="text-3xl font-bold mb-6">Join Our Beauty Community</h2>
        <p className="text-gray-600 mb-8">
          Follow us on social media to stay updated with the latest beauty tips, tutorials, and more.
        </p>

        {/* Social Media Icons */}
        <div className="flex flex-wrap justify-center gap-6">
          <Link href="https://www.facebook.com/yourpage" target="_blank" rel="noopener noreferrer">
            <p className="bg-white text-primary p-4 rounded-full shadow-lg hover:bg-primary hover:text-white transition duration-300">
              <FaFacebookF className="text-2xl"/>
            </p>
          </Link>
          <Link href="https://www.instagram.com/yourprofile" target="_blank" rel="noopener noreferrer">
            <p className="bg-white text-primary p-4 rounded-full shadow-lg hover:bg-primary hover:text-white transition duration-300">
              <FaInstagram className="text-2xl" />
            </p>
          </Link>
          <Link href="https://www.tiktok.com/@yourprofile" target="_blank" rel="noopener noreferrer">
            <p className="bg-white text-primary p-4 rounded-full shadow-lg hover:bg-primary hover:text-white transition duration-300">
              <FaTiktok className="text-2xl" />
            </p>
          </Link>
          <Link href="https://t.me/yourchannel" target="_blank" rel="noopener noreferrer">
            <p className="bg-white text-primary p-4 rounded-full shadow-lg hover:bg-primary hover:text-white transition duration-300">
              <FaTelegramPlane className="text-2xl" />
            </p>
          </Link>
          <Link href="https://www.youtube.com/channel/yourchannel" target="_blank" rel="noopener noreferrer">
            <p className="bg-white text-primary p-4 rounded-full shadow-lg hover:bg-primary hover:text-white transition duration-300">
              <FaYoutube className="text-2xl" />
            </p>
          </Link>
        </div>

        {/* Call to Action */}
        <div className="mt-8">
          <p className="text-gray-600">
            Be part of our community and get the latest updates right in your feed!
          </p>
        </div>
      </div>
    </section>

    <footer className="bg-gradient-to-r from-pink-500 to-purple-600 text-white py-12">
      <div className="container mx-auto px-4">
        {/* Footer Top */}
        <div className="flex flex-col md:flex-row justify-between gap-8 mb-12">
          {/* About Us */}
          <div className="flex-1">
            <h3 className="text-2xl font-semibold mb-4">About Us</h3>
            <p className="text-gray-200">
              Enku Beauty is more than just a platform—it's your beauty partner. From personalized AI recommendations to beauty tips and premium products, we’re here to help you look and feel your best.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex-1">
            <h3 className="text-2xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><p className="hover:text-gray-300 transition cursor-pointer">About Us</p></li>
              <li><p className="hover:text-gray-300 transition cursor-pointer">Contact Us</p></li>
              <li><p className="hover:text-gray-300 transition cursor-pointer">Our Services</p></li>
              <li><p className="hover:text-gray-300 transition cursor-pointer">Privacy Policy</p></li>
            </ul>
          </div>

          {/* Follow Us */}
          <div className="flex-1">
            <h3 className="text-2xl font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <p className="bg-white p-3 rounded-full text-primary hover:bg-primary hover:text-white transition duration-300 cursor-pointer">
                <FaFacebookF className="text-xl" />
              </p>
              <p className="bg-white p-3 rounded-full text-primary hover:bg-primary hover:text-white transition duration-300 cursor-pointer">
                <FaInstagram className="text-xl" />
              </p>
              <p className="bg-white p-3 rounded-full text-primary hover:bg-primary hover:text-white transition duration-300 cursor-pointer">
                <FaTiktok className="text-xl" />
              </p>
              <p className="bg-white p-3 rounded-full text-primary hover:bg-primary hover:text-white transition duration-300 cursor-pointer">
                <FaTelegramPlane className="text-xl" />
              </p>
              <p className="bg-white p-3 rounded-full text-primary hover:bg-primary hover:text-white transition duration-300 cursor-pointer">
                <FaYoutube className="text-xl" />
              </p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="flex-1">
            <h3 className="text-2xl font-semibold mb-4">Contact Us</h3>
            <p className="text-gray-200 mb-2">123 Beauty Lane, Addis Ababa, Ethiopia</p>
            <p className="text-gray-200 mb-2">Phone: +251 123 456 789</p>
            <p className="text-gray-200">Email: contact@enkubeauty.com</p>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-700 pt-4 text-center">
          <p className="text-gray-300 text-sm">
            &copy; {new Date().getFullYear()} Enku Beauty. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
    </main>
  );
};

export default Home;
