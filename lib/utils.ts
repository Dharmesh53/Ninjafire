import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...classes: ClassValue[]) => {
  return twMerge(clsx(classes));
};

export function capatilize(string: string) {
  return string[0].toUpperCase() + string.slice(1);
}

export const formatDate = (input: string | number): string => {
  const date = new Date(input);
  return date.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};
