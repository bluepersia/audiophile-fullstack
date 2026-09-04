import AppError from "../../types/AppError";
import type { SectionData } from "./home-sections.types";

export default async function getHomeHighlights(): Promise<SectionData[]> {
  const res = await fetch("/data/home-highlights.json");

  if (!res.ok) throw new AppError("Failed to fetch product highlights");

  const highlights: SectionData[] = await res.json();

  return highlights;
}
