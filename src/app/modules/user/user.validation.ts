import z from "zod";
import { IsActive, Role } from "./user.interface";

export const createUserZodSchema = z.object({
  name:z
      .string({ message: "Name must be string" })
      .min(2, { message: "name must be at least 2 character long" })
      .max(50, { message: "name cannot be longer than 50 character" }),
  email: z
    .string({ message: "email must be a string" })
    .email({
      pattern: z.regexes.email,
      message: "Invalid email address format",
    })
    .min(5, { message: "email length must be at leaast 5 character long" })
    .max(50, { message: "email cannot be longer than 50 character" }),
  password: z
    .string({ message: "password must be string" })
    .min(8, { message: "password length must be at least 8 character" })
    .regex(/^(?=.*[a-z])/, {
      message: "password must contain at least 1 small letter",
    })
    .regex(/^(?=.*[A-Z])/, {
      message: "password must contain at least 1 capital letter",
    })
    .regex(/^(?=.*\d)/, { message: "password must contain at least 1 number" })
    .regex(/(?=.*[@$!%*?&.#])/, {
      message: "password must contain at least 1 special cheracter",
    })
    .max(33, { message: "password length connot be longer than 33 character" }),
  phone: z
    .string({ message: "Phone number must be string" })
    .regex(/^(?:\+8801|8801|01)[3-9]\d{8}$/)
    .optional(),
  address: z
    .string({ message: "Address must be string" })
    .max(200, { message: "Address cannot be more than 200 character" })
    .optional(),
});



export const updateUserZodSchema = z.object({
  name: z
    .string({ message: "Name must be string" })
    .min(2, { message: "name must be at least 2 character long" })
    .max(50, { message: "name cannot be longer than 50 character" })
    .optional(),
  password: z
    .string({ message: "password must be string" })
    .min(8, { message: "password length must be at least 8 character" })
    .regex(/^(?=.*[a-z])/, {
      message: "password must contain at least 1 small letter",
    })
    .regex(/^(?=.*[A-Z])/, {
      message: "password must contain at least 1 capital letter",
    })
    .regex(/^(?=.*\d)/, { message: "password must contain at least 1 number" })
    .regex(/(?=.*[@$!%*?&.#])/, {
      message: "password must contain at least 1 special cheracter",
    })
    .max(33, { message: "password length connot be longer than 33 character" })
    .optional(),
  phone: z
    .string({ message: "Phone number must be string" })
    .regex(/^(?:\+8801|8801|01)[3-9]\d{8}$/)
    .optional(),
  address: z
    .string({ message: "Address must be string" })
    .max(200, { message: "Address cannot be more than 200 character" })
    .optional(),

  role: z.enum(Object.values(Role) as [string]).optional(),

  isActive: z.enum(Object.values(IsActive) as [string]).optional(),

  isDeleted: z
    .boolean({ message: "isDeleted must be true or false" })
    .optional(),

  isVarified: z
    .boolean({ message: "isVarified must be true or false" })
    .optional()
});
