
"use client";

import { Check, ChevronDown, Loader2 } from "lucide-react";
import { useState, useEffect, type ChangeEvent, type FormEvent } from "react";

type Translation = { en: string; nl: string };
function t(entry: Translation): string {
  return entry.en;
}

type LeadEnquiryFormProps = {
  idPrefix?: string;
  onSuccessComplete?: () => void;
  className?: string;
  submitLabel?: Translation;
  /** Background classes for text inputs/select/textarea. Only used by the "boxed" fieldVariant. Defaults to the translucent white used in the contact modal. */
  fieldBg?: string;
  /** Background (+ hover) classes for the submit button. Defaults to the shared accent color. */
  submitButtonBg?: string;
  /** "boxed" (default) matches the contact modal's white rounded fields. "underline" renders transparent fields with just a white bottom border, for use on a solid-color background. */
  fieldVariant?: "boxed" | "underline";
};

type ServiceOption = {
  id: string | number;
  name?: string;
  title?: string;
  [key: string]: unknown;
};

const INDUSTRIES: { value: string; label: Translation }[] = [
  { value: "Electrician", label: { en: "Electrician", nl: "Elektricien" } },
  { value: "Plumber", label: { en: "Plumber", nl: "Loodgieter" } },
  {
    value: "HVAC / Heating Technician",
    label: { en: "HVAC / Heating Technician", nl: "HVAC / Verwarmingsmonteur" },
  },
  {
    value: "Solar Panel Installer",
    label: { en: "Solar Panel Installer", nl: "Zonnepaneel-installateur" },
  },
  {
    value: "EV Charging Installer",
    label: { en: "EV Charging Installer", nl: "Laadpaal-installateur" },
  },
  { value: "Handyman", label: { en: "Handyman", nl: "Klusjesman" } },
  { value: "Painter", label: { en: "Painter", nl: "Schilder" } },
  { value: "Carpenter", label: { en: "Carpenter", nl: "Timmerman" } },
  { value: "Tiler", label: { en: "Tiler", nl: "Tegelzetter" } },
  { value: "Roofer", label: { en: "Roofer", nl: "Dakdekker" } },
  {
    value: "Construction Contractor",
    label: { en: "Construction Contractor", nl: "Aannemer" },
  },
  {
    value: "Hair Salon / Barber",
    label: { en: "Hair Salon / Barber", nl: "Kapsalon / Barbier" },
  },
  {
    value: "Beauty Salon / Spa",
    label: { en: "Beauty Salon / Spa", nl: "Schoonheidssalon / Spa" },
  },
  { value: "Nail Salon", label: { en: "Nail Salon", nl: "Nagelsalon" } },
  {
    value: "Massage Therapist",
    label: { en: "Massage Therapist", nl: "Massagetherapeut" },
  },
  {
    value: "Fitness Trainer / Gym",
    label: { en: "Fitness Trainer / Gym", nl: "Fitnesstrainer / Sportschool" },
  },
  { value: "Other", label: { en: "Other", nl: "Anders" } },
];

const REGEX = {
  phone: /^\+?[0-9\s\-()]{7,20}$/,
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
};

const INITIAL_FORM_DATA = {
  name: "",
  phone: "",
  email: "",
  businessName: "",
  industry: "",
  industryOther: "",
  service: "", // Stores selected Service ID string locally
  serviceArea: "",
  message: "",
};

const INITIAL_FIELD_ERRORS = {
  phone: "",
  email: "",
};

const fieldWrapClass = "space-y-1.5";
const labelClass =
  "text-[12.5px] font-semibold text-[var(--m-fg-muted)] ml-1 font-sans";
const errorTextClass = "text-red-600 text-[11px] font-medium ml-1";
const DEFAULT_FIELD_BG = "bg-white/85";
const DEFAULT_SUBMIT_BG =
  "bg-[var(--m-accent)] hover:bg-[var(--m-accent-hover)]";

