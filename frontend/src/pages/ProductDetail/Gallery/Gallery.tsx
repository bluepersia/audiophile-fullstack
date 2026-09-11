import type { JSX } from "react/jsx-runtime";
import type { ProductData } from "../../../api/products";
import { DESKTOP_BP, TABLET_BP } from "../../../consts/breakpoints";
import styles from "./Gallery.module.scss";
import clsx from "clsx";
import useInView from "../../../hooks/useInView";

type GalleryProps = {
  product: ProductData;
};

export default function Gallery({ product }: GalleryProps): JSX.Element {
  const [galleryRef, isVisible] = useInView();

  return (
    <section
      aria-labelledby="gallery-title"
      ref={galleryRef}
      className={clsx(
        styles.gallery,
        "container",
        "animatedBase",
        isVisible && "animatedVisible",
      )}
    >
      <h2 id="gallery-title" className="srOnly">
        Gallery
      </h2>
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
          alt={product.gallery.first.alt}
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
          alt={product.gallery.second.alt}
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
          alt={product.gallery.third.alt}
          className={styles.imgThree}
        />
      </picture>
    </section>
  );
}
