import type { SVGProps } from "react";

export function SalesIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  const classes = ["h-8", "w-8", "text-blue-500", className].filter(Boolean).join(" ");

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
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
      <path d="M12 6v1.17c0 .41.25.79.63.95l3.23 1.37c.4.17.64.58.64 1.01V12m-6-1.5V9a1.5 1.5 0 0 1 3 0v1.5" />
      <path d="M12 12h.01" />
    </svg>
  );
}
