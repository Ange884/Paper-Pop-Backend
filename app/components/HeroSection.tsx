"use client";

import Link from "next/link";
import {
  Moon,
  Sun,
  Check,
  Clock,
  Mail,
  Calendar,
  Pin,
  MessageSquare,
} from "lucide-react";

interface HeroSectionProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export function HeroSection({ isDarkMode, toggleDarkMode }: HeroSectionProps) {
  return (
    <section
      className={`relative w-full min-h-screen flex flex-col overflow-hidden transition-colors duration-300 ${isDarkMode ? "bg-[#0d1117]" : "dotted-bg"}`}
    >
      {/* Navigation Bar */}
      <nav className="flex items-center justify-between px-8 md:px-12 py-8 z-20 w-full max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="grid grid-cols-2 gap-1 w-6 h-6">
            <div className="w-2.5 h-2.5 bg-[#1C2541] rounded-full"></div>
            <div className="w-2.5 h-2.5 bg-black rounded-full"></div>
            <div className="w-2.5 h-2.5 bg-black rounded-full"></div>
            <div className="w-2.5 h-2.5 bg-black rounded-full"></div>
          </div>
          <span
            className={`font-bold text-xl tracking-tight uppercase transition-colors ${isDarkMode ? "text-white" : "text-gray-900"}`}
          >
            ImenaPop
          </span>
        </div>

        <div
          className={`hidden md:flex items-center gap-10 text-sm font-semibold uppercase tracking-wider transition-colors ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}
        >
          <Link
            href="#"
            className="hover:text-black transition-colors underline-animate"
          >
            Home
          </Link>
          <Link
            href="#"
            className="hover:text-black transition-colors underline-animate"
          >
            About
          </Link>
          <Link
            href="#"
            className="hover:text-black transition-colors underline-animate"
          >
            Testimonials
          </Link>
          <Link
            href="#"
            className="hover:text-black transition-colors underline-animate"
          >
            Templates
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-full transition-all hover:scale-110 ${isDarkMode ? "bg-yellow-400 text-gray-900" : "bg-gray-100 text-gray-600"}`}
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>
          <button
            className={`text-sm font-semibold transition-colors uppercase tracking-wider ${isDarkMode ? "text-gray-300 hover:text-white" : "text-gray-500 hover:text-black"}`}
          >
            Sign in
          </button>
          <button
            className={`px-6 py-3 border rounded-xl text-sm font-semibold transition-colors shadow-sm uppercase tracking-wider ${isDarkMode ? "bg-gray-800 border-gray-700 text-white hover:bg-gray-700" : "bg-white border-gray-200 hover:bg-gray-50"}`}
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Content Area */}
      <div className="flex-1 flex flex-col items-center justify-center text-center px-4 relative max-w-7xl mx-auto w-full py-16">
        <div className="mb-8 w-20 h-20 bg-white rounded-[2rem] shadow-2xl border border-gray-100 flex items-center justify-center animate-float z-10">
          <div className="grid grid-cols-2 gap-2 w-10 h-10">
            <div className="w-4 h-4 bg-[#1C2541] rounded-full"></div>
            <div className="w-4 h-4 bg-gray-600 rounded-full"></div>
            <div className="w-4 h-4 bg-gray-800 rounded-full"></div>
            <div className="w-4 h-4 bg-gray-700 rounded-full"></div>
          </div>
        </div>

        <h1
          className={`text-3xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-4 leading-tight animate-slide-up transition-colors ${isDarkMode ? "text-white" : "text-gray-900"}`}
        >
          Fill. Click. Download.
        </h1>
        <h2
          className={`text-3xl sm:text-5xl md:text-7xl font-semibold tracking-tight mb-10 leading-tight animate-slide-up stagger-1 transition-colors ${isDarkMode ? "text-gray-500" : "text-gray-400"}`}
        >
          all in one place
        </h2>

