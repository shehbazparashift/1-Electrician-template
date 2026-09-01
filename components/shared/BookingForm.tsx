"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/shared/Button";
import { lenisStart, lenisStop } from "./LenisProvider";

type Translation = { en: string; nl: string };
function t(entry: Translation): string { return entry.en; }
const locale: string = "en";

interface BookingFormProps {
  isOpen: boolean;
  onClose: () => void;
}

type Service = {
  id: number;
  name: string;
  slug: string;
  description?: string | null;
  durationMinutes: number;
  priceMinor?: number | null;
  currencyCode?: string | null;
  isActive: boolean;
  isBookable: boolean;
};

type Settings = {
  timezone: string;
  slotIntervalMinutes: number;
  minNoticeMinutes: number;
  maxAdvanceDays: number;
  bufferBeforeMinutes: number;
  bufferAfterMinutes: number;
  isActive: boolean;
};

type Slot = {
  startsAt: string;
  endsAt: string;
  startsAtLocal?: string;
  endsAtLocal?: string;
  status?: string;
  availabilityStatus?: string;
  isAvailable?: boolean;
};

type SettingsResponse = { settings: Settings; services: Service[] };
type SlotsResponse = { slotsByDate?: Record<string, Slot[]>; slots?: Slot[] };
type Step = "service" | "slot" | "details" | "success";

const API_BASE =
  "https://api.getgrowthrocket.com/api/v1/public/";



function toLocalDateKey(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}
function addDays(d: Date, days: number): Date {
  const out = new Date(d);
  out.setDate(out.getDate() + days);
  return out;
}
function dateFromKey(key: string): Date {
  const [y, m, d] = key.split("-").map(Number);
  return new Date(y, (m ?? 1) - 1, d ?? 1);
}
function formatPrice(priceMinor?: number | null, currency?: string | null) {
  if (priceMinor == null) return null;
  const value = priceMinor;
  try {
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: currency ?? "EUR",
      maximumFractionDigits: 2,
    }).format(value);
  } catch {
    return `${value.toFixed(2)} ${currency ?? ""}`.trim();
  }
}
function formatDateLong(key: string) {
  return dateFromKey(key).toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}
