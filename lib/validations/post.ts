import * as z from "zod";

export const PostValidation = z.object({
    cover: z.string(),
    title: z.string(),
    content: z.string(),
    authorId: z.string(),
    postId: z.string(),
    description: z.string(),
    createdAt: z.date(),
    likes: z.array(z.object({
        postId: z.string(),
        userId: z.string(),
    })),
});
