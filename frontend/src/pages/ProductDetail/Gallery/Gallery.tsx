import type { JSX } from "react/jsx-runtime";
import type { ProductData } from "../../../api/products";
import { DESKTOP_BP, TABLET_BP } from "../../../consts/breakpoints";
import styles from "./Gallery.module.scss";

type GalleryProps = {
  product: ProductData;
};

//TODO: add gallery alt texts
export default function Gallery({ product }: GalleryProps): JSX.Element {
  return (
    <section className={styles.gallery}>
      <picture className={styles.pictureOne}>
        <source
          srcSet={product.gallery.first.desktop}
          media={`(min-width:${DESKTOP_BP}px)`}
        />
        <source
          srcSet={product.gallery.first.tablet}
          media={`(min-width:${TABLET_BP}px)`}
        />
        <img
          src={product.gallery.first.mobile}
          alt=""
          className={styles.imgOne}
        />
      </picture>
      <picture className={styles.pictureTwo}>
        <source
          srcSet={product.gallery.second.desktop}
          media={`(min-width:${DESKTOP_BP}px)`}
        />
        <source
          srcSet={product.gallery.second.tablet}
          media={`(min-width:${TABLET_BP}px)`}
        />
        <img
          src={product.gallery.second.mobile}
          alt=""
          className={styles.imgTwo}
        />
      </picture>
      <picture className={styles.pictureThree}>
        <source
          srcSet={product.gallery.third.desktop}
          media={`(min-width:${DESKTOP_BP}px)`}
        />
        <source
          srcSet={product.gallery.third.tablet}
          media={`(min-width:${TABLET_BP}px)`}
        />
        <img
          src={product.gallery.third.mobile}
          alt=""
          className={styles.imgThree}
        />
      </picture>
    </section>
  );
}
