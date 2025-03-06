import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

type FetchArgs = Parameters<typeof fetch>

export async function fetcher<T>(url: FetchArgs[0], args?: FetchArgs[1]) {
  const response = await fetch(url, args)

  return response.json() as Promise<T>
}