import catchErrors from "../utils/catchErros";
import z from "zod";
const registerSchema = z
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

export const registerHandler = catchErrors(async (req, res) => {
  const request = registerSchema.parse({
    ...req.body,
    userAgent: req.headers["user-agent"],
  });
});
