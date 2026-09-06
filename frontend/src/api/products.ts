import AppError from "../types/AppError";

type ProductData = {
  id: number;
  slug: string;
  name: string;
  codename: string;
  image: {
    mobile: string;
    tablet: string;
    desktop: string;
  };
  alt: string;
  category: string;
  categoryImage: {
    mobile: string;
    tablet: string;
    desktop: string;
  };
  cartImage: string;
  new: boolean;
  price: number;
  description: string;
  features: string;
  includes: [
    {
      quantity: number;
      item: string;
    },
  ];
  gallery: {
    first: {
      mobile: string;
      tablet: string;
      desktop: string;
    };
    second: {
      mobile: string;
      tablet: string;
      desktop: string;
    };
    third: {
      mobile: string;
      tablet: string;
      desktop: string;
    };
  };
  others: [
    {
      slug: string;
      name: string;
      image: {
        mobile: string;
        tablet: string;
        desktop: string;
      };
      alt: string;
    },
  ];
};

async function getProductBySlug(slug: string): Promise<ProductData> {
  const res = await fetch("/data/products.json");

  if (!res.ok) throw new AppError("Failed to fetch products");

  const products: ProductData[] = await res.json();

  const product: ProductData | undefined = products.find(
    (prod) => prod.slug === slug,
  );

  if (!product) throw new AppError("Failed to find product");

  return product;
}

async function getProductsByIds(
  productIds: number[],
): Promise<Map<number, ProductData>> {
  const res = await fetch("/data/products.json");

  if (!res.ok) throw new AppError("Failed to load products");

  let products: ProductData[] = await res.json();

  products = products.filter((prod) => productIds.includes(prod.id));

  const productsById = new Map(products.map((prod) => [prod.id, prod]));

  return productsById;
}

export { getProductBySlug, getProductsByIds };
export type { ProductData };
