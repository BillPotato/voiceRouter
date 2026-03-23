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
  accent: string;
  button: string;
};

const cardStyles: Record<DepartmentColor, StyleTokens> = {
  blue: {
    accent: "bg-[#60a5fa]",
    button: "bg-[#60a5fa]",
  },
  green: {
    accent: "bg-[#4ade80]",
    button: "bg-[#4ade80]",
  },
  purple: {
    accent: "bg-[#f472b6]",
    button: "bg-[#f472b6]",
  },
  yellow: {
    accent: "bg-[#fbbf24]",
    button: "bg-[#fbbf24]",
  },
  indigo: {
    accent: "bg-[#c084fc]",
    button: "bg-[#c084fc]",
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
  const isMainFlow = color === "indigo";
  const [showModal, setShowModal] = useState(false);
  const emailLocalPart = path.replace(/^\//, "") || "contact";

  return (
    <div
      className={`border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] ${isMainFlow ? "relative z-10 scale-[1.03] border-[5px] bg-[#fff8d6] shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]" : ""}`}
    >
      {isMainFlow ? (
        <div className="mb-4 inline-block border-2 border-black bg-[#fbbf24] px-2 py-1 text-xs font-black uppercase tracking-wide text-black">
          Main Feature
        </div>
      ) : null}

      <div
        className={`mx-auto mb-5 flex h-16 w-16 items-center justify-center border-2 border-black rounded-none ${styles.accent}`}
      >
        {icon}
      </div>
      <h3 className={`mb-3 border-2 border-black px-2 py-1 text-center text-xl font-black uppercase text-black ${styles.accent}`}>
        {title}
      </h3>
      <p className="mb-6 min-h-12 text-center text-base font-medium text-black">{description}</p>

      {color === "indigo" ? (
        <>
          <button
            type="button"
            className={`w-full border-2 border-black py-3 px-6 font-bold uppercase tracking-wider text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] ${styles.button} ring-4 ring-black/20 animate-pulse`}
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
              className={`w-full border-2 border-black py-3 px-6 font-bold uppercase tracking-wider text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] ${styles.button}`}
            >
              {buttonText}
            </button>
          </DialogTrigger>
          <DialogContent className="w-[calc(100vw-2rem)] max-w-md border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <DialogHeader>
              <DialogTitle className="text-xl font-black uppercase text-black">{title}</DialogTitle>
              <DialogDescription className="text-sm font-medium text-black">
                Contact details for this department are shown below.
              </DialogDescription>
            </DialogHeader>

            <div className={`mt-2 border-2 border-black p-4 text-sm text-black ${styles.accent}`}>
              <div className="font-black uppercase">Mock Contact Information</div>
              <div className="mt-1">Phone: 1-800-555-0199</div>
              <div>Email: {emailLocalPart}@company.com</div>
            </div>

            <div className="border-2 border-black bg-[#fdfaf6] p-3 text-xs italic font-medium text-black">
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
