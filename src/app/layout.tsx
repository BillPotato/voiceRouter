import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VoiceRouter",
  description: "Voice-assisted routing to the right support department.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
