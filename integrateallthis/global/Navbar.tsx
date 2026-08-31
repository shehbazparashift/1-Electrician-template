"use client";
import { useEffect, useState } from "react";
import Logo from "./Logo";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      <nav className="absolute top-0 left-0 w-full z-50 px-6 sm:px-12 py-8 flex items-center justify-between pointer-events-none">
        <div className="pointer-events-auto">
          <Logo />
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8 bg-white/10 px-8 py-3 rounded-full backdrop-blur-md pointer-events-auto">
          {["Home", "Elements", "Support", "Blog", "Contact"].map((item, i) => (
            <a
              key={i}
              href="#"
              className={`text-sm font-medium tracking-wide ${item === "Home" ? "text-white" : "text-white/70 hover:text-white transition-colors"}`}
            >
              {item}
            </a>
          ))}
        </div>

        <button className="bg-white/10 hover:bg-white/20 transition-colors text-white px-8 py-3 rounded-full text-sm font-medium backdrop-blur-md hidden lg:block cursor-pointer pointer-events-auto">
          Request a demo
        </button>

        {/* Mobile Hamburger */}
        <button
          className="lg:hidden text-white z-50 p-2 cursor-pointer pointer-events-auto relative bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Drawer Overlay */}
      <div
        className={`fixed inset-0 bg-black/95 backdrop-blur-xl z-40 lg:hidden flex flex-col items-center justify-center gap-8 transition-all duration-300 ${
          isOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible pointer-events-none"
        }`}
      >
        {["Home", "Elements", "Support", "Blog", "Contact"].map((item, i) => (
          <a
            key={i}
            href="#"
            onClick={() => setIsOpen(false)}
            className={`text-2xl font-medium tracking-wide transition-all duration-300 transform ${
              isOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            } ${item === "Home" ? "text-white" : "text-white/70 hover:text-white"}`}
            style={{ transitionDelay: `${i * 100}ms` }}
          >
            {item}
          </a>
        ))}
        <button
          onClick={() => setIsOpen(false)}
          className={`bg-[#D46300] hover:bg-[#b55500] transition-all duration-300 text-white px-10 py-4 rounded-full text-lg font-medium transform mt-4 cursor-pointer ${
            isOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
          style={{ transitionDelay: "500ms" }}
        >
          Request a demo
        </button>
      </div>
    </>
  );
}
