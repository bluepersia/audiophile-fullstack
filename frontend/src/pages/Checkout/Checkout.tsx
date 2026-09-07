import type { JSX } from "react/jsx-runtime";
import GoBack from "../../components/GoBack/GoBack";
import Form from "./Form/Form";
import { useContext, useEffect, useState, type ChangeEvent } from "react";
import { AsYouType } from "libphonenumber-js";
import { ZodError } from "zod";
import { checkoutSchema } from "./Checkout.schema";
import clsx from "clsx";
import styles from "./Checkout.module.scss";
import Summary from "./Summary/Summary";
import { ModalContext } from "../../contexts/ModalContext/ModalContext";
import { CartContext } from "../../contexts/CartContext/CartContext";
import { useNavigate } from "react-router";
import type { FullCartItem } from "../../contexts/CartContext/CartContext.types";
import { useMutation } from "@tanstack/react-query";
import { processCheckout } from "../../api/checkout";

type FormDataState = {
  name: string;
  email: string;
  phone: string;
  address: string;
  zip: string;
  city: string;
  country: string;
  paymentMethod: "eMoney" | "cash";
  eMoneyNumber: string;
  eMoneyPIN: string;
};

function newFormState(): FormDataState {
  return {
    name: "",
    email: "",
    phone: "",
    address: "",
    zip: "",
    city: "",
    country: "",
    paymentMethod: "eMoney",
    eMoneyNumber: "",
    eMoneyPIN: "",
  };
}

export default function Checkout(): JSX.Element {
  const navigate = useNavigate();

  const modalContext = useContext(ModalContext);
  const cartContext = useContext(CartContext);

  const processCheckoutMutation = useMutation({
    mutationFn: processCheckout,
    mutationKey: ["process-checkout"],
    onSuccess: ({ grandTotal, fullCart }) =>
      modalContext?.openModal({
        type: "order",
        grandTotal,
        fullCart,
        onClose: () => {
          cartContext?.clearCartItems();
          navigate("/");
        },
      }),
  });

  const [formData, setFormData] = useState<FormDataState>(() => {
    const formDataFromLS = localStorage.getItem("form");

    if (formDataFromLS) return JSON.parse(formDataFromLS);

    return newFormState();
  });

  const [errors, setErrors] = useState<FormDataState>(() => newFormState());

  useEffect(() => {
    localStorage.setItem("form", JSON.stringify(formData));
  }, [formData]);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setFormData((prevFormData) => {
      const newFormData = {
        ...prevFormData,
        [e.target.name]: e.target.value,
      };

      newFormData.phone = new AsYouType().input(newFormData.phone);

      return newFormData;
    });
    setErrors((prevErrors) => ({ ...prevErrors, [e.target.name]: "" }));
  }

  async function submit(cart: FullCartItem[]) {
    try {
      checkoutSchema.parse(formData);

      processCheckoutMutation.mutate(cart);
    } catch (err) {
      if (err instanceof ZodError) {
        for (const issue of err.issues.reverse()) {
          for (const path of issue.path)
            setErrors((prev) => ({ ...prev, [path]: issue.message }));
        }
      }
    }
  }

  return (
    <div className={styles.page}>
      <GoBack />
      <div className={clsx(styles.checkout, "container")}>
        <Form
          formData={formData}
          errors={errors}
          handleChange={handleChange}
          className={styles.checkoutForm}
        />
        <Summary submit={submit} />
      </div>
    </div>
  );
}

export type { FormDataState };
