"use client";
import React from "react";
import FadeUp from "@/components/shared/FadeUp";
import LeadEnquiryForm from "@/components/shared/LeadEnquiryForm";

export default function AppointmentSection() {
  return (
    <section className="w-full bg-[#f8fafd] m-pad-sm">
      <div className="fix grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-8 items-stretch">
        {/* Left Column: Image */}
        <div className="w-full h-[400px] lg:h-auto min-h-[450px] rounded-3xl overflow-hidden shadow-sm">
          <img
            src="/ReqApp.jpg"
            alt="Electrician performing maintenance"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Column: Appointment Form */}
        <div className="bg-[#0066ff] text-white p-8 md:p-12 rounded-3xl flex flex-col justify-between">
          <div>
            <FadeUp>
              <h2 className="text-[28px] lg:text-[36px] 2xl:text-[40px] leading-[34px] lg:leading-[42px] 2xl:leading-[46px] font-semibold tracking-tight mb-2 xl:whitespace-nowrap">
                {/* Request an appointment */}
                Submit an Enquiry
              </h2>
              <p className="text-blue-100/80 text-sm mb-10 font-light">
                Fill in your details and we'll confirm your booking within the hour.
              </p>
            </FadeUp>

            <div
              style={{
                "--m-fg-muted": "rgba(255,255,255,0.85)",
                "--m-border": "rgba(255,255,255,0.3)",
                "--m-fg-subtle": "#000000",
              } as React.CSSProperties}
            >
              <LeadEnquiryForm
                idPrefix="appointment"
                submitLabel={{ en: "Request appointment", nl: "Afspraak aanvragen" }}
                fieldBg="bg-white"
                submitButtonBg="bg-black hover:bg-neutral-900"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}