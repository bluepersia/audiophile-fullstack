import { useContext } from "react";
import type { JSX } from "react/jsx-runtime";
import { ModalContext } from "../../../contexts/ModalContext/ModalContext";

type MenuBtnProps = {
  className?: string;
};

export default function MenuBtn({ className }: MenuBtnProps): JSX.Element {
  const modalContext = useContext(ModalContext);

  return (
    <button
      className={className}
      aria-haspopup="dialog"
      onClick={() => modalContext?.toggleModal({ type: "categories" })}
    >
      <svg
        className="interactiveSVG"
        width="16"
        height="15"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g fill="#FFF" fillRule="evenodd">
          <path d="M0 0h16v3H0zM0 6h16v3H0zM0 12h16v3H0z" />
        </g>
      </svg>
    </button>
  );
}
