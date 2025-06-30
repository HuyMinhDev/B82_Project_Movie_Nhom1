// src/components/Layout/Footer.jsx
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faGithub,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className="bg-footer text-white py-12" id="lienHe">
      <div className="container mx-auto px-4">
        <div className="bg-footer-top grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Contact */}
          <div>
            <div className="space-y-2">
              <div
                className="text-2xl font-bold cursor-pointer"
                onClick={() => navigate("/")}
              >
                <img
                  src="/images/logo/logo.webp"
                  className="max-h-16 h-auto w-auto block"
                />
              </div>
              <p>
                Email us:{" "}
                <span className="text-white">nguyenminhhuy2410@gmail.com</span>
              </p>
              <p className="uppercase text-sm">Customer Services</p>
              <p className="text-white">+ (84) 344375201</p>
            </div>

            <div className="mt-5">
              <h3 className="font-semibold text-lg mb-4">Đối Tác</h3>
              <div className="grid grid-cols-4 gap-4">
                <Link
                  target="_blank"
                  to="https://www.bhdstar.vn/"
                  className="jss136"
                  rel="noreferrer"
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/5/57/Logo_BHD_Star_Cineplex.png"
                    className="jss133 w-10 h-10"
                    alt="bhdlogo"
                  />
                </Link>
                <Link
                  target="_blank"
                  to="https://www.galaxycine.vn/"
                  className="jss136"
                  rel="noreferrer"
                >
                  <img
                    src="data:image/png;base64,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"
                    className="jss133 w-10 h-10"
                    alt="galaxylogo"
                  />
                </Link>
                <Link
                  target="_blank"
                  to="http://cinestar.com.vn/"
                  className="jss136"
                  rel="noreferrer"
                >
                  <img
                    src="data:image/png;base64,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"
                    className="jss133 w-10 h-10"
                    alt="starlogo"
                  />
                </Link>
                <Link
                  target="_blank"
                  to="https://www.megagscinemas.vn/"
                  className="jss136"
                  rel="noreferrer"
                >
                  <img
                    src="https://megags.vn/wp-content/uploads/2020/10/logo-Mega.png"
                    className="jss133 w-10 h-10"
                    alt="megalogo"
                  />
                </Link>
                <Link
                  target="_blank"
                  to="https://www.cgv.vn/"
                  className="jss136"
                  rel="noreferrer"
                >
                  <img
                    src="https://images.seeklogo.com/logo-png/42/2/cgv-cinemas-logo-png_seeklogo-428286.png"
                    className="jss133 w-20 h-20"
                    alt="cgvlogo"
                  />
                </Link>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="list-item space-y-2 text-sm">
              <li>
                <ChevronRight size={16} className="list-item-icon" />
                <Link to="/about-us">About Us</Link>
              </li>
              <li>
                <ChevronRight size={16} className="list-item-icon" />
                <Link to="/blogs">Blog</Link>
              </li>
              <li>
                <ChevronRight size={16} className="list-item-icon" />
                <Link to="/pricing">Pricing Plan</Link>
              </li>
              <li>
                <ChevronRight size={16} className="list-item-icon" />
                <Link to="/faq">FAQ</Link>
              </li>
            </ul>
          </div>

          {/* Movies to Watch */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Movies to watch</h4>
            <ul className="list-item space-y-2 text-sm">
              <li>
                <ChevronRight size={16} className="list-item-icon" />
                <Link to="/view-all">Top trending</Link>
              </li>
              <li>
                <ChevronRight size={16} className="list-item-icon" />
                <Link to="/view-all">Recommended</Link>
              </li>
              <li>
                <ChevronRight size={16} className="list-item-icon" />
                <Link to="/view-all">Popular</Link>
              </li>
            </ul>
          </div>

          {/* About Company & Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-4">About company</h4>
            <ul className="list-item space-y-2 text-sm mb-6">
              <li>
                <ChevronRight size={16} className="list-item-icon" />
                <Link to="/contact-us">Contact Us</Link>
              </li>
              <li>
                <ChevronRight size={16} className="list-item-icon" />
                <Link to="/PrivacyPolicy">Privacy Policy</Link>
              </li>
              <li>
                <ChevronRight size={16} className="list-item-icon" />
                <Link to="/terms-of-use">Terms Of Use</Link>
              </li>
            </ul>
            <h4 className="text-lg font-semibold mb-2">Subscribe Newsletter</h4>
            <div className="subscribe-item flex items-center">
              <input
                type="text"
                placeholder="Email*"
                className="p-2 text-black text-sm rounded-l-md w-full"
              />
              <button className="bg-primary px-4 py-2 text-sm rounded-r-md">
                Subscribe
              </button>
            </div>
            <div className="flex items-center space-x-3 mt-5">
              <span className="text-sm">Follow Us:</span>
              <FontAwesomeIcon icon={faFacebook} className="text-white" />
              <FontAwesomeIcon icon={faTwitter} className="text-white" />
              <FontAwesomeIcon icon={faGithub} className="text-white" />
              <FontAwesomeIcon icon={faInstagram} className="text-white" />
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="bg-footer-end mt-12 pt-6 text-sm flex flex-col md:flex-row justify-between items-center">
          <div className="space-y-2">
            <div className="flex flex-wrap gap-4">
              <Link to="/terms-of-use">Terms Of Use</Link>
              <Link to="/privacyPolicy">Privacy Policy</Link>
              <Link to="/faq">FAQ</Link>
              <Link to="/playlist">Watch List</Link>
            </div>
            <p>
              © <span className="currentYear">2025</span>{" "}
              <span className="text-primary">STREAMIT</span>. All Rights
              Reserved.
            </p>
          </div>
          <div className="bg-footer-item flex items-center space-x-4 mt-4 md:mt-0">
            <Link to="/videos">
              <img
                src="/images/Footer/google-play.webp"
                alt="Google Play"
                className="h-8"
              />
            </Link>
            <Link to="/videos">
              <img
                src="/images/Footer/apple.webp"
                alt="App Store"
                className="h-8"
              />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
