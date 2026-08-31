"use client";

import { useEffect, useState } from "react";
import { lenisStart, lenisStop } from "./LenisProvider";

const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Locations", href: "#locations" },
  { label: "Contact", href: "#" },
] as const;

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Lock background scroll while the drawer is open. Lenis drives its own
  // scroll, so plain overflow:hidden isn't enough — same pattern used by
  // the booking/contact modals elsewhere in this project.
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    document.body.style.overflow = "hidden";
    lenisStop();
    return () => {
      document.body.style.overflow = "";
      lenisStart();
    };
  }, [isMobileMenuOpen]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (href.length > 1) {
      e.preventDefault();
      setIsMobileMenuOpen(false);
      document.querySelector(href)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else {
      // Plain "#" links (Contact / Book appointment) are picked up by the
      // global ModalProvider click delegation via their label text — just
      // close the drawer so it doesn't sit behind the modal that opens.
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <header className="z-[260] fixed left-1/2 w-full -translate-x-1/2 pt-6 fix">
        <nav className="bg-[#0b1120] text-white rounded-full px-5 py-3 flex items-center justify-between shadow-xl">
          {/* Logo */}
          <div className="flex items-center gap-3 pl-2">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
              <div className="w-3 h-3 rounded-full bg-blue-300"></div>
            </div>
            <span className="font-bold text-xl tracking-tight text-white">Tij</span>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            {NAV_ITEMS.map(({ label, href }) => (
              <a key={label} href={href} className="hover:text-white transition-colors">
                {label}
              </a>
            ))}
          </div>

          {/* Desktop Header Action Button */}
          <div className="hidden md:block">
            <a
              href="#"
              className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all inline-block shadow-md hover:shadow-blue-500/25"
            >
              Book appointment
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="md:hidden p-2 -mr-2 flex items-center justify-center"
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            <div className="w-5 h-4 relative flex flex-col justify-between">
              <span
                className={`w-full h-0.5 rounded-full bg-white transition-all duration-300 ${
                  isMobileMenuOpen ? "rotate-45 translate-y-[7px]" : ""
                }`}
              />
              <span
                className={`w-full h-0.5 rounded-full bg-white transition-opacity duration-200 ${
                  isMobileMenuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`w-full h-0.5 rounded-full bg-white transition-all duration-300 ${
                  isMobileMenuOpen ? "-rotate-45 -translate-y-[7px]" : ""
                }`}
              />
            </div>
          </button>
        </nav>
      </header>

      {/* Mobile Drawer Backdrop */}
      <div
        className={`fixed inset-0 z-[250] bg-black/40 backdrop-blur-sm md:hidden transition-opacity duration-300 ${
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Drawer Panel */}
      <aside
        className={`fixed top-0 right-0 bottom-0 z-[250] w-full bg-[#0b1120] text-white p-6 pt-28 shadow-2xl md:hidden flex flex-col justify-between transition-transform duration-300 ease-in-out overflow-y-auto overscroll-contain ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <nav className="flex flex-col gap-1 text-lg font-medium">
          {NAV_ITEMS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              onClick={(e) => handleNavClick(e, href)}
              className="py-3 border-b border-white/10 text-slate-300 hover:text-white transition-colors"
            >
              {label}
            </a>
          ))}
        </nav>

        <a
          href="#"
          onClick={(e) => handleNavClick(e, "#")}
          className="mt-6 mb-4 w-full text-center bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-5 py-3.5 rounded-full transition-all shadow-md"
        >
          Book appointment
        </a>
      </aside>
    </>
  );
}
