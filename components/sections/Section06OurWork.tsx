"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Grid } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/grid";

export default function Section06OurWork() {
  const swiperRef = useRef<SwiperType | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const projects = [
    { id: 1, title: "Modern Architecture Lighting", image: "/Work/work1.jpg" },
    { id: 2, title: "Commercial Office Fitout", image: "/Work/work2.jpg" },
    { id: 3, title: "Electrical Panel Maintenance", image: "/Work/work3.jpg" },
    { id: 4, title: "Smart Home Automation Integration", image: "/Work/work4.jpg" },
    { id: 5, title: "Industrial Fabrication & Wiring", image: "/Work/work5.jpg" },
    { id: 6, title: "High-Voltage Power Lines Project", image: "/Work/work6.jpg" },
    { id: 7, title: "Circuit Diagnostics & Testing", image: "/Work/work7.jpg" },
    { id: 8, title: "Modern Office Lighting Setup", image: "/Work/work8.jpg" },
    { id: 9, title: "Electrical System Blueprinting", image: "/Work/work9.jpg" },
    { id: 10, title: "Control System Programming", image: "/Work/work10.jpg" },
    { id: 11, title: "Industrial Automation Diagnostics", image: "/Work/work11.jpg" },
    { id: 12, title: "Minimalist Pendant Lighting", image: "/Work/work12.jpg" },
  ];

  return (
    <section id="our-work" className="w-full bg-white m-pad font-sans">
      <div className="fix">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 lg:mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-blue-600"></span>
              <span className="text-[13px] font-normal tracking-widest text-[#6b7280] uppercase">
                OUR WORK
              </span>
            </div>

            <h2 className="text-[28px] lg:text-[48px] 2xl:text-[56px] leading-[34px] lg:leading-[52px] 2xl:leading-[60px] font-semibold text-slate-900 tracking-tight">
              Recently <span className="text-blue-600">completed</span> projects
            </h2>
          </div>

          {/* Desktop / Tablet: Arrow Controls (unchanged) */}
          <div className="hidden md:flex items-center gap-3">
            <button
              type="button"
              onClick={() => swiperRef.current?.slidePrev()}
              disabled={isBeginning}
              aria-label="Previous Projects"
              className="w-12 h-12 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-900 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-colors shadow-sm cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-slate-900 disabled:hover:border-slate-200"
            >
              <ArrowLeft className="w-5 h-5" strokeWidth={2} />
            </button>
            <button
              type="button"
              onClick={() => swiperRef.current?.slideNext()}
              disabled={isEnd}
              aria-label="Next Projects"
              className="w-12 h-12 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-900 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-colors shadow-sm cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-slate-900 disabled:hover:border-slate-200"
            >
              <ArrowRight className="w-5 h-5" strokeWidth={2} />
            </button>
          </div>
        </div>

        {/* Swiper Slider showing 6 cards per view (3 cols x 2 rows) */}
        <Swiper
  modules={[Navigation, Grid]}
  onBeforeInit={(swiper) => {
    swiperRef.current = swiper;
  }}
  onSwiper={(swiper) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  }}
  onSlideChange={(swiper) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  }}
  speed={600}
  slidesPerView={1}
  slidesPerGroup={1}
  spaceBetween={24}
  grid={{
    rows: 1,
    fill: "row",
  }}
  breakpoints={{
    640: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      grid: { rows: 2, fill: "row" },
    },
    1024: {
      slidesPerView: 3,
      slidesPerGroup: 3,
      grid: { rows: 2, fill: "row" },
    },
  }}
  className="w-full !pb-2 [&_.swiper-wrapper]:!transition-timing-function-[cubic-bezier(0.25,1,0.5,1)]"
