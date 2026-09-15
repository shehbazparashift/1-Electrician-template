import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import LenisProvider from "@/components/shared/LenisProvider";
import { ModalProvider } from "@/components/shared/ModalContext";
import { LanguageProvider } from "@/components/shared/LanguageProvider";
import GlobalActions from "@/components/shared/GlobalActions";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tij | Certified Electricians in the Netherlands",
  description:
    "Smart, reliable electrical services for every Dutch home — emergency repairs, installations and inspections from certified electricians.",
};
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="bg-background text-foreground">
        <LanguageProvider>
          <LenisProvider>
            <ModalProvider>
              {children}
              <GlobalActions />
            </ModalProvider>
          </LenisProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
// export default function RootLayout({ children }: LayoutProps<"/">) {
//   return (
//     <html
//       lang="en"
//       className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
//     >
//       <body className="min-h-full flex flex-col">
//         <LenisProvider>
//           <ModalProvider>{children}</ModalProvider>
//         </LenisProvider>
//       </body>
//     </html>
//   );
// }
