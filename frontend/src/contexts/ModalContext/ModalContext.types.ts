import type { FullCartItem } from "../CartContext/CartContext.types";

type ModalType =
  | ({
      onClose?: () => void;
    } & (
      | {
          type: "cart";
        }
      | {
          type: "order";
          grandTotal: number;
          fullCart: FullCartItem[];
        }
      | {
          type: "categories";
        }
    ))
  | null;

export type { ModalType };
