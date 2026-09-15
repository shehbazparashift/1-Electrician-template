import type { Metadata } from "next";
import HomeContent from "@/components/HomeContent";

export const metadata: Metadata = {
  title: "Tij | Certified Electricians in the Netherlands",
  description:
    "Smart, reliable electrical services for every Dutch home — emergency repairs, installations and inspections from certified electricians.",
};

export default function Page() {
  return <HomeContent />;
}
