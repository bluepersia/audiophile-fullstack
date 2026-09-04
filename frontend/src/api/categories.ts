import AppError from "../types/AppError";

type CategoryData = {
  id: number;
  name: string;
  image: string;
};

async function getCategories(): Promise<CategoryData[]> {
  const res = await fetch("/data/categories.json");

  if (!res.ok) throw new AppError("Failed to fetch categories");

  const categories: CategoryData[] = await res.json();

  return categories;
}

export { getCategories };
export type { CategoryData };
