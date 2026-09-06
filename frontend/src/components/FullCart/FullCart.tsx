import { useContext, type ReactNode } from "react";
import type { JSX } from "react/jsx-runtime";
import {
  CartContext,
  type CartContextType,
} from "../../contexts/CartContext/CartContext";
import { useQuery } from "@tanstack/react-query";
import ProgQuery, { type QueriesStatus } from "../ProgQuery/ProgQuery";
import { getProductsByIds, type ProductData } from "../../api/products";
import type {
  CartItem,
  FullCartItem,
} from "../../contexts/CartContext/CartContext.types";

type FullCartProps = {
  outer: (content: ReactNode, queriesStatus: QueriesStatus) => JSX.Element;
  children: (
    fullCart: FullCartItem[],
    cartContext: CartContextType,
  ) => JSX.Element | JSX.Element[];
};
export default function FullCart({
  outer,
  children,
}: FullCartProps): JSX.Element {
  const cartContext = useContext(CartContext);

  const productIds = cartContext?.cartQuery.data?.map((item) => item.id) || [];
  const productsQuery = useQuery({
    queryFn: () => getProductsByIds(productIds!),
    queryKey: ["products", productIds],
    enabled: cartContext?.cartQuery.isSuccess,
  });

  return (
    <ProgQuery queries={[cartContext!.cartQuery, productsQuery]} outer={outer}>
      {(cart: CartItem[], products: Map<number, ProductData>) => {
        const fullCart = cart
          .filter((cartItem) => products.has(cartItem.id))
          .map(
            (cartItem) =>
              ({
                ...products.get(cartItem.id),
                ...cartItem,
              }) as FullCartItem,
          );

        return children(fullCart, cartContext!);
      }}
    </ProgQuery>
  );
}
