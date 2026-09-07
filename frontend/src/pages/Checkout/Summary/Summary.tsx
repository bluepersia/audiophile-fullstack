import type { JSX } from "react/jsx-runtime";
import CartItems from "../../../components/CartItems/CartItems";
import FullCart from "../../../components/FullCart/FullCart";
import CartItemWithQuantity from "../../../components/CartItemWithQuantity/CartItemWithQuantity";
import LabelValue from "../../../components/LabelValue/LabelValue";
import {
  calculateGrandTotal,
  calculateShipping,
  calculateTotalPrice,
  calculateTotalPriceIncVAT,
  calculateVAT,
} from "../../../core/cart";
import formatCurrency from "../../../core/formatCurrency";
import styles from "./Summary.module.scss";
import clsx from "clsx";
import Btn from "../../../components/Btn/Btn";

type SummaryProps = {
  submit: (grandTotal: number) => void;
};

export default function Summary({ submit }: SummaryProps): JSX.Element {
  return (
    <section className={styles.summary}>
      <h2 className={clsx(styles.title, "h6")}>Summary</h2>
      <FullCart outer={(content) => <>{content}</>}>
        {(fullCart) => {
          const totalPrice = calculateTotalPrice(fullCart);
          const shippingCost = calculateShipping();
          const VAT = calculateVAT(totalPrice);
          const totalPriceIncVAT = calculateTotalPriceIncVAT(totalPrice, VAT);
          const grandTotal = calculateGrandTotal(
            totalPriceIncVAT,
            shippingCost,
          );

          return (
            <>
              <CartItems
                items={fullCart}
                renderCartItem={(item) => <CartItemWithQuantity item={item} />}
                className={styles.cartItems}
              ></CartItems>
              <ul className={clsx(styles.pricingList, "resetList")}>
                <li>
                  <LabelValue
                    label="Total"
                    value={formatCurrency(totalPriceIncVAT)}
                  />
                </li>
                <li>
                  <LabelValue
                    label="Shipping"
                    value={formatCurrency(shippingCost)}
                  />
                </li>
                <li>
                  <LabelValue
                    label="VAT (Included)"
                    value={formatCurrency(VAT)}
                  />
                </li>
                <li className={styles.grandTotalItem}>
                  <LabelValue
                    label="Grand Total"
                    value={formatCurrency(grandTotal)}
                    valueColor="accent"
                  />
                </li>
              </ul>
              <Btn onClick={() => submit(grandTotal)} className={styles.payBtn}>
                Continue & Pay
              </Btn>
            </>
          );
        }}
      </FullCart>
    </section>
  );
}
