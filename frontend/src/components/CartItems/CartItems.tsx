import type { JSX } from "react/jsx-runtime";
import type { FullCartItem } from "../../contexts/CartContext/CartContext.types";
import clsx from "clsx";
import styles from "./CartItems.module.scss";

type CartItemsProps = {
  items: FullCartItem[];
  renderCartItem: (item: FullCartItem) => JSX.Element;
  className?: string;
};
export default function CartItems({
  items,
  renderCartItem,
  className,
}: CartItemsProps): JSX.Element {
  return (
    <ul className={clsx(styles.list, "resetList", className)}>
      {items.map((item) => (
        <li key={item.id}>{renderCartItem(item)}</li>
      ))}
    </ul>
  );
}