export default function LeadEnquiryForm({
  idPrefix = "lead",
  onSuccessComplete,
  className,
  submitLabel,
  fieldBg = DEFAULT_FIELD_BG,
  submitButtonBg = DEFAULT_SUBMIT_BG,
  fieldVariant = "boxed",
}: LeadEnquiryFormProps) {
  const isUnderline = fieldVariant === "underline";
  const baseFieldClass = isUnderline
    ? `w-full bg-transparent border-0 border-b outline-none transition-all font-sans text-[14px] placeholder:text-white/50 focus:border-white ml-1`
    : `w-full rounded-xl border ${fieldBg} shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_1px_2px_rgba(17,17,17,0.03)] outline-none transition-all font-sans text-[14px] text-[var(--m-ink)] placeholder:text-[var(--m-fg-subtle)] focus:bg-white focus:border-[var(--m-accent)] focus:ring-4 focus:ring-[var(--m-accent)]/10`;
  const inputClass = isUnderline ? `${baseFieldClass} text-white pb-2` : `${baseFieldClass} h-[44px] px-3.5`;
  const selectClass = isUnderline
    ? `${baseFieldClass} text-black pb-2 pr-8 appearance-none cursor-pointer`
    : `${baseFieldClass} h-[44px] py-1 pl-3.5 pr-10 appearance-none cursor-pointer`;
  const textareaClass = isUnderline
    ? `${baseFieldClass} text-white pb-2 resize-none`
    : `${baseFieldClass} px-3.5 py-3 resize-none`;
  const errorFieldClass = isUnderline
    ? "border-red-400"
    : "border-red-400 bg-red-50/90 focus:border-red-500 focus:ring-red-500/10";
  const defaultFieldClass = isUnderline
    ? "border-white/30"
    : "border-[var(--m-border)]";

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [fieldErrors, setFieldErrors] = useState(INITIAL_FIELD_ERRORS);

  const [services, setServices] = useState<ServiceOption[]>([]);
  const [isLoadingServices, setIsLoadingServices] = useState(false);

  useEffect(() => {
    async function fetchServices() {
      setIsLoadingServices(true);
      try {
        const response = await fetch(
          // "https://api.getgrowthrocket.com/api/v1/public/tenants/tij/sites/tij/bookings/settings"
          "https://api.getgrowthrocket.com/api/v1/public/bookings/settings"
        );
        if (response.ok) {
          const resData = await response.json();
          const list =
            resData.services ||
            resData.data?.services ||
            resData.data ||
            (Array.isArray(resData) ? resData : []);
          setServices(
            list.filter((service: ServiceOption) => {
              const serviceName = (service.name || service.title || "")
                .toString()
                .toLowerCase();

              return !serviceName.includes("consultation");
            }),
          );
        }
      } catch (err) {
        console.error("Failed to fetch services:", err);
      } finally {
        setIsLoadingServices(false);
      }
    }

    fetchServices();
  }, []);

  const fieldId = (name: string) => `${idPrefix}-${name}`;

  const validateField = (name: string, value: string) => {
    let nextError = "";
    if (name === "phone" && value) {
      if (value === "+") return true;
      if (!REGEX.phone.test(value)) {
        nextError = t({
          en: "Please enter a valid international phone number",
          nl: "Voer een geldig internationaal telefoonnummer in",
        });
      }
    }
    if (name === "email" && value && !REGEX.email.test(value)) {
      nextError = t({
        en: "Please enter a valid email address",
        nl: "Voer een geldig e-mailadres in",
      });
    }
    setFieldErrors((prev) => ({ ...prev, [name]: nextError }));
    return nextError === "";
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (["phone", "email"].includes(name)) {
      validateField(name, value);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log("Submitting form data:", formData);
    const isPhoneValid = validateField("phone", formData.phone);
    const isEmailValid = validateField("email", formData.email);

    if (!isPhoneValid || !isEmailValid) return;

    setIsSubmitting(true);
    setError(null);

    const tenantSlug = "tij";
    const siteSlug = "tij";

    const selectedServiceObj = services.find(
      (s) => String(s.id) === formData.service
    );
    const selectedServiceName =
      selectedServiceObj?.name || selectedServiceObj?.title;

    const numericServiceId = formData.service ? Number(formData.service) : null;

    // Use serviceId instead of service to match standard backend DTO schemas
    const payload: Record<string, unknown> = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      businessName: formData.businessName,
      industry: formData.industry,
      serviceId: numericServiceId,
      serviceArea: formData.serviceArea,
      message: formData.message,
      source: "PUBLIC_ENQUIRY",
      tags: selectedServiceName
        ? ["Website", "Enquiry", selectedServiceName]
        : ["Website", "Enquiry"],
    };

    if (formData.industry === "Other" && formData.industryOther) {
      payload.industryOther = formData.industryOther;
    }

    try {
      const response = await fetch(
        `https://api.getgrowthrocket.com/api/v1/public/enquiries`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(
          errorData?.message ||
            t({
              en: "Failed to submit enquiry. Please try again.",
              nl: "Verzenden van de aanvraag is mislukt. Probeer het opnieuw.",
            })
        );
      }

      setIsSuccess(true);
      onSuccessComplete?.();
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : t({ en: "Something went wrong.", nl: "Er ging iets mis." })
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-16 h-16 bg-[var(--m-accent-weak)] rounded-full flex items-center justify-center mb-4 shadow-[0_18px_40px_-18px_rgba(37,99,235,0.65)]">
          <Check className="w-8 h-8 text-[var(--m-accent)]" />
        </div>
        <p className="text-2xl font-semibold text-[var(--m-ink)] mb-2 font-sans">
          {t({ en: "Message Sent!", nl: "Bericht verzonden!" })}
        </p>
        <p className="text-[var(--m-fg-muted)] font-['Segoe_UI']">
          {t({
            en: "We'll get back to you shortly.",
            nl: "We nemen zo snel mogelijk contact met je op.",
          })}
        </p>
      </div>
    );
  }

  return (
    <form
      className={["space-y-4", className].filter(Boolean).join(" ")}
      onSubmit={handleSubmit}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5">
        <div className={fieldWrapClass}>
          <label htmlFor={fieldId("name")} className={labelClass}>
            {t({ en: "Full Name", nl: "Volledige naam" })}
          </label>
          <input
            id={fieldId("name")}
            required
            name="name"
            type="text"
            value={formData.name}
            onChange={handleInputChange}
            className={`${inputClass} ${defaultFieldClass}`}
          />
        </div>

        <div className={fieldWrapClass}>
          <label htmlFor={fieldId("phone")} className={labelClass}>
            {t({ en: "Phone Number", nl: "Telefoonnummer" })}
          </label>
          <input
            id={fieldId("phone")}
            required
            name="phone"
            type="tel"
            placeholder="+31 85 744 4176"
            value={formData.phone}
            onChange={handleInputChange}
            className={`${inputClass} ${
              fieldErrors.phone ? errorFieldClass : defaultFieldClass
            }`}
          />
          {fieldErrors.phone && (
            <p className={errorTextClass}>{fieldErrors.phone}</p>
          )}
        </div>

        <div className={fieldWrapClass}>
          <label htmlFor={fieldId("email")} className={labelClass}>
            {t({ en: "Email Address", nl: "E-mailadres" })}
          </label>
          <input
            id={fieldId("email")}
            required
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`${inputClass} ${
              fieldErrors.email ? errorFieldClass : defaultFieldClass
            }`}
          />
          {fieldErrors.email && (
            <p className={errorTextClass}>{fieldErrors.email}</p>
          )}
        </div>

        <div className={fieldWrapClass}>
          <label htmlFor={fieldId("businessName")} className={labelClass}>
            {t({ en: "Business Name", nl: "Bedrijfsnaam" })}
          </label>
          <input
            id={fieldId("businessName")}
            required
            name="businessName"
            type="text"
            value={formData.businessName}
            onChange={handleInputChange}
            className={`${inputClass} ${defaultFieldClass}`}
          />
        </div>

        <div className={fieldWrapClass}>
          <label htmlFor={fieldId("industry")} className={labelClass}>
            {t({
              en: "Type of Work / Industry",
              nl: "Soort werk / Branche",
            })}
          </label>
          <div className="relative">
            <select
              id={fieldId("industry")}
              required
              name="industry"
              value={formData.industry}
              onChange={handleInputChange}
              className={`${selectClass} ${defaultFieldClass}`}
            >
              <option value="" disabled>
                {t({ en: "Select Industry", nl: "Kies een branche" })}
              </option>
              {INDUSTRIES.map((ind) => (
                <option key={ind.value} value={ind.value}>
                  {t(ind.label)}
                </option>
              ))}
            </select>
            <ChevronDown
              className="absolute right-3 top-1/2 -translate-y-1/2 text-black pointer-events-none"
              size={16}
            />
          </div>
        </div>

        <div className={fieldWrapClass}>
          <label htmlFor={fieldId("serviceArea")} className={labelClass}>
            {t({
              en: "Service Area / Location",
              nl: "Werkgebied / Locatie",
            })}
          </label>
          <input
            id={fieldId("serviceArea")}
            required
            name="serviceArea"
            type="text"
            value={formData.serviceArea}
            onChange={handleInputChange}
            className={`${inputClass} ${defaultFieldClass}`}
          />
        </div>

        {formData.industry === "Other" && (
          <div className={`${fieldWrapClass} lg:col-span-2`}>
            <label
              htmlFor={fieldId("industryOther")}
              className={`${labelClass} block`}
            >
              {t({ en: "Please specify", nl: "Specificeer" })}
            </label>
            <input
              id={fieldId("industryOther")}
              required
              name="industryOther"
              type="text"
              value={formData.industryOther}
              onChange={handleInputChange}
              className={`${inputClass} ${defaultFieldClass}`}
            />
          </div>
        )}

        <div className={fieldWrapClass}>
          <label htmlFor={fieldId("service")} className={labelClass}>
            {t({ en: "Service", nl: "Dienst" })}
          </label>
          <div className="relative">
            <select
              id={fieldId("service")}
              required
              name="service"
              value={formData.service}
              onChange={handleInputChange}
              disabled={isLoadingServices}
              className={`${selectClass} ${defaultFieldClass}`}
            >
              <option value="" disabled>
                {isLoadingServices
                  ? t({ en: "Loading services...", nl: "Diensten laden..." })
                  : t({ en: "Select a service", nl: "Kies een dienst" })}
              </option>
              {services.map((srv, index) => {
                const label = srv.name || srv.title || `Service ${index + 1}`;
                const idValue = String(srv.id ?? index);
                return (
                  <option key={srv.id ?? index} value={idValue}>
                    {label}
                  </option>
                );
              })}
            </select>
            <ChevronDown
              className="absolute right-3 top-1/2 -translate-y-1/2 text-black pointer-events-none"
              size={16}
            />
          </div>
        </div>

        <div className={`${fieldWrapClass} lg:col-span-2`}>
          <label htmlFor={fieldId("message")} className={labelClass}>
            {t({
              en: "Message (Optional)",
              nl: "Bericht (optioneel)",
            })}
          </label>
          <textarea
            id={fieldId("message")}
            name="message"
            rows={3}
            value={formData.message}
            onChange={handleInputChange}
            className={`${textareaClass} ${defaultFieldClass}`}
          />
        </div>
      </div>

      {error && (
        <p className="rounded-xl border border-red-200 bg-red-50/90 px-4 py-3 text-red-700 text-[13px] font-medium font-sans">
          {error}
        </p>
      )}

      <button
        disabled={isSubmitting}
        type="submit"
        className={`w-full mt-2 h-[52px] flex items-center justify-center gap-2 rounded-xl font-semibold text-[15px] text-white ${submitButtonBg} transition-all shadow-[var(--m-shadow-btn)] hover:shadow-[0_8px_28px_rgba(37,99,235,0.35)] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:shadow-[var(--m-shadow-btn)] font-sans cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-[var(--m-accent)]/20`}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="animate-spin h-5 w-5 shrink-0" />
            <span>{t({ en: "Submitting...", nl: "Versturen..." })}</span>
          </>
        ) : (
          <span>
            {t(
              submitLabel ?? {
                en: "Submit Enquiry",
                nl: "Aanvraag versturen",
              }
            )}
          </span>
        )}
      </button>
    </form>
  );
}
// 
// 
// 
// 
// 
// 
// 
// 
// 

