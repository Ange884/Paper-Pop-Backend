"use client";

import { useState, useRef, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  User,
  MessageSquare,
  Image as ImageIcon,
  Lock,
  ChevronRight,
  Info,
  Download,
  Loader2,
  Calendar as CalendarIcon,
  MapPin,
  Award,
  Users,
} from "lucide-react";

type Step = {
  category: string;
  question: string;
  instruction: string;
  type: "text" | "textarea" | "file" | "time" | "date" | "number";
  placeholder?: string;
  field: string;
  icon: React.ReactNode;
};

const TEMPLATE_CONFIGS: Record<string, { title: string; steps: Step[] }> = {
  birthday: {
    title: "Birthday Template",
    steps: [
      {
        category: "Personalize",
        question: "Who are we celebrating?",
        instruction:
          "Enter the recipient's name as it should appear on the card.",
        type: "text",
        placeholder: "Recipient's Name",
        field: "name",
        icon: <User className="w-5 h-5" />,
      },
      {
        category: "Personalize",
        question: "Write a heartfelt message",
        instruction: "Choose your words carefully for their special day.",
        type: "textarea",
        placeholder: "Your birthday message...",
        field: "message",
        icon: <MessageSquare className="w-5 h-5" />,
      },
      {
        category: "Personalize",
        question: "Add a special photo",
        instruction: "A picture is worth a thousand heartbeats.",
        type: "file",
        field: "image",
        icon: <ImageIcon className="w-5 h-5" />,
      },
    ],
  },
  kwibuka: {
    title: "Kwibuka Template",
    steps: [
      {
        category: "Commemorate",
        question: "What is the number of years?",
        instruction: "Which year of commemoration is this? (e.g., 31)",
        type: "number",
        placeholder: "Enter number (e.g., 31)",
        field: "years",
        icon: <Award className="w-5 h-5" />,
      },
      {
        category: "Commemorate",
        question: "Date of commemoration",
        instruction: "Enter the date for the event (e.g., 5 May 2026).",
        type: "text",
        placeholder: "e.g., 5 May 2026",
        field: "date",
        icon: <CalendarIcon className="w-5 h-5" />,
      },
      {
        category: "Commemorate",
        question: "Where is the venue?",
        instruction: "Enter the venue or memorial site address.",
        type: "text",
        placeholder: "e.g., Nyabihu Genocide Memorial Site",
        field: "venue",
        icon: <MapPin className="w-5 h-5" />,
      },
      {
        category: "Message",
        question: "Message of Hope",
        instruction: "Enter a brief message to be displayed at the bottom.",
        type: "textarea",
        placeholder: "Your message of hope...",
        field: "messageOfHope",
        icon: <MessageSquare className="w-5 h-5" />,
      },
    ],
  },
  event: {
    title: "Event Template",
    steps: [
      {
        category: "Celebrate",
        question: "What is the date of the event?",
        instruction: "Enter the date of the celebration (e.g. 12th June 2026).",
        type: "text",
        placeholder: "Event Date",
        field: "eventDate",
        icon: <CalendarIcon className="w-5 h-5" />,
      },
      {
        category: "Celebrate",
        question: "What day is the event?",
        instruction: "Enter the day of the week (e.g. Friday).",
        type: "text",
        placeholder: "Event Day",
        field: "eventDay",
        icon: <CalendarIcon className="w-5 h-5" />,
      },
      {
        category: "Celebrate",
        question: "The hosting family",
        instruction: "Who is hosting this special event?",
        type: "text",
        placeholder: "Family name or host",
        field: "hostingFamily",
        icon: <Users className="w-5 h-5" />,
      },
      {
        category: "Location",
        question: "Where is the event?",
        instruction: "Enter the location or venue address.",
        type: "text",
        placeholder: "Event Location",
        field: "location",
        icon: <MapPin className="w-5 h-5" />,
      },
    ],
  },
};

