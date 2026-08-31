import React from 'react';
import Image from 'next/image';
import { CircleCheckBig, Clock, Handshake, Star } from 'lucide-react';
import FadeUp from '@/components/shared/FadeUp';

export default function Section02About() {
  return (
    <section id="about" className="w-full bg-white m-pad font-sans">
      <div className="fix">
        {/* Top Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8 mb-12 lg:mb-16">
          {/* Left Title Area */}
          <FadeUp className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-blue-600"></span>
              <span className="text-[13px] font-normal tracking-widest text-[#6b7280] uppercase">
                ABOUT TIJ
              </span>
            </div>
            <h2 className="text-[28px] lg:text-[48px] 2xl:text-[56px] leading-[34px] lg:leading-[52px] 2xl:leading-[60px] font-semibold text-slate-900 tracking-tight">
              Trusted electricians, <br className="hidden lg:block" />
              <span className="text-blue-600">powered by experience</span>
            </h2>
          </FadeUp>

          {/* Right Paragraph Area */}
          <FadeUp className="max-w-md lg:pt-6" delay={0.1}>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
              For over fifteen years we've helped homes and businesses with safe, reliable electrical work — from small repairs to complete rewiring, always with certified workmanship and transparent pricing.
            </p>
          </FadeUp>
        </div>

        {/* Bento Grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left Column Stack (Span 9) */}
          <div className="lg:col-span-9 flex flex-col gap-6">
            {/* Top Row inside Left Stack */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6">
              {/* Electrician Photo Card (Span 8) */}
              <div className="sm:col-span-8 relative h-[250px] rounded-3xl overflow-hidden shadow-sm">
                <Image
                  src="/About/aboutHero.jpg"
                  alt="Electrician working"
                  fill
                  sizes="(min-width: 1024px) 60vw, 90vw"
                  className="object-cover"
                />
              </div>

              {/* 15+ Years Experience Card (Span 4) */}
              <div className="sm:col-span-4 bg-blue-600 rounded-3xl p-7 flex flex-col justify-between text-white shadow-sm min-h-0 sm:min-h-[240px] gap-4">
                {/* Handshake Icon */}
                <div className="w-6 h-6">
                  {/* <svg fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 11.5V14m0 0l3 3m-3-3l-3 3m15-6V14m0 0l-3 3m3-3l3 3M4 6h16M4 6a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V8a2 2 0 00-2-2H4z" />
                  </svg> */}
                  <Handshake  />
                </div>
                <div>
                  <h3 className="text-4xl sm:text-5xl font-medium tracking-tight mb-1">
                    15+
                  </h3>
                  <p className="text-blue-100 text-xs font-normal">
                    Years experience
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Row inside Left Stack */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6">
              {/* 3000+ Projects Completed Card (Span 4) */}
              <div className="sm:col-span-4 bg-[#dfebff] rounded-3xl p-7 flex flex-col justify-between text-slate-900 min-h-0 sm:min-h-[220px] gap-4">
                {/* Checkmark Circle Icon (Material Symbols: task_alt) */}
               <CircleCheckBig className="w-6 h-6 text-blue-600" />
                <div>
                  <h3 className="text-3xl sm:text-5xl font-medium tracking-tight text-slate-900 mb-1">
                    3000+
                  </h3>
                  <p className="text-slate-500 text-xs font-normal">
                    Projects completed
                  </p>
                </div>
              </div>

              {/* 3D Character Illustration Card (Span 4) */}
              <div className="sm:col-span-4 rounded-3xl flex items-center justify-center overflow-hidden min-h-[220px] relative border border-slate-100">
                <Image
                  src="/About/manImage.png"
                  alt="3D Electrician Avatar"
                  width={200}
                  height={200}
                  className="object-contain translate-y-2"
                />
              </div>

              {/* 24/7 Emergency Service Card (Span 4) */}
              <div className="sm:col-span-4 bg-[#f5f7fa] rounded-3xl p-7 flex flex-col justify-between text-slate-900 min-h-0 sm:min-h-[220px] border border-slate-200">
                {/* Clock Icon */}
                <div className="w-8 h-8 text-blue-600">
                  {/* <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg> */}
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-3xl sm:text-5xl font-medium tracking-tight text-slate-900 mb-1">
                    24/7
                  </h3>
                  <p className="text-slate-500 text-xs font-normal">
                    Emergency service
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - 4.9 Rating Tower Card (Span 3) */}
          <div className="lg:col-span-3 relative rounded-3xl overflow-hidden min-h-[380px] lg:min-h-full flex flex-col justify-between p-8 text-white shadow-sm">
            {/* Sunset Power Transmission Image Background */}
            <Image
              src="/About/about2.jpg"
              alt="Power lines sunset"
              fill
              sizes="(min-width: 1024px) 25vw, 90vw"
              className="object-cover"
            />
            {/* Dark Overlay gradient for contrast */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80"></div>

            {/* Top Star Icon */}
            <div className="relative z-10">
              {/* <svg className="w-6 h-6 text-blue-400 fill-none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg> */}
              <Star className="w-6 h-6 text-blue-400" />  
            </div>

            {/* Bottom Content */}
            <div className="relative z-10">
              <div className="flex items-center gap-1 text-4xl sm:text-6xl lg:text-4xl xl:text-6xl font-medium tracking-tight mb-1">
                <span>4.9</span>
                <span className="text-3xl sm:text-6xl lg:text-3xl xl:text-6xl text-white">★</span>
              </div>
              <p className="text-slate-300 text-xs font-normal tracking-wide">
                Customer rating
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