// "use client";

// import { Check, ChevronDown, Loader2 } from "lucide-react";
// import { useState, useEffect, type ChangeEvent, type FormEvent } from "react";

// type Translation = { en: string; nl: string };
// function t(entry: Translation): string {
//   return entry.en;
// }

// type LeadEnquiryFormProps = {
//   idPrefix?: string;
//   onSuccessComplete?: () => void;
//   className?: string;
//   submitLabel?: Translation;
// };

// type ServiceOption = {
//   id?: string;
//   name?: string;
//   title?: string;
//   [key: string]: unknown;
// };

// const INDUSTRIES: { value: string; label: Translation }[] = [
//   { value: "Electrician", label: { en: "Electrician", nl: "Elektricien" } },
//   { value: "Plumber", label: { en: "Plumber", nl: "Loodgieter" } },
//   {
//     value: "HVAC / Heating Technician",
//     label: { en: "HVAC / Heating Technician", nl: "HVAC / Verwarmingsmonteur" },
//   },
//   {
//     value: "Solar Panel Installer",
//     label: { en: "Solar Panel Installer", nl: "Zonnepaneel-installateur" },
//   },
//   {
//     value: "EV Charging Installer",
//     label: { en: "EV Charging Installer", nl: "Laadpaal-installateur" },
//   },
//   { value: "Handyman", label: { en: "Handyman", nl: "Klusjesman" } },
//   { value: "Painter", label: { en: "Painter", nl: "Schilder" } },
//   { value: "Carpenter", label: { en: "Carpenter", nl: "Timmerman" } },
//   { value: "Tiler", label: { en: "Tiler", nl: "Tegelzetter" } },
//   { value: "Roofer", label: { en: "Roofer", nl: "Dakdekker" } },
//   {
//     value: "Construction Contractor",
//     label: { en: "Construction Contractor", nl: "Aannemer" },
//   },
//   {
//     value: "Hair Salon / Barber",
//     label: { en: "Hair Salon / Barber", nl: "Kapsalon / Barbier" },
//   },
//   {
//     value: "Beauty Salon / Spa",
//     label: { en: "Beauty Salon / Spa", nl: "Schoonheidssalon / Spa" },
//   },
//   { value: "Nail Salon", label: { en: "Nail Salon", nl: "Nagelsalon" } },
//   {
//     value: "Massage Therapist",
//     label: { en: "Massage Therapist", nl: "Massagetherapeut" },
//   },
//   {
//     value: "Fitness Trainer / Gym",
//     label: { en: "Fitness Trainer / Gym", nl: "Fitnesstrainer / Sportschool" },
//   },
//   { value: "Other", label: { en: "Other", nl: "Anders" } },
// ];

