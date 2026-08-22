import type { JSX } from "react/jsx-runtime";
import styles from "./CategoryCard.module.scss";
import { Link } from "react-router";
import { createCategoryLink } from "../../../utils/linkCreation";
import arrowImg from "/src/assets/shared/desktop/icon-arrow-right.svg";

type CategoryCardProps = {
  name: string;
  image: string;
};
export default function CategoryCard({
  image,
  name,
}: CategoryCardProps): JSX.Element {
  return (
    <div className={styles.categoryCard}>
      <h3 className={styles.title}>{name}</h3>
      <Link
        to={createCategoryLink(name)}
        aria-label={`Shop ${name}`}
        className={styles.btn}
      >
        <span className={styles.btnText}>Shop</span>
        <img src={arrowImg} alt="" className={styles.arrowImg} />
      </Link>
      <img src={image} alt="" className={styles.img} />
    </div>
  );
}
