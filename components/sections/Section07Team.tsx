import React from 'react';
import Image from 'next/image';

export default function Section07Team() {
  const teamMembers = [
    {
      name: 'Mark Jansen',
      role: 'Lead Electrician',
      image: '/Team/team1.png',
    },
    {
      name: 'Lucas Vermeer',
      role: 'Electrical Specialist',
      image: '/Team/team2.png',
    },
    {
      name: 'Tom Bakker',
      role: 'Emergency Technician',
      image: '/Team/team3.png',
    },
  ];

  return (
    <section className="w-full bg-[#f5f7fa] m-pad font-sans">
      <div className="fix">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[280px_repeat(3,minmax(0,1fr))] gap-6">
          
          {/* Dark Intro Card */}
          <div className="bg-[#0b1320] rounded-[28px] px-8 sm:px-10 py-12 sm:py-17 flex flex-col justify-between min-h-0 sm:min-h-[415px] shadow-sm">
            <div>
              {/* Tag Category */}
              <div className="flex items-center gap-2 mb-6">
                <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                <span className="text-[13px] font-normal tracking-widest text-[#6b7280] uppercase">
                  THE TEAM
                </span>
              </div>

              {/* Main Headline */}
              <h2 className="text-[28px] lg:text-[36px] 2xl:text-[46px] leading-[28px] lg:leading-[38px] 2xl:leading-[50px] font-semibold text-white tracking-tight">
                Meet the people behind the power
              </h2>
            </div>
          </div>

          {/* Team Member Cards */}
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-[28px] overflow-hidden border border-slate-100 shadow-sm flex flex-col min-h-[415px] group transition-all duration-300 hover:shadow-md"
            >
              {/* Photo Area with Light Gradient Background */}
              <div className="relative w-full flex-1 bg-[#f3f3f3] overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 45vw, 90vw"
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Member Details */}
              <div className="p-6 bg-[#eff4fe]">
                <h3 className="text-lg font-semibold text-slate-900 leading-snug">
                  {member.name}
                </h3>
                <p className="text-[14px] font-normal text-slate-400 mt-1">
                  {member.role}
                </p>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}