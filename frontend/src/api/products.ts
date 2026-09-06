import type {
  CartItem,
  FullCartItem,
} from "../contexts/CartContext/CartContext.types";
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

async function getProductsForCart(cart: CartItem[]): Promise<FullCartItem[]> {
  const res = await fetch("/data/products.json");

  if (!res.ok) throw new AppError("Failed to load products");

  const products: ProductData[] = await res.json();

  const productsById = new Map(products.map((prod) => [prod.id, prod]));

  return cart
    .filter((cartItem) => productsById.has(cartItem.id))
    .map((cartItem) => ({
      ...cartItem,
      ...productsById.get(cartItem.id)!,
    }));
}

export { getProductBySlug, getProductsForCart };
export type { ProductData };