// const REGEX = {
//   phone: /^\+?[0-9\s\-()]{7,20}$/,
//   email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
//   url: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
// };

// const INITIAL_FORM_DATA = {
//   name: "",
//   phone: "",
//   email: "",
//   businessName: "",
//   industry: "",
//   industryOther: "",
//   service: "",
//   serviceArea: "",
//   hasWebsite: "No",
//   websiteUrl: "",
//   message: "",
// };

// const INITIAL_FIELD_ERRORS = {
//   phone: "",
//   email: "",
//   websiteUrl: "",
// };

// const fieldWrapClass = "space-y-1.5";
// const labelClass =
//   "text-[12.5px] font-semibold text-[var(--m-fg-muted)] ml-1 font-sans";
// const baseFieldClass =
//   "w-full rounded-xl border bg-white/85 shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_1px_2px_rgba(17,17,17,0.03)] outline-none transition-all font-sans text-[14px] text-[var(--m-ink)] placeholder:text-[var(--m-fg-subtle)] focus:bg-white focus:border-[var(--m-accent)] focus:ring-4 focus:ring-[var(--m-accent)]/10";
// const inputClass = `${baseFieldClass} h-[44px] px-3.5`;
// const selectClass = `${baseFieldClass} h-[44px] py-1 pl-3.5 pr-10 appearance-none cursor-pointer`;
// const textareaClass = `${baseFieldClass} px-3.5 py-3 resize-none`;
// const errorFieldClass =
//   "border-red-400 bg-red-50/90 focus:border-red-500 focus:ring-red-500/10";
// const defaultFieldClass = "border-[var(--m-border)]";
// const errorTextClass = "text-red-600 text-[11px] font-medium ml-1";

