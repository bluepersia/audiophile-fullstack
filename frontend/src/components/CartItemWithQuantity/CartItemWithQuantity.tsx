import type { JSX } from "react/jsx-runtime";
import CartItem from "../CartItems/CartItem/CartItem";
import type { FullCartItem } from "../../contexts/CartContext/CartContext.types";
import styles from "./CartItemWithQuantity.module.scss";

type CartItemWithQuantityProps = {
  item: FullCartItem;
};

export default function CartItemWithQuantity({
  item,
}: CartItemWithQuantityProps): JSX.Element {
  return (
    <CartItem item={item}>
      <p className={styles.quantity}>x{item.quantity}</p>
    </CartItem>
  );
}
