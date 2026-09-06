import type { ProductData } from "../../api/products";

type CartItem = {
  id: number;
  quantity: number;
};

type FullCartItem = CartItem & ProductData;

export type { CartItem, FullCartItem };
