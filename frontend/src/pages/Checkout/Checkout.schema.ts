import { z } from "zod";

const nameSchema = z
  .string()
  .trim()
  .min(2, "Name is required")
  .max(100, "Name is too long")
  .regex(
    /^[\p{L}\s'-]+$/u,
    "Only letters, spaces, hyphens, and apostrophes are allowed",
  );

const phoneSchema = z
  .string()
  .trim()
  .regex(/^\+?[\d\s()-]{7,20}$/, "Please enter a valid phone number");

const addressSchema = z.string().trim().min(5, "Address is required").max(200);

const citySchema = z.string().trim().min(2, "City is required").max(100);

const countrySchema = z.string().trim().min(2, "Country is required").max(100);

const zipSchema = z.string().trim().min(3).max(12);
// Or use a country-specific regex if your app only supports one country.

const billingSchema = z.object({
  name: nameSchema,
  email: z.email("Please enter a valid email"),
  phone: phoneSchema,
});

const shippingSchema = z.object({
  address: addressSchema,
  zip: zipSchema,
  city: citySchema,
  country: countrySchema,
});

const paymentSchema = z.discriminatedUnion("paymentMethod", [
  z.object({
    paymentMethod: z.literal("cash"),
  }),

  z.object({
    paymentMethod: z.literal("eMoney"),
    eMoneyNumber: z.string().regex(/^\d{9,18}$/, "Invalid e-Money number"),
    eMoneyPIN: z.string().regex(/^\d{4}$/, "PIN must be 4 digits"),
  }),
]);

export const checkoutSchema = z
  .object({})
  .merge(billingSchema)
  .merge(shippingSchema)
  .and(paymentSchema);
