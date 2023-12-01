"use server";

import Post from "../models/Post";
import User from '../models/User';

import { connectToDB } from "../mongoose";

export async function fetchPost(id: string) {
    try {
        await connectToDB();

        return await Post.findOne({ postId: id });
    } catch (err) {
        throw Error(`Failed to fetch post: ${err}`);
    }
}

export async function fetchPosts() {
    try {
        await connectToDB();

        return await Post.find().limit(3);
    } catch (err) {
        throw Error(`Failed to fetch posts: ${err}`)
    }
}

interface CreatePostParams {
    authorId: string;
    title: string;
    content: string;
    cover: string;
    postId: string;
    likes: Object;
    createdAt: string;
    description: string;
}

interface UserPost {
    postId: string;
    userId: string;
}

export async function createPost(params: CreatePostParams, post: UserPost) {
    try {
        await connectToDB();
        
        // Update user's posts array
        const currentUser = await User.findOne({ id: post?.userId });
        const updatedPosts = [
            { postId: params.postId, userId: params.authorId },
            ...(currentUser?.posts || []),
        ];
        await User.updateOne({ id: post?.userId }, { posts: updatedPosts });

        // Create a new post
        await Post.create({
            authorId: params.authorId,
            title: params.title,
            content: params.content,
            cover: params.cover,
            postId: params.postId,
            description: params.description,
            createdAt: params.createdAt,
            updatedAt: params.createdAt,
            likes: params.likes,
        });
    } catch (err) {
        throw new Error(`Failed to create/update user or post: ${err}`);
    }
}
