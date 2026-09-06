import type { ProductData } from "../api/products";
import type {
  CartItem,
  FullCartItem,
} from "../contexts/CartContext/CartContext.types";

function updateCartItemQuantity<TCartItem extends CartItem>(
  cart: TCartItem[],
  id: number,
  quantity: number,
  fillerProduct?: ProductData | undefined,
): TCartItem[] {
  if (quantity > 99) return cart;

  if (quantity <= 0) return cart.filter((item) => item.id !== id);

  const itemIndex = cart.findIndex((item) => item.id === id);

  const newItem = {
    ...fillerProduct,
    id,
    quantity,
  } as TCartItem;

  if (itemIndex === -1) {
    return [...cart, newItem];
  }

  const newCart = [...cart];
  newCart[itemIndex] = newItem;

  return newCart;
}

function countItems(cart: CartItem[]): number {
  return cart.reduce((prev, curr) => prev + curr.quantity, 0);
}

function calculateTotalPrice(cart: FullCartItem[]): number {
  return cart.reduce((prev, curr) => prev + curr.quantity * curr.price, 0);
}

export { updateCartItemQuantity, countItems, calculateTotalPrice };
