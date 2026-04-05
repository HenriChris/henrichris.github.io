import type { Metadata } from 'next';
import { Instrument_Serif, DM_Mono, Figtree } from 'next/font/google';
import { ThemeProvider } from '@/context/ThemeContext';
import { LangProvider } from '@/context/LangContext';
import './globals.css';

const instrumentSerif = Instrument_Serif({
  variable: '--font-instrument-serif',
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
});

const dmMono = DM_Mono({
  variable: '--font-dm-mono',
  subsets: ['latin'],
  weight: ['300', '400', '500'],
});

const figtree = Figtree({
  variable: '--font-figtree',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
});

export const metadata: Metadata = {
  title: {
    template: '%s | Portfolio',
    default: 'Portfolio & Resume',
  },
  description: 'Professional portfolio and resume of a Software Engineer.',
  openGraph: {
    title: 'Portfolio & Resume',
    description: 'Professional portfolio and resume of a Software Engineer.',
    url: 'https://henrichris.github.io',
    siteName: 'Portfolio',
    locale: 'en_US',
    type: 'website',
  },
};

// Script that runs synchronously before any paint to apply the correct theme class.
// This prevents the white flash when the user's stored/preferred theme is dark.
const themeScript = `
(function () {
  try {
    var saved = localStorage.getItem('theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var theme = saved ? saved : (prefersDark ? 'dark' : 'light');
    if (theme === 'dark') document.documentElement.classList.add('dark');
  } catch (_) {}
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // Default to 'dark' so SSR HTML matches the most common initial state.
    // The inline script corrects to 'light' before paint if needed.
    <html lang="en" className={`dark ${instrumentSerif.variable} ${dmMono.variable} ${figtree.variable}`}>
      <head>
        {/* eslint-disable-next-line react/no-danger */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <ThemeProvider>
          <LangProvider>
            {children}
          </LangProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
