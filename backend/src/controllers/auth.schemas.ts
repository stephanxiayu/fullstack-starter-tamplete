import z from "zod";

export const registerSchema = z
  .object({
    email: z.string().email().min(1).max(200),
    password: z.string().min(6).max(200),
    confirmPassword: z.string().min(6).max(200),
    userAgent: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password do not match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z.string().email().min(1).max(200),
  password: z.string().min(6).max(200),
  userAgent: z.string().optional(),
});

export const verificationCodeSchema = z.string().min(1).max(24);
