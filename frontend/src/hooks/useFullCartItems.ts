import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import type {
  CartItem,
  FullCartItem,
} from "../contexts/CartContext/CartContext.types";
import { getProductsForCart } from "../api/products";

export default function useFullCartItems(
  cartQuery: UseQueryResult<CartItem[]>,
): {
  productsQuery: UseQueryResult<FullCartItem[]>;
} {
  const cart = cartQuery.data;
  const productsQuery = useQuery({
    queryKey: ["full-cart"],
    queryFn: () => getProductsForCart(cart!),
    enabled: cartQuery.isSuccess,
  });

  return { productsQuery };
}
