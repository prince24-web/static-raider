import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Static Raider - AI Web Scraping Tool",
  description:
    "Static Raider is an AI-powered web scraping tool that extracts website content and transforms it with intelligent summaries, explanations, and insights.",
    icons: {
    icon: "/spider.jpg", // path from public folder
  },
  keywords: [
    "web scraping",
    "AI tool",
    "Next.js",
    "Gemini AI",
    "content extraction",
    "summarizer",
    "Static Raider",
  ],
  authors: [{ name: "Prince Chidera" }],
  creator: "Static Raider",
  openGraph: {
    title: "Static Raider — AI Web Scraping Tool",
    description:
      "Scrape, analyze, and understand any webpage using AI. Powered by Gemini and built with Next.js.",
    url: "https://static-raider.vercel.app",
    siteName: "Static Raider",
    images: [
      {
        url: "/spider.jpg",
        width: 1200,
        height: 630,
        alt: "Static Raider – AI Web Scraping Tool",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Static Raider — AI Web Scraping Tool",
    description:
      "Extract and summarize any webpage with AI. Built with Next.js and Gemini.",
    images: ["/spider.jpg"],
    creator: "@Devprinze", // replace with your actual X handle
  },
  themeColor: "#ffffff",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
