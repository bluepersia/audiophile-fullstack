import { useQuery } from "@tanstack/react-query";
import { type JSX } from "react/jsx-runtime";
import { getCategories } from "../../api/categories";
import useProgQuery from "../../hooks/useProgQuery";
import { useId } from "react";
import styles from "./Categories.module.scss";
import clsx from "clsx";
import CategoryCard from "./CategoryCard/CategoryCard";

export default function Categories(): JSX.Element {
  const categoriesQuery = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
  const titleId = useId();

  const { jsxToRender } = useProgQuery(renderCategories, categoriesQuery);

  function renderCategories() {
    const categories = categoriesQuery.data!;
    return (
      <nav className={styles.nav}>
        <ul className={clsx(styles.list, "resetList")}>
          {categories.map((cat) => (
            <li key={cat.id} className={styles.listItem}>
              <CategoryCard {...cat} />
            </li>
          ))}
        </ul>
      </nav>
    );
  }

  return (
    <section aria-labelledby={titleId} className={styles.categories}>
      <h2 className="srOnly" id={titleId}>
        Categories
      </h2>
      <div className={clsx(styles.inner, "container")}>{jsxToRender}</div>
    </section>
  );
}
