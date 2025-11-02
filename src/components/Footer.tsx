import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="container  text-white py-10">
      <div className="bg-pink-600 mx-auto px-5">
        {/* Footer content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
          {/* Company info */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Pixel Ecommerce</h3>
            <p className="mb-4">
              Your trusted online marketplace for quality products. Discover a wide range of electronics, accessories, and more with excellent customer service and fast delivery.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul>
              <li className="mb-2">
                <a href="#" className="hover:text-gray-300">
                  About Us
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:text-gray-300">
                  Products
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:text-gray-300">
                  Gift Ideas
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:text-gray-300">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Customer support */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Customer Support</h3>
            <ul>
              <li className="mb-2">
                <a href="#" className="hover:text-gray-300">
                  FAQs
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:text-gray-300">
                  Shipping Info
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:text-gray-300">
                  Return Policy
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:text-gray-300">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact info and social media */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Connect With Us</h3>
            <p className="mb-4">Email: support@enkubeauty.com</p>
            <p className="mb-4">Phone: +251-123-456789</p>
            <div className="flex justify-center md:justify-start space-x-4">
              <a href="#" aria-label="Facebook">
                <FaFacebook className="hover:text-gray-300" />
              </a>
              <a href="#" aria-label="Instagram">
                <FaInstagram className="hover:text-gray-300" />
              </a>
              <a href="#" aria-label="Twitter">
                <FaTwitter className="hover:text-gray-300" />
              </a>
              <a href="#" aria-label="YouTube">
                <FaYoutube className="hover:text-gray-300" />
              </a>
            </div>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="mt-10 text-center border-t border-pink-400 pt-6">
          <p className="text-sm">&copy; 2024 Pixel Ecommerce. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
