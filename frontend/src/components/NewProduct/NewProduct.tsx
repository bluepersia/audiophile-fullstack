import clsx from "clsx";
import type { JSX } from "react/jsx-runtime";

type NewProductProps = {
  isNew: boolean;
  className?: string;
};

export default function NewProduct({
  isNew,
  className,
}: NewProductProps): JSX.Element {
  return isNew ? (
    <p className={clsx("overline", className)}>New Product</p>
  ) : (
    <></>
  );
}
