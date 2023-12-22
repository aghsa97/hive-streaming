import { customAlphabet } from "nanoid";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function generateMockCpuLoad() {
  // Simulate CPU load data, with load between 0.1 and 1 (10% to 100%)
  const load = Math.random() * 0.9 + 0.1;
  return {
    timestamp: Date.now(),
    load,
  };
}

export function generateMockClientId() {
  // Simulate a client ID
  const nanoid = customAlphabet("1234567890abcdef", 16);
  return nanoid();
}

export function cn(...inputs: ClassValue[]) {
  // This is a helper function to merge class names
  return twMerge(clsx(inputs));
}
