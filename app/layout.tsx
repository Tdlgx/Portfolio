import type { Metadata } from "next";
import { Onest, Unbounded } from "next/font/google";
import { profile } from "@/data/profile";
import "./globals.css";

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin", "cyrillic"],
  weight: ["200", "300", "400"],
});

const onest = Onest({
  variable: "--font-onest",
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500"],
});

const content = profile.content[profile.defaultLang];

export const metadata: Metadata = {
  title: `${content.name} — Portfolio`,
  description: content.intro,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang={profile.defaultLang} className={`${unbounded.variable} ${onest.variable}`}>
      <body>{children}</body>
    </html>
  );
}
