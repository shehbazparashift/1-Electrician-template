import React from "react";
import { ArrowUpRight } from "lucide-react";
import FadeUp from "@/components/shared/FadeUp";

const locations = [
  [
    { name: "Amsterdam", href: "#" },
    { name: "Rotterdam", href: "#" },
    { name: "The Hague", href: "#" },
    { name: "Utrecht", href: "#" },
  ],
  [
    { name: "Eindhoven", href: "#" },
    { name: "Delft", href: "#" },
    { name: "Leiden", href: "#" },
    { name: "Haarlem", href: "#" },
  ],
];

export default function Section10() {
  return (
    <section className="w-full bg-white m-pad-sm">
      <div className="fix">
        {/* Category Subtitle */}
        <div className="flex items-center gap-2 mb-3">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-600"></span>
          <span className="text-[13px] font-normal tracking-wider text-[#6b7280] uppercase">
            Coverage
          </span>
        </div>

        {/* Section Heading */}
        <FadeUp>
          <h2 className="text-[28px] lg:text-[48px] 2xl:text-[56px] leading-[34px] lg:leading-[52px] 2xl:leading-[60px] font-semibold tracking-tight text-gray-900 mb-10">
            Where we <span className="text-blue-600">work</span>
          </h2>
        </FadeUp>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Image Container */}
          <div className="lg:col-span-5">
            <div className="relative w-full h-80 lg:h-full min-h-[320px] rounded-2xl overflow-hidden shadow-sm">
              <img
                src="/coverage.jpg"
                alt="Where we work location canal view"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Links Grid Container */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-0">
            {locations.map((column, colIdx) => (
              <div key={colIdx} className="flex flex-col">
                {column.map((location) => (
                  <a
                    key={location.name}
                    href={location.href}
                    className="group flex items-center justify-between py-5 border-b border-gray-100 transition-colors hover:border-gray-300"
                  >
                    <span className="text-base md:text-lg font-medium text-gray-800 group-hover:text-blue-600 transition-colors">
                      {location.name}
                    </span>
                    <ArrowUpRight className="w-5 h-5 text-blue-600 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}