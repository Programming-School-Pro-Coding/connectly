import mongoose from "mongoose";
import { post } from "../interfaces";

const userSchema = new mongoose.Schema({
  id: {
    type: Object,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },
  development: String,
  phone: String,
  image: String,
  bio: String,
  posts: Array<post>,
  onboarded: {
    type: Boolean,
    default: false,
  },
  followers: {
    type: Array<Object>,
    required: true,
  },
  following: {
    type: Array<Object>,
    required: true,
  },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