// export default function LeadEnquiryForm({
//   idPrefix = "lead",
//   onSuccessComplete,
//   className,
//   submitLabel,
// }: LeadEnquiryFormProps) {
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isSuccess, setIsSuccess] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [formData, setFormData] = useState(INITIAL_FORM_DATA);
//   const [fieldErrors, setFieldErrors] = useState(INITIAL_FIELD_ERRORS);

//   const [services, setServices] = useState<ServiceOption[]>([]);
//   const [isLoadingServices, setIsLoadingServices] = useState(false);

//   useEffect(() => {
//     async function fetchServices() {
//       setIsLoadingServices(true);
//       try {
//         const response = await fetch(
//           "https://api.getgrowthrocket.com/api/v1/public/tenants/meridian-logistics/sites/meridian-logistics/bookings/settings"
//         );
//         if (response.ok) {
//           const resData = await response.json();
//           const list =
//             resData.services ||
//             resData.data?.services ||
//             resData.data ||
//             (Array.isArray(resData) ? resData : []);
//           setServices(list);
//         }
//       } catch (err) {
//         console.error("Failed to fetch services:", err);
//       } finally {
//         setIsLoadingServices(false);
//       }
//     }

//     fetchServices();
//   }, []);

//   const fieldId = (name: string) => `${idPrefix}-${name}`;

