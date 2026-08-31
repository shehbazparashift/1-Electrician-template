import { Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full md:px-16 bg-white pt-20 pb-0 flex flex-col items-center overflow-hidden border-t border-gray-100">
      <div className="w-full max-w-[1360px] mx-auto px-6 sm:px-12 flex flex-col lg:flex-row justify-between items-start gap-12 mb-12 lg:mb-20 relative z-10">
        {/* Left side */}
        <div className="flex flex-col gap-8 w-full max-w-md">
          <div className="flex flex-col gap-2 items-start">
            <h3 className="text-3xl lg:text-[40px] font-semibold font-outfit text-black leading-tight">
              Want to work with us?
            </h3>
            <a
              href="#"
              className="text-2xl lg:text-[32px] font-semibold text-black font-outfit underline decoration-1 underline-offset-[6px] decoration-gray-400 hover:text-[#D46300] hover:decoration-[#D46300] transition-colors"
            >
              Get in touch
            </a>
          </div>

          <div className="flex flex-col gap-4 mt-4">
            <h4 className="text-[16px] font-medium text-black font-outfit">
              Contacts
            </h4>
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <a
                href="mailto:info@email.com"
                className="flex items-center gap-2 text-[#5C5C5C] hover:text-[#D46300] transition-colors group"
              >
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-[#D46300]/10 transition-colors">
                  <Mail className="w-4 h-4 text-black group-hover:text-[#D46300]" />
                </div>
                <span className="text-[15px] font-outfit">info@email.com</span>
              </a>
              <a
                href="tel:+1234567890"
                className="flex items-center gap-2 text-[#5C5C5C] hover:text-[#D46300] transition-colors group"
              >
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-[#D46300]/10 transition-colors">
                  <Phone className="w-4 h-4 text-black group-hover:text-[#D46300]" />
                </div>
                <span className="text-[15px] font-outfit">+1 234 567 890</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right side links */}
        <div className="flex flex-col md:flex-row md:flex-wrap lg:flex-nowrap gap-x-8 gap-y-4 md:gap-12 mt-4 lg:mt-8 w-full lg:w-auto">
          {["HOME", "ABOUT US", "GALLERY", "SERVICES"].map((link) => (
            <a
              key={link}
              href="#"
              className="text-xs font-semibold text-[#5C5C5C] tracking-[0.2em] uppercase hover:text-[#D46300] transition-colors font-outfit"
            >
              {link}
            </a>
          ))}
        </div>
      </div>
      {/* Massive Bottom Text */}
      {/* <div className="w-full flex justify-center items-end mt-8 lg:mt-12 overflow-hidden relative border-t border-gray-100/50 pt-8 lg:pt-0">
        <h1 className="text-[19vw]  leading-[0.85] font-normal text-[#F2F2F2] font-outfit tracking-tighter pointer-events-none select-none ml-[-1%] -mb-4">
          LUFTÉ
        </h1> */}
      {/* Copyright and other small links */}
      {/* <div className="absolute bottom-6 w-full max-w-[1360px] mx-auto px-6 sm:px-12 flex justify-between items-center text-[#B8B8B8] font-outfit text-[12px]">
          <div className="flex gap-4  ">
            <a href="#" className="hover:text-black transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-black transition-colors">
              Terms of Service
            </a>
          </div>
          <div className="hidden sm:flex gap-4 items-center">
            <span className="hover:text-black transition-colors cursor-pointer">
              Facebook
            </span>
            <span className="hover:text-black transition-colors cursor-pointer">
              Twitter
            </span>
            <span className="hover:text-black transition-colors cursor-pointer">
              Instagram
            </span>
          </div>
        </div> */}
      <div className="w-full flex flex-col justify-end items-center mt-8 lg:mt-12 overflow-hidden relative border-t border-gray-100/50 pt-8 lg:pt-0">
        <div className="relative lg:absolute lg:bottom-6 lg:left-0 w-full px-4 sm:px-6 md:px-12 mb-6 lg:mb-0 order-1">
          <div className="w-full max-w-[1360px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-[#B8B8B8] font-outfit text-[11px] sm:text-[12px]">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 sm:gap-4 text-center">
              <a href="#" className="hover:text-black transition-colors">
                Privacy Policy
              </a>

              <a href="#" className="hover:text-black transition-colors">
                Terms of Service
              </a>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-center">
              <span className="hover:text-black transition-colors cursor-pointer">
                Facebook
              </span>

              <span className="hover:text-black transition-colors cursor-pointer">
                Twitter
              </span>

              <span className="hover:text-black transition-colors cursor-pointer">
                Instagram
              </span>
            </div>
          </div>
        </div>

        <h1 className="text-[19vw] 2xl:text-[18vw] hidden md:block leading-[0.85] 2xl:leading-[0.82] font-normal text-[#F2F2F2] font-inter tracking-tighter pointer-events-none select-none ml-[-1%] -mb-4 order-2">
          LUFTÉ
        </h1>
      </div>
    </footer>
  );
}
