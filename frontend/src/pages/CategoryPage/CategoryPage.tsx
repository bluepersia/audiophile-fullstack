import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import type { JSX } from "react/jsx-runtime";
import { getProductsByCategory, type ProductData } from "../../api/products";
import ProgQuery from "../../components/ProgQuery/ProgQuery";
import ProductRow from "./ProductRow/ProductRow";
import styles from "./CategoryPage.module.scss";
import Categories from "../../components/Categories/Categories";
import AboutUs from "../../components/AboutUs/AboutUs";

export default function CategoryPage(): JSX.Element {
  const { category } = useParams();

  const categoryQuery = useQuery({
    queryKey: ["products-by-category", category],
    queryFn: () => getProductsByCategory(category!),
    enabled: !!category,
  });

  return (
    <div className={styles.page}>
      <div className={styles.head}>
        <h1 className={styles.title}>{category}</h1>
      </div>
      <ProgQuery
        queries={[categoryQuery]}
        outer={(content) => <ul className={styles.list}>{content}</ul>}
      >
        {(products: ProductData[]) =>
          [...products].reverse().map((prod, index) => (
            <li key={prod.id} className={styles.item}>
              <ProductRow
                {...prod}
                image={prod.categoryImage}
                desc={prod.description}
                isNew={prod.new}
                inverse={index % 2 !== 0}
              />
            </li>
          ))
        }
      </ProgQuery>
      <div className={styles.categories}>
        <Categories />
      </div>
      <AboutUs />
    </div>
  );
}
