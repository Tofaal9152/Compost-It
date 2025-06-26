import { z } from "zod";

export const signInSchema = z.object({
  emailOrPhone: z.string().min(1, "Email or Phone is required"),
  password: z.string().min(1, "Password is required"),
});
export const signUpSchema = z.object({
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  phone: z.string().min(11, "Phone number must be at least 11 characters long"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export type SignInFormData = z.infer<typeof signInSchema>;
export type SignUpFormData = z.infer<typeof signUpSchema>;
