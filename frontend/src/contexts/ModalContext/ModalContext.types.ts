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
    ))
  | null;

export type { ModalType };
