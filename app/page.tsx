import React from "react";
import Section01Hero from "@/components/sections/Section01Hero";
import Navbar from "@/components/shared/Navbar";
import Section02About from "@/components/sections/Section02About";
import Section03Services from "@/components/sections/Section03Services";
import Section04WhyChooseUs from "@/components/sections/Section04WhyChooseUs";
import Section05HowItWorks from "@/components/sections/Section05HowItWorks";
import Section06OurWork from "@/components/sections/Section06OurWork";
import Section07Team from "@/components/sections/Section07Team";
import Section08Reviews from "@/components/sections/Section08Reviews";
import Section09CTA from "@/components/sections/Section09CTA";
import Section10 from "@/components/sections/Section10";
import JournalSection from "@/components/sections/JournalSection";
import FAQSection from "@/components/sections/FAQSection";
import AppointmentSection from "@/components/sections/AppointmentSection";
import Footer from "@/components/shared/Footer";
import FadeUp from "@/components/shared/FadeUp";
// 
export default function Home() {
  return (
    <main className="w-full bg-white relative">
      <Navbar />
      <FadeUp className="w-full">
        <Section01Hero />
      </FadeUp>
      <FadeUp className="w-full">
        <Section02About />
      </FadeUp>
      <FadeUp className="w-full">
        <Section03Services />
      </FadeUp>
      <FadeUp className="w-full">
        <Section04WhyChooseUs />
      </FadeUp>
      <FadeUp className="w-full">
        <Section05HowItWorks />
      </FadeUp>
      <FadeUp className="w-full">
        <Section06OurWork />
      </FadeUp>
      <FadeUp className="w-full">
        <Section07Team />
      </FadeUp>
      <FadeUp className="w-full">
        <Section08Reviews />
      </FadeUp>
      <FadeUp className="w-full">
        <Section09CTA />
      </FadeUp>
      <FadeUp className="w-full">
        <Section10 />
      </FadeUp>
      <FadeUp className="w-full">
        <JournalSection />
      </FadeUp>
      <FadeUp className="w-full">
        <FAQSection />
      </FadeUp>
      <FadeUp className="w-full">
        <AppointmentSection />
      </FadeUp>
      <Footer />
    </main>
  );
}