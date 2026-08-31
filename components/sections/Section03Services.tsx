"use client";

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import {
  Asterisk,
  Building2,
  Cable,
  House,
  Lightbulb,
  SquareCheckBig,
  ArrowLeft,
  ArrowRight,
} from 'lucide-react';
import FadeUp from '@/components/shared/FadeUp';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';

type Service = {
  title: string;
  image: string;
  icon: React.ReactNode;
};

export default function Section03Services() {
  const swiperRef = useRef<SwiperType | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const services: Service[] = [
    {
      title: 'Emergency Electrical Repairs',
      image: '/Services/service1.png',
      icon: <Asterisk />,
    },
    {
      title: 'Lighting Installation',
      image: '/Services/service2.jpg',
      icon: <Lightbulb />,
    },
    {
      title: 'Fuse Box Upgrades',
      image: '/Services/service3.jpg',
      icon: <Cable />,
    },
    {
      title: 'Electrical Inspections',
      image: '/Services/service4.jpg',
      icon: <SquareCheckBig />,
    },
    {
      title: 'Smart Home Installation',
      image: '/Services/service5.jpg',
      icon: <House />,
    },
    {
      title: 'Commercial Electrical Work',
      image: '/Services/service6.jpg',
      icon: <Building2 />,
    },
  ];

  const renderServiceCard = (service: Service) => (
    <div className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm flex flex-col group hover:shadow-md transition-all duration-300">
      {/* Image Container */}
      <div className="relative w-full h-[210px] bg-slate-100 overflow-hidden">
        <Image
          src={service.image}
          alt={service.title}
          fill
          sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 90vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Content Container */}
      <div className="relative pt-6 px-6 pb-6 flex-1 flex flex-col justify-between">
        {/* Floating Circle Blue Badge */}
        <div className="absolute -top-7 left-6 w-13 h-13 rounded-full bg-blue-600 flex items-center justify-center">
          {service.icon}
        </div>

        <div className="mt-2">
          <h3 className="text-[20px] font-medium text-slate-900 leading-snug">
            {service.title}
          </h3>
        </div>

        {/* Arrow Link */}
        <div className="mt-4 pt-2">
          <a
            href="#"
            data-modal-target="contact"
            className="inline-flex items-center gap-1.5 text-[14px] font-medium text-blue-600 hover:text-blue-700 transition-colors"
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
                d="M7 17L17 7M17 7H7M17 7V17"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );

  return (
    <section id="services" className="w-full bg-[#f5f7fa] m-pad font-sans">
      <div className="fix">
        {/* Top Header */}
        <FadeUp className="text-center mb-14">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-blue-600"></span>
            <span className="text-[13px] font-normal tracking-widest text-[#6b7280] uppercase">
              WHAT WE DO
            </span>
          </div>
          <h2 className="text-[28px] lg:text-[48px] 2xl:text-[56px] leading-[34px] lg:leading-[52px] 2xl:leading-[60px] font-semibold text-slate-900 tracking-tight lg:whitespace-nowrap">
            Electrical services, <span className="text-blue-600">done right</span>
          </h2>
        </FadeUp>

        {/* Mobile: Swipeable Carousel */}
        <div className="md:hidden">
          <Swiper
            modules={[Navigation]}
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
            spaceBetween={20}
            className="w-full"
          >
            {services.map((service, index) => (
              <SwiperSlide key={index}>{renderServiceCard(service)}</SwiperSlide>
            ))}
          </Swiper>

          {/* Carousel Navigation Arrows */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <button
              type="button"
              onClick={() => swiperRef.current?.slidePrev()}
              disabled={isBeginning}
              aria-label="Previous service"
              className="w-11 h-11 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-900 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-colors shadow-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-slate-900 disabled:hover:border-slate-200"
            >
              <ArrowLeft className="w-4 h-4" strokeWidth={2} />
            </button>
            <button
              type="button"
              onClick={() => swiperRef.current?.slideNext()}
              disabled={isEnd}
              aria-label="Next service"
              className="w-11 h-11 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-900 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-colors shadow-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-slate-900 disabled:hover:border-slate-200"
            >
              <ArrowRight className="w-4 h-4" strokeWidth={2} />
            </button>
          </div>
        </div>

        {/* Desktop / Tablet: All 6 cards shown directly, no carousel */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div key={index}>{renderServiceCard(service)}</div>
          ))}
        </div>
      </div>
    </section>
  );
}
