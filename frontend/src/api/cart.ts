import type { User } from "../contexts/AuthContext/AuthContext.types";
import type { CartItem } from "../contexts/CartContext/CartContext.types";
import { updateCartItemQuantity } from "../core/cart";

async function getCart(user: User): Promise<CartItem[]> {
  if (!user) {
    const cart: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");
    return cart;
  }

  return [];
}

async function updateCartItem({
  user,
  id,
  quantity,
}: {
  user: User;
  id: number;
  quantity: number;
}): Promise<void> {
  if (!user) {
    let cart: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");
    cart = updateCartItemQuantity(cart, id, quantity);
    localStorage.setItem("cart", JSON.stringify(cart));
  }
}

async function clearCart({ user }: { user: User }): Promise<void> {
  if (!user) {
    localStorage.setItem("cart", "[]");
  }
}

export { getCart, updateCartItem, clearCart };
