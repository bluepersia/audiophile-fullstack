import type { JSX } from "react/jsx-runtime";
import bestGearImgMobile from "/src/assets/shared/mobile/image-best-gear.jpg";
import bestGearImgTablet from "/src/assets/shared/tablet/image-best-gear.jpg";
import bestGearImgDesktop from "/src/assets/shared/desktop/image-best-gear.jpg";
import { DESKTOP_BP, TABLET_BP } from "../../consts/breakpoints";
import styles from "./AboutUs.module.scss";
import clsx from "clsx";

export default function AboutUs(): JSX.Element {
  return (
    <section className={styles.aboutUs}>
      <div className={clsx(styles.inner, "container")}>
        <picture className={styles.picture}>
          <source
            srcSet={bestGearImgDesktop}
            media={`(min-width:${DESKTOP_BP}px)`}
          />
          <source
            srcSet={bestGearImgTablet}
            media={`(min-width:${TABLET_BP}px)`}
          />
          <img
            src={bestGearImgMobile}
            alt="Black-and-white portrait of a man wearing headphones, seated against a geometric patterned wall."
            className={styles.img}
          />
        </picture>

        <div className={styles.content}>
          <h2 className={styles.title}>
            Bringing you the <span className={styles.accent}>best</span> audio
            gear
          </h2>
          <p className={styles.desc}>
            Located at the heart of New York City, Audiophile is the premier
            store for high end headphones, earphones, speakers, and audio
            accessories. We have a large showroom and luxury demonstration rooms
            available for you to browse and experience a wide range of our
            products. Stop by our store to meet some of the fantastic people who
            make Audiophile the best place to buy your portable audio equipment.
          </p>
        </div>
      </div>
    </section>
  );
}
