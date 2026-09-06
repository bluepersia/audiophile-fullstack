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
import { type CartItem } from "./CartContext.types";
import type { ProductData } from "../../api/products";
import type { User } from "../AuthContext/AuthContext.types";

export default function CartProvider({
  children,
}: PropsWithChildren): JSX.Element {
  const queryClient = useQueryClient();

  const authContext = useContext(AuthContext);

  const cartQueryKey = ["cart", authContext?.user];

  const cartQuery = useQuery({
    queryKey: cartQueryKey,
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
        context.client.invalidateQueries({ queryKey: cartQueryKey });
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
        context.client.invalidateQueries({ queryKey: cartQueryKey });
    },
  });

  const lastDebounceRef = useRef<Debounce>(null);
  const itemQuantityDebounces = useRef<
    Map<number, (user: User, id: number, quantity: number) => Debounce>
  >(new Map());
  const clearCartDebounce = useMemo(
    () =>
      debounce((user: User) => {
        clearCartMutation.mutate({ user });
      }, 400),
    [clearCartMutation],
  );

  function getItemQuantityDebounce(
    id: number,
  ): (user: User, id: number, quantity: number) => Debounce {
    if (!itemQuantityDebounces.current.has(id)) {
      itemQuantityDebounces.current.set(
        id,
        debounce((user: User, id: number, quantity: number) => {
          itemQuantityDebounces.current.delete(id);
          updateCartItemMutation.mutate({
            user,
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

    await queryClient.cancelQueries({ queryKey: cartQueryKey });

    queryClient.setQueryData<CartItem[]>(cartQueryKey, (prevCart) =>
      updateCartItemQuantity(prevCart || [], id, newQuantity),
    );

    lastDebounceRef.current = getItemQuantityDebounce(id)(
      authContext!.user,
      id,
      newQuantity,
    );
  }

  async function clearCartItems() {
    await Promise.all([queryClient.cancelQueries({ queryKey: cartQueryKey })]);

    queryClient.setQueryData<CartItem[]>(cartQueryKey, []);

    lastDebounceRef.current = clearCartDebounce(authContext!.user);
  }

  return (
    <CartContext.Provider
      value={{ cartQuery, updateCartItemQuantityBy, clearCartItems }}
    >
      {children}
    </CartContext.Provider>
  );
}
