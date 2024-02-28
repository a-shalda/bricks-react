import * as z from 'zod'

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string()
})

export const SignupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
})

export const OrderSchema = z.object({
  name: z.string().min(1)
  .refine((value) => /^[а-яА-Я\s-]+|[a-zA-Z\s-]+/.test(value)),

  phone: z.string().min(11).max(11)
  .refine((value) => /^[87][0-9]{10}/.test(value))
})