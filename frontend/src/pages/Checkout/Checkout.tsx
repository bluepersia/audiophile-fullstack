import type { JSX } from "react/jsx-runtime";
import GoBack from "../../components/GoBack/GoBack";
import Form from "./Form/Form";
import { useEffect, useState, type ChangeEvent } from "react";
import { AsYouType } from "libphonenumber-js";
import clsx from "clsx";
import styles from "./Checkout.module.scss";

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

  return (
    <>
      <GoBack />
      <div className={clsx(styles.checkout, "container")}>
        <Form
          formData={formData}
          errors={errors}
          handleChange={handleChange}
          className={styles.checkoutForm}
        />
      </div>
    </>
  );
}

export type { FormDataState };
