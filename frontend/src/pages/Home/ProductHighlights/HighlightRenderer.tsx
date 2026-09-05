import type { JSX } from "react/jsx-runtime";
import type { SectionData } from "../../../api/home-sections/home-sections.types";
import { getProductBySlug, type ProductData } from "../../../api/products";
import HighlightOne from "./HighlightOne/HighlightOne";
import { useQuery } from "@tanstack/react-query";
import ProgQuery from "../../../components/ProgQuery/ProgQuery";
import HighlightTwo from "./HighlightTwo/HighlightTwo";

type HighlightRendererProps = {
  highlight: SectionData;
};

type HighlightProps = HighlightRendererProps & {
  product: ProductData;
};

export default function HighlightRenderer({
  highlight,
}: HighlightRendererProps): JSX.Element {
  const productQuery = useQuery({
    queryKey: ["product", highlight.productSlug],
    queryFn: () => getProductBySlug(highlight.productSlug),
  });

  return (
    <ProgQuery queries={[productQuery]} outer={(content) => <>{content}</>}>
      {(product: ProductData) => {
        if (highlight.sectionType === 1)
          return <HighlightOne highlight={highlight} product={product} />;

        if (highlight.sectionType === 2)
          return <HighlightTwo highlight={highlight} product={product} />;

        return <></>;
      }}
    </ProgQuery>
  );
}

export type { HighlightProps };
