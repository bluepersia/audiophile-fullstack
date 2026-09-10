import type { JSX } from "react/jsx-runtime";
import styles from "./Form.module.scss";
import FormSection from "./FormSection/FormSection";
import FieldGroup from "./FieldGroup/FieldGroup";
import type { FormDataState } from "../Checkout";
import { useId, type ChangeEvent } from "react";
import cashOnDeliveryImg from "/src/assets/checkout/icon-cash-on-delivery.svg";
import clsx from "clsx";

type FormProps = {
  formData: FormDataState;
  errors: FormDataState;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
};
export default function Form({
  formData,
  errors,
  handleChange,
  className,
}: FormProps): JSX.Element {
  const eMoneyId = useId();
  const cashId = useId();

  return (
    <section
      aria-labelledby="checkout-form-title"
      className={clsx(styles.checkoutForm, className)}
    >
      <h2 id="checkout-form-title" className={styles.title}>
        Checkout
      </h2>
      <form onSubmit={(e) => e.preventDefault()} className={styles.form}>
        <FormSection
          title="Billing Details"
          childrenClassName={styles.billingContent}
        >
          <FieldGroup
            type="text"
            name="name"
            label="Name"
            placeholder="Alexei Ward"
            value={formData.name}
            error={errors.name}
            handleChange={handleChange}
          />
          <FieldGroup
            type="email"
            name="email"
            label="Email Address"
            placeholder="alexei@mail.com"
            value={formData.email}
            error={errors.email}
            handleChange={handleChange}
          />
          <FieldGroup
            type="text"
            name="phone"
            label="Phone Number"
            placeholder="+1 202 555 0136"
            value={formData.phone}
            error={errors.phone}
            handleChange={handleChange}
          />
        </FormSection>
        <FormSection
          title="Shipping Info"
          childrenClassName={styles.shippingContent}
        >
          <FieldGroup
            type="text"
            name="address"
            label="Your Address"
            placeholder="1137 Williams Avenue"
            value={formData.address}
            error={errors.address}
            handleChange={handleChange}
            className={styles.address}
          />
          <FieldGroup
            type="text"
            name="zip"
            label="ZIP Code"
            placeholder="10001"
            value={formData.zip}
            error={errors.zip}
            handleChange={handleChange}
            inputMode="numeric"
            maxLength={5}
          />
          <FieldGroup
            type="text"
            name="city"
            label="City"
            placeholder="New York"
            value={formData.city}
            error={errors.city}
            handleChange={handleChange}
          />
          <FieldGroup
            type="text"
            name="country"
            label="Country"
            placeholder="United States"
            value={formData.country}
            error={errors.country}
            handleChange={handleChange}
          />
        </FormSection>
        <FormSection
          title="Payment Details"
          childrenClassName={styles.paymentContent}
        >
          <fieldset className={styles.paymentMethodFieldset}>
            <legend className={styles.paymentMethodLegend}>
              Payment Method
            </legend>
            <div
              className={clsx(styles.radioContainer, styles.eMoneyContainer)}
            >
              <input
                id={eMoneyId}
                type="radio"
                name="paymentMethod"
                value="eMoney"
                checked={formData.paymentMethod === "eMoney"}
                onChange={handleChange}
                className={styles.radioInput}
              />
              <label htmlFor={eMoneyId} className={styles.radioLabel}>
                e-Money
              </label>
            </div>
            <div className={clsx(styles.radioContainer, styles.cashContainer)}>
              <input
                id={cashId}
                type="radio"
                name="paymentMethod"
                value="cash"
                checked={formData.paymentMethod === "cash"}
                onChange={handleChange}
                className={styles.radioInput}
              />
              <label htmlFor={cashId} className={styles.radioLabel}>
                Cash on Delivery
              </label>
            </div>
          </fieldset>
          {formData.paymentMethod === "eMoney" && (
            <>
              <FieldGroup
                type="text"
                name="eMoneyNumber"
                label="e-Money Number"
                placeholder="238521993"
                value={formData.eMoneyNumber}
                error={errors.eMoneyNumber}
                handleChange={handleChange}
                inputMode="numeric"
                capitalizeLabel={false}
                maxLength={9}
                className={styles.eMoneyNumber}
              />
              <FieldGroup
                type="text"
                name="eMoneyPIN"
                label="e-Money PIN"
                placeholder="6891"
                value={formData.eMoneyPIN}
                error={errors.eMoneyPIN}
                handleChange={handleChange}
                inputMode="numeric"
                capitalizeLabel={false}
                maxLength={4}
                className={styles.eMoneyPIN}
              />
            </>
          )}
          {formData.paymentMethod === "cash" && (
            <div className={styles.cashOnDelivery}>
              <img
                src={cashOnDeliveryImg}
                alt=""
                className={styles.cashOnDeliveryImg}
              />
              <p className={styles.cashOnDeliveryText}>
                The ‘Cash on Delivery’ option enables you to pay in cash when
                our delivery courier arrives at your residence. Just make sure
                your address is correct so that your order will not be
                cancelled.
              </p>
            </div>
          )}
        </FormSection>
      </form>
    </section>
  );
}
