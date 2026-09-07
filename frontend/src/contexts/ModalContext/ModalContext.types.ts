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
        }
      | {
          type: "categories";
        }
    ))
  | null;

export type { ModalType };
