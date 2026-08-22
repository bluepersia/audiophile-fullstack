import AppError from "../types/AppError";

type ProductData = {
  id: number;
  slug: string;
  name: string;
  new: boolean;
};

async function getProductBySlug(slug: string): Promise<ProductData> {
  const res = await fetch("/data/products.json");

  if (!res.ok) throw new AppError("Failed to fetch product");

  const products: ProductData[] = await res.json();

  const product: ProductData | undefined = products.find(
    (prod) => prod.slug === slug,
  );

  if (!product) throw new AppError("Failed to find product");

  return product;
}

export { getProductBySlug };