function formatDateShort(key: string) {
  return dateFromKey(key).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
}
function formatSingleTime(iso: string, local?: string) {
  if (local) {
    const t = local.split("T")[1] ?? "";
    const hhmm = t.slice(0, 5);
    if (hhmm) return formatHHMM(hhmm);
  }
  try {
    return new Date(iso).toLocaleTimeString(undefined, {
      hour: "numeric",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}
function formatTimeFromStartsAt(slot: Slot) {
  return `${formatSingleTime(slot.startsAt, slot.startsAtLocal)} - ${formatSingleTime(slot.endsAt, slot.endsAtLocal)}`;
}
function formatHHMM(hhmm: string) {
  const [hStr, mStr] = hhmm.split(":");
  let h = Number(hStr);
  const m = mStr ?? "00";
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12;
  if (h === 0) h = 12;
  return `${h}:${m} ${ampm}`;
}
function isSlotAvailable(slot: Slot): boolean {
  if (typeof slot.isAvailable === "boolean") return slot.isAvailable;
  const status = slot.availabilityStatus ?? slot.status;
  if (status) return status === "available";
  return true;
}
function stepIndex(s: Step): number {
  return { service: 0, slot: 1, details: 2, success: 3 }[s];
}

export default function BookingForm({ isOpen, onClose }: BookingFormProps) {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [serviceId, setServiceId] = useState<number | null>(null);
  const [loadingSettings, setLoadingSettings] = useState(false);
  const [settingsError, setSettingsError] = useState<string | null>(null);
  const [slotsByDate, setSlotsByDate] = useState<Record<string, Slot[]>>({});
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [slotsError, setSlotsError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [step, setStep] = useState<Step>("service");
  const [direction, setDirection] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const fetchedSettingsRef = useRef(false);

  const goTo = useCallback(
    (next: Step) => {
      setDirection(stepIndex(next) > stepIndex(step) ? 1 : -1);
      setStep(next);
    },
    [step],
  );

  useEffect(() => {
    if (!isOpen) return;
    if (fetchedSettingsRef.current) return;
    fetchedSettingsRef.current = true;
    let cancelled = false;
    setLoadingSettings(true);
    setSettingsError(null);
    fetch(`${API_BASE}/bookings/settings`, {
      headers: { Accept: "application/json" },
    })
      .then(async (res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return (await res.json()) as SettingsResponse;
      })
      .then((data) => {
        if (cancelled) return;
        setSettings(data.settings);
        const bookableServices = (data.services ?? []).filter(
          (service) => service.isActive && service.isBookable,
        );
        setServices(bookableServices);
        if (bookableServices.length > 0) setServiceId(bookableServices[0].id);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        const msg =
          err instanceof Error
            ? err.message
            : t({ en: "Failed to load", nl: "Laden mislukt" });
        setSettingsError(
          t({
            en: `Couldn't load booking options (${msg}).`,
            nl: `Kon de boekingsopties niet laden (${msg}).`,
          }),
        );
      })
      .finally(() => {
        if (!cancelled) setLoadingSettings(false);
      });
    return () => {
      cancelled = true;
    };
  }, [isOpen, t]);

  useEffect(() => {
    if (isOpen) return;
    const timer = window.setTimeout(() => {
      fetchedSettingsRef.current = false;
      setSettings(null);
      setServices([]);
      setServiceId(null);
      setSlotsByDate({});
      setSelectedDate(null);
      setSelectedSlot(null);
      setStep("service");
      setName("");
      setEmail("");
      setPhone("");
      setNotes("");
      setSubmitError(null);
      setSubmitting(false);
      setSettingsError(null);
      setSlotsError(null);
      setLoadingSettings(false);
      setLoadingSlots(false);
    }, 350);
    return () => window.clearTimeout(timer);
  }, [isOpen]);

  // Lock body scroll while open (Lenis drives its own scroll, so it needs
  // to be stopped explicitly — toggling overflow alone doesn't hold it)
  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    lenisStop();
    return () => {
      document.body.style.overflow = "";
      lenisStart();
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  const selectedService = useMemo(
    () => services.find((s) => s.id === serviceId) ?? null,
    [services, serviceId],
  );

  const dateRange = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const maxDays = Math.min(Math.max(settings?.maxAdvanceDays ?? 14, 1), 60);
    const dates: string[] = [];
    for (let i = 0; i < maxDays; i++)
      dates.push(toLocalDateKey(addDays(today, i)));
    return dates;
  }, [settings]);

  useEffect(() => {
    if (!isOpen || step !== "slot" || !serviceId || dateRange.length === 0)
      return;
    let cancelled = false;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoadingSlots(true);
    setSlotsError(null);
    const from = dateRange[0];
    const to = dateRange[dateRange.length - 1];
    fetch(
      `${API_BASE}/bookings/slots?serviceId=${serviceId}&from=${from}&to=${to}`,
      { headers: { Accept: "application/json" } },
    )
      .then(async (res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return (await res.json()) as SlotsResponse;
      })
      .then((data) => {
        if (cancelled) return;
        let map: Record<string, Slot[]> = {};
        if (data.slotsByDate) {
          map = data.slotsByDate;
        } else if (Array.isArray(data.slots)) {
          for (const s of data.slots) {
            const key =
              (s.startsAtLocal && s.startsAtLocal.split("T")[0]) ||
              s.startsAt.split("T")[0];
            if (!map[key]) map[key] = [];
            map[key].push(s);
          }
        }
        setSlotsByDate(map);
        const firstAvailable = dateRange.find((d) =>
          (map[d] ?? []).some(isSlotAvailable),
        );
        setSelectedDate(firstAvailable ?? null);
        setSelectedSlot(null);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        const msg =
          err instanceof Error
            ? err.message
            : t({ en: "Failed to load", nl: "Laden mislukt" });
        setSlotsError(
          t({
            en: `Couldn't load available times (${msg}).`,
            nl: `Kon beschikbare tijden niet laden (${msg}).`,
          }),
        );
      })
      .finally(() => {
        if (!cancelled) setLoadingSlots(false);
      });
    return () => {
      cancelled = true;
    };
  }, [isOpen, step, serviceId, dateRange, t]);

  const availableDateSet = useMemo(() => {
    const set = new Set<string>();
    for (const [d, slots] of Object.entries(slotsByDate)) {
      if (slots.some(isSlotAvailable)) set.add(d);
    }
    return set;
  }, [slotsByDate]);

  const slotsForSelectedDate = useMemo(
    () => (!selectedDate ? [] : (slotsByDate[selectedDate] ?? [])),
    [slotsByDate, selectedDate],
  );
  const availableSlotsForDate = useMemo(
    () => slotsForSelectedDate.filter(isSlotAvailable),
    [slotsForSelectedDate],
  );

  const handleSubmit = useCallback(async () => {
    if (!serviceId || !selectedSlot || !name.trim()) return;
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch(`${API_BASE}/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          serviceId,
          customerName: name.trim(),
          customerEmail: email.trim() || undefined,
          customerPhone: phone.trim() || undefined,
          startsAt: selectedSlot.startsAt,
          endsAt: selectedSlot.endsAt,
          notes: notes.trim() || undefined,
        }),
      });
      if (!res.ok) {
        let msg = t({
          en: `Request failed (${res.status}).`,
          nl: `Verzoek mislukt (${res.status}).`,
        });
        try {
          const data = (await res.json()) as {
            message?: string;
            error?: string;
          };
          msg = data.message || data.error || msg;
        } catch {
          /* ignore */
        }
        throw new Error(msg);
      }
      goTo("success");
    } catch (err: unknown) {
      setSubmitError(
        err instanceof Error
          ? err.message
          : t({ en: "Something went wrong.", nl: "Er ging iets mis." }),
      );
    } finally {
      setSubmitting(false);
    }
  }, [serviceId, selectedSlot, name, email, phone, notes, goTo, t]);

  const stepNumber: Record<Step, number> = {
    service: 1,
    slot: 2,
    details: 3,
    success: 3,
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={onClose}
            className="fixed inset-0 z-[300] bg-[#07111F]/55 backdrop-blur-[8px]"
            aria-hidden="true"
          />
          <div className="fixed inset-0 z-[301] flex items-center justify-center p-3 sm:p-5 lg:p-6 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 24 }}
              transition={{ type: "spring", duration: 0.55, bounce: 0.22 }}
              className="relative w-full max-w-[620px] bg-[#f8fafd]/95 backdrop-blur-xl rounded-[24px] shadow-[0_28px_90px_rgba(7,17,31,0.28)] pointer-events-auto overflow-hidden flex flex-col max-h-[calc(100dvh-24px)] sm:max-h-[calc(100dvh-40px)] border border-white/70 ring-1 ring-black/[0.04]"
              role="dialog"
              aria-modal="true"
              aria-label={t({
                en: "Book an appointment",
                nl: "Afspraak maken",
              })}
            >
              {/* ── Header ── */}
              <div
                className="relative shrink-0 px-6 lg:px-8 pt-5 pb-5 text-[var(--m-accent)] overflow-hidden"
                style={{ background: "var(--m-accent)" }}
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute -top-24 -right-16 w-[320px] h-[320px] rounded-full opacity-20"
                  style={{
                    background:
                      "radial-gradient(50% 50% at 50% 50%, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 70%)",
                  }}
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute -bottom-20 -left-10 w-[260px] h-[260px] rounded-full opacity-15"
                  style={{
                    background:
                      "radial-gradient(50% 50% at 50% 50%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 70%)",
                  }}
                />
                <div className="relative flex items-start justify-between gap-4 text-white">
                  <div>
                    <p className="text-[11px] uppercase tracking-[2px]  font-sans mb-1">
                      {step === "success"
                        ? t({ en: "All done", nl: "Klaar" })
                        : t({
                            en: "Book an Appointment",
                            nl: "Afspraak maken",
                          })}
                    </p>
                    <h2 className="font-sans font-semibold text-[clamp(20px,3.8vw,24px)] leading-[1.15]">
                      {step === "service" &&
                        t({ en: "Pick a service", nl: "Kies een dienst" })}
                      {step === "slot" &&
                        t({
                          en: "Choose a date & time",
                          nl: "Kies een datum & tijd",
                        })}
                      {step === "details" &&
                        t({ en: "Your details", nl: "Jouw gegevens" })}
                      {step === "success" &&
                        t({
                          en: "You're booked in 🎉",
                          nl: "Je bent ingepland 🎉",
                        })}
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={onClose}
                    aria-label={t({ en: "Close", nl: "Sluiten" })}
                    className="shrink-0 -m-2 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15  text-[var(--m-accent)]/80 hover:text-[var(--m-accent)] hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 transition-colors cursor-pointer"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                {step !== "success" && (
                  <div className="relative mt-4 flex items-center gap-2">
                    {[1, 2, 3].map((n) => {
                      const active = stepNumber[step] >= n;
                      return (
                        <div
                          key={n}
                          className="flex-1 h-[5px] rounded-full overflow-hidden bg-white/20"
                        >
                          <motion.div
                            initial={false}
                            animate={{ width: active ? "100%" : "0%" }}
                            transition={{
                              duration: 0.45,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                            className="h-full bg-white"
                          />
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* ── Body ── */}
              <div
                className="relative px-5 sm:px-6 lg:px-8 py-5 sm:py-6 min-h-[min(480px,calc(100dvh-220px))] flex flex-col overflow-y-auto booking-scrollbar"
                data-lenis-prevent
              >
                <AnimatePresence mode="wait" custom={direction}>
                  {step === "service" && (
                    <Slide key="service" direction={direction}>
                      <ServiceStep
                        services={services}
                        loading={loadingSettings}
                        error={settingsError}
                        serviceId={serviceId}
                        onServiceChange={setServiceId}
                        onContinue={() => goTo("slot")}
                      />
                    </Slide>
                  )}
                  {step === "slot" && (
                    <Slide key="slot" direction={direction}>
                      <SlotStep
                        loading={loadingSlots}
                        error={slotsError}
                        dateRange={dateRange}
                        availableDateSet={availableDateSet}
                        selectedDate={selectedDate}
                        onSelectDate={(d) => {
                          setSelectedDate(d);
                          setSelectedSlot(null);
                        }}
                        slots={slotsForSelectedDate}
                        availableSlots={availableSlotsForDate}
                        selectedSlot={selectedSlot}
                        onSelectSlot={setSelectedSlot}
                        onBack={() => goTo("service")}
                        onContinue={() => goTo("details")}
                      />
                    </Slide>
                  )}
                  {step === "details" && (
                    <Slide key="details" direction={direction}>
                      <DetailsStep
                        service={selectedService}
                        slot={selectedSlot}
                        name={name}
                        setName={setName}
                        email={email}
                        setEmail={setEmail}
                        phone={phone}
                        setPhone={setPhone}
                        notes={notes}
                        setNotes={setNotes}
                        onBack={() => goTo("slot")}
                        onSubmit={handleSubmit}
                        submitting={submitting}
                        error={submitError}
                      />
                    </Slide>
                  )}
                  {step === "success" && (
                    <Slide key="success" direction={1}>
                      <SuccessStep
                        service={selectedService}
                        slot={selectedSlot}
                        name={name}
                        onClose={onClose}
                      />
                    </Slide>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>

          <style jsx global>{`
            .booking-scrollbar::-webkit-scrollbar {
              width: 4px;
            }
            .booking-scrollbar::-webkit-scrollbar-track {
              background: transparent;
            }
            .booking-scrollbar::-webkit-scrollbar-thumb {
              background: var(--m-accent);
              border-radius: 999px;
            }
            .booking-scrollbar {
              scrollbar-width: thin;
              scrollbar-color: var(--m-accent) transparent;
            }
            .slots-row::-webkit-scrollbar {
              height: 3px;
            }
            .slots-row::-webkit-scrollbar-track {
              background: transparent;
            }
            .slots-row::-webkit-scrollbar-thumb {
              background: var(--m-accent);
              border-radius: 999px;
            }
            .slots-row {
              scrollbar-width: thin;
              scrollbar-color: var(--m-accent) transparent;
            }
          `}</style>
        </>
      )}
    </AnimatePresence>
  );
}

function Slide({
  children,
  direction,
}: {
  children: React.ReactNode;
  direction: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: direction * 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: direction * -24 }}
      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
      className="flex-1 flex flex-col"
    >
      {children}
    </motion.div>
  );
}

/* ── STEP 1: SERVICE ── */
function ServiceStep({
  services,
  loading,
  error,
  serviceId,
  onServiceChange,
  onContinue,
}: {
  services: Service[];
  loading: boolean;
  error: string | null;
  serviceId: number | null;
  onServiceChange: (id: number) => void;
  onContinue: () => void;
}) {
  return (
    <div className="flex flex-col gap-4 justify-between flex-1">
      {loading && (
        <div className="flex items-center justify-center py-10 flex-1">
          <Spinner />
        </div>
      )}
      {!loading && error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[13px] text-red-700">
          {error}
        </div>
      )}
      {!loading && !error && (
        <>
          <p className="font-sans text-[13px] text-[var(--m-fg-subtle)] -mt-1 ">
            {t({
              en: "Choose what you'd like to book.",
              nl: "Kies wat je wilt boeken.",
            })}
          </p>
          <div className="grid grid-cols-1 gap-2.5 max-h-[340px] overflow-y-auto pr-1">
            {services.length === 0 && (
              <div className="rounded-xl border border-[var(--m-border)] bg-[#f8fafd] px-4 py-3 text-[13px] text-[var(--m-fg-muted)]">
                {t({
                  en: "No services are available right now.",
                  nl: "Er zijn op dit moment geen diensten beschikbaar.",
                })}
              </div>
            )}
            {services.map((s) => {
              const active = s.id === serviceId;
              const price = formatPrice(s.priceMinor, s.currencyCode);
              return (
                <button
                  type="button"
                  key={s.id}
                  onClick={() => onServiceChange(s.id)}
                  className={
                    "group relative text-left rounded-xl border px-4 py-3.5 transition-all cursor-pointer " +
                    // (active
                    //   ? "border-[var(--m-accent)] bg-[var(--m-accent)] shadow-[0_8px_24px_-12px_rgba(37,99,235,0.4)]"
                    //   : "border-[var(--m-border)] bg-white hover:border-[var(--m-accent)] hover:bg-[var(--m-accent-weak)]")
                    (active
                      ? "border-[var(--m-accent)] bg-white text-[var(--m-accent)] shadow-[0_8px_24px_-12px_rgba(37,99,235,0.4)]"
                      : "border-[var(--m-border)] bg-white hover:border-[var(--m-accent)] hover:bg-[var(--m-accent-weak)]")
                  }
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div
                        className={`font-sans font-semibold text-[15px] ${active ? "text-[var(--m-accent)]" : "text-[var(--m-ink)]"}`}
                      >
                        {s.name}
                      </div>
                      {s.description && (
                        <div
                          className={`mt-0.5 font-sans text-[12.5px] leading-[1.45] line-clamp-2 ${active ? "text-[var(--m-accent)]/80" : "text-[var(--m-fg-muted)]"}`}
                        >
                          {s.description}
                        </div>
                      )}
                      <div
                        className={`mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 font-sans text-[12px] ${active ? "text-[var(--m-accent)]/90" : "text-[var(--m-accent)]"}`}
                      >
                        <span className="inline-flex items-center gap-1">
                          <svg
                            width="13"
                            height="13"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <circle cx="12" cy="12" r="10" />
                            <path d="M12 6v6l4 2" />
                          </svg>
                          {s.durationMinutes} {t({ en: "min", nl: "min" })}
                        </span>
                        {price && (
                          <span
                            className={`inline-flex items-center gap-1 font-medium ${active ? "text-[var(--m-accent)]/90" : "text-[var(--m-accent)]"}`}
                          >
                            {price}
                          </span>
                        )}
                      </div>
                    </div>
                    <span
                      className={
                        "shrink-0 mt-0.5 inline-flex w-[20px] h-[20px] items-center justify-center rounded-full border-2 transition-colors " +
                        (active
                          ? "border-[var(--m-accent)] bg-[var(--m-accent)] text-white"
                          : "border-[var(--m-border)] bg-[#f8fafd]")
                      }
                    >
                      {active && (
                        <motion.svg
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.18 }}
                          width="11"
                          height="11"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="white"
                          strokeWidth="3.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M5 13l4 4L19 7" />
                        </motion.svg>
                      )}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </>
      )}
      <div className="flex items-center justify-end gap-3 pt-2 mt-auto">
        <Button
          onClick={onContinue}
          disabled={!serviceId}
          className="cursor-pointer !bg-[var(--m-accent)] hover:!bg-[var(--m-accent-hover)] text-white py-2 px-5 rounded-[10px] disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0"
        >
          {t({ en: "Continue", nl: "Doorgaan" })}
        </Button>
      </div>
    </div>
  );
}

/* ── STEP 2: SLOT ── */
function SlotStep({
  loading,
  error,
  dateRange,
  availableDateSet,
  selectedDate,
  onSelectDate,
  slots,
  availableSlots,
  selectedSlot,
  onSelectSlot,
  onBack,
  onContinue,
}: {
  loading: boolean;
  error: string | null;
  dateRange: string[];
  availableDateSet: Set<string>;
  selectedDate: string | null;
  onSelectDate: (d: string) => void;
  slots: Slot[];
  availableSlots: Slot[];
  selectedSlot: Slot | null;
  onSelectSlot: (s: Slot) => void;
  onBack: () => void;
  onContinue: () => void;
}) {
  const slotsRowRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!selectedSlot || !slotsRowRef.current) return;
    const key = `${selectedSlot.startsAt}-${selectedSlot.endsAt}`;
    const el = slotsRowRef.current.querySelector<HTMLElement>(
      `[data-slot="${key}"]`,
    );
    if (el)
      el.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
  }, [selectedSlot]);

  return (
    <div className="flex flex-col gap-5 flex-1">
      {loading && (
        <div className="flex flex-col items-center justify-center gap-3 py-10 flex-1">
          <Spinner />
          <p className="font-sans text-[13px] text-[var(--m-fg-subtle)]">
            {t({
              en: "Finding available times…",
              nl: "Beschikbare tijden zoeken…",
            })}
          </p>
        </div>
      )}
      {!loading && error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[13px] text-red-700">
          {error}
        </div>
      )}
      {!loading && !error && (
        <>
          <Calendar
            dateRange={dateRange}
            availableDateSet={availableDateSet}
            selectedDate={selectedDate}
            onSelectDate={onSelectDate}
          />
          <div>
            {selectedDate && (
              <p className="mb-1 font-sans font-semibold text-[13px] text-[var(--m-ink)]">
                {dateFromKey(selectedDate).toLocaleDateString(
                  locale === "nl" ? "nl-NL" : "en-US",
                  { month: "long", year: "numeric" },
                )}
              </p>
            )}
            <p className="mb-2 font-sans text-[11.5px] uppercase tracking-[1.4px] text-[var(--m-fg-subtle)] font-semibold">
              {t({ en: "Available times", nl: "Beschikbare tijden" })}{" "}
              {selectedDate && (
                <span className="text-[var(--m-ink)] normal-case tracking-normal font-medium">
                  · {formatDateShort(selectedDate)}
                </span>
              )}
            </p>
            {!selectedDate ? (
              <div className="rounded-xl border border-[var(--m-border)] bg-[#f8fafd] px-4 py-5 text-center">
                <p className="font-sans text-[13px] text-[var(--m-fg-subtle)]">
                  {t({
                    en: "Pick a date above to see available times.",
                    nl: "Kies hierboven een datum om beschikbare tijden te zien.",
                  })}
                </p>
              </div>
            ) : slots.length === 0 ? (
              <div className="rounded-xl border border-[var(--m-border)] bg-[#f8fafd] px-4 py-5 text-center">
                <p className="font-sans text-[13px] text-[var(--m-fg-subtle)]">
                  {t({
                    en: "No times on this day. Try another date.",
                    nl: "Geen tijden op deze dag. Probeer een andere datum.",
                  })}
                </p>
              </div>
            ) : availableSlots.length === 0 ? (
              <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-5 text-center">
                <p className="font-sans text-[13px] text-amber-800">
                  {t({
                    en: "All slots are booked on this day.",
                    nl: "Alle tijdvakken zijn geboekt op deze dag.",
                  })}
                </p>
              </div>
            ) : (
              <div
                ref={slotsRowRef}
                className="slots-row flex gap-2 overflow-x-auto pb-2 -mx-1 px-1 scroll-smooth"
                data-lenis-prevent
              >
                {availableSlots.map((slot) => {
                  const key = `${slot.startsAt}-${slot.endsAt}`;
                  const active =
                    selectedSlot?.startsAt === slot.startsAt &&
                    selectedSlot?.endsAt === slot.endsAt;
                  return (
                    <motion.button
                      type="button"
                      key={key}
                      data-slot={key}
                      onClick={() => onSelectSlot(slot)}
                      whileHover={{ scale: 0.97 }}
                      whileTap={{ scale: 0.95 }}
                      className={
                        "shrink-0 rounded-xl border px-4 py-2.5 font-sans font-medium text-[13px] whitespace-nowrap transition-colors cursor-pointer " +
                        (active
                          ? "border-[var(--m-accent)] bg-[var(--m-accent)] text-white shadow-[0_8px_20px_-10px_rgba(37,99,235,0.45)]"
                          : "border-[var(--m-border)] bg-white text-[var(--m-ink)] hover:border-[var(--m-accent)] hover:bg-[var(--m-accent-weak)]")
                      }
                    >
                      {formatTimeFromStartsAt(slot)}
                    </motion.button>
                  );
                })}
              </div>
            )}
          </div>
          <div className="flex items-center justify-between gap-3 mt-auto pb-2">
            <button
              type="button"
              onClick={onBack}
              className="font-sans text-[13px] font-medium text-[var(--m-fg-muted)] border border-[var(--m-border)] px-4 py-2 rounded-[10px] hover:border-[var(--m-accent)] hover:text-[var(--m-accent)] transition-colors cursor-pointer"
            >
              {t({ en: "← Back", nl: "← Terug" })}
            </button>
            <Button
              onClick={onContinue}
              disabled={!selectedSlot}
              className="cursor-pointer !bg-[var(--m-accent)] hover:!bg-[var(--m-accent-hover)] text-white py-2 px-4 rounded-[10px] disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0"
            >
              {t({ en: "Continue", nl: "Doorgaan" })}
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

/* ── CALENDAR ── */
function Calendar({
  dateRange,
  availableDateSet,
  selectedDate,
  onSelectDate,
}: {
  dateRange: string[];
  availableDateSet: Set<string>;
  selectedDate: string | null;
  onSelectDate: (d: string) => void;
}) {
  const todayKey = toLocalDateKey(new Date());
  const minKey = dateRange[0] ?? todayKey;
  const maxKey = dateRange[dateRange.length - 1] ?? todayKey;

  const [view, setView] = useState(() => {
    const anchor = selectedDate ?? minKey;
    const dt = dateFromKey(anchor);
    return { year: dt.getFullYear(), month: dt.getMonth() };
  });

  const [prevSelectedDate, setPrevSelectedDate] = useState<string | null>(
    selectedDate,
  );
  if (selectedDate !== prevSelectedDate) {
    setPrevSelectedDate(selectedDate);
    if (selectedDate) {
      const dt = dateFromKey(selectedDate);
      if (dt.getFullYear() !== view.year || dt.getMonth() !== view.month) {
        setView({ year: dt.getFullYear(), month: dt.getMonth() });
      }
    }
  }

  const cells = useMemo(() => {
    const first = new Date(view.year, view.month, 1);
    const startWeekday = first.getDay();
    const daysInMonth = new Date(view.year, view.month + 1, 0).getDate();
    const arr: Array<{ key: string | null; day: number | null }> = [];
    for (let i = 0; i < startWeekday; i++) arr.push({ key: null, day: null });
    for (let d = 1; d <= daysInMonth; d++) {
      arr.push({
        key: toLocalDateKey(new Date(view.year, view.month, d)),
        day: d,
      });
    }
    while (arr.length % 7 !== 0) arr.push({ key: null, day: null });
    while (arr.length < 42) arr.push({ key: null, day: null });
    return arr;
  }, [view]);

  const monthLabel = new Date(view.year, view.month, 1).toLocaleDateString(
    locale === "nl" ? "nl-NL" : "en-US",
    { month: "long", year: "numeric" },
  );
  const minDt = dateFromKey(minKey);
  const maxDt = dateFromKey(maxKey);
  const canPrev =
    view.year > minDt.getFullYear() ||
    (view.year === minDt.getFullYear() && view.month > minDt.getMonth());
  const canNext =
    view.year < maxDt.getFullYear() ||
    (view.year === maxDt.getFullYear() && view.month < maxDt.getMonth());
  const prevMonth = () =>
    setView((v) => {
      const m = v.month === 0 ? 11 : v.month - 1;
      const y = v.month === 0 ? v.year - 1 : v.year;
      return { year: y, month: m };
    });
  const nextMonth = () =>
    setView((v) => {
      const m = v.month === 11 ? 0 : v.month + 1;
      const y = v.month === 11 ? v.year + 1 : v.year;
      return { year: y, month: m };
    });

  const navBtnClass =
    "inline-flex items-center justify-center w-[32px] h-[32px] rounded-lg border border-[var(--m-border)] text-[var(--m-ink)] hover:border-[var(--m-accent)] hover:bg-[var(--m-accent-weak)] disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer";

  return (
    <div className="rounded-2xl border border-[var(--m-border)] bg-[#f8fafd] p-3 lg:p-4">
      <div className="flex items-center justify-between mb-3">
        <button
          type="button"
          onClick={prevMonth}
          disabled={!canPrev}
          aria-label={t({ en: "Previous month", nl: "Vorige maand" })}
          className={navBtnClass}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <div className="font-sans font-semibold text-[14.5px] text-[var(--m-ink)]">
          {monthLabel}
        </div>
        <button
          type="button"
          onClick={nextMonth}
          disabled={!canNext}
          aria-label={t({ en: "Next month", nl: "Volgende maand" })}
          className={navBtnClass}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 6l6 6-6 6" />
          </svg>
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 mb-1">
        {(locale === "nl"
          ? ["Z", "M", "D", "W", "D", "V", "Z"]
          : ["S", "M", "T", "W", "T", "F", "S"]
        ).map((d, i) => (
          <div
            key={i}
            className="text-center font-sans text-[10.5px] uppercase tracking-[1px] text-[var(--m-fg-subtle)] py-1"
          >
            {d}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {cells.map((cell, i) => {
          if (!cell.key || !cell.day) return <div key={i} className="h-9" />;
          const available = availableDateSet.has(cell.key);
          const inRange = cell.key >= minKey && cell.key <= maxKey;
          const active = selectedDate === cell.key;
          const isToday = cell.key === todayKey;
          const disabled = !available || !inRange;
          return (
            <button
              key={i}
              type="button"
              disabled={disabled}
              onClick={() => !disabled && onSelectDate(cell.key!)}
              className={
                "relative h-9 rounded-lg font-sans text-[13px] transition-all " +
                (active
                  ? "bg-[var(--m-accent)] text-white font-semibold shadow-[0_8px_20px_-10px_rgba(37,99,235,0.5)] cursor-pointer"
                  : available && inRange
                    ? "bg-white text-[var(--m-ink)] hover:bg-[var(--m-accent-weak)] hover:text-[var(--m-accent)] font-medium cursor-pointer"
                    : "text-[var(--m-border)] cursor-not-allowed")
              }
            >
              <span>{cell.day}</span>
              {!active && available && inRange && (
                <span
                  aria-hidden
                  className="absolute left-1/2 -translate-x-1/2 bottom-[3px] w-[3px] h-[3px] rounded-full bg-[var(--m-accent)]"
                />
              )}
              {!active && isToday && (
                <span
                  aria-hidden
                  className="absolute inset-[2px] rounded-lg ring-1 ring-[var(--m-accent)] pointer-events-none"
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ── STEP 3: DETAILS ── */
function DetailsStep({
  service,
  slot,
  name,
  setName,
  email,
  setEmail,
  phone,
  setPhone,
  notes,
  setNotes,
  onBack,
  onSubmit,
  submitting,
  error,
}: {
  service: Service | null;
  slot: Slot | null;
  name: string;
  setName: (v: string) => void;
  email: string;
  setEmail: (v: string) => void;
  phone: string;
  setPhone: (v: string) => void;
  notes: string;
  setNotes: (v: string) => void;
  onBack: () => void;
  onSubmit: () => void;
  submitting: boolean;
  error: string | null;
}) {
  const [fieldErrors, setFieldErrors] = useState({ phone: "", email: "" });

  const validate = (fieldName: string, value: string) => {
    let err = "";
    if (fieldName === "phone" && value) {
      if (value === "+") return true;
      if (!/^\+?[0-9\s\-()]{7,20}$/.test(value))
        err = t({
          en: "Please enter a valid international phone number",
          nl: "Voer een geldig internationaal telefoonnummer in",
        });
    }
    if (fieldName === "email" && value) {
      if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value))
        err = t({
          en: "Please enter a valid email address",
          nl: "Voer een geldig e-mailadres in",
        });
    }
    setFieldErrors((prev) => ({ ...prev, [fieldName]: err }));
    return err === "";
  };

  const canSubmit =
    name.trim().length > 0 &&
    !!slot &&
    !submitting &&
    !fieldErrors.phone &&
    !fieldErrors.email;
  const dateLabel = slot
    ? (() => {
        const key =
          (slot.startsAtLocal && slot.startsAtLocal.split("T")[0]) ||
          slot.startsAt.split("T")[0];
        return formatDateShort(key);
      })()
    : "";
  const timeLabel = slot ? formatTimeFromStartsAt(slot) : "";

  const inputClass = (hasError: boolean) =>
    "w-full h-[44px] px-3.5 rounded-xl border font-sans text-[14px] text-[var(--m-ink)] bg-white focus:outline-none focus:ring-2 transition-all placeholder:text-[var(--m-fg-subtle)] " +
    (hasError
      ? "border-red-400 focus:border-red-400 focus:ring-red-400/20"
      : "border-[var(--m-border)] focus:border-[var(--m-accent)] focus:ring-[var(--m-accent)]/15");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (canSubmit) onSubmit();
      }}
      className="flex flex-col gap-4 flex-1"
    >
      {service && slot && (
        <div className="flex items-center gap-2.5 rounded-xl bg-[var(--m-accent-weak)] border border-[var(--m-accent)]/20 px-3 py-2.5">
          <span className="inline-flex items-center justify-center w-[32px] h-[32px] rounded-lg text-[var(--m-accent)] shrink-0 bg-[var(--m-accent)]">
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <path d="M16 2v4M8 2v4M3 10h18" />
            </svg>
          </span>
          <div className="min-w-0 flex-1">
            <div className="font-sans font-medium text-[13px] text-[var(--m-ink)] truncate">
              {service.name}
            </div>
            <div className="font-sans text-[12px] text-[var(--m-fg-subtle)] truncate">
              {dateLabel} · {timeLabel} · {service.durationMinutes}{" "}
              {t({ en: "min", nl: "min" })}
            </div>
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <label className="font-sans font-medium text-[12.5px] text-[var(--m-fg-muted)]">
            {t({ en: "Your name *", nl: "Jouw naam *" })}
          </label>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            className={inputClass(false)}
          />
        </div>
        <div className="space-y-1.5">
          <label className="font-sans font-medium text-[12.5px] text-[var(--m-fg-muted)]">
            {t({ en: "Phone", nl: "Telefoon" })}
          </label>
          <input
            type="tel"
            placeholder="+31 6 1234 5678"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              validate("phone", e.target.value);
            }}
            autoComplete="tel"
            className={inputClass(!!fieldErrors.phone)}
          />
          {fieldErrors.phone && (
            <p className="text-red-500 text-[10px] font-medium ml-1">
              {fieldErrors.phone}
            </p>
          )}
        </div>
        <div className="lg:col-span-2 space-y-1.5">
          <label className="font-sans font-medium text-[12.5px] text-[var(--m-fg-muted)]">
            {t({ en: "Email", nl: "E-mail" })}
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              validate("email", e.target.value);
            }}
            autoComplete="email"
            className={inputClass(!!fieldErrors.email)}
          />
          {fieldErrors.email && (
            <p className="text-red-500 text-[10px] font-medium ml-1">
              {fieldErrors.email}
            </p>
          )}
        </div>
        <div className="lg:col-span-2 space-y-1.5">
          <label className="font-sans font-medium text-[12.5px] text-[var(--m-fg-muted)]">
            {t({ en: "Message (optional)", nl: "Bericht (optioneel)" })}
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            className="w-full px-3.5 py-3 rounded-xl border border-[var(--m-border)] bg-white font-sans text-[14px] text-[var(--m-ink)] focus:outline-none focus:border-[var(--m-accent)] focus:ring-2 focus:ring-[var(--m-accent)]/15 transition-all resize-none"
          />
        </div>
      </div>
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[13px] text-red-700">
          {error}
        </div>
      )}
      <div className="flex items-center justify-between gap-3 pt-1 pb-2 mt-auto">
        <button
          type="button"
          onClick={onBack}
          disabled={submitting}
          className="font-sans text-[13px] font-medium text-[var(--m-fg-muted)] border border-[var(--m-border)] px-4 py-2 rounded-[10px] hover:border-[var(--m-accent)] hover:text-[var(--m-accent)] transition-colors cursor-pointer disabled:opacity-50"
        >
          {t({ en: "← Back", nl: "← Terug" })}
        </button>
        <button
          type="submit"
          disabled={!canSubmit}
          className="font-sans font-semibold text-[14px] text-white py-2.5 px-6 rounded-[10px] bg-[var(--m-accent)] hover:bg-[var(--m-accent-hover)] transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed shadow-[var(--m-shadow-btn)]"
        >
          {submitting ? (
            <span className="inline-flex items-center gap-2">
              <Spinner small />
              {t({ en: "Booking…", nl: "Boeken…" })}
            </span>
          ) : (
            t({ en: "Confirm booking", nl: "Boeking bevestigen" })
          )}
        </button>
      </div>
    </form>
  );
}

/* ── SUCCESS ── */
function SuccessStep({
  service,
  slot,
  name,
  onClose,
}: {
  service: Service | null;
  slot: Slot | null;
  name: string;
  onClose: () => void;
}) {
  const dateLabel = slot
    ? (() => {
        const key =
          (slot.startsAtLocal && slot.startsAtLocal.split("T")[0]) ||
          slot.startsAt.split("T")[0];
        return formatDateLong(key);
      })()
    : "";
  const timeLabel = slot ? formatTimeFromStartsAt(slot) : "";

  return (
    <div className="flex flex-col items-center justify-center text-center gap-4 py-2 flex-1">
      <motion.div
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 18,
          delay: 0.05,
        }}
        className="w-[68px] h-[68px] rounded-full flex items-center justify-center text-white bg-[var(--m-accent)] shadow-[0_18px_40px_-12px_rgba(37,99,235,0.45)]"
      >
        <motion.svg
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.55, delay: 0.18, ease: "easeOut" }}
          width="34"
          height="34"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <motion.path d="M5 13l4 4L19 7" />
        </motion.svg>
      </motion.div>

      <div className="flex flex-col gap-1.5">
        <h3 className="font-sans font-semibold text-[22px] leading-[1.2] text-[var(--m-ink)]">
          {t({ en: "Thanks", nl: "Bedankt" })}
          {name ? `, ${name.split(" ")[0]}` : ""}!
        </h3>
        <p className="font-sans text-[14px] leading-[1.5] text-[var(--m-fg-muted)] max-w-[420px]">
          {t({
            en: "Your booking is in. We've sent a confirmation and our team will be in touch shortly.",
            nl: "Je boeking is binnen. We hebben een bevestiging gestuurd en ons team neemt zo snel mogelijk contact met je op.",
          })}
        </p>
      </div>

      {(service || slot) && (
        <div className="w-full max-w-[420px] mt-2 rounded-2xl border border-[var(--m-border)] bg-[#f8fafd] px-4 py-3 text-left">
          <div className="grid grid-cols-2 gap-2 text-[13px]">
            {service?.name && (
              <SummaryRow
                label={t({ en: "Service", nl: "Dienst" })}
                value={service.name}
              />
            )}
            {dateLabel && (
              <SummaryRow
                label={t({ en: "Date", nl: "Datum" })}
                value={dateLabel}
              />
            )}
            {timeLabel && (
              <SummaryRow
                label={t({ en: "Time", nl: "Tijd" })}
                value={timeLabel}
              />
            )}
            {service?.durationMinutes && (
              <SummaryRow
                label={t({ en: "Duration", nl: "Duur" })}
                value={`${service.durationMinutes} ${t({ en: "min", nl: "min" })}`}
              />
            )}
          </div>
        </div>
      )}

      <button
        onClick={onClose}
        className="mt-3 font-sans font-semibold text-[14px] text-white py-2.5 px-8 rounded-full bg-[var(--m-accent)] hover:bg-[var(--m-accent-hover)] transition-colors cursor-pointer shadow-[var(--m-shadow-btn)]"
      >
        {t({ en: "Done", nl: "Klaar" })}
      </button>
    </div>
  );
}

/* ── PRIMITIVES ── */
function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col">
      <span className="font-sans text-[11px] uppercase tracking-[1px] text-slate-500">
        {label}
      </span>
      <span className="font-sans font-medium text-[13.5px] text-[var(--m-ink)] mt-0.5">
        {value}
      </span>
    </div>
  );
}

function Spinner({ small = false }: { small?: boolean }) {
  const size = small ? 16 : 28;
  return (
    <span
      className="inline-block animate-spin rounded-full border-[2.5px]"
      style={{
        width: size,
        height: size,
        borderColor: "var(--m-border)",
        borderTopColor: "var(--m-accent)",
      }}
      aria-label="Loading"
    />
  );
}
