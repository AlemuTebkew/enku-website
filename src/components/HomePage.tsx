import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Separator } from "./ui/separator";

const Home = () => {
  return (
    <main className="flex flex-col gap-8">
      {/* Hero Section with 3 Cards */}
      <section className="pt-4">
        <div className="mx-auto container">
          <Carousel
            opts={{
              align: "start",
            }}
            className="block md:hidden w-full"
          >
            <CarouselContent>
              <CarouselItem className="w-full">
                <div className="relative group">
                  <img
                    src="https://images-static.nykaa.com/uploads/41f372ad-c370-40ae-a72c-e46e38fd0c09.gif"
                    alt="AI Beauty Assistant"
                    className="w-full h-auto object-cover rounded-lg transition-transform transform"
                  />
                </div>
              </CarouselItem>
              <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                <div className="relative group">
                  <img
                    src="https://images-static.nykaa.com/creatives/2beb4533-0acd-46e2-ba5e-796b0c47caf8/default.png?tr=cm-pad_resize,w-900"
                    alt="Beauty Tips & Tutorials"
                    className="w-full h-auto object-cover rounded-lg"
                  />
                </div>
              </CarouselItem>
              <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                <div className="relative group">
                  <img
                    src="https://images-static.nykaa.com/creatives/8df26789-9675-49e5-a53f-e6a9ea7d8808/default.jpg?tr=cm-pad_resize,w-900"
                    alt="Original Products"
                    className="w-full h-auto object-cover rounded-lg"
                  />
                </div>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
          <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Card 1 - AI Beauty Assistant */}
            <div className="relative group">
              <img
                src="https://images-static.nykaa.com/uploads/41f372ad-c370-40ae-a72c-e46e38fd0c09.gif"
                alt="AI Beauty Assistant"
                className="w-full h-auto object-cover rounded-lg transition-transform transform"
              />
            </div>

            {/* Card 2 - Beauty Tips & Tutorials */}
            <div className="relative group">
              <img
                src="https://images-static.nykaa.com/creatives/2beb4533-0acd-46e2-ba5e-796b0c47caf8/default.png?tr=cm-pad_resize,w-900"
                alt="Beauty Tips & Tutorials"
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>

            {/* Card 3 - Original Products */}
            <div className="relative group">
              <img
                src="https://images-static.nykaa.com/creatives/8df26789-9675-49e5-a53f-e6a9ea7d8808/default.jpg?tr=cm-pad_resize,w-900"
                alt="Original Products"
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

     {/* Skin Type Checker */}
      <section className="container rounded-lg">
        <div className="relative w-full rounded-lg">
          <Image 
            src="https://images-static.nykaa.com/uploads/e3d8e1f2-5ca1-48e8-ae8b-810c28c3c7b7.jpg?tr=cm-pad_resize,w-1800"
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
          <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-4 px-4">
            {/* Card 1 - AI Beauty Assistant */}
            <div className="relative group">
              <img
                src="images/face.jpg"
                alt="AI Beauty Assistant"
                className="w-full h-auto object-cover rounded-lg transition-transform transform"
              />
            </div>

            {/* Card 2 - Beauty Tips & Tutorials */}
            <div className="relative group">
              <img
                src="https://images-static.nykaa.com/creatives/2beb4533-0acd-46e2-ba5e-796b0c47caf8/default.png?tr=cm-pad_resize,w-900"
                alt="Beauty Tips & Tutorials"
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>

            {/* Card 3 - Original Products */}
            <div className="relative group">
              <img
                src="https://images-static.nykaa.com/creatives/8df26789-9675-49e5-a53f-e6a9ea7d8808/default.jpg?tr=cm-pad_resize,w-900"
                alt="Original Products"
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto py-10">
      {/* Section Title */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold">Discover Beauty Tips & Tutorials</h2>
        <p className="text-gray-600 mt-2">
          Explore our latest and most popular beauty tips, tutorials, and expert advice.
        </p>
      </div>

      {/* Featured Articles/Tutorials */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {/* Example Article Card */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <Image
            src="https://images-static.nykaa.com/creatives/610c9a26-342a-4ca2-a3fd-5ba82236f1e5/default.jpg?tr=cm-pad_resize,w-300"
            alt="Skincare Routine"
            width={300}
            height={200}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold">Skincare Routine for Glowing Skin</h3>
            <p className="text-gray-600 mt-2">
              Discover how to create a personalized skincare routine for healthy and glowing skin.
            </p>
            <Link href="/blog/skincare-routine">
              <p className="text-pink-600 font-bold mt-4 block">
                Read More
              </p>
            </Link>
          </div>
        </div>

        {/* Additional Article Cards */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <Image
            src="https://images-static.nykaa.com/creatives/42b347d7-1d4e-48ba-b55a-87a2e8d1d648/default.jpg?tr=cm-pad_resize,w-300"
            alt="Makeup Tutorial"
            width={300}
            height={200}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold">Makeup Tips for Everyday Look</h3>
            <p className="text-gray-600 mt-2">
              Learn how to apply makeup for a fresh, everyday look that enhances your natural beauty.
            </p>
            <Link href="/blog/makeup-tips">
              <p className="text-pink-600 font-bold mt-4 block">
                Read More
              </p>
            </Link>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <Image
            src="https://images-static.nykaa.com/creatives/e8bfbeb3-ddb3-4816-9959-664c4c161b81/default.jpg?tr=cm-pad_resize,w-300"
            alt="Haircare Advice"
            width={300}
            height={200}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold">Haircare for Healthy Locks</h3>
            <p className="text-gray-600 mt-2">
              Tips and tricks for maintaining healthy, shiny hair with minimal effort.
            </p>
            <Link href="/blog/haircare">
              <p className="text-pink-600 font-bold mt-4 block">
                Read More
              </p>
            </Link>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="text-center mb-10">
        <h3 className="text-2xl font-semibold mb-4">Explore by Category</h3>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/category/skincare">
            <p className="bg-pink-600 text-white py-2 px-4 rounded-lg font-bold hover:bg-pink-700 transition duration-200">
              Skincare
            </p>
          </Link>
          <Link href="/category/makeup">
            <p className="bg-pink-600 text-white py-2 px-4 rounded-lg font-bold hover:bg-pink-700 transition duration-200">
              Makeup
            </p>
          </Link>
          <Link href="/category/haircare">
            <p className="bg-pink-600 text-white py-2 px-4 rounded-lg font-bold hover:bg-pink-700 transition duration-200">
              Haircare
            </p>
          </Link>
          {/* Add more categories as needed */}
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center">
        <Link href="/blog">
          <p className="bg-pink-600 text-white py-3 px-6 rounded-lg font-bold hover:bg-pink-700 transition duration-200">
            Explore More Beauty Tips
          </p>
        </Link>
      </div>
    </section>

      {/* Featured Products Section */}
      <section className="py-16 px-4">
        <h3 className="text-3xl font-semibold text-center mb-12">
          Featured Products
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="p-4 border rounded-lg">
            <Image
              src="/images/youtube.png"
              alt="Product 1"
              width={300}
              height={300}
            />
            <p className="text-lg mt-4">Product 1</p>
            <Link href="/product/1">
              <p className="text-pink-500 mt-2 inline-block">Shop Now</p>
            </Link>
          </div>
          <div className="p-4 border rounded-lg">
            <Image
              src="/images/youtube.png"
              alt="Product 2"
              width={300}
              height={300}
            />
            <p className="text-lg mt-4">Product 2</p>
            <Link href="/product/2">
              <p className="text-pink-500 mt-2 inline-block">Shop Now</p>
            </Link>
          </div>
          <div className="p-4 border rounded-lg">
            <Image
              src="/images/youtube.png"
              alt="Product 3"
              width={300}
              height={300}
            />
            <p className="text-lg mt-4">Product 3</p>
            <Link href="/product/3">
              <p className="text-pink-500 mt-2 inline-block">Shop Now</p>
            </Link>
          </div>
          <div className="p-4 border rounded-lg">
            <Image
              src="/images/youtube.png"
              alt="Product 4"
              width={300}
              height={300}
            />
            <p className="text-lg mt-4">Product 4</p>
            <Link href="/product/4">
              <p className="text-pink-500 mt-2 inline-block">Shop Now</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Social Media Community */}
      {/* <section className="py-16 bg-gray-100 px-4 text-center">
        <h3 className="text-2xl font-semibold mb-4">Join Our Community</h3>
        <p className="mb-6">
          We are just starting out and building our community from the ground up. Follow us on TikTok, Facebook, Telegram, YouTube, and Instagram to stay updated with the latest beauty trends, tips, and products.
        </p>
        <div className="flex justify-center space-x-4">
          <Link href="https://tiktok.com">
            <p className="bg-pink-500 text-white px-6 py-2 rounded-full">
              Follow us on TikTok
            </p>
          </Link>
          <Link href="https://facebook.com">
            <p className="bg-blue-800 text-white px-6 py-2 rounded-full">
              Follow us on Facebook
            </p>
          </Link>
          <Link href="https://telegram.org">
            <p className="bg-blue-500 text-white px-6 py-2 rounded-full">
              Join us on Telegram
            </p>
          </Link>
          <Link href="https://youtube.com">
            <p className="bg-red-500 text-white px-6 py-2 rounded-full">
              Subscribe on YouTube
            </p>
          </Link>
          <Link href="https://instagram.com">
            <p className="bg-pink-600 text-white px-6 py-2 rounded-full">
              Follow us on Instagram
            </p>
          </Link>
        </div>
      </section> */}

      {/* Footer */}
      <footer className="py-8 bg-gray-900 text-gray-400">
        <div className="container mx-auto px-4 text-center">
          <p>© 2024 Enku Beauty. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
};

export default Home;
