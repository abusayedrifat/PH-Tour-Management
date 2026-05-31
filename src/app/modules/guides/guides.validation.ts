import z from "zod";



export const guideApplyZodSchema = z.object({
    user: z.string({message:"user id required"}),
    division:z.string({message:"division id required"}),
    nidPhoto:z.array(z.string(),{message:"user nidPhoto required"})
    .optional()
})

