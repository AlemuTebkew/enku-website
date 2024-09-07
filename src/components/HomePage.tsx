const Home = () => {
  return (
    <main>
      {/* Hero Section with 3 Cards */}
      <section className="">
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

       {/* Skin Type Checker Section */}
       <section className="container">
        <div className="mx-auto text-center bg-hero">
          <a
            href="/skin-type-checker"
            className="w-full bg-black bg-opacity-50 flex justify-center items-center"
          >
            <button className="bg-pink-600 text-white rounded-lg">
              Check Your Skin Type
            </button>
          </a>

        </div>
      </section>

      {/* Rest of the Home Page */}
      {/* About Us, AI Assistant, Beauty Tips, Featured Products, Community Section */}
      {/* Add the rest of your sections here */}
    </main>
  );
};

export default Home;
