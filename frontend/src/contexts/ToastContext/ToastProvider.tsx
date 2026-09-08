import { useMemo, useState, type PropsWithChildren } from "react";
import type { JSX } from "react/jsx-runtime";
import debounce from "../../utils/debounce";
import { ToastContext } from "./ToastContext";

export default function ToastProvider({
  children,
}: PropsWithChildren): JSX.Element {
  const [message, setMessage] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const toastDebounce = useMemo(
    () =>
      debounce(() => {
        setIsVisible(false);
      }, 4000),
    [],
  );

  function show(message: string) {
    setMessage(message);
    setIsVisible(true);
    toastDebounce();
  }

  return (
    <ToastContext.Provider value={{ message, isVisible, show }}>
      {children}
    </ToastContext.Provider>
  );
}
