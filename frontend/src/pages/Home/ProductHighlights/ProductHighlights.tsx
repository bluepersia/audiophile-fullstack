import { useQuery } from "@tanstack/react-query";
import type { JSX } from "react/jsx-runtime";
import getHomeHighlights from "../../../api/home-sections/home-highlights";
import ProgQuery from "../../../components/ProgQuery/ProgQuery";
import type { SectionData } from "../../../api/home-sections/home-sections.types";
import HighlightRenderer from "./HighlightRenderer";
import styles from "./ProductHighlights.module.scss";
import clsx from "clsx";

export default function ProductHighlights(): JSX.Element {
  const highlightsQuery = useQuery({
    queryKey: ["home-highlights"],
    queryFn: getHomeHighlights,
  });

  return (
    <ProgQuery
      queries={[highlightsQuery]}
      outer={(content) => (
        <div>
          <ul className={clsx(styles.list, "container", "resetList")}>
            {content}
          </ul>
        </div>
      )}
    >
      {(highlights: SectionData[]) =>
        highlights.map((highlight) => (
          <li key={highlight.id}>
            <HighlightRenderer highlight={highlight} />
          </li>
        ))
      }
    </ProgQuery>
  );
}
