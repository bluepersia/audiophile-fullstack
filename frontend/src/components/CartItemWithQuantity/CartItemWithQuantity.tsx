import type { JSX } from "react/jsx-runtime";
import CartItem from "../CartItems/CartItem/CartItem";
import type { FullCartItem } from "../../contexts/CartContext/CartContext.types";
import styles from "./CartItemWithQuantity.module.scss";

type CartItemWithQuantityProps = {
  item: FullCartItem;
  className?: string;
};

export default function CartItemWithQuantity({
  item,
  className,
}: CartItemWithQuantityProps): JSX.Element {
  return (
    <CartItem item={item} className={className}>
      <p className={styles.quantity}>x{item.quantity}</p>
    </CartItem>
  );
}
