import { ObjectId } from "mongoose";

export interface likes {
    userId: string;
    postId: string;
}

export interface post {
    _id: string;
    cover: string;
    title: string;
    description: string;
    createdAt: Date;
    content: string;
    authorId: string;
    postId: string;
    likes: Array<likes>;
}

export interface user {
    following: any;
    followers: any;
    _id: ObjectId;
    id: string;
    username: string;
    name: string;
    email: string;
    links: {
        linkedin: string;
        twitter: string;
        facebook: string;
    };
    phone: string;
    image: string;
    bio: string;
    posts: Array<post>;
    development: string;
    onboarded: boolean;
}