import type { JSX } from "react/jsx-runtime";
import styles from "./SiteInfo.module.scss";
import clsx from "clsx";

type SiteInfoProps = {
  descClassName?: string;
  coprightClassName?: string;
};
export default function SiteInfo({
  descClassName,
  coprightClassName,
}: SiteInfoProps): JSX.Element {
  return (
    <>
      <p className={clsx(styles.desc, descClassName)}>
        Audiophile is an all in one stop to fulfill your audio needs. We&apos;re
        a small team of music lovers and sound specialists who are devoted to
        helping you get the most out of personal audio. Come and visit our demo
        facility - we&apos;re open 7 days a week.
      </p>
      <p className={clsx(styles.copyright, coprightClassName)}>
        Copyright 2021. All Rights Reserved
      </p>
    </>
  );
}
