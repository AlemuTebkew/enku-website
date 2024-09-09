import Image from "next/image";
import Link from "next/link";

const Home = () => {
  return (
    <main>
      {/* Hero Section with 3 Cards */}
      <section className="my-4">
        <div className="container mx-auto text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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

      {/* Intro Section */}
      <section className="py-16 px-4 text-center">
        <h2 className="text-4xl font-bold">Welcome to Enku Beauty</h2>
        <p className="mt-4 text-lg">
          We’re on a mission to revolutionize beauty with innovative technology,
          original products, and expert tips. Follow us as we build our beauty
          community from the ground up.
        </p>
      </section>

      {/* Skin Type Checker */}
      <section className="py-16 bg-gray-100 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="p-8 bg-white shadow-lg rounded-lg">
            <h3 className="text-2xl font-semibold mb-4">
              Find Your Skin Type
            </h3>
            <p className="mb-6">
              Discover the best products for your skin with our skin type
              checker.
            </p>
            <Link href="/skin-type-checker">
              <p className="bg-pink-500 text-white px-6 py-2 rounded-full">
                Check My Skin Type
              </p>
            </Link>
          </div>
        </div>
      </section>

       {/* Skin Type Checker Section */}
       <section className="container">
        <div className="mx-auto text-center bg-hero rounded-lg">
          <div className="w-full bg-black bg-opacity-50 py-20 rounded-lg">
            <a
              href="/skin-type-checker"
              className="w-full flex justify-center items-center"
            >
              <button className="bg-pink-600 text-white rounded-lg">
                Check Your Skin Type
              </button>
            </a>
          </div>

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
      <section className="py-16 bg-gray-100 px-4 text-center">
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
      </section>


      {/* Footer */}
      <footer className="py-8 bg-gray-900 text-gray-400">
        <div className="container mx-auto px-4 text-center">
          <p>© 2024 Enku Beauty. All rights reserved.</p>
        </div>
      </footer>

      {/* Rest of the Home Page */}
      {/* About Us, AI Assistant, Beauty Tips, Featured Products, Community Section */}
      {/* Add the rest of your sections here */}
    </main>
  );
};

export default Home;
