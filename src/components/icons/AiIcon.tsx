import type { SVGProps } from "react";

export function AiIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  const classes = ["h-8", "w-8", "text-indigo-500", className].filter(Boolean).join(" ");

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
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <path d="m12 17 0 .01" />
      <path d="M21 12a9 9 0 1 1-9-9" />
      <path d="M12 3v1" />
      <path d="M12 20v1" />
      <path d="m4.93 4.93 1 1" />
      <path d="m18.07 18.07 1 1" />
      <path d="m3 12 1 0" />
      <path d="m20 12 1 0" />
      <path d="m4.93 19.07 1-1" />
      <path d="m18.07 5.93 1-1" />
    </svg>
  );
}
