import { useQuery } from "@tanstack/react-query";
import type { JSX } from "react/jsx-runtime";
import { getCategories } from "../../api/categories";
import { NavLink } from "react-router";
import { createCategoryLink } from "../../core/linkCreation";
import styles from "./Nav.module.scss";
import clsx from "clsx";

type NavProps = {
  variant?: "header" | "footer";
  className?: string;
  listClassName?: string;
};

export default function Nav({
  variant = "header",
  className,
  listClassName,
}: NavProps): JSX.Element {
  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  return (
    <nav className={clsx(className, styles[`nav--${variant}`])}>
      <ul className={clsx(styles.list, listClassName, "resetList")}>
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
        {categories?.map((cat) => (
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
        ))}
      </ul>
    </nav>
  );
}
