import type { ReactNode } from "react";

export type DepartmentColor = "blue" | "green" | "purple" | "yellow" | "indigo";

export interface Department {
  title: string;
  description: string;
  color: DepartmentColor;
  icon: ReactNode;
  buttonText: string;
  path: string;
}

export interface ContactCardProps {
  title: string;
  description: string;
  color: DepartmentColor;
  icon: ReactNode;
  buttonText: string;
  path: string;
}
