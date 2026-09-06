import type { UseBaseQueryResult, UseQueryResult } from "@tanstack/react-query";
import type { JSX, ReactNode } from "react";
import getErrorMsg from "../../core/getErrorMsg";
import Spinner from "../Spinner/Spinner";
import ErrorDisplay from "../ErrorDisplay/ErrorDisplay";

type QueriesStatus =
  | {
      type: "success" | "pending";
    }
  | {
      type: "error";
      message: string;
      source: UseQueryResult;
    };

type ProgQueryProps<T extends unknown[]> = {
  queries: UseBaseQueryResult[];
  outer: (content: ReactNode, queriesStatus: QueriesStatus) => JSX.Element;
  children: (...queryData: T) => JSX.Element | JSX.Element[];
};

function getQueriesStatus(queries: UseBaseQueryResult[]): QueriesStatus {
  for (const query of queries) {
    if (query.isPending) return { type: "pending" };
    if (query.isError)
      return {
        type: "error",
        message: getErrorMsg(query.error),
        source: query,
      };
  }

  return { type: "success" };
}

export default function ProgQuery<T extends unknown[]>({
  queries,
  outer,
  children,
}: ProgQueryProps<T>): JSX.Element {
  const queriesStatus = getQueriesStatus(queries);

  if (queriesStatus.type === "pending")
    return outer(<Spinner />, queriesStatus);

  if (queriesStatus.type === "error")
    return outer(
      <ErrorDisplay
        message={queriesStatus.message}
        retry={queriesStatus.source.refetch}
      />,
      queriesStatus,
    );

  return outer(
    children(...(queries.map((query) => query.data) as T)),
    queriesStatus,
  );
}

export type { QueriesStatus };
