import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { PATH } from "@/routes/path";
import { useSelector } from "react-redux";
import { FaBars, FaTimes, FaUser } from "react-icons/fa";

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user?.loginData);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/auth/login";
  };

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
      closeMenu();
    }
  };

  return (
    <header className="bg-black text-white shadow-md fixed top-0 w-full z-50">
      <div className="container mx-auto px-4 h-[70px] flex items-center justify-between">
        {/* Logo */}
        <div className="cursor-pointer" onClick={() => navigate(PATH.HOME)}>
          <img
            src="/images/logo/logo.webp"
            alt="logo"
            className="h-12 w-auto"
          />
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-6">
          <button
            onClick={() => navigate(PATH.HOME)}
            className="hover:text-red-500"
          >
            Trang chủ
          </button>
          <button
            onClick={() => scrollToSection("searchPhim")}
            className="hover:text-red-500"
          >
            Phim
          </button>
          <button
            onClick={() => scrollToSection("cumRapSection")}
            className="hover:text-red-500"
          >
            Cụm Rạp
          </button>
          <button
            onClick={() => scrollToSection("App")}
            className="hover:text-red-500"
          >
            APP
          </button>
          <button
            onClick={() => scrollToSection("lienHe")}
            className="hover:text-red-500"
          >
            Liên hệ
          </button>
        </nav>

        {/* Auth */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              <div className="flex items-center gap-2 font-semibold">
                <FaUser className="text-lg" />
                {user.taiKhoan}
              </div>
              <button
                onClick={handleLogout}
                className="p-2 px-4 rounded-md bg-red-600 hover:bg-white hover:text-red-600 transition"
              >
                Đăng Xuất
              </button>
            </>
          ) : (
            <>
              <Button
                variant="outline"
                className="text-black hover:bg-red-600 hover:text-white"
                onClick={() => navigate(PATH.REGISTER)}
              >
                Đăng ký
              </Button>
              <Button
                className="bg-red-600 hover:bg-white hover:text-red-600"
                onClick={() => navigate(PATH.LOGIN)}
              >
                Đăng nhập
              </Button>
            </>
          )}
        </div>

        {/* Hamburger */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu}>
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-black text-white px-6 py-4 space-y-4">
          <button
            onClick={() => navigate(PATH.HOME)}
            className="block w-full text-left hover:text-red-500"
          >
            Trang chủ
          </button>
          <button
            onClick={() => scrollToSection("searchPhim")}
            className="block w-full text-left hover:text-red-500"
          >
            Phim
          </button>
          <button
            onClick={() => scrollToSection("cumRapSection")}
            className="block w-full text-left hover:text-red-500"
          >
            Cụm Rạp
          </button>
          <button
            onClick={() => scrollToSection("App")}
            className="block w-full text-left hover:text-red-500"
          >
            APP
          </button>
          <button
            onClick={() => scrollToSection("lienHe")}
            className="block w-full text-left hover:text-red-500"
          >
            Liên hệ
          </button>

          {user ? (
            <div className="pt-4 border-t border-white/30">
              <div className="flex items-center gap-2 mb-2 font-semibold">
                <FaUser />
                {user.taiKhoan}
              </div>
              <button
                onClick={handleLogout}
                className="text-left py-2 bg-red-600 hover:bg-white hover:text-red-600 px-4 rounded"
              >
                Đăng Xuất
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-2 pt-4 border-t border-white/30">
              <Button
                variant="outline"
                className="text-black bg-white hover:bg-red-600 hover:text-white"
                onClick={() => {
                  navigate(PATH.REGISTER);
                  closeMenu();
                }}
              >
                Đăng ký
              </Button>
              <Button
                className="bg-red-600 hover:bg-white hover:text-red-600"
                onClick={() => {
                  navigate(PATH.LOGIN);
                  closeMenu();
                }}
              >
                Đăng nhập
              </Button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
