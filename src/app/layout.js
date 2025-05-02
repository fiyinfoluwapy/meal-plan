import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "./components/navigation"; 
import HeaderSection from "./components/headersection";
import ServicesCarousel from "./components/servicescarousel";
import GrowingTogetherSection from "./components/growtogether";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Meal Cart",
  description: "meal planning app that helps users search for recipes",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Navigation />
        <HeaderSection />
        <ServicesCarousel />
        <GrowingTogetherSection />
        {children}
      </body>
    </html>
  );
}