function FormContent() {
  const searchParams = useSearchParams();
  const templateId = searchParams.get("template") || "birthday";
  const config = TEMPLATE_CONFIGS[templateId] || TEMPLATE_CONFIGS.birthday;
  const steps = config.steps;
  const TOTAL_STEPS = steps.length;

  const [currentStep, setCurrentStep] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const percentage = Math.round((currentStep / TOTAL_STEPS) * 100);
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNext = async () => {
    if (currentStep < TOTAL_STEPS) {
      setIsAnimating(true); 
      setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
        setIsAnimating(false);
      }, 400);
    } else {
      generatePdf();
    }
  };

  const generatePdf = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch("https://paper-pop-backend-mruc.onrender.com/generate-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, templateId }),
      });

      // if (response.ok) {
      //   const blob = await response.blob();
      //   const url = window.URL.createObjectURL(blob);
      //   setPdfUrl(url);
      // } else {
      //   console.error("Failed to generate PDF");
      // }
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const currentStepData = steps[currentStep - 1];

  return (
    <div className="flex min-h-screen bg-black font-sans text-gray-900 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-80 border-r border-gray-100 flex flex-col p-10 bg-[#fafafa] z-20">
        <div className="mb-16">
          <Link
            href="/"
            className="text-3xl font-bold text-[#1C2541] tracking-tight"
          >
            imenapop
          </Link>
        </div>

        {/* Progress Circle */}
        <div className="flex flex-col items-center mb-16 relative">
          <div className="relative w-40 h-40 flex items-center justify-center">
            <svg className="absolute inset-0 w-full h-full -rotate-90">
              <circle
                cx="80"
                cy="80"
                r={radius}
                stroke="#f1f3f5"
                strokeWidth="8"
                fill="none"
              />
              <circle
                cx="80"
                cy="80"
                r={radius}
                stroke="#3A506B"
                strokeWidth="8"
                fill="none"
                strokeDasharray={circumference}
                style={{
                  strokeDashoffset: offset,
                  transition:
                    "stroke-dashoffset 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
                strokeLinecap="round"
              />
            </svg>
            <div className="text-center z-10">
              <div className="text-4xl font-bold text-gray-800">
                {percentage}{" "}
                <span className="text-xl font-medium text-gray-400">%</span>
              </div>
              <div className="text-sm font-bold text-gray-300 mt-1 uppercase tracking-widest">
                {currentStep}/{TOTAL_STEPS}
              </div>
            </div>
          </div>
        </div>

        {/* Categories Dynamic */}
        <nav className="flex-1 flex flex-col gap-6">
          {steps.map((step, idx) => (
            <NavItem
              key={idx}
              active={currentStep === idx + 1}
              icon={step.icon}
              label={step.field.charAt(0).toUpperCase() + step.field.slice(1)}
            />
          ))}
        </nav>

        <div className="mt-auto pt-10 text-center">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-4 flex items-center justify-center">
            <Lock className="w-5 h-5 text-gray-200" />
          </div>
          <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest leading-loose">
            SECURE PDF GENERATION
          </p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative bg-white">
        <header className="flex items-center justify-between px-16 py-8 relative z-10">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-400 font-medium">
              Selected Template:
            </span>
            <span className="text-[#1C2541] font-bold uppercase tracking-wider">
              {config.title}
            </span>
            <Info className="w-4 h-4 text-gray-300 ml-1" />
          </div>
          <Link
            href="/"
            className="px-8 py-3 bg-white border border-gray-100 shadow-sm rounded-xl text-xs font-bold text-gray-400 hover:text-gray-900 transition-colors uppercase tracking-widest"
          >
            Change Template
          </Link>
        </header>

        <div className="flex-1 flex flex-col items-center justify-center p-16">
          <div
            className={`max-w-xl w-full text-center mb-16 transition-all duration-500 ${isAnimating ? "opacity-0 -translate-y-4" : "opacity-100 translate-y-0"}`}
          >
            <span className="text-[10px] font-bold text-gray-300 uppercase tracking-[0.3em] mb-4 block">
              {currentStepData.category} — Step {currentStep}
            </span>
            <h1 className="text-5xl font-bold text-gray-800 tracking-tight leading-tight mb-4">
              {currentStepData.question}
            </h1>
            <p className="text-gray-400 font-medium">
              {currentStepData.instruction}
            </p>
          </div>

          <div
            className={`max-w-2xl w-full mb-16 transition-all duration-500 delay-75 ${isAnimating ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"}`}
          >
            {(currentStepData.type === "text" ||
              currentStepData.type === "number") && (
              <input
                type={currentStepData.type}
                name={currentStepData.field}
                value={formData[currentStepData.field] || ""}
                onChange={handleInputChange}
                placeholder={currentStepData.placeholder}
                className="w-full bg-transparent border-b-2 border-gray-100 py-6 text-3xl font-medium outline-none placeholder:text-gray-200 focus:border-[#1C2541] transition-colors"
                autoFocus
              />
            )}
            {currentStepData.type === "textarea" && (
              <textarea
                name={currentStepData.field}
                value={formData[currentStepData.field] || ""}
                onChange={handleInputChange}
                placeholder={currentStepData.placeholder}
                rows={3}
                className="w-full bg-transparent border-b-2 border-gray-100 py-6 text-2xl font-medium outline-none placeholder:text-gray-200 focus:border-[#1C2541] transition-colors resize-none"
                autoFocus
              />
            )}
            {currentStepData.type === "file" && (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="w-full aspect-video border-2 border-dashed border-gray-200 rounded-3xl flex flex-col items-center justify-center cursor-pointer hover:border-[#1C2541] hover:bg-blue-50/30 transition-all group overflow-hidden"
              >
                {formData.image ? (
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <>
                    <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <ImageIcon className="w-8 h-8 text-gray-300 group-hover:text-[#3A506B] transition-colors" />
                    </div>
                    <span className="text-gray-400 font-bold uppercase tracking-widest text-xs">
                      Click to upload photo
                    </span>
                  </>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
            )}
          </div>

          <div className="w-full max-w-2xl flex justify-center flex-col items-center gap-8">
            {pdfUrl ? (
              <div className="flex flex-col items-center gap-6 animate-fade-in text-center">
                <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-2">
                  <Download className="w-10 h-10" />
                </div>
                <h2 className="text-3xl font-bold text-gray-800">
                  Your PDF is ready!
                </h2>
                <a
                  href={pdfUrl}
                  download={`${templateId}-invitation.pdf`}
                  className="flex items-center gap-4 px-12 py-5 bg-[#1C2541] rounded-xl text-white font-bold uppercase tracking-widest shadow-xl hover:scale-105 transition-all"
                >
                  Download Invitation
                </a>
              </div>
            ) : (
              <button
                onClick={handleNext}
                disabled={isGenerating || !formData[currentStepData.field]}
                className={`flex items-center gap-4 px-12 py-5 rounded-xl text-white font-bold uppercase tracking-widest transition-all ${
                  isGenerating
                    ? "bg-gray-200 cursor-not-allowed"
                    : "bg-[#1C2541] hover:shadow-xl hover:scale-105 active:scale-95"
                }`}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Generating...</span>
                  </>
                ) : (
                  <>
                    <span>
                      {currentStep === TOTAL_STEPS ? "Create PDF" : "Next"}
                    </span>
                    <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

function NavItem({
  active,
  icon,
  label,
}: {
  active: boolean;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <div
      className={`flex items-center gap-4 transition-all duration-500 ${active ? "opacity-100 translate-x-2" : "opacity-40"}`}
    >
      <div
        className={`w-10 h-10 rounded-xl bg-white shadow-sm border border-gray-100 flex items-center justify-center ${active ? "text-[#3A506B] border-blue-100" : "text-gray-400"}`}
      >
        {icon}
      </div>
      <span
        className={`font-bold tracking-wide ${active ? "text-[#3A506B]" : "text-gray-400"}`}
      >
        {label}
      </span>
    </div>
  );
}

export default function FormPage() {
  return (
    <Suspense fallback={<div>Loading form...</div>}>
      <FormContent />
    </Suspense>
  );
}
