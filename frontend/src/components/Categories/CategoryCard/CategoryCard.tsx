import type { JSX } from "react/jsx-runtime";
import type { CategoryData } from "../../../api/categories";
import styles from "./CategoryCard.module.scss";
import { Link } from "react-router";
import arrowImg from "/src/assets/shared/desktop/icon-arrow-right.svg";
import { createCategoryLink } from "../../../core/linkCreation";

type CategoryCardProps = {
  category: CategoryData;
};

export default function CategoryCard({
  category,
}: CategoryCardProps): JSX.Element {
  return (
    <div className={styles.categoryCard}>
      <h3 className={styles.title}>{category.name}</h3>
      <img src={category.image} alt="" className={styles.img} />
      <Link
        to={createCategoryLink(category.name)}
        className={styles.btn}
        aria-label={`Shop ${category.name}`}
      >
        <span className={styles.btnText}>Shop</span>{" "}
        <img src={arrowImg} alt="" className={styles.arrow} />
      </Link>
    </div>
  );
}