>
          {projects.map((project) => (
            <SwiperSlide key={project.id} className="!h-auto">
              <div className="relative group w-full h-[260px] sm:h-[280px] lg:h-[300px] rounded-[28px] overflow-hidden bg-slate-100 mb-6">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/10 transition-colors duration-300" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Mobile: Arrow Controls (below cards) */}
        <div className="flex md:hidden items-center justify-center gap-3 mt-0">
          <button
            type="button"
            onClick={() => swiperRef.current?.slidePrev()}
            disabled={isBeginning}
            aria-label="Previous Projects"
            className="w-11 h-11 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-900 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-colors shadow-sm cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-slate-900 disabled:hover:border-slate-200"
          >
            <ArrowLeft className="w-4 h-4" strokeWidth={2} />
          </button>
          <button
            type="button"
            onClick={() => swiperRef.current?.slideNext()}
            disabled={isEnd}
            aria-label="Next Projects"
            className="w-11 h-11 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-900 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-colors shadow-sm cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-slate-900 disabled:hover:border-slate-200"
          >
            <ArrowRight className="w-4 h-4" strokeWidth={2} />
          </button>
        </div>
      </div>
    </section>
  );
}// import React from 'react';
// import Image from 'next/image';
// import { ArrowLeft, ArrowRight } from 'lucide-react';

// export default function Section06OurWork() {
//   const projects = [
//     {
//       id: 1,
//       title: 'Modern Architecture Lighting',
//       image: '/Work/work1.jpg',
//     },
//     {
//       id: 2,
//       title: 'Commercial Office Fitout',
//       image: '/Work/work2.jpg',
//     },
//     {
//       id: 3,
//       title: 'Electrical Panel Maintenance',
//       image: '/Work/work3.jpg',
//     },
//     {
//       id: 4,
//       title: 'Smart Home Automation Integration',
//       image: '/Work/work4.jpg',
//     },
//     {
//       id: 5,
//       title: 'Industrial Fabrication & Wiring',
//       image: '/Work/work5.jpg',
//     },
//     {
//       id: 6,
//       title: 'High-Voltage Power Lines Project',
//       image: '/Work/work6.jpg',
//     },
//   ];

//   return (
//     <section id="our-work" className="w-full bg-white py-16 lg:py-24 font-sans">
//       <div className="container-page">
//         {/* Header Section with Title and Slider Controls */}
//         <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 lg:mb-12 gap-6">
//           <div>
//             {/* Tag / Category Indicator */}
//             <div className="flex items-center gap-2 mb-3">
//               <span className="w-2 h-2 rounded-full bg-blue-600"></span>
//               <span className="text-[13px] font-normal tracking-widest text-[#6b7280] uppercase">
//                 OUR WORK
//               </span>
//             </div>

//             {/* Main Headline */}
//             <h2 className="text-[28px] lg:text-[48px] 2xl:text-[56px] leading-[34px] lg:leading-[52px] 2xl:leading-[60px] font-semibold text-slate-900 tracking-tight">
//               Recently <span className="text-blue-600">completed</span> projects
//             </h2>
//           </div>

//           {/* Slider Navigation Arrows */}
//           <div className="flex items-center gap-3">
//             <button
//               type="button"
//               aria-label="Previous Project"
//               className="w-12 h-12 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-900 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-colors shadow-sm"
//             >
//               <ArrowLeft className="w-5 h-5" strokeWidth={2} />
//             </button>
//             <button
//               type="button"
//               aria-label="Next Project"
//               className="w-12 h-12 rounded-full border border-blue-600 bg-blue-600 flex items-center justify-center text-white hover:bg-blue-700 hover:border-blue-700 transition-colors shadow-sm"
//             >
//               <ArrowRight className="w-5 h-5" strokeWidth={2} />
//             </button>
//           </div>
//         </div>

//         {/* 6 Grid Gallery Cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {projects.map((project) => (
//             <div
//               key={project.id}
//               className="relative group w-full h-[260px] sm:h-[280px] lg:h-[300px] rounded-[28px] overflow-hidden bg-slate-100"
//             >
//               <Image
//                 src={project.image}
//                 alt={project.title}
//                 fill
//                 className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
//               />
//               {/* Optional Subtle Dark Overlay on Hover */}
//               <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/10 transition-colors duration-300" />
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }