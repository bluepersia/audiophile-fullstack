import type { JSX } from "react/jsx-runtime";
import styles from "./Cart.module.scss";
import { useContext } from "react";
import { CartContext } from "../../contexts/CartContext/CartContext";
import { calculateTotalPrice, countItems } from "../../core/cart";
import ProgQuery from "../ProgQuery/ProgQuery";
import type {
  CartItem as CartItemType,
  FullCartItem,
} from "../../contexts/CartContext/CartContext.types";
import CartItems from "../CartItems/CartItems";
import CartItem from "../CartItems/CartItem/CartItem";
import LabelValue from "../LabelValue/LabelValue";
import formatCurrency from "../../core/formatCurrency";
import QuantityPanel from "../QuantityPanel/QuantityPanel";
import useFullCartItems from "../../hooks/useFullCartItems";
import clsx from "clsx";
import Btn from "../Btn/Btn";

export default function Cart(): JSX.Element {
  const cartContext = useContext(CartContext);

  const { productsQuery } = useFullCartItems(cartContext!.cartQuery);

  const hasItems =
    cartContext?.cartQuery.data && cartContext.cartQuery.data.length > 0;

  return (
    <ProgQuery
      queries={[cartContext!.cartQuery, productsQuery]}
      outer={(content) => <section className={styles.cart}>{content}</section>}
    >
      {(cart: CartItemType[], fullCartItems: FullCartItem[]) => (
        <>
          <div className={styles.top}>
            <h2 className={clsx(styles.title, "h6")}>
              Cart ({countItems(cart)})
            </h2>
            <button
              className={styles.removeAllBtn}
              onClick={cartContext?.clearCartItems}
            >
              Remove all
            </button>
          </div>
          <CartItems
            items={fullCartItems}
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
            value={formatCurrency(calculateTotalPrice(fullCartItems))}
            className={styles.total}
          />
          {hasItems && (
            <Btn onClick={() => {}} className={styles.btn}>
              Checkout
            </Btn>
          )}
        </>
      )}
    </ProgQuery>
  );
}
