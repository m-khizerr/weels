import { Geist, Geist_Mono } from "next/font/google";
import { Nunito } from 'next/font/google'

import "./globals.css";

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '600', '700'], 
  variable: '--font-nunito',
  display: 'swap',
})

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "weels - Find Your Perfect Used Car",
  description: "Find your perfect used car with weels. We believe everyone deserves a reliable vehicle at an affordable price.",
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/weelzLogo.png', type: 'image/png' }
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={nunito.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/weelzLogo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} ${nunito.variable} antialiased`}>

        {children}
      </body>
    </html>
  );
}