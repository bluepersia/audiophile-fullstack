import type { JSX } from "react/jsx-runtime";
import tickImg from "/src/assets/checkout/icon-order-confirmation.svg";

import styles from "./OrderSummary.module.scss";
import FullCart from "../FullCart/FullCart";
import CartItemWithQuantity from "../CartItemWithQuantity/CartItemWithQuantity";
import formatCurrency from "../../core/formatCurrency";
import Btn from "../Btn/Btn";

type OrderSummaryProps = {
  grandTotal: number;
};
export default function OrderSummary({
  grandTotal,
}: OrderSummaryProps): JSX.Element {
  return (
    <div className={styles.order}>
      <img src={tickImg} alt="" className={styles.tickImg} />
      <h2 className={styles.title}>Thank you for your order</h2>
      <p className={styles.body}>
        You will receive an email confirmation shortly.
      </p>
      <FullCart>
        {(fullCart) => {
          return (
            <>
              <div className={styles.orderContent}>
                <div className={styles.itemSummary}>
                  <CartItemWithQuantity
                    item={fullCart[0]}
                    className={styles.firstItem}
                  />
                  {fullCart.length > 1 && (
                    <p className={styles.otherItemsText}>
                      and {fullCart.length - 1} other item(s)
                    </p>
                  )}
                </div>
                <div className={styles.grandTotal}>
                  <h3 className={styles.grandTotalTitle}>Grand Total</h3>
                  <p className={styles.grandTotalValue}>
                    {formatCurrency(grandTotal)}
                  </p>
                </div>
              </div>
              <Btn to="/" className={styles.returnBtn}>
                Back To Home
              </Btn>
            </>
          );
        }}
      </FullCart>
    </div>
  );
}
