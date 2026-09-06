import type { JSX } from "react/jsx-runtime";
import styles from "./Cart.module.scss";
import { calculateTotalPrice, countItems } from "../../core/cart";
import CartItems from "../CartItems/CartItems";
import CartItem from "../CartItems/CartItem/CartItem";
import LabelValue from "../LabelValue/LabelValue";
import formatCurrency from "../../core/formatCurrency";
import QuantityPanel from "../QuantityPanel/QuantityPanel";
import clsx from "clsx";
import Btn from "../Btn/Btn";
import FullCart from "../FullCart/FullCart";

export default function Cart(): JSX.Element {
  return (
    <FullCart
      outer={(content) => <section className={styles.cart}>{content}</section>}
    >
      {(fullCart, cartContext) => {
        const hasItems = fullCart.length > 0;

        return (
          <>
            <div className={styles.top}>
              <h2 className={clsx(styles.title, "h6")}>
                Cart ({countItems(fullCart)})
              </h2>
              <button
                className={styles.removeAllBtn}
                onClick={cartContext?.clearCartItems}
              >
                Remove all
              </button>
            </div>
            <CartItems
              items={fullCart}
              renderCartItem={(item) => (
                <CartItem item={item}>
                  <QuantityPanel
                    size="small"
                    increment={() =>
                      cartContext?.updateCartItemQuantityBy(item, 1)
                    }
                    decrement={() =>
                      cartContext?.updateCartItemQuantityBy(item, -1)
                    }
                    quantity={item.quantity}
                    productName={item.name}
                    className={styles.quantityPanel}
                  />
                </CartItem>
              )}
              className={styles.list}
            />
            <LabelValue
              label="Total"
              value={formatCurrency(calculateTotalPrice(fullCart))}
              className={styles.total}
            />
            {hasItems && (
              <Btn onClick={() => {}} className={styles.btn}>
                Checkout
              </Btn>
            )}
          </>
        );
      }}
    </FullCart>
  );
}
