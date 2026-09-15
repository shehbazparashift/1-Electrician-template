import type { Metadata } from "next";
import HomeContent from "@/components/HomeContent";

export const metadata: Metadata = {
  title: "Tij | Gecertificeerde Elektriciens in Nederland",
  description:
    "Slimme, betrouwbare elektrotechnische diensten voor elk Nederlands huishouden — spoedreparaties, installaties en inspecties door gecertificeerde elektriciens.",
};

export default function Page() {
  return <HomeContent />;
}
