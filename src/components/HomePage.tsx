import { FaGift, FaShippingFast, FaStar } from "react-icons/fa";

const HomePage = () => {
  return (
    <main>
      {/* Hero Section */}
      <section className="bg-pink-600 text-white py-20">
        <div className="container mx-auto text-center">
          <div className="relative">
            <img
              src="https://images-static.nykaa.com/uploads/f3f36385-b1a0-4bda-8eeb-a5b6785daa71.gif"
              alt="Beauty Banner"
              className="w-full h-auto mb-6 object-cover rounded-lg"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center bg-black bg-opacity-50 text-white">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                Welcome to Enku Beauty
              </h1>
              <p className="text-lg md:text-xl mb-6">
                Discover beauty products that inspire confidence, tailored just
                for you.
              </p>
              <a
                href="/products"
                className="bg-white text-pink-600 px-6 py-3 rounded-lg font-semibold hover:bg-pink-500 hover:text-white transition"
              >
                Shop Now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-10 bg-gray-100">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Why Shop with Enku Beauty?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-6 bg-white rounded-lg shadow-md">
              <FaGift className="text-pink-600 text-4xl mx-auto mb-4" />
              <h3 className="text-2xl font-semibold mb-2">Gift Ideas</h3>
              <p>Find the perfect gifts for your loved ones with our personalized recommendations.</p>
            </div>
            {/* Feature 2 */}
            <div className="p-6 bg-white rounded-lg shadow-md">
              <FaShippingFast className="text-pink-600 text-4xl mx-auto mb-4" />
              <h3 className="text-2xl font-semibold mb-2">Fast Shipping</h3>
              <p>Enjoy fast and reliable delivery across Ethiopia and beyond.</p>
            </div>
            {/* Feature 3 */}
            <div className="p-6 bg-white rounded-lg shadow-md">
              <FaStar className="text-pink-600 text-4xl mx-auto mb-4" />
              <h3 className="text-2xl font-semibold mb-2">Top Rated</h3>
              <p>Shop our highest-rated beauty products and feel confident in your choices.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Product 1 */}
            <div className="p-6 bg-white rounded-lg shadow-md">
              <img
                src="https://images-static.nykaa.com/creatives/610c9a26-342a-4ca2-a3fd-5ba82236f1e5/default.jpg?tr=cm-pad_resize,w-300"
                alt="Product 1"
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Luxury Face Cream</h3>
              <p className="text-pink-600 font-bold">$29.99</p>
            </div>
            {/* Product 2 */}
            <div className="p-6 bg-white rounded-lg shadow-md">
              <img
                src="https://images-static.nykaa.com/creatives/42b347d7-1d4e-48ba-b55a-87a2e8d1d648/default.jpg?tr=cm-pad_resize,w-300"
                alt="Product 2"
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Radiant Lipstick</h3>
              <p className="text-pink-600 font-bold">$19.99</p>
            </div>
            {/* Product 3 */}
            <div className="p-6 bg-white rounded-lg shadow-md">
              <img
                src="https://images-static.nykaa.com/creatives/e8bfbeb3-ddb3-4816-9959-664c4c161b81/default.jpg?tr=cm-pad_resize,w-300"
                alt="Product 3"
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Scented Body Lotion</h3>
              <p className="text-pink-600 font-bold">$14.99</p>
            </div>
            {/* Product 4 */}
            <div className="p-6 bg-white rounded-lg shadow-md">
              <img
                src="https://images-static.nykaa.com/creatives/4d567adf-dfd2-41c0-915f-b97825fc0ed1/default.png?tr=cm-pad_resize,w-300"
                alt="Product 4"
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Perfume</h3>
              <p className="text-pink-600 font-bold">$49.99</p>
            </div>
            {/* Product 5 */}
            <div className="p-6 bg-white rounded-lg shadow-md">
              <img
                src="https://images-static.nykaa.com/creatives/a5bc71a2-c883-4063-aaf2-c321c1befe81/default.jpg?tr=cm-pad_resize,w-300"
                alt="Product 5"
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Makeup Brush Set</h3>
              <p className="text-pink-600 font-bold">$24.99</p>
            </div>
          </div>
          <a
            href="/products"
            className="mt-10 inline-block bg-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-pink-500 transition"
          >
            View All Products
          </a>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Shop by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Category 1 */}
            <div className="p-6 bg-white rounded-lg shadow-md">
              <img
                src="/images/category1.jpg"
                alt="Makeup"
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Makeup</h3>
            </div>
            {/* Category 2 */}
            <div className="p-6 bg-white rounded-lg shadow-md">
              <img
                src="/images/category2.jpg"
                alt="Skincare"
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Skincare</h3>
            </div>
            {/* Category 3 */}
            <div className="p-6 bg-white rounded-lg shadow-md">
              <img
                src="/images/category3.jpg"
                alt="Fragrance"
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Fragrance</h3>
            </div>
            {/* Category 4 */}
            <div className="p-6 bg-white rounded-lg shadow-md">
              <img
                src="/images/category4.jpg"
                alt="Haircare"
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Haircare</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-pink-600 text-white text-center">
        <h2 className="text-4xl font-bold mb-6">Join Our Beauty Community</h2>
        <p className="text-lg mb-6">
          Stay updated with the latest beauty trends, exclusive offers, and tips
          by subscribing to our newsletter.
        </p>
        <a
          href="/subscribe"
          className="bg-white text-pink-600 px-6 py-3 rounded-lg font-semibold hover:bg-pink-500 hover:text-white transition"
        >
          Subscribe Now
        </a>
      </section>
    </main>
  );
};

export default HomePage;
