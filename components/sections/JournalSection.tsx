"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import FadeUp from "@/components/shared/FadeUp";
import { useLanguage } from "@/components/shared/LanguageProvider";

const CONTENT = {
  en: {
    eyebrow: "Journal",
    titleBefore: "Tips for a ",
    titleHighlight: "happy home",
    learnMore: "Learn more",
    posts: [
      {
        category: "MAINTENANCE",
        title: "Why your circuit breaker keeps tripping",
        description:
          "Understand the common causes and when to call an electrician.",
        image: "/Journal/journal1.jpg",
        link: "#",
      },
      {
        category: "LIGHTING",
        title: "The benefits of upgrading to LED lighting",
        description:
          "Lower bills, better light and a longer lifespan for every room.",
        image: "/Journal/journal2.jpg",
        link: "#",
      },
      {
        category: "SAFETY",
        title: "Preparing your home for electrical safety",
        description:
          "Simple checks to keep your home safe and up to standard.",
        image: "/Journal/journal3.jpg",
        link: "#",
      },
    ],
  },
  nl: {
    eyebrow: "Journaal",
    titleBefore: "Tips voor een ",
    titleHighlight: "fijn thuis",
    learnMore: "Meer informatie",
    posts: [
      {
        category: "ONDERHOUD",
        title: "Waarom je stroomonderbreker blijft afslaan",
        description:
          "Begrijp de meest voorkomende oorzaken en wanneer je een elektricien moet bellen.",
        image: "/Journal/journal1.jpg",
        link: "#",
      },
      {
        category: "VERLICHTING",
        title: "De voordelen van overstappen op LED-verlichting",
        description:
          "Lagere rekeningen, beter licht en een langere levensduur voor elke ruimte.",
        image: "/Journal/journal2.jpg",
        link: "#",
      },
      {
        category: "VEILIGHEID",
        title: "Je huis voorbereiden op elektrische veiligheid",
        description:
          "Eenvoudige controles om je huis veilig en up-to-date te houden.",
        image: "/Journal/journal3.jpg",
        link: "#",
      },
    ],
  },
} as const;

export default function JournalSection() {
  const { language } = useLanguage();
  const t = CONTENT[language];
  const posts = t.posts;

  return (
    <section className="w-full bg-[#f8fafd] m-pad-sm">
      <div className="fix">
        {/* Header */}
        <FadeUp className="flex flex-col items-center text-center mb-14">
          <div className="flex items-center gap-2 mb-3">
            <span className="h-2 w-2 rounded-full bg-blue-600"></span>
            <span className="text-[13px] font-normal tracking-widest text-[#6b7280] uppercase">
              {t.eyebrow}
            </span>
          </div>
          <h2 className="text-[28px] lg:text-[48px] 2xl:text-[56px] leading-[34px] lg:leading-[52px] 2xl:leading-[60px] font-semibold tracking-tight text-gray-900">
            {t.titleBefore}<span className="text-blue-600">{t.titleHighlight}</span>
          </h2>
        </FadeUp>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, idx) => (
            <article key={idx} className="flex flex-col h-full bg-transparent group cursor-pointer">
              {/* Image Container */}
              <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden mb-6 bg-gray-100">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="flex flex-col flex-grow items-start">
                {/* Tag Pill */}
                <span className="inline-block px-3.5 py-1 text-[10px] xl:text-[12px] font-medium tracking-wider text-blue-600 uppercase border border-blue-100 rounded-full mb-4 bg-blue-50/50">
                  {post.category}
                </span>

                {/* Title */}
                <h3 className="text-[18px] xl:text-[22px] font-medium text-gray-900 leading-snug mb-3 transition-colors">
                  {post.title}
                </h3>

                {/* Description */}
                <p className="text-[12px] lg:text-[13px] xl:text-[15px] font-light text-gray-500 leading-relaxed mb-6 flex-grow">
                  {post.description}
                </p>

                {/* Action Link */}
                <a
                  href={post.link}
                  className="inline-flex items-center gap-1.5 text-[13px] xl:text-[14px] font-medium text-blue-600 hover:text-blue-700 transition-all group-hover:gap-2.5"
                >
                  {t.learnMore}
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