//   const validateField = (name: string, value: string) => {
//     let nextError = "";
//     if (name === "phone" && value) {
//       if (value === "+") return true;
//       if (!REGEX.phone.test(value)) {
//         nextError = t({
//           en: "Please enter a valid international phone number",
//           nl: "Voer een geldig internationaal telefoonnummer in",
//         });
//       }
//     }
//     if (name === "email" && value && !REGEX.email.test(value)) {
//       nextError = t({
//         en: "Please enter a valid email address",
//         nl: "Voer een geldig e-mailadres in",
//       });
//     }
//     if (name === "websiteUrl" && value && !REGEX.url.test(value)) {
//       nextError = t({
//         en: "Please enter a valid website URL",
//         nl: "Voer een geldige website-URL in",
//       });
//     }
//     setFieldErrors((prev) => ({ ...prev, [name]: nextError }));
//     return nextError === "";
//   };

//   const handleInputChange = (
//     e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//     if (["phone", "email", "websiteUrl"].includes(name)) {
//       validateField(name, value);
//     }
//   };

//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();

//     const isPhoneValid = validateField("phone", formData.phone);
//     const isEmailValid = validateField("email", formData.email);
//     const isUrlValid =
//       formData.hasWebsite === "Yes"
//         ? validateField("websiteUrl", formData.websiteUrl)
//         : true;

//     if (!isPhoneValid || !isEmailValid || !isUrlValid) return;

//     setIsSubmitting(true);
//     setError(null);

//     const tenantSlug = "meridian-logistics";
//     const siteSlug = "meridian-logistics";

//     try {
//       const response = await fetch(
//         `https://api.getgrowthrocket.com/api/v1/public/tenants/${tenantSlug}/sites/${siteSlug}/enquiries`,
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             name: formData.name,
//             email: formData.email,
//             phone: formData.phone,
//             businessName: formData.businessName,
//             industry: formData.industry,
//             industryOther:
//               formData.industry === "Other"
//                 ? formData.industryOther
//                 : undefined,
//             service: formData.service,
//             serviceArea: formData.serviceArea,
//             hasWebsite: formData.hasWebsite === "Yes",
//             websiteUrl:
//               formData.hasWebsite === "Yes" ? formData.websiteUrl : undefined,
//             message: formData.message,
//             source: "PUBLIC_ENQUIRY",
//             tags: ["Website", "Enquiry"],
//           }),
//         }
//       );
//       console.log("Enquiry submission response:", formData);

//       if (!response.ok) {
//         throw new Error(
//           t({
//             en: "Failed to submit enquiry. Please try again.",
//             nl: "Verzenden van de aanvraag is mislukt. Probeer het opnieuw.",
//           })
//         );
//       }

