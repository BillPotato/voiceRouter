"use client";

import { useState } from "react";

import type { ContactCardProps, DepartmentColor } from "@/types";
import { SpeechModal } from "@/components/SpeechModal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type StyleTokens = {
  border: string;
  button: string;
  focus: string;
};

const cardStyles: Record<DepartmentColor, StyleTokens> = {
  blue: {
    border: "border-blue-500/50 hover:border-blue-500",
    button: "bg-blue-500 hover:bg-blue-600",
    focus: "focus:ring-blue-400",
  },
  green: {
    border: "border-green-500/50 hover:border-green-500",
    button: "bg-green-500 hover:bg-green-600",
    focus: "focus:ring-green-400",
  },
  purple: {
    border: "border-purple-500/50 hover:border-purple-500",
    button: "bg-purple-500 hover:bg-purple-600",
    focus: "focus:ring-purple-400",
  },
  yellow: {
    border: "border-yellow-500/50 hover:border-yellow-500",
    button: "bg-yellow-500 hover:bg-yellow-600",
    focus: "focus:ring-yellow-400",
  },
  indigo: {
    border: "border-indigo-500/50 hover:border-indigo-500",
    button: "bg-indigo-500 hover:bg-indigo-600",
    focus: "focus:ring-indigo-400",
  },
};

export function ContactCard({
  icon,
  title,
  description,
  color,
  buttonText,
  path,
}: ContactCardProps) {
  const styles = cardStyles[color];
  const [showModal, setShowModal] = useState(false);
  const emailLocalPart = path.replace(/^\//, "") || "contact";

  return (
    <div
      className={`rounded-2xl border-2 bg-white/50 p-8 shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 ${styles.border}`}
    >
      <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
        {icon}
      </div>
      <h3 className="mb-3 text-center text-2xl font-bold text-gray-800">{title}</h3>
      <p className="mb-6 h-12 text-center text-gray-600">{description}</p>

      {color === "indigo" ? (
        <>
          <button
            type="button"
            className={`w-full rounded-lg px-6 py-3 font-semibold text-white transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-opacity-50 ${styles.button} ${styles.focus}`}
            onClick={() => setShowModal(true)}
          >
            {buttonText}
          </button>
          <SpeechModal open={showModal} onOpenChange={setShowModal} />
        </>
      ) : (
        <Dialog>
          <DialogTrigger asChild>
            <button
              type="button"
              className={`block w-full rounded-lg px-6 py-3 text-center font-semibold text-white transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-opacity-50 ${styles.button} ${styles.focus}`}
            >
              {buttonText}
            </button>
          </DialogTrigger>
          <DialogContent className="w-[calc(100vw-2rem)] max-w-md">
            <DialogHeader>
              <DialogTitle>{title}</DialogTitle>
              <DialogDescription>
                Contact details for this department are shown below.
              </DialogDescription>
            </DialogHeader>

            <div className="mt-2 rounded-lg border border-gray-200 bg-white/80 p-4 text-sm text-gray-800">
              <div className="font-semibold">Mock Contact Information</div>
              <div className="mt-1">Phone: 1-800-555-0199</div>
              <div>Email: {emailLocalPart}@company.com</div>
            </div>

            <div className="rounded-md bg-gray-100 p-3 text-xs italic text-gray-700">
              Proof of Concept: In a production environment, this would trigger a custom
              routing action, such as an automatic redirect to a live agent or a
              department-specific form.
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
