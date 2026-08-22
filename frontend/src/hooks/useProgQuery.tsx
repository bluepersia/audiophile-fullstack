import type { UseQueryResult } from "@tanstack/react-query";
import getErrorMsg from "../utils/getErrorMsg";
import type { JSX } from "react/jsx-runtime";
import Spinner from "../components/Spinner/Spinner";
import ErrorDisplay from "../components/ErrorDisplay/ErrorDisplay";

type ProgQueryStatus =
  | {
      type: "pending" | "success";
    }
  | {
      type: "error";
      message: string;
      source: UseQueryResult;
    };

function getProgQueryStatus(...queries: UseQueryResult[]): ProgQueryStatus {
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

type UseProgQueryResult = {
  progQueryStatus: ProgQueryStatus;
  jsxToRender: JSX.Element;
};

export default function useProgQuery(
  render: () => JSX.Element,
  ...queries: UseQueryResult[]
): UseProgQueryResult {
  const progQueryStatus = getProgQueryStatus(...queries);

  function renderProg() {
    if (progQueryStatus.type === "pending") return <Spinner />;
    if (progQueryStatus.type === "error") {
      return (
        <ErrorDisplay
          message={progQueryStatus.message}
          retry={progQueryStatus.source.refetch}
        />
      );
    }

    return render();
  }

  return {
    progQueryStatus,
    jsxToRender: renderProg(),
  };
}
