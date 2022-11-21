import * as yup from "yup";

export const userAuthSchema = yup.object({
  body: yup.object({
    email: yup.string().email("Must be a valid email").required(),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required(),
  }),
});
