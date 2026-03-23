import { ContactCard } from "@/components/ContactCard";
import {
  Bot,
  Briefcase,
  CreditCard,
  HelpCircle,
  Wrench,
} from "lucide-react";
import type { Department } from "@/types";

const departments: Department[] = [
  {
    icon: <Briefcase className="h-8 w-8 text-blue-500" />,
    title: "Sales Department",
    description: "For questions about pricing, plans, and partnerships.",
    color: "blue",
    buttonText: "Get in Touch",
    path: "/sales",
  },
  {
    icon: <Wrench className="h-8 w-8 text-green-500" />,
    title: "Technical Support",
    description: "Get help with technical issues, bugs, or product features.",
    color: "green",
    buttonText: "Get in Touch",
    path: "/support",
  },
  {
    icon: <Bot className="h-8 w-8 text-indigo-500" />,
    title: "Not Sure?",
    description: "Let our AI assistant guide you to the right department.",
    color: "indigo",
    buttonText: "Ask AI Assistant",
    path: "/ai-assistant",
  },
  {
    icon: <CreditCard className="h-8 w-8 text-purple-500" />,
    title: "Billing & Payments",
    description: "Manage your subscription, invoices, and payment details.",
    color: "purple",
    buttonText: "Get in Touch",
    path: "/billing",
  },
  {
    icon: <HelpCircle className="h-8 w-8 text-yellow-500" />,
    title: "General Inquiry",
    description: "For all other questions and general information.",
    color: "yellow",
    buttonText: "Get in Touch",
    path: "/general",
  },
];

export default function HomePage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gray-100 p-4 text-gray-800 sm:p-6 lg:p-8">
      <div className="absolute left-0 top-0 h-72 w-72 animate-blob rounded-full bg-purple-300 opacity-70 blur-xl" />
      <div className="animation-delay-2000 absolute right-0 top-0 h-72 w-72 animate-blob rounded-full bg-yellow-300 opacity-70 blur-xl" />
      <div className="animation-delay-4000 absolute bottom-20 left-20 h-72 w-72 animate-blob rounded-full bg-green-300 opacity-70 blur-xl" />

      <div className="container relative mx-auto max-w-7xl">
        <div className="mb-6 flex justify-center">
          <a
            href="https://github.com/BillPotato/VoiceRouter"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5 text-xs font-semibold tracking-wide text-indigo-700 shadow-sm transition-all hover:-translate-y-0.5 hover:border-indigo-400 hover:bg-indigo-100 hover:text-indigo-800"
          >
            View Source on GitHub
          </a>
        </div>

        <header className="mb-12 text-center md:mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 md:text-5xl lg:text-6xl">
            AI Voice Router Concept
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 md:text-xl">
            This is a dummy frontend demonstrating an LLM-powered classification engine. Click
            &apos;Ask AI Assistant&apos; to test the voice/text routing, or click standard
            departments to see the fallback UI.
          </p>
        </header>

        <main className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {departments.map((department) => (
            <ContactCard
              key={department.title}
              icon={department.icon}
              title={department.title}
              description={department.description}
              color={department.color}
              buttonText={department.buttonText}
              path={department.path}
            />
          ))}
        </main>

        <footer className="mt-16 text-center">
          <div className="flex flex-col items-center gap-2 text-sm text-gray-600">
            <p className="font-semibold text-gray-800">Built by Bill Nguyen</p>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/BillPotato/VoiceRouter"
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-indigo-500"
              >
                Source
              </a>
              <a
                href="https://www.linkedin.com/in/phuc-bao-nguyen/"
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-indigo-500"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/BillPotato"
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-indigo-500"
              >
                GitHub
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
