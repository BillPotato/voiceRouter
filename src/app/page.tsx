import { ContactCard } from "@/components/ContactCard";
import { AiIcon } from "@/components/icons/AiIcon";
import { BillingIcon } from "@/components/icons/BillingIcon";
import { GeneralIcon } from "@/components/icons/GeneralIcon";
import { SalesIcon } from "@/components/icons/SalesIcon";
import { SupportIcon } from "@/components/icons/SupportIcon";
import type { Department } from "@/types";

const departments: Department[] = [
  {
    icon: <SalesIcon />,
    title: "Sales Department",
    description: "For questions about pricing, plans, and partnerships.",
    color: "blue",
    buttonText: "Get in Touch",
    path: "/sales",
  },
  {
    icon: <SupportIcon />,
    title: "Technical Support",
    description: "Get help with technical issues, bugs, or product features.",
    color: "green",
    buttonText: "Get in Touch",
    path: "/support",
  },
  {
    icon: <AiIcon />,
    title: "Not Sure?",
    description: "Let our AI assistant guide you to the right department.",
    color: "indigo",
    buttonText: "Ask AI Assistant",
    path: "/ai-assistant",
  },
  {
    icon: <BillingIcon />,
    title: "Billing & Payments",
    description: "Manage your subscription, invoices, and payment details.",
    color: "purple",
    buttonText: "Get in Touch",
    path: "/billing",
  },
  {
    icon: <GeneralIcon />,
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
        <header className="mb-12 text-center md:mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 md:text-5xl lg:text-6xl">
            How can we help you?
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 md:text-xl">
            Choose a department below to get in touch with our team. We&apos;re here to assist you with any
            questions or issues you might have.
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

        <footer className="mt-16 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} Your Company Inc. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
