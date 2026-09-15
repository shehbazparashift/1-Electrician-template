"use client";

import React from 'react';
import Image from 'next/image';
import FadeUp from '@/components/shared/FadeUp';
import { BsLightningCharge } from 'react-icons/bs';
import { useLanguage } from '@/components/shared/LanguageProvider';

const CONTENT = {
  en: {
    eyebrow: "Why choose us",
    titleBefore: "A standard of care ",
    titleMiddle: "you can ",
    titleHighlight: "feel",
    imageAlt: "Electrician inspecting panel",
    learnMore: "Learn more",
    features: [
      {
        title: "Certified electricians",
        description: "Fully licensed professionals following Dutch safety standards.",
      },
      {
        title: "Fast response",
        description: "Same-day appointments and emergency call-outs.",
      },
      {
        title: "Guaranteed workmanship",
        description: "Quality installations backed by workmanship guarantees.",
      },
      {
        title: "Transparent pricing",
        description: "Clear estimates before any work begins.",
      },
    ],
  },
  nl: {
    eyebrow: "Waarom kiezen voor ons",
    titleBefore: "Een zorgstandaard ",
    titleMiddle: "die je kunt ",
    titleHighlight: "voelen",
    imageAlt: "Elektricien inspecteert paneel",
    learnMore: "Meer informatie",
    features: [
      {
        title: "Gecertificeerde elektriciens",
        description: "Volledig gelicentieerde professionals die de Nederlandse veiligheidsnormen volgen.",
      },
      {
        title: "Snelle service",
        description: "Afspraken op dezelfde dag en spoedoproepen.",
      },
      {
        title: "Gegarandeerd vakmanschap",
        description: "Installaties van hoge kwaliteit met garantie op vakmanschap.",
      },
      {
        title: "Transparante prijzen",
        description: "Duidelijke offertes voordat het werk begint.",
      },
    ],
  },
} as const;

export default function Section04WhyChooseUs() {
  const { language } = useLanguage();
  const t = CONTENT[language];
  const icons = [
    (
      /* Shield Check Icon */
      <svg key="shield" className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M12 2.96 15.4 1.5l1.89 3.2 3.61.82-.34 3.69L23 12l-2.44 2.79.34 3.7-3.61.82-1.89 3.2-3.4-1.46-3.4 1.46-1.89-3.2-3.61-.82.34-3.7L1 12l2.44-2.79-.34-3.7 3.61-.82L8.6 1.5 12 2.96z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
    (
      /* Lightning Bolt Icon */
      <BsLightningCharge key="lightning" className="w-6 h-6 text-blue-500" />
    ),
    (
      /* Medal Guarantee Icon */
      <svg key="medal" className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <circle cx="12" cy="9" r="6" />
        <path fill="currentColor" stroke="none" d="M12 6l.9 1.8 2 .3-1.4 1.4.3 2L12 10.6l-1.8.9.3-2-1.4-1.4 2-.3z" />
        <path d="M8.2 13.6L6 22l6-3.5" />
        <path d="M15.8 13.6L18 22l-6-3.5" />
      </svg>
    ),
    (
      /* Euro / Currency Symbol */
      <svg key="euro" className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M19 6a9 9 0 0 0-14 7 9 9 0 0 0 14 5" />
        <path d="M4 10h11" />
        <path d="M4 14h11" />
      </svg>
    ),
  ];
  const features = t.features.map((feature, index) => ({
    ...feature,
    icon: icons[index],
  }));

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
                  {t.eyebrow}
                </span>
              </div>

              {/* Main Headline */}
              <h2 className="text-[28px] lg:text-[40px] xl:text-[48px] 2xl:text-[56px] leading-[34px] lg:leading-[44px] xl:leading-[52px] font-semibold text-slate-900 tracking-tight">
                {t.titleBefore}<br />
                {t.titleMiddle}<span className="text-blue-600">{t.titleHighlight}</span>
              </h2>
            </FadeUp>

            {/* Electrician Image Card */}
            <div className="relative w-full h-[320px] sm:h-[350px] lg:h-[380px] rounded-[32px] overflow-hidden shadow-sm mt-8">
              <Image
                src="/Trust/trust.jpg"
                alt={t.imageAlt}
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
                className="bg-[#f7f8f9] rounded-[28px] p-5 lg:p-7 border border-slate-200 flex flex-col justify-between min-h-55 lg:min-h-66  transition-all hover:shadow-sm"
              >
                <div>
                  {/* Circular White Badge */}
                  <div className="w-13 h-13 rounded-full bg-white flex items-center justify-center border border-slate-200 mb-2 lg:mb-5">
                    {item.icon}
                  </div>

                  {/* Title */}
                  <h3 className="text-[18px] lg:text-[20px] xl:text-[22px] font-medium text-[#0a0f1c] mb-2">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[#6b7280] text-[12px] lg:text-[14px] xl:text-[16px] font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Learn More Link */}
                <div className="mt-1 lg:mt-3 xl:mt-5">
                  <a
                    href="#about"
                    className="inline-flex items-center gap-1.5 text-[11px] lg:text-[12px] xl:text-[14px] font-medium text-[#06f] hover:text-blue-700 transition-colors"
                  >
                    <span>{t.learnMore}</span>
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