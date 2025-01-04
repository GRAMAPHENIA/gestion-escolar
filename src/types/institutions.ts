import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { ReactNode } from "react";

interface Subject {
  id: string;
  name: string;
  description: string;
}

export interface Institution {
  id: string;
  name: string;
  description?: string;
  subjects: Subject[];
  schedule: ReactNode;
  logo: string | StaticImport;
  address: string;
  phone: string;
}
