"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import BookingForm from "./BookingForm";
import LeadForm from "./LeadForm";

export type GlobalModalType = "booking" | "contact";

interface ModalContextValue {
  activeModal: GlobalModalType | null;
  openModal: (modal: GlobalModalType) => void;
  closeModal: () => void;
  openBooking: () => void;
  openContact: () => void;
}

const ModalContext = createContext<ModalContextValue | null>(null);

const BOOKING_TRIGGER_LABELS = [
  "request a quote",
  "request quote",
  "request book appoinment",
  "request book appointment",
  "book appointment",
  "book an appointment",
  "book a service",
  "reserve your chair",
];

const CONTACT_TRIGGER_LABELS = ["contact", "contact us"];

function normalizeTriggerLabel(label: string) {
  return label
    .replace(/\s+/g, " ")
    .replace(/[^\w\s]/g, "")
    .trim()
    .toLowerCase();
}

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within ModalProvider");
  }
  return context;
}

function getModalTargetFromTrigger(element: HTMLElement) {
  const explicitTarget = element.closest<HTMLElement>("[data-modal-target]");
  const target = explicitTarget?.dataset.modalTarget?.toLowerCase();

  if (target === "booking" || target === "quote") return "booking";
  if (target === "contact" || target === "lead") return "contact";

  const trigger = element.closest<HTMLElement>("a, button");
  const label = normalizeTriggerLabel(trigger?.textContent ?? "");

  if (!label) return null;
  if (BOOKING_TRIGGER_LABELS.some((triggerLabel) => label.includes(triggerLabel))) {
    return "booking";
  }
  if (CONTACT_TRIGGER_LABELS.some((triggerLabel) => label === triggerLabel)) {
    return "contact";
  }

  return null;
}

export function ModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeModal, setActiveModal] = useState<GlobalModalType | null>(null);

  const openModal = useCallback((modal: GlobalModalType) => {
    setActiveModal(modal);
  }, []);

  const closeModal = useCallback(() => {
    setActiveModal(null);
  }, []);

  const openBooking = useCallback(() => openModal("booking"), [openModal]);
  const openContact = useCallback(() => openModal("contact"), [openModal]);

  useEffect(() => {
    const handleLegacyBookingEvent = () => openBooking();
    const handleLegacyLeadEvent = () => openContact();

    window.addEventListener("open-booking-form", handleLegacyBookingEvent);
    window.addEventListener("open-lead-form", handleLegacyLeadEvent);

    return () => {
      window.removeEventListener("open-booking-form", handleLegacyBookingEvent);
      window.removeEventListener("open-lead-form", handleLegacyLeadEvent);
    };
  }, [openBooking, openContact]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (event.defaultPrevented) return;
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey) {
        return;
      }

      const target = event.target;
      if (!(target instanceof HTMLElement)) return;

      const modalTarget = getModalTargetFromTrigger(target);
      if (!modalTarget) return;

      event.preventDefault();
      openModal(modalTarget);
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [openModal]);

  const value = useMemo(
    () => ({
      activeModal,
      openModal,
      closeModal,
      openBooking,
      openContact,
    }),
    [activeModal, openModal, closeModal, openBooking, openContact],
  );

  return (
    <ModalContext.Provider value={value}>
      {children}
      <BookingForm
        isOpen={activeModal === "booking"}
        onClose={closeModal}
      />
      <LeadForm isOpen={activeModal === "contact"} onClose={closeModal} />
    </ModalContext.Provider>
  );
}

export const ModalTriggerProvider = ModalProvider;
