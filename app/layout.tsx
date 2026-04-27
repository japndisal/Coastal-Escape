import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import { Climate_Crisis, Instrument_Serif, Montserrat } from 'next/font/google';

const climateCrisis = Climate_Crisis({
  subsets: ['latin'],
  variable: '--font-climate-crisis',
  display: 'swap',
});

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-instrument-serif',
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
});

export const metadata = {
  title: 'Coastal Escape — Curated Travel Packages',
  description: "Discover handpicked travel packages to the world's most breathtaking destinations.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={`${climateCrisis.variable} ${instrumentSerif.variable} ${montserrat.variable}`}
      >
        <body className="min-h-screen flex flex-col bg-sand text-slate antialiased">
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
