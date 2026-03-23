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
    icon: <Briefcase className="h-8 w-8 text-black" />,
    title: "Sales Department",
    description: "For questions about pricing, plans, and partnerships.",
    color: "blue",
    buttonText: "Get in Touch",
    path: "/sales",
  },
  {
    icon: <Wrench className="h-8 w-8 text-black" />,
    title: "Technical Support",
    description: "Get help with technical issues, bugs, or product features.",
    color: "green",
    buttonText: "Get in Touch",
    path: "/support",
  },
  {
    icon: <Bot className="h-8 w-8 text-black" />,
    title: "Not Sure?",
    description: "Let our AI assistant guide you to the right department.",
    color: "indigo",
    buttonText: "Ask an AI Assistant",
    path: "/ai-assistant",
  },
  {
    icon: <CreditCard className="h-8 w-8 text-black" />,
    title: "Billing & Payments",
    description: "Manage your subscription, invoices, and payment details.",
    color: "purple",
    buttonText: "Get in Touch",
    path: "/billing",
  },
  {
    icon: <HelpCircle className="h-8 w-8 text-black" />,
    title: "General Inquiry",
    description: "For all other questions and general information.",
    color: "yellow",
    buttonText: "Get in Touch",
    path: "/general",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen w-full bg-[#fdfaf6] p-4 text-black sm:p-6 lg:p-8">
      <div className="container relative mx-auto max-w-7xl">
        <div className="mb-8 flex justify-center">
          <a
            href="https://github.com/BillPotato/VoiceRouter"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center border-2 border-black bg-[#fbbf24] px-3 py-1 text-xs font-black uppercase tracking-wider text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
          >
            View Source on GitHub
          </a>
        </div>

        <header className="mb-12 text-center md:mb-16">
          <h1 className="mb-6 inline-block border-b-4 border-black pb-2 text-5xl font-black tracking-tight uppercase text-black">
            AI Voice Router Concept
          </h1>
          <p className="mx-auto max-w-2xl border-2 border-black bg-white p-4 text-xl font-medium text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            This is a dummy frontend demonstrating an LLM-powered classification engine. Click
            &apos;Ask an AI Assistant&apos; to test the voice/text routing, or click standard
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

        <footer className="mt-16 border-t-4 border-black bg-white pt-8 pb-12 text-center">
          <div className="flex flex-col items-center gap-3 text-sm text-black">
            <p className="text-base font-black uppercase tracking-wide">Built by Bill Nguyen</p>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/BillPotato/VoiceRouter"
                target="_blank"
                rel="noreferrer"
                className="text-sm font-black uppercase tracking-wide underline-offset-4 transition-all hover:underline"
              >
                Source
              </a>
              <a
                href="https://www.linkedin.com/in/phuc-bao-nguyen/"
                target="_blank"
                rel="noreferrer"
                className="text-sm font-black uppercase tracking-wide underline-offset-4 transition-all hover:underline"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/BillPotato"
                target="_blank"
                rel="noreferrer"
                className="text-sm font-black uppercase tracking-wide underline-offset-4 transition-all hover:underline"
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
