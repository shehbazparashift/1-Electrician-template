import Navbar from '@/components/shared/Navbar';
import FadeUp from '@/components/shared/FadeUp';
export default function Section01Hero() {
  return (
    <div id="home" className="min-h-screen bg-[#e8eef5] text-slate-900 font-sans flex flex-col justify-between selection:bg-blue-500 selection:text-white">

      {/* Main Hero Container */}
      <main className="w-full fix flex-1 flex flex-col lg:flex-row items-center justify-between gap-12 pt-20 pb-0">
        {/* Left Content Section */}
        <FadeUp className="flex-1 flex flex-col items-start max-w-2xl pt-12 lg:pt-0">
          {/* Category Tag */}
          <div className="flex items-center gap-2.5 mb-6">
            <span className="w-2 h-2 rounded-full bg-blue-600"></span>
            <span className="text-[13px] font-normal tracking-widest text-[#6b7280] uppercase">
              Electricians · The Netherlands
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-slate-900 leading-[1.12] mb-6">
            Smart <span className="text-blue-600">electrical</span> solutions for modern living.
          </h1>

          {/* Subtitle Description */}
          <p className="text-slate-500 text-base sm:text-lg leading-relaxed mb-8 max-w-lg">
            From emergency electrical repairs to complete installations, our certified electricians keep homes and businesses powered safely across the Netherlands.
          </p>

          {/* Call to Action Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-7 py-3.5 rounded-full transition-all flex items-center gap-2.5 shadow-lg shadow-blue-600/30 hover:shadow-blue-600/40"
            >
              <span>Book appointment</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </a>
            <a
              href="#services"
              className="bg-white hover:bg-slate-50 text-slate-800 font-semibold px-7 py-3.5 rounded-full transition-all border border-slate-200/80 shadow-sm"
            >
              Our services
            </a>
          </div>
        </FadeUp>

        {/* Right Image Container */}
        <FadeUp className="flex-1 self-end flex justify-center lg:justify-end relative w-full max-w-lg lg:max-w-none" delay={0.15}>
          <div className="relative w-full max-w-md lg:max-w-xl flex justify-center items-end">
            {/* Man Electrician PNG Image */}
            <img
              src="/Home/HeroImage.webp"
              alt="Certified Electrician"
              className="w-full h-auto object-contain max-h-[520px] lg:max-h-[600px] drop-shadow-xl"
            />

            {/* Absolute Text Box Badge */}
            <div className="absolute bottom-8 left-2 sm:left-6 bg-white/95 backdrop-blur-md rounded-2xl p-3 px-4 shadow-2xl border border-white/60 flex items-center gap-3.5 z-2">
              <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-200"></div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1 font-bold text-slate-900 text-sm sm:text-base leading-tight">
                  <span>4.9★</span>
                  <span>·</span>
                  <span>3000+</span>
                </div>
                <span className="text-xs text-slate-500 font-medium">
                  completed jobs
                </span>
              </div>
            </div>
          </div>
        </FadeUp>
      </main>
    </div>
  );
}
