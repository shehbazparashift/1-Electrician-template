"use client";

import React from "react";
import { OPEN_COOKIE_PREFERENCES_EVENT } from "./CookieConsent";

interface FooterLink {
  label: string;
  href: string;
  isCookiePolicy?: boolean;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

const footerColumns: FooterColumn[] = [
  {
    title: "SERVICES",
    links: [
      { label: "Emergency repairs", href: "#" },
      { label: "Lighting", href: "#" },
      { label: "Inspections", href: "#" },
      { label: "Smart homes", href: "#" },
      { label: "Commercial", href: "#" },
    ],
  },
  {
    title: "COMPANY",
    links: [
      { label: "About", href: "#" },
      { label: "Projects", href: "#" },
      { label: "Reviews", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
  {
    title: "AREAS",
    links: [
      { label: "Amsterdam", href: "#" },
      { label: "Rotterdam", href: "#" },
      { label: "Utrecht", href: "#" },
      { label: "The Hague", href: "#" },
      { label: "Delft", href: "#" },
    ],
  },
  {
    title: "SUPPORT",
    links: [
      { label: "FAQ", href: "#" },
      { label: "Privacy policy", href: "#" },
      { label: "Cookie policy", href: "#", isCookiePolicy: true },
      { label: "Terms", href: "#" },
      { label: "Book appointment", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="w-full bg-[#f8fafd] m-pad-sm">
      {/* Outer Card */}
      <div className="fix bg-[#0a0d14] text-white rounded-3xl p-8 sm:p-12 lg:p-14 flex flex-col justify-between">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-4 flex flex-col items-start pr-0 lg:pr-6">
            <div className="flex items-center gap-2.5 mb-6">
              {/* Logo Circle */}
              <div className="w-6 h-6 rounded-full bg-[#1b73e8] flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-[#8ab4f8]"></div>
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Tij
              </span>
            </div>
            <p className="text-sm text-gray-400 font-normal leading-relaxed max-w-xs">
              Smart, reliable electrical services for every Dutch home — day or
              night.
            </p>
          </div>

          {/* Navigation Links Columns */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {footerColumns.map((col) => (
              <div key={col.title} className="flex flex-col">
                <h3 className="text-xs font-semibold tracking-wider text-gray-400 uppercase mb-4">
                  {col.title}
                </h3>
                <ul className="flex flex-col gap-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        onClick={
                          link.isCookiePolicy
                            ? (e) => {
                                e.preventDefault();
                                window.dispatchEvent(
                                  new CustomEvent(OPEN_COOKIE_PREFERENCES_EVENT),
                                );
                              }
                            : undefined
                        }
                        className="text-sm text-gray-300 hover:text-white transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar Container */}
        <div className="w-full bg-[#131722] rounded-2xl px-6 py-4 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-2 sm:gap-0">
          <span>© 2026 TIJ Electrical Services</span>
          <span>KvK 8842 1190 · Amsterdam, NL</span>
        </div>
      </div>
    </footer>
  );
}