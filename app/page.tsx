"use client";

import { useEffect, useState } from "react";
import {
  HeroSection,
  AboutSection,
  TeamSection,
  TemplatesSection,
  FooterSection,
} from "./components";

// Template data
const TEMPLATES = [
  {
    id: "birthday",
    title: "Birthday Template",
    category: "Personalize",
    price: "Free",
    code: "BDAY",
    image: "/cards/image1.jpg",
  },
  {
    id: "kwibuka",
    title: "Kwibuka Template",
    category: "Commemorate",
    price: "Free",
    code: "KWBK",
    image: "/cards/image2.jpg",
  },
  {
    id: "event",
    title: "Event Template",
    category: "Celebrate",
    price: "Free",
    code: "EVNT",
    image: "/cards/image3.jpg",
  },
];

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check localStorage for saved preference on initial render
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") === "dark";
    }
    return false;
  });

  useEffect(() => {
    // Save preference to localStorage when it changes
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  return (
    <div
      className={`flex flex-col min-h-screen transition-colors duration-300 ${isDarkMode ? "bg-[#0d1117]" : "bg-[#f8f8f8]"}`}
    >
      {/* Hero Section */}
      <HeroSection isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

      {/* About Section */}
      <AboutSection />

      {/* Team Section */}
      <TeamSection isDarkMode={isDarkMode} />

      {/* Templates Section */}
      <TemplatesSection isDarkMode={isDarkMode} templates={TEMPLATES} />

      {/* Footer Section */}
      <FooterSection />
    </div>
  );
}
