"use client";

import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import FadeUp from '@/components/shared/FadeUp';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';

type Review = {
  id: number;
  quote: string;
  author: string;
  location: string;
  bgColor: string;
};

export default function Section08Reviews() {
  const swiperRef = useRef<SwiperType | null>(null);
  const desktopSwiperRef = useRef<SwiperType | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [isDesktopBeginning, setIsDesktopBeginning] = useState(true);
  const [isDesktopEnd, setIsDesktopEnd] = useState(false);

  const syncSwiperState = (swiper: SwiperType) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };
  const syncDesktopSwiperState = (swiper: SwiperType) => {
    setIsDesktopBeginning(swiper.isBeginning);
    setIsDesktopEnd(swiper.isEnd);
  };

  // Safety net: force one re-measure + resync shortly after mount in case
  // the very first measurement (before layout/fonts/images settle) was off.
  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      const mobile = swiperRef.current;
      if (mobile && !mobile.destroyed) {
        mobile.update();
        syncSwiperState(mobile);
      }
      const desktop = desktopSwiperRef.current;
      if (desktop && !desktop.destroyed) {
        desktop.update();
        syncDesktopSwiperState(desktop);
      }
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  const reviews: Review[] = [
    {
      id: 1,
      quote: "“Arrived exactly on time and replaced our fuse box without any fuss. Spotless work.”",
      author: "Eva Jansen",
      location: "Amsterdam",
      bgColor: "bg-[#dbe7ff]",
    },
    {
      id: 2,
      quote: "“Rewired the whole house on schedule and left everything clean and tidy.”",
      author: "Thomas Smit",
      location: "Utrecht",
      bgColor: "bg-[#dbe7ff]",
    },
    {
      id: 3,
      quote: "“Clear quote up front and no surprises on the invoice. Exactly what you want.”",
      author: "Lotte Mulder",
      location: "Rotterdam",
      bgColor: "bg-[#eef4ff]",
    },
    {
      id: 4,
      quote: "“Called at 11pm about a power cut and they talked me through it calmly, then arrived fast.”",
      author: "Bram Koster",
      location: "The Hague",
      bgColor: "bg-[#dbe7ff]",
    },
    {
      id: 5,
      quote: "“Professional, punctual and friendly — the new lighting looks fantastic.”",
      author: "Noa Bakker",
      location: "Delft",
      bgColor: "bg-[#eef4ff]",
    },
    {
      id: 6,
      quote: "“Five years of reliable service for our office. We would never call anyone else.”",
      author: "Sem Visser",
      location: "Haarlem",
      bgColor: "bg-[#dbe7ff]",
    },
  ];

  const renderReviewCard = (review: Review) => (
    <div
      className={`${review.bgColor} rounded-[24px] p-8 sm:p-10 flex flex-col justify-between min-h-[260px] sm:min-h-[280px] transition-transform duration-300 hover:-translate-y-1`}
    >
      {/* Quote Text */}
      <p className="text-slate-800 text-base sm:text-lg font-medium leading-relaxed">
        {review.quote}
      </p>

      {/* Author & Location */}
      <div className="mt-8">
        <h3 className="text-sm font-bold text-slate-900 leading-tight">
          {review.author}
        </h3>
        <p className="text-xs text-slate-400 mt-0.5">{review.location}</p>
      </div>
    </div>
  );

  return (
    <section id="reviews" className="w-full bg-white m-pad font-sans">
      <div className="fix flex flex-col items-center">

        {/* Section Tag */}
        <div className="flex items-center gap-2 mb-4 justify-center">
          <span className="w-2 h-2 rounded-full bg-blue-600"></span>
          <span className="text-[13px] font-normal tracking-widest text-[#6b7280] uppercase">
            REVIEWS
          </span>
        </div>

        {/* Section Title */}
        <FadeUp>
          <h2 className="text-[28px] lg:text-[48px] 2xl:text-[56px] leading-[34px] lg:leading-[52px] 2xl:leading-[60px] font-semibold text-slate-900 text-center tracking-tight mb-12 lg:mb-16">
            Over 200+ reviews from <br className="hidden sm:inline" />
            <span className="text-blue-600">happy clients</span>
          </h2>
        </FadeUp>

        {/* Mobile: Swipeable Carousel */}
        <div className="md:hidden w-full mb-12">
          <Swiper
            modules={[Navigation]}
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}
            onSwiper={syncSwiperState}
            onSlideChange={syncSwiperState}
            onResize={syncSwiperState}
            onObserverUpdate={syncSwiperState}
            observer
            observeParents
            speed={600}
            slidesPerView={1}
            spaceBetween={20}
            className="w-full"
          >
            {reviews.map((review) => (
              <SwiperSlide key={review.id}>{renderReviewCard(review)}</SwiperSlide>
            ))}
          </Swiper>

          {/* Carousel Navigation Arrows */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <button
              type="button"
              onClick={() => swiperRef.current?.slidePrev()}
              disabled={isBeginning}
              aria-label="Previous review"
              className="w-11 h-11 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-900 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-colors shadow-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-slate-900 disabled:hover:border-slate-200"
            >
              <ArrowLeft className="w-4 h-4" strokeWidth={2} />
            </button>
            <button
              type="button"
              onClick={() => swiperRef.current?.slideNext()}
              disabled={isEnd}
              aria-label="Next review"
              className="w-11 h-11 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-900 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-colors shadow-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-slate-900 disabled:hover:border-slate-200"
            >
              <ArrowRight className="w-4 h-4" strokeWidth={2} />
            </button>
          </div>
        </div>

        {/* Desktop / Tablet: Swipeable Carousel (3 cards at a time) */}
        <div className="hidden md:block w-full mb-8">
          <Swiper
            modules={[Navigation]}
            onBeforeInit={(swiper) => {
              desktopSwiperRef.current = swiper;
            }}
            onSwiper={syncDesktopSwiperState}
            onSlideChange={syncDesktopSwiperState}
            onResize={syncDesktopSwiperState}
            onObserverUpdate={syncDesktopSwiperState}
            observer
            observeParents
            speed={600}
            slidesPerView={3}
            slidesPerGroup={3}
            spaceBetween={24}
            className="w-full"
          >
            {reviews.map((review) => (
              <SwiperSlide key={review.id}>{renderReviewCard(review)}</SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Desktop / Tablet: Carousel Navigation Arrows (centered) */}
        <div className="hidden md:flex items-center justify-center gap-3 mb-4">
          <button
            type="button"
            onClick={() => desktopSwiperRef.current?.slidePrev()}
            disabled={isDesktopBeginning}
            aria-label="Previous review"
            className="w-12 h-12 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-900 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-colors shadow-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-slate-900 disabled:hover:border-slate-200"
          >
            <ArrowLeft className="w-5 h-5" strokeWidth={2} />
          </button>
          <button
            type="button"
            onClick={() => desktopSwiperRef.current?.slideNext()}
            disabled={isDesktopEnd}
            aria-label="Next review"
            className="w-12 h-12 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-900 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-colors shadow-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-slate-900 disabled:hover:border-slate-200"
          >
            <ArrowRight className="w-5 h-5" strokeWidth={2} />
          </button>
        </div>

      </div>
    </section>
  );
}