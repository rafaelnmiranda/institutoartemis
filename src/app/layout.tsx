import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import { getSiteContent } from "@/lib/content";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-sans",
});

export async function generateMetadata(): Promise<Metadata> {
  const content = await getSiteContent();
  return {
    title: {
      default: `${content.settings.siteName} — ${content.settings.tagline}`,
      template: `%s | ${content.settings.siteShortName}`,
    },
    description: content.home.heroDescription,
    metadataBase: new URL(`https://${content.settings.domain}`),
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const content = await getSiteContent();

  return (
    <html lang="pt-BR">
      <body className={`${cormorant.variable} ${dmSans.variable} antialiased`}>
        <Header menu={content.menu} settings={content.settings} />
        <main>{children}</main>
        <Footer settings={content.settings} menu={content.menu} />
      </body>
    </html>
  );
}
