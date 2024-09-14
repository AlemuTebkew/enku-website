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
        <div className="container mx-auto lg:hidden">
          <CustomCarousel visibleItems={1}/>
        </div>
        <div className="hidden mx-auto container lg:block">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Card 1 - AI Beauty Assistant */}
            <div className="relative group">
              <img
                src="banner/banner1.avif"
                alt="AI Beauty Assistant"
                className="w-full h-auto object-cover rounded-lg transition-transform transform"
              />
            </div>

            {/* Card 2 - Beauty Tips & Tutorials */}
            <div className="relative group">
              <img
                src="banner/banner2.avif"
                alt="Beauty Tips & Tutorials"
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>

            {/* Card 3 - Original Products */}
            <div className="relative group">
              <img
                src="banner/banner3.avif"
                alt="Original Products"
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>
          </div>
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

    <footer className="bg-primary text-white py-10">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* About Section */}
        <div>
          <h3 className="text-lg font-bold mb-4">About Enku Beauty</h3>
          <p className="text-white text-sm">
            Enku Beauty is your ultimate destination for beauty education and AI-powered services. 
            Explore tips, tutorials, and more.
          </p>
        </div>

        {/* Links Section */}
        <div>
          <h3 className="text-lg font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><p>Beauty AI Services</p></li>
            <li><p>Blog</p></li>
            <li><p>Privacy Policy</p></li>
            <li><p>Terms & Conditions</p></li>
          </ul>
        </div>

        {/* Community Section */}
        <div>
          <h3 className="text-lg font-bold mb-4">Join Our Community</h3>
          <p className="text-white text-sm mb-4">
            Connect with us on social media to stay updated with the latest beauty tips and trends.
          </p>
          <div className="flex space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400">
              <FaFacebookF className="text-2xl" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400">
              <FaInstagram className="text-2xl" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400">
              <FaYoutube className="text-2xl" />
            </a>
            <a href="https://t.me/YourTelegramChannel" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400">
              <FaTelegramPlane className="text-2xl" />
            </a>
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400">
              <FaTiktok className="text-2xl" />
            </a>
          </div>
        </div>

        {/* Join Telegram Section */}
        <div>
          <h3 className="text-lg font-bold mb-4">Get Exclusive Beauty Updates</h3>
          <p className="text-white text-sm mb-4">
            Join our Telegram community for the latest beauty hacks, tips, and product updates.
          </p>
          <a href="https://t.me/YourTelegramChannel" target="_blank" rel="noopener noreferrer">
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
