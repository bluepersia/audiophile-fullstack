import clsx from "clsx";
import type { JSX } from "react/jsx-runtime";
import styles from "./QuantityPanel.module.scss";

type QuantityPanelProps = {
  increment: () => void;
  decrement: () => void;
  quantity: number;
  productName: string;
  className?: string;
};
export default function QuantityPanel({
  increment,
  decrement,
  quantity,
  productName,
  className,
}: QuantityPanelProps): JSX.Element {
  return (
    <div className={clsx(styles.quantityPanel, className)}>
      <button
        className={clsx(styles.decrementBtn, styles.quantityBtn)}
        onClick={decrement}
        aria-label={`Decrease quantity for ${productName}`}
      >
        -
      </button>
      <p className={styles.quantity}>{quantity}</p>
      <button
        className={clsx(styles.incrementBtn, styles.quantityBtn)}
        onClick={increment}
        aria-label={`Increase quantity for ${productName}`}
      >
        +
      </button>
    </div>
  );
}
