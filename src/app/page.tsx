import Image from 'next/image';

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-text p-8">
      <header className="text-center py-8">
        <h1 className="text-4xl font-bold text-primary">Welcome to Enku Beauty</h1>
        <p className="text-xl mt-2">Discover Your Inner Beauty</p>
      </header>
      
      <section className="my-16">
        <h2 className="text-2xl font-semibold mb-4">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Map through featured products */}
          <div className="bg-white p-4 rounded shadow">
            <Image src="/path-to-image.jpg" alt="Product Name" width={200} height={200} className="w-full h-auto" />
            <h3 className="text-lg font-semibold mt-4">Product Name</h3>
            <p className="mt-2">$29.99</p>
          </div>
        </div>
      </section>

      <section className="my-16">
        <h2 className="text-2xl font-semibold mb-4">Categories</h2>
        <div className="flex flex-wrap gap-4">
          {/* Map through categories */}
          <div className="bg-primary text-white p-4 rounded">
            <h3>Skincare</h3>
          </div>
          <div className="bg-primary text-white p-4 rounded">
            <h3>Haircare</h3>
          </div>
          <div className="bg-primary text-white p-4 rounded">
            <h3>Makeup</h3>
          </div>
        </div>
      </section>

      <section className="my-16">
        <h2 className="text-2xl font-semibold mb-4">Customer Reviews</h2>
        <div className="space-y-4">
          {/* Map through reviews */}
          <div className="bg-white p-4 rounded shadow">
            <p>"This product changed my life!"</p>
            <span>- Happy Customer</span>
          </div>
        </div>
      </section>

      <section className="my-16">
        <h2 className="text-2xl font-semibold mb-4">Personalized Recommendations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Map through personalized recommendations */}
          <div className="bg-white p-4 rounded shadow">
            <Image src="/path-to-image.jpg" alt="Product Name" width={200} height={200} className="w-full h-auto" />
            <h3 className="text-lg font-semibold mt-4">Product Name</h3>
            <p className="mt-2">$29.99</p>
          </div>
        </div>
      </section>

      <footer className="text-center py-8">
        <p>&copy; 2024 Enku Beauty. All rights reserved.</p>
      </footer>
    </main>
  );
}
