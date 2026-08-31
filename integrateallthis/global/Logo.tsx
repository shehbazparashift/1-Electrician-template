export default function Logo() {
  return (
    <div className="flex items-center gap-3 relative z-50">
      <div className="flex gap-1.5 items-end h-6">
        <div className="w-1.5 h-6 rounded-full bg-gradient-to-t from-[#FC6767] to-[#EC008C]"></div>
        <div className="w-1.5 h-4 rounded-full bg-gradient-to-t from-[#F9D423] to-[#E65C00]"></div>
        <div className="w-1.5 h-3 rounded-full bg-gradient-to-t from-[#3A7BD5] to-[#00D2FF]"></div>
      </div>
      <div className="text-white text-2xl tracking-tight">
        <span className="font-light">Site</span>
        <span className="font-medium">Logo</span>
      </div>
    </div>
  );
}
