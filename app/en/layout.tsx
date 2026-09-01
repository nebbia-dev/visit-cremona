import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Menu from "@/app/_components/Menu";
import Footer from "@/app/_components/Footer";
import Iubenda from "@/app/_components/Iubenda";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Visit Cremona",
  description: "Visit Cremona",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    let content, contactsContent;
    try {
        const data = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/link?locale=en',
            { next: { revalidate: 1000 }});
        content = await data.json();

        const contactsData = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/contact?locale=en',
            { next: { revalidate: 1000 }});
        contactsContent = await contactsData.json();
    } catch(error) {
        console.log(error);
    }

  return (
    <html lang="it">
        <head>
            <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
                  integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
                  crossOrigin=""/>
            <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1"/>
        </head>
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
            <Menu links={content.data}/>
            <main id="main">
                {children}
            </main>
            <Footer links={content.data} contacts={contactsContent.data}/>
            <Iubenda/>
            <Script src="https://cdn.jsdelivr.net/npm/sienna-accessibility@latest/dist/sienna-accessibility.umd.js" defer />
        </body>
    </html>
  );
}
