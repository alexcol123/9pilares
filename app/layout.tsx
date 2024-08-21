import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/myComponents/navbar/Navbar";
import Providers from "./providers";
import { ClerkProvider } from '@clerk/nextjs'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "9Pilares | Figuras y Estatuas Exclusivas de Demon Slayer",
  description: "Explora nuestra selección exclusiva de figuras y estatuas de Demon Slayer. Encuentra tus personajes favoritos en piezas detalladas y de alta calidad para tu colección.",

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://turo-rentals.vercel.app/",
    title: "9Pilares | Figuras y Estatuas Exclusivas de anime Demon Slayer, dragon ball, one piece, naruto entre otros",
    description: "Explora nuestra selección estatuas Exclusivas de anime Demon Slayer, dragon ball, one piece, naruto entre otros. Encuentra tus personajes favoritos en piezas detalladas y de alta calidad para tu colección.",
    siteName: "9Pilares",
    images: [
      {
        url: "https://turo-rentals.vercel.app/corvette.jpg ",
        width: 1200,
        height: 630,
        alt: "9Pilares | Figuras y Estatuas Exclusivas de anime Demon Slayer, dragon ball, one piece, naruto entre otros",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang='en' suppressHydrationWarning>
        <body className={inter.className} >
          <Providers>
            <Navbar />
            <main className='container py-10 '>
              <div className="mt-20">{children}</div>
            </main>
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
