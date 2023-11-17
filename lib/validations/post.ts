import * as z from "zod";

export const PostValidation = z.object({
    cover: z.string(),
    title: z.string(),
    content: z.string(),
    description: z.string(),
});
