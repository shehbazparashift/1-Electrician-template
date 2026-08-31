import React from 'react';
import FadeUp from '@/components/shared/FadeUp';

export default function Section05HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Book appointment',
      description: 'Schedule online or by phone.',
    },
    {
      number: '02',
      title: 'Inspection',
      description: 'We assess the issue and explain the solution.',
    },
    {
      number: '03',
      title: 'Professional repair',
      description: 'Certified electricians complete the work safely.',
    },
    {
      number: '04',
      title: 'Power restored',
      description: 'Everything is tested before we leave.',
    },
  ];

  return (
    <section className="w-full bg-[#0066FF] m-pad font-sans relative">
      <div className="fix">
        {/* Header */}
        <FadeUp className="text-center max-w-xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-blue-300"></span>
            <span className="text-xs font-normal tracking-widest text-blue-100 uppercase">
              HOW IT WORKS
            </span>
          </div>
          <h2 className="text-[28px] lg:text-[48px] 2xl:text-[56px] leading-[34px] lg:leading-[52px] 2xl:leading-[60px] font-semibold tracking-tight">
            <span className="text-white">Four </span>
            <span className="text-blue-200/50 font-medium">simple steps</span>
          </h2>
        </FadeUp>

        {/* Steps Grid Container */}
        <div className="relative">
          {/* Horizontal Connecting Line (Visible on Desktop) */}
          <div className="hidden lg:block absolute top-[40%] left-[10%] right-[10%] h-[1px] bg-white/20 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-1">
            {steps.map((step, index) => (
              <div
                key={index}
                className="bg-[#f8fafc] rounded-[32px] p-7 sm:p-8 shadow-lg transition-transform duration-300 hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  {/* Step Number */}
                  <div className="text-5xl sm:text-6xl font-light text-[#0066FF] mb-8 tracking-tight">
                    {step.number}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-medium text-slate-900 mb-3 leading-snug">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-400 font-light text-[15px] leading-relaxed min-h-11">
                    {step.description}
                  </p>
                </div>

                {/* Circle Arrow Button */}
                <div className="mt-6">
                  <button
                    type="button"
                    aria-label={`Learn more about ${step.title}`}
                    className="w-10 h-10 rounded-full bg-white border border-slate-100 shadow-sm flex items-center justify-center text-slate-600 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-colors"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}// import React from 'react';

// export default function Section05HowItWorks() {
//   const steps = [
//     {
//       number: '01',
//       title: 'Book appointment',
//       description: 'Schedule online or by phone.',
//     },
//     {
//       number: '02',
//       title: 'Inspection',
//       description: 'We assess the issue and explain the solution.',
//     },
//     {
//       number: '03',
//       title: 'Professional repair',
//       description: 'Certified electricians complete the work safely.',
//     },
//     {
//       number: '04',
//       title: 'Power restored',
//       description: 'Everything is tested before we leave.',
//     },
//   ];

//   return (
//     <section className="w-full bg-[#0066FF] py-20 lg:py-28 font-sans relative overflow-hidden">
//       <div className="container-page">
//         {/* Header */}
//         <div className="text-center max-w-xl mx-auto mb-16">
//           <div className="flex items-center justify-center gap-2 mb-3">
//             <span className="w-2 h-2 rounded-full bg-blue-300"></span>
//             <span className="text-xs font-normal tracking-widest text-blue-100 uppercase">
//               HOW IT WORKS
//             </span>
//           </div>
//           <h2 className="text-[28px] lg:text-[48px] 2xl:text-[56px] leading-[34px] lg:leading-[52px] 2xl:leading-[60px] font-semibold tracking-tight">
//             <span className="text-white">Four </span>
//             <span className="text-blue-200/90 font-medium">simple steps</span>
//           </h2>
//         </div>

//         {/* Steps Grid Container */}
//         <div className="relative">
//           {/* Horizontal Connecting Line (Visible on Desktop) */}
//           <div className="hidden lg:block absolute top-[40%] left-[10%] right-[10%] h-[1px] bg-white/20 z-0" />

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-1">
//             {steps.map((step, index) => (
//               <div
//                 key={index}
//                 className="bg-[#f8fafc] rounded-[32px] p-8 sm:p-9 flex flex-col justify-between h-[340px] shadow-lg transition-transform duration-300 hover:-translate-y-1"
//               >
//                 <div>
//                   {/* Step Number */}
//                   <div className="text-5xl sm:text-6xl font-normal text-[#0066FF] mb-8 tracking-tight">
//                     {step.number}
//                   </div>

//                   {/* Title */}
//                   <h3 className="text-xl font-bold text-slate-900 mb-3 leading-snug">
//                     {step.title}
//                   </h3>

//                   {/* Description */}
//                   <p className="text-slate-400 text-sm leading-relaxed">
//                     {step.description}
//                   </p>
//                 </div>

//                 {/* Circle Arrow Button */}
//                 <div>
//                   <button
//                     type="button"
//                     aria-label={`Learn more about ${step.title}`}
//                     className="w-10 h-10 rounded-full bg-white border border-slate-100 shadow-sm flex items-center justify-center text-slate-900 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-colors"
//                   >
//                     <svg
//                       className="w-4 h-4"
//                       fill="none"
//                       stroke="currentColor"
//                       strokeWidth="2.2"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
//                       />
//                     </svg>
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }