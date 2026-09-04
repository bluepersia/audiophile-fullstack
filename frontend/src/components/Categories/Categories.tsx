import { useQuery } from "@tanstack/react-query";
import type { JSX } from "react/jsx-runtime";
import { getCategories, type CategoryData } from "../../api/categories";
import ProgQuery from "../ProgQuery/ProgQuery";
import styles from "./Categories.module.scss";
import CategoryCard from "./CategoryCard/CategoryCard";
import clsx from "clsx";

export default function Categories(): JSX.Element {
  const categoriesQuery = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  return (
    <ProgQuery
      queries={[categoriesQuery]}
      outer={(content) => (
        <nav className={styles.nav}>
          <div className={clsx(styles.inner, "container")}>{content}</div>
        </nav>
      )}
    >
      {(categories: CategoryData[]) => (
        <ul className={clsx(styles.list, "resetList")}>
          {categories.map((cat) => (
            <li key={cat.id} className={styles.item}>
              <CategoryCard category={cat} />
            </li>
          ))}
        </ul>
      )}
    </ProgQuery>
  );
}
