import z from "zod";


export const createZodTourType = z.object({
    name: z
        .string({ message: "Name must be string" })
        .min(3)
})


export const createZodTour = z.object({
    title: z
        .string(),
    slug: z
        .string(),
    description: z
        .string()
        .optional(),
    images: z
        .array(z.string())
        .optional(),
    location: z
        .string()
        .optional(),
    costFrom: z
        .number()
        .optional(),
    startDate: z
        .string()
        .optional()
        .optional(),
    endDate: z
        .string()
        .optional()
        .optional(),
    included: z
        .array(z.string())
        .optional(),
    excluded: z
        .array(z.string())
        .optional(),
    amenities: z
        .array(z.string())
        .optional(),
    tourPlan: z
        .array(z.string())
        .optional(),
    maxGuest: z
        .number()
        .optional(),
    minAge: z
        .number()
        .optional(),
    departureLocation: z.
        string()
        .optional(),
    arriveLocation: z
        .string()
        .optional(),
    tourType: z
        .string(),
    divisions: z
        .string()


})


export const updateZodTour = z.object({
    title: z
        .string()
        .optional(),
    slug: z
        .string()
        .optional(),
    description: z
        .string()
        .optional(),
    images: z
        .array(z.string())
        .optional(),
    location: z
        .string()
        .optional(),
    costFrom: z
        .number()
        .optional(),
    startDate: z
        .string()
        .optional()
        .optional(),
    endDate: z
        .string()
        .optional()
        .optional(),
    included: z
        .array(z.string())
        .optional(),
    excluded: z
        .array(z.string())
        .optional(),
    amenities: z
        .array(z.string())
        .optional(),
    tourPlan: z
        .array(z.string())
        .optional(),
    maxGuest: z
        .number()
        .optional(),
    minAge: z
        .number()
        .optional(),
    departureLocation: z.
        string()
        .optional(),
    arriveLocation: z
        .string()
        .optional(),
    tourType: z
        .string()
        .optional(),
    divisions: z
        .string()
        .optional()


})