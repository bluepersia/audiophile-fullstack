import { useQuery } from "@tanstack/react-query";
import type { JSX } from "react/jsx-runtime";
import { getCategories } from "../../api/categories";
import { NavLink } from "react-router";
import styles from "./Nav.module.scss";
import clsx from "clsx";
import { createCategoryLink } from "../../utils/linkCreation";

type NavProps = {
  className?: string;
};
export default function Nav({ className }: NavProps): JSX.Element {
  const {
    data: categories,
    isPending,
    error,
  } = useQuery({ queryKey: ["categories"], queryFn: getCategories });

  function renderCategories() {
    if (isPending) return <></>;
    if (error) return <></>;

    return categories.map((cat) => (
      <li key={cat.id}>
        <NavLink
          to={createCategoryLink(cat.name)}
          className={({ isActive }) =>
            clsx(styles.link, isActive && styles["link--active"])
          }
        >
          {cat.name}
        </NavLink>
      </li>
    ));
  }

  return (
    <nav className={clsx(styles.nav, className)}>
      <ul className={styles.list}>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              clsx(styles.link, isActive && styles["link--active"])
            }
          >
            Home
          </NavLink>
        </li>
        {renderCategories()}
      </ul>
    </nav>
  );
}
