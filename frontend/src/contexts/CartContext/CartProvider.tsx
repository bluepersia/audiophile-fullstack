import type { JSX, PropsWithChildren } from "react";
import { CartContext } from "./CartContext";

export default function CartProvider({
  children,
}: PropsWithChildren): JSX.Element {
  function updateCartItemQuantityBy(_id: number, _by: number) {
    //TODO
  }

  return (
    <CartContext.Provider value={{ updateCartItemQuantityBy }}>
      {children}
    </CartContext.Provider>
  );
}
