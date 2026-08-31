import React from 'react';
import Image from 'next/image';
import FadeUp from '@/components/shared/FadeUp';
import { Award, BadgeCheck, Euro, Zap } from 'lucide-react';

export default function Section04WhyChooseUs() {
  const features = [
    {
      title: 'Certified electricians',
      description: 'Fully licensed professionals following Dutch safety standards.',
      icon: (
        /* Shield Check Icon */
        // <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
        //   <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
        // </svg>
        <BadgeCheck className="w-6 h-6 text-blue-500" />
      ),
    },
    {
      title: 'Fast response',
      description: 'Same-day appointments and emergency call-outs.',
      icon: (
        /* Lightning Bolt Icon */
        // <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
        //   <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
        // </svg>
        <Zap className='w-6 h-6 text-blue-500'/> 
      ),
    },
    {
      title: 'Guaranteed workmanship',
      description: 'Quality installations backed by workmanship guarantees.',
      icon: (
        /* Medal Guarantee Icon */
        // <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
        //   <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.504-1.125-1.125-1.125h-6.75A1.125 1.125 0 019 15.375V18.75m9 0h-9m0-12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0z" />
        // </svg>
        <Award className="w-6 h-6 text-blue-500" />
      ),
    },
    {
      title: 'Transparent pricing',
      description: 'Clear estimates before any work begins.',
      icon: (
        /* Euro / Currency Symbol */
        // <span className="text-blue-600 font-extrabold text-lg leading-none">
        //   €
        // </span>
        <Euro className="w-6 h-6 text-blue-500" />
      ),
    },
  ];

  return (
    <section className="w-full bg-white m-pad font-sans">
      <div className="fix">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Heading + Image (Span 5) */}
          <div className="lg:col-span-5">
            <FadeUp>
              {/* Tag Category */}
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                <span className="text-[13px] font-normal tracking-widest text-[#6b7280] uppercase">
                  WHY CHOOSE US
                </span>
              </div>

              {/* Main Headline */}
              <h2 className="text-[28px] lg:text-[40px] xl:text-[48px] leading-[34px] lg:leading-[44px] xl:leading-[52px] font-semibold text-slate-900 tracking-tight">
                A standard of care <br />
                you can <span className="text-blue-600">feel</span>
              </h2>
            </FadeUp>

            {/* Electrician Image Card */}
            <div className="relative w-full h-[320px] sm:h-[350px] lg:h-[380px] rounded-[32px] overflow-hidden shadow-sm mt-8">
              <Image
                src="/Trust/trust.jpg"
                alt="Electrician inspecting panel"
                fill
                sizes="(min-width: 1024px) 40vw, 90vw"
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Right Column: 2x2 Feature Grid Cards (Span 7) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {features.map((item, index) => (
              <div
                key={index}
                className="bg-[#f6f7f8] rounded-[28px] p-7 border border-slate-200 flex flex-col justify-between min-h-66 transition-all hover:shadow-sm"
              >
                <div>
                  {/* Circular White Badge */}
                  <div className="w-13 h-13 rounded-full bg-white flex items-center justify-center border border-slate-200 mb-5">
                    {item.icon}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-400 text-[16px] font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Learn More Link */}
                <div className="mt-5">
                  <a
                    href="#about"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    <span>Learn more</span>
                    <svg
                      className="w-3.5 h-3.5"
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
                  </a>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}