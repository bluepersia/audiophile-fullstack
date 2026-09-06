import { createContext } from "react";
import type { UseQueryResult } from "@tanstack/react-query";
import type { CartItem } from "./CartContext.types";
import type { ProductData } from "../../api/products";

type CartContextType = {
  cartQuery: UseQueryResult<CartItem[]>;
  updateCartItemQuantityBy: (product: ProductData, by: number) => void;
  clearCartItems: () => void;
};

const CartContext = createContext<CartContextType | null>(null);

export { CartContext };
