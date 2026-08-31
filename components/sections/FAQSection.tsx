"use client";
import React, { useState } from "react";
import { ArrowUp, ArrowDown } from "lucide-react";
import FadeUp from "@/components/shared/FadeUp";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "Do you offer emergency electrical repairs?",
    answer:
      "Yes — our emergency line is open day and night, every day of the year. For urgent faults we aim to be at your door within two hours.",
  },
  {
    question: "Are your electricians certified?",
    answer:
      "Yes, all of our electricians are fully licensed, insured, and certified to meet all national safety standard regulations.",
  },
  {
    question: "How much does an electrical inspection cost?",
    answer:
      "Our inspection pricing starts at a flat base rate, depending on the property size and complexity. Contact us for a detailed, transparent quote.",
  },
  {
    question: "Do you install EV chargers?",
    answer:
      "Yes, we supply and install a full range of residential and commercial EV charging stations tailored to your vehicle and site setup.",
  },
  {
    question: "Can you help with commercial electrical projects?",
    answer:
      "Absolutely. We manage everything from complete commercial fit-outs and lighting systems to ongoing maintenance contracts.",
  },
];

export default function FAQSection() {
  // First item open by default
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full bg-white m-pad-sm">
      <div className="fix grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Heading & Subtitle */}
        <FadeUp className="lg:col-span-5">
          <h2 className="text-[28px] lg:text-[48px] 2xl:text-[56px] leading-[34px] lg:leading-[52px] 2xl:leading-[60px] font-semibold tracking-tight text-gray-900 mb-4">
            Frequently asked questions
          </h2>
          <p className="text-base text-gray-500 max-w-sm leading-relaxed">
            Everything you need to know about our electrical service and bookings.
          </p>
        </FadeUp>

        {/* Right Column: Accordion List */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          {faqData.map((item, index: number) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={item.question}
                className="bg-[#f6f8fa] border border-gray-200/80 rounded-2xl overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left p-6 md:p-7 flex items-center justify-between gap-6 cursor-pointer select-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-lg md:text-xl font-medium text-gray-900 tracking-tight">
                    {item.question}
                  </span>

                  {/* Icon Circle */}
                  <div className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 md:w-11 md:h-11 rounded-full bg-gray-900 text-white flex items-center justify-center transition-transform duration-200">
                    {isOpen ? (
                      <ArrowUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 stroke-[2.5]" />
                    ) : (
                      <ArrowDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 stroke-[2.5]" />
                    )}
                  </div>
                </button>

                {/* Answer Content */}
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 pb-7 md:px-7 md:pb-8 pt-0 max-w-xl">
                      <p className="text-base text-gray-500 font-light leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}