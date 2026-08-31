"use client";

import CookieConsent from "./CookieConsent";
import StickyActions from "./StickyActions";

export default function GlobalActions() {
  return (
    <>
      <StickyActions />
      <CookieConsent />
    </>
  );
}
