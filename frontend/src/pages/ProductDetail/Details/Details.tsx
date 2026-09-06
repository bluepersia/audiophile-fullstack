import type { JSX } from "react/jsx-runtime";
import type { ProductData } from "../../../api/products";
import NewProduct from "../../../components/NewProduct/NewProduct";
import formatCurrency from "../../../core/formatCurrency";
import QuantityPanel from "../../../components/QuantityPanel/QuantityPanel";
import { useContext, useState } from "react";
import Btn from "../../../components/Btn/Btn";
import { CartContext } from "../../../contexts/CartContext/CartContext";
import styles from "./Details.module.scss";
import { DESKTOP_BP, TABLET_BP } from "../../../consts/breakpoints";

type DetailsProps = {
  product: ProductData;
};
export default function Details({ product }: DetailsProps): JSX.Element {
  const cartContext = useContext(CartContext);

  const [quantity, setQuantity] = useState(1);

  function incrementQuantity() {
    setQuantity((prevQuantity) =>
      prevQuantity < 99 ? prevQuantity + 1 : prevQuantity,
    );
  }

  function decrementQuantity() {
    setQuantity((prevQuantity) =>
      prevQuantity > 1 ? prevQuantity - 1 : prevQuantity,
    );
  }
  return (
    <section className={styles.details}>
      <div className={styles.content}>
        <h1 className={styles.title}>{product.name}</h1>
        <NewProduct isNew={product.new} className={styles.new} />
        <p className={styles.desc}>{product.description}</p>
        <p className={styles.price}>{formatCurrency(product.price)}</p>
        <div className={styles.controls}>
          <QuantityPanel
            increment={incrementQuantity}
            decrement={decrementQuantity}
            productName={product.name}
            quantity={quantity}
            className={styles.quantityPanel}
          />
          <Btn
            onClick={() => {
              cartContext?.updateCartItemQuantityBy(product, quantity);
              setQuantity(0);
            }}
            className={styles.addToCartBtn}
            aria-label={`Add ${product.name} to cart`}
          >
            Add To Cart
          </Btn>
        </div>
      </div>
      <picture className={styles.picture}>
        <source
          srcSet={product.image.desktop}
          media={`(min-width:${DESKTOP_BP}px)`}
        />
        <source
          srcSet={product.image.tablet}
          media={`(min-width:${TABLET_BP}px)`}
        />
        <img
          src={product.image.mobile}
          alt={product.alt}
          className={styles.img}
        />
      </picture>
    </section>
  );
}