        <p
          className={`mb-10 max-w-lg mx-auto font-medium text-lg leading-relaxed animate-slide-up stagger-2 transition-colors ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}
        >
          No design skills. No formatting stress. Just fill, click, download.
        </p>

        <button className="px-8 py-4 bg-[#1C2541] text-white rounded-2xl font-bold text-lg shadow-2xl shadow-gray-300 hover:bg-[#0f1629] transition-all hover:scale-105 active:scale-95 z-10 uppercase tracking-wide btn-animate animate-slide-up stagger-3">
          Get free demo
        </button>

        {/* --- Floating Elements --- */}

        {/* Top Left: Yellow Sticky Note */}
        <div className="absolute top-[10%] left-[2%] w-48 h-48 bg-yellow-100 p-6 shadow-2xl -rotate-3 animate-float-side z-0 hidden lg:block text-left border-t-4 border-yellow-200">
          <Pin className="absolute top-2 right-2 w-5 h-5 text-red-500 rotate-12" />
          <p className="text-xs font-mono text-gray-800 leading-relaxed uppercase">
            Take notes to keep track of crucial details, and accomplish more
            tasks with ease.
          </p>
        </div>

        {/* Checkbox Card */}
        <div className="absolute top-[35%] left-[8%] w-16 h-16 bg-white rounded-2xl shadow-2xl border border-gray-100 flex items-center justify-center animate-float-delayed z-10 hidden lg:block">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg">
            <Check className="text-white w-6 h-6" strokeWidth={3} />
          </div>
        </div>

        {/* Top Right: Reminders Card */}
        <div className="absolute top-[10%] right-[2%] w-64 h-auto bg-white/70 backdrop-blur-xl rounded-[2rem] p-6 shadow-2xl border border-white/50 animate-float-slow z-0 hidden xl:block text-left">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-bold text-gray-800 uppercase tracking-tight">
              Reminders
            </span>
            <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center shadow-inner border border-gray-100">
              <Clock className="w-4 h-4 text-gray-400" />
            </div>
          </div>
          <div className="bg-gray-50/80 rounded-2xl p-4 border border-gray-100">
            <div className="text-xs font-bold text-gray-800 mb-1">
              Today&apos;s Meeting
            </div>
            <div className="text-[10px] text-gray-500 mb-3 tracking-wide font-medium">
              Call with marketing team
            </div>
            <div className="flex items-center gap-2 bg-blue-50 w-fit px-3 py-1.5 rounded-lg border border-blue-100">
              <Clock className="w-3 h-3 text-blue-400" />
              <span className="text-[10px] font-bold text-blue-500 uppercase">
                12:00 - 13:45
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Left: Today's Tasks */}
        <div className="absolute bottom-[15%] left-[2%] w-72 bg-white/90 backdrop-blur-xl rounded-[2rem] p-6 shadow-2xl border border-white/50 animate-float-slow hidden xl:block text-left scale-90">
          <h3 className="text-sm font-bold text-gray-800 mb-4 uppercase tracking-tight">
            Today&apos;s tasks
          </h3>

          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-sm bg-orange-500 shadow-sm" />
                  <span className="text-[10px] font-bold text-gray-700 tracking-wide uppercase">
                    New ideas for campaign
                  </span>
                </div>
                <span className="text-[10px] font-bold text-gray-400 uppercase">
                  60%
                </span>
              </div>
              <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="bg-blue-400 h-full w-[60%]" />
              </div>
              <span className="text-[10px] font-bold text-gray-400 uppercase">
                Sep 10
              </span>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-sm bg-green-500 shadow-sm" />
                  <span className="text-[10px] font-bold text-gray-700 tracking-wide uppercase">
                    Design PPT #4
                  </span>
                </div>
                <span className="text-[10px] font-bold text-gray-400 uppercase">
                  112%
                </span>
              </div>
              <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="bg-orange-400 h-full w-full shadow-inner" />
              </div>
              <span className="text-[10px] font-bold text-gray-400 uppercase">
                Sep 18
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Right: Integrations */}
        <div className="absolute bottom-[15%] right-[2%] w-72 bg-white/90 backdrop-blur-xl rounded-[2rem] p-6 shadow-2xl border border-white/50 animate-float-side hidden xl:block text-left scale-90">
          <h3 className="text-sm font-bold text-gray-800 mb-4 uppercase tracking-tight">
            100+ Integrations
          </h3>
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-white shadow-xl border border-gray-50 flex items-center justify-center hover:scale-110 transition-transform cursor-pointer">
              <Mail className="w-7 h-7 text-red-500" strokeWidth={3} />
            </div>
            <div className="w-14 h-14 rounded-2xl bg-white shadow-xl border border-gray-50 flex items-center justify-center hover:scale-110 transition-transform cursor-pointer">
              <MessageSquare
                className="w-7 h-7 text-green-500"
                fill="currentColor"
              />
            </div>
            <div className="w-14 h-14 rounded-2xl bg-white shadow-xl border border-gray-50 flex items-center justify-center hover:scale-110 transition-transform cursor-pointer">
              <Calendar className="w-7 h-7 text-blue-500" strokeWidth={3} />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="pb-10 flex flex-col items-center gap-3 animate-bounce text-gray-400">
        <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
          Scroll to explore
        </span>
        <div className="w-0.5 h-12 bg-gradient-to-b from-[#1C2541] to-transparent rounded-full" />
      </div>
    </section>
  );
}