//       setIsSuccess(true);
//       onSuccessComplete?.();
//     } catch (err: unknown) {
//       setError(
//         err instanceof Error
//           ? err.message
//           : t({ en: "Something went wrong.", nl: "Er ging iets mis." })
//       );
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   if (isSuccess) {
//     return (
//       <div className="flex flex-col items-center justify-center py-12 text-center">
//         <div className="w-16 h-16 bg-[var(--m-accent-weak)] rounded-full flex items-center justify-center mb-4 shadow-[0_18px_40px_-18px_rgba(37,99,235,0.65)]">
//           <Check className="w-8 h-8 text-[var(--m-accent)]" />
//         </div>
//         <p className="text-2xl font-semibold text-[var(--m-ink)] mb-2 font-sans">
//           {t({ en: "Message Sent!", nl: "Bericht verzonden!" })}
//         </p>
//         <p className="text-[var(--m-fg-muted)] font-['Segoe_UI']">
//           {t({
//             en: "We'll get back to you shortly.",
//             nl: "We nemen zo snel mogelijk contact met je op.",
//           })}
//         </p>
//       </div>
//     );
//   }

//   return (
//     <form
//       className={["space-y-4", className].filter(Boolean).join(" ")}
//       onSubmit={handleSubmit}
//     >
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5">
//         <div className={fieldWrapClass}>
//           <label htmlFor={fieldId("name")} className={labelClass}>
//             {t({ en: "Full Name", nl: "Volledige naam" })}
//           </label>
//           <input
//             id={fieldId("name")}
//             required
//             name="name"
//             type="text"
//             value={formData.name}
//             onChange={handleInputChange}
//             className={`${inputClass} ${defaultFieldClass}`}
//           />
//         </div>

//         <div className={fieldWrapClass}>
//           <label htmlFor={fieldId("phone")} className={labelClass}>
//             {t({ en: "Phone Number", nl: "Telefoonnummer" })}
//           </label>
//           <input
//             id={fieldId("phone")}
//             required
//             name="phone"
//             type="tel"
//             placeholder="+31 85 744 4176"
//             value={formData.phone}
//             onChange={handleInputChange}
//             className={`${inputClass} ${
//               fieldErrors.phone ? errorFieldClass : defaultFieldClass
//             }`}
//           />
//           {fieldErrors.phone && (
//             <p className={errorTextClass}>{fieldErrors.phone}</p>
//           )}
//         </div>

//         <div className={fieldWrapClass}>
//           <label htmlFor={fieldId("email")} className={labelClass}>
//             {t({ en: "Email Address", nl: "E-mailadres" })}
//           </label>
//           <input
//             id={fieldId("email")}
//             required
//             name="email"
//             type="email"
//             value={formData.email}
//             onChange={handleInputChange}
//             className={`${inputClass} ${
//               fieldErrors.email ? errorFieldClass : defaultFieldClass
//             }`}
//           />
//           {fieldErrors.email && (
//             <p className={errorTextClass}>{fieldErrors.email}</p>
//           )}
//         </div>

//         <div className={fieldWrapClass}>
//           <label htmlFor={fieldId("businessName")} className={labelClass}>
//             {t({ en: "Business Name", nl: "Bedrijfsnaam" })}
//           </label>
//           <input
//             id={fieldId("businessName")}
//             required
//             name="businessName"
//             type="text"
//             value={formData.businessName}
//             onChange={handleInputChange}
//             className={`${inputClass} ${defaultFieldClass}`}
//           />
//         </div>

//         <div className={fieldWrapClass}>
//           <label htmlFor={fieldId("industry")} className={labelClass}>
//             {t({
//               en: "Type of Work / Industry",
//               nl: "Soort werk / Branche",
//             })}
//           </label>
//           <div className="relative">
//             <select
//               id={fieldId("industry")}
//               required
//               name="industry"
//               value={formData.industry}
//               onChange={handleInputChange}
//               className={`${selectClass} ${defaultFieldClass}`}
//             >
//               <option value="" disabled>
//                 {t({ en: "Select Industry", nl: "Kies een branche" })}
//               </option>
//               {INDUSTRIES.map((ind) => (
//                 <option key={ind.value} value={ind.value}>
//                   {t(ind.label)}
//                 </option>
//               ))}
//             </select>
//             <ChevronDown
//               className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--m-fg-subtle)] pointer-events-none"
//               size={16}
//             />
//           </div>
//         </div>

//         <div className={fieldWrapClass}>
//           <label htmlFor={fieldId("serviceArea")} className={labelClass}>
//             {t({
//               en: "Service Area / Location",
//               nl: "Werkgebied / Locatie",
//             })}
//           </label>
//           <input
//             id={fieldId("serviceArea")}
//             required
//             name="serviceArea"
//             type="text"
//             value={formData.serviceArea}
//             onChange={handleInputChange}
//             className={`${inputClass} ${defaultFieldClass}`}
//           />
//         </div>

//         {formData.industry === "Other" && (
//           <div className={`${fieldWrapClass} lg:col-span-2`}>
//             <label
//               htmlFor={fieldId("industryOther")}
//               className={`${labelClass} block`}
//             >
//               {t({ en: "Please specify", nl: "Specificeer" })}
//             </label>
//             <input
//               id={fieldId("industryOther")}
//               required
//               name="industryOther"
//               type="text"
//               value={formData.industryOther}
//               onChange={handleInputChange}
//               className={`${inputClass} ${defaultFieldClass}`}
//             />
//           </div>
//         )}

//         <fieldset className="space-y-2 flex flex-col justify-center">
//           <legend className="px-1 text-[12.5px] font-semibold text-[var(--m-fg-muted)] font-sans mb-1">
//             {t({
//               en: "Do you currently have a website?",
//               nl: "Heb je op dit moment een website?",
//             })}
//           </legend>
//           <div className="flex gap-4 items-center">
//             {[
//               { value: "Yes", label: { en: "Yes", nl: "Ja" } },
//               { value: "No", label: { en: "No", nl: "Nee" } },
//             ].map((opt) => (
//               <label
//                 key={opt.value}
//                 className="flex items-center gap-1.5 cursor-pointer group"
//               >
//                 <div className="relative flex items-center justify-center">
//                   <input
//                     type="radio"
//                     name="hasWebsite"
//                     value={opt.value}
//                     checked={formData.hasWebsite === opt.value}
//                     onChange={handleInputChange}
//                     className="sr-only"
//                   />
//                   <div
//                     className={`w-5 h-5 rounded-full border-2 transition-all ${
//                       formData.hasWebsite === opt.value
//                         ? "border-[var(--m-accent)] bg-[var(--m-accent)]"
//                         : "border-[var(--m-border)] bg-white group-hover:border-[var(--m-accent)]"
//                     }`}
//                   />
//                   {formData.hasWebsite === opt.value && (
//                     <div className="absolute w-2 h-2 rounded-full bg-white" />
//                   )}
//                 </div>
//                 <span className="text-[var(--m-fg-muted)] font-sans text-[13px]">
//                   {t(opt.label)}
//                 </span>
//               </label>
//             ))}
//           </div>
//         </fieldset>

//         {/* Dynamic Service dropdown positioned alongside website options */}
//         <div className={fieldWrapClass}>
//           <label htmlFor={fieldId("service")} className={labelClass}>
//             {t({ en: "Service", nl: "Dienst" })}
//           </label>
//           <div className="relative">
//             <select
//               id={fieldId("service")}
//               required
//               name="service"
//               value={formData.service}
//               onChange={handleInputChange}
//               disabled={isLoadingServices}
//               className={`${selectClass} ${defaultFieldClass}`}
//             >
//               <option value="" disabled>
//                 {isLoadingServices
//                   ? t({ en: "Loading services...", nl: "Diensten laden..." })
//                   : t({ en: "Select a service", nl: "Kies een dienst" })}
//               </option>
//               {services.map((srv, index) => {
//                 const label = srv.name || srv.title || `Service ${index + 1}`;
//                 const val = srv.id || srv.name || label;
//                 return (
//                   <option key={srv.id || index} value={val}>
//                     {label}
//                   </option>
//                 );
//               })}
//             </select>
//             <ChevronDown
//               className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--m-fg-subtle)] pointer-events-none"
//               size={16}
//             />
//           </div>
//         </div>

//         {formData.hasWebsite === "Yes" && (
//           <div className={`${fieldWrapClass} lg:col-span-2`}>
//             <label htmlFor={fieldId("websiteUrl")} className={labelClass}>
//               {t({ en: "Website URL", nl: "Website-URL" })}
//             </label>
//             <input
//               id={fieldId("websiteUrl")}
//               required
//               name="websiteUrl"
//               type="text"
//               value={formData.websiteUrl}
//               onChange={handleInputChange}
//               className={`${inputClass} ${
//                 fieldErrors.websiteUrl ? errorFieldClass : defaultFieldClass
//               }`}
//             />
//             {fieldErrors.websiteUrl && (
//               <p className={errorTextClass}>{fieldErrors.websiteUrl}</p>
//             )}
//           </div>
//         )}

//         <div className={`${fieldWrapClass} lg:col-span-2`}>
//           <label htmlFor={fieldId("message")} className={labelClass}>
//             {t({
//               en: "Message (Optional)",
//               nl: "Bericht (optioneel)",
//             })}
//           </label>
//           <textarea
//             id={fieldId("message")}
//             name="message"
//             rows={3}
//             value={formData.message}
//             onChange={handleInputChange}
//             className={`${textareaClass} ${defaultFieldClass}`}
//           />
//         </div>
//       </div>

//       {error && (
//         <p className="rounded-xl border border-red-200 bg-red-50/90 px-4 py-3 text-red-700 text-[13px] font-medium font-sans">
//           {error}
//         </p>
//       )}

//       <button
//         disabled={isSubmitting}
//         type="submit"
//         className="w-full mt-2 h-[52px] flex items-center justify-center gap-2 rounded-xl font-semibold text-[15px] text-white bg-[var(--m-accent)] hover:bg-[var(--m-accent-hover)] transition-all shadow-[var(--m-shadow-btn)] hover:shadow-[0_8px_28px_rgba(37,99,235,0.35)] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:shadow-[var(--m-shadow-btn)] font-sans cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-[var(--m-accent)]/20"
//       >
//         {isSubmitting ? (
//           <>
//             <Loader2 className="animate-spin h-5 w-5 shrink-0" />
//             <span>{t({ en: "Submitting...", nl: "Versturen..." })}</span>
//           </>
//         ) : (
//           <span>
//             {t(
//               submitLabel ?? {
//                 en: "Submit Enquiry",
//                 nl: "Aanvraag versturen",
//               }
//             )}
//           </span>
//         )}
//       </button>
//     </form>
//   );
// }
