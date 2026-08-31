import React from 'react';
import Image from 'next/image';
import FadeUp from '@/components/shared/FadeUp';

export default function Section09CTA() {
  return (
    <section className="w-full bg-[#f5f7fa] m-pad-sm font-sans">
      <div className="fix">
        {/* Main Card Container */}
        <div className="bg-[#0b1320] rounded-[32px] p-6 sm:p-10 lg:p-12 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 shadow-xl">
          
          {/* Left Content Area */}
          <FadeUp className="flex-1 max-w-xl text-left py-4 sm:py-6 lg:py-8">
            <h2 className="text-[28px] lg:text-[48px] 2xl:text-[56px] leading-[34px] lg:leading-[52px] 2xl:leading-[60px] font-semibold text-white tracking-tight mb-6">
              Book an electrician in under a minute.
            </h2>

            <p className="text-[#ffffffb8] text-[14px] sm:text-[18px] font-light leading-relaxed mb-8">
              Tell us what you need and choose a convenient time. We'll confirm your appointment quickly.
            </p>

            <button
              type="button"
              className="inline-flex items-center gap-2 bg-white text-slate-900 font-medium px-6 py-3.5 rounded-full hover:bg-slate-100 transition-colors duration-200 text-[14px] sm:text-[16px] shadow-md"
            >
              <span>Book appointment</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </button>
          </FadeUp>

          {/* Right Image Container */}
          <div className="relative w-full lg:w-[500px] h-[300px] sm:h-[380px] lg:h-[420px] rounded-[24px] overflow-hidden flex-shrink-0">
            <Image
              src="/appointment.jpg" // Ensure your image in the public folder is updated to match this path
              alt="Electrician fixing light fixture"
              fill
              priority
              sizes="(min-width: 1024px) 500px, 90vw"
              className="object-cover object-center"
            />
          </div>

        </div>
      </div>
    </section>
  );
}