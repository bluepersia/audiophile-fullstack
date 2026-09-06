import {
  useContext,
  useMemo,
  useRef,
  type JSX,
  type PropsWithChildren,
} from "react";
import { CartContext } from "./CartContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../AuthContext/AuthContext";
import { clearCart, getCart, updateCartItem } from "../../api/cart";
import debounce, { type Debounce } from "../../utils/debounce";
import { updateCartItemQuantity } from "../../core/cart";
import { type FullCartItem, type CartItem } from "./CartContext.types";
import type { ProductData } from "../../api/products";

export default function CartProvider({
  children,
}: PropsWithChildren): JSX.Element {
  const queryClient = useQueryClient();

  const authContext = useContext(AuthContext);

  const cartQuery = useQuery({
    queryKey: ["cart"],
    queryFn: () => getCart(authContext?.user || null),
  });

  const updateCartItemMutation = useMutation({
    mutationKey: ["cart"],
    scope: { id: "cart" },
    mutationFn: updateCartItem,
    onSettled: (_data, _err, _variables, _result, context) => {
      if (
        context.client.isMutating({ mutationKey: ["cart"] }) === 1 &&
        !lastDebounceRef.current?.isPending
      )
        context.client.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  const clearCartMutation = useMutation({
    mutationKey: ["cart"],
    scope: { id: "cart" },
    mutationFn: clearCart,
    onSettled: (_data, _err, _variables, _result, context) => {
      if (
        context.client.isMutating({ mutationKey: ["cart"] }) === 1 &&
        !lastDebounceRef.current?.isPending
      )
        context.client.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  const lastDebounceRef = useRef<Debounce>(null);
  const itemQuantityDebounces = useRef<
    Map<number, (id: number, quantity: number) => Debounce>
  >(new Map());
  const clearCartDebounce = useMemo(
    () =>
      debounce(() => {
        clearCartMutation.mutate({ user: authContext?.user || null });
      }, 400),
    [clearCartMutation, authContext?.user],
  );

  function getItemQuantityDebounce(
    id: number,
  ): (id: number, quantity: number) => Debounce {
    if (!itemQuantityDebounces.current.has(id)) {
      itemQuantityDebounces.current.set(
        id,
        debounce((id: number, quantity: number) => {
          updateCartItemMutation.mutate({
            user: authContext?.user || null,
            id,
            quantity,
          });
        }, 400),
      );
    }

    return itemQuantityDebounces.current.get(id)!;
  }

  async function updateCartItemQuantityBy(product: ProductData, by: number) {
    const { id } = product;

    const currentCart = cartQuery.data;

    const currentItemQuantity =
      currentCart?.find((item) => item.id === id)?.quantity || 0;

    const newQuantity = currentItemQuantity + by;

    await Promise.all([
      queryClient.cancelQueries({ queryKey: ["cart"] }),
      queryClient.cancelQueries({ queryKey: ["full-cart"] }),
    ]);

    queryClient.setQueryData<CartItem[]>(["cart"], (prevCart) =>
      updateCartItemQuantity(prevCart || [], id, newQuantity),
    );

    queryClient.setQueryData<FullCartItem[]>(["full-cart"], (prevCart) =>
      updateCartItemQuantity(prevCart || [], id, newQuantity, product),
    );

    lastDebounceRef.current = getItemQuantityDebounce(id)(id, newQuantity);
  }

  async function clearCartItems() {
    await Promise.all([
      queryClient.cancelQueries({ queryKey: ["cart"] }),
      queryClient.cancelQueries({ queryKey: ["full-cart"] }),
    ]);

    queryClient.setQueryData<CartItem[]>(["cart"], []);

    queryClient.setQueryData<FullCartItem[]>(["full-cart"], []);

    lastDebounceRef.current = clearCartDebounce();
  }

  return (
    <CartContext.Provider
      value={{ cartQuery, updateCartItemQuantityBy, clearCartItems }}
    >
      {children}
    </CartContext.Provider>
  );
}
