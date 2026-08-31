export default function Navbar(){
  return(
      <header className="z-10 fixed left-1/2 w-full -translate-x-1/2 pt-6 fix">
        <nav className="bg-[#0b1120] text-white rounded-full px-5 py-3 flex items-center justify-between shadow-xl">
          {/* Logo */}
          <div className="flex items-center gap-3 pl-2">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
              <div className="w-3 h-3 rounded-full bg-blue-300"></div>
            </div>
            <span className="font-bold text-xl tracking-tight text-white">Tij</span>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#home" className="hover:text-white transition-colors">Home</a>
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#services" className="hover:text-white transition-colors">Services</a>
            <a href="#locations" className="hover:text-white transition-colors">Locations</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>

          {/* Header Action Button */}
          <div>
            <a
              href="#"
              className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all inline-block shadow-md hover:shadow-blue-500/25"
            >
              Book appointment
            </a>
          </div>
        </nav>
      </header>
  );
}
