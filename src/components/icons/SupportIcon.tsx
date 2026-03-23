import type { SVGProps } from "react";

export function SupportIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  const classes = ["h-8", "w-8", "text-green-500", className].filter(Boolean).join(" ");

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={classes}
      {...props}
    >
      <path d="M12 22a7 7 0 0 0 7-7h-4a3 3 0 0 1-3-3V8a3 3 0 0 1-3-3H5a7 7 0 0 0 7 14z" />
      <path d="M21 15a4 4 0 0 0-4-4" />
      <path d="M16 11a2 2 0 0 1-2-2" />
      <path d="M3 5a4 4 0 0 1 4-4" />
      <path d="M8 3a2 2 0 0 0 2 2" />
    </svg>
  );
}
