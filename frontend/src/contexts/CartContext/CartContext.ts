import { createContext } from "react";

type CartContextType = {
  updateCartItemQuantityBy: (id: number, by: number) => void;
};

const CartContext = createContext<CartContextType | null>(null);

export { CartContext };
