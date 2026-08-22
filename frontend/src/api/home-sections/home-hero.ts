import AppError from "../../types/AppError";
import type { SectionData } from "./home-sections.types";

export default async function getHomeHero(): Promise<SectionData> {
  const res = await fetch("/data/home-hero.json");

  if (!res.ok) throw new AppError("Failed to fetch hero section");

  const hero: SectionData = await res.json();

  return hero;
}
