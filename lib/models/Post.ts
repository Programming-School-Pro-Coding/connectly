import mongoose from "mongoose";

import { likes } from '../interfaces';

const schemaOptions = {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
};

const postSchema = new mongoose.Schema({
  authorId: {
    type: Object,
    required: true,
  },
  title: {
    type: String,
    unique: true,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  cover: {
    type: String,
    required: true,
  },
  postId: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  updatedAt: {
    type: Date,
    required: false,
  },
  likes: {
    type: Array<likes>,
    required: true,
  },
}, schemaOptions);

const Post = mongoose.models.Post || mongoose.model("Post", postSchema);

export default Post;
