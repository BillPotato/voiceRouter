"use client";

import { useState } from "react";
import Link from "next/link";

import type { ContactCardProps, DepartmentColor } from "@/types";
import { SpeechModal } from "@/components/SpeechModal";

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
        <Link
          href={path}
          className={`block w-full rounded-lg px-6 py-3 text-center font-semibold text-white transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-opacity-50 ${styles.button} ${styles.focus}`}
        >
          {buttonText}
        </Link>
      )}
    </div>
  );
}
