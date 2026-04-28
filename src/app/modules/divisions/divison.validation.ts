import z from "zod";

export const createDivisionZodSchema = z.object({

    name: z
    .string({message:"Name must be string"})
    .min(3),
    slug: z
    .string({message:"slug must be string"})
    .optional(),
    description: z
    .string({message:"description must be string"})
    .optional(),
    thumbnail: z
    .string({message:"thumbnail must be string"})
    .optional()
     

})


export const updateDivisionZodSchema = z.object({
     name: z
    .string({message:"Name must be string"})
    .min(3)
    .optional(),
    slug: z
    .string({message:"slug must be string"})
    .optional(),
    description: z
    .string({message:"description must be string"})
    .optional(),
    thumbnail: z
    .string({message:"thumbnail must be string"})
    .optional()
})
