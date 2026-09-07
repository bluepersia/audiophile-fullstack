import type {
  CartItem,
  FullCartItem,
} from "../contexts/CartContext/CartContext.types";
import { calculateAllCosts } from "../core/cart";
import { getProductsByIds, type ProductData } from "./products";

async function processCheckout(
  cart: CartItem[],
): Promise<{ grandTotal: number; fullCart: FullCartItem[] }> {
  const products: Map<number, ProductData> = await getProductsByIds(
    cart.map((item) => item.id),
  );

  const fullCart: FullCartItem[] = cart
    .filter((item) => products.has(item.id))
    .map((item) => ({ ...item, ...products.get(item.id)! }));

  const { grandTotal } = calculateAllCosts(fullCart);

  return {
    grandTotal,
    fullCart,
  };
}

export { processCheckout };
