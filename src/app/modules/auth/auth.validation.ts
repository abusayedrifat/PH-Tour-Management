import z from "zod";


export const resetPassword = z.object({
    id: z.string(),
    newPassword:z.string()
})