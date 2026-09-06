import type { JSX } from "react/jsx-runtime";
import type { FullCartItem } from "../../../contexts/CartContext/CartContext.types";
import styles from "./CartItem.module.scss";
import formatCurrency from "../../../core/formatCurrency";
import type { PropsWithChildren } from "react";

type CartItemProps = PropsWithChildren & {
  item: FullCartItem;
};
export default function CartItem({
  item,
  children,
}: CartItemProps): JSX.Element {
  return (
    <div className={styles.item}>
      <img src={item.cartImage} alt={item.alt} className={styles.img} />
      <div className={styles.content}>
        <h3 className={styles.title}>{item.codename}</h3>
        <p className={styles.price}>{formatCurrency(item.price)}</p>
      </div>
      {children}
    </div>
  );
}
