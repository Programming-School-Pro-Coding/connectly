"use server";

import User from "../models/User";

import { post } from "../interfaces";
import { connectToDB } from "../mongoose";
import DatabaseManager from "@/Managers/DatabaseManager";

const dbManager = DatabaseManager.getInstance();

export async function handleUnFollow(fetchedId: string, currentId: string) {
  try {
    await dbManager.connectToDB();

    const currentUser = await User.findOne({ id: currentId });
    const userToUnFollow = await User.findOne({ id: fetchedId });

    const indexFollowing = currentUser.following.findIndex(
      (followedUser) => followedUser.id === fetchedId
    );
    const indexFollowers = userToUnFollow.followers.findIndex(
      (follower) => follower.id === currentId
    );

    if (indexFollowing !== -1 && indexFollowers !== -1) {
      const following = [...currentUser.following];
      following.splice(indexFollowing, 1);

      const followers = [...userToUnFollow.followers];
      followers.splice(indexFollowers, 1);

      await User.updateOne({ id: currentId }, { following: following });
      await User.updateOne({ id: fetchedId }, { followers: followers });
    } else {
      console.log("User not found in following or followers array.");
    }
  } catch (err) {
    throw new Error(`Failed to update user following: ${err.message}`);
  }
}

export async function handleFollow({
  currentUserId,
  fetchedUserId,
}: {
  currentUserId: string;
  fetchedUserId: string;
}) {
  try {
    await dbManager.connectToDB();
    const currentUser = await User.findOne({ id: currentUserId });
    const userToFollow = await User.findOne({ id: fetchedUserId });

    const following = [{ id: fetchedUserId }, ...currentUser.following];
    const followers = [{ id: currentUserId }, ...userToFollow.followers];
    console.log(following, followers);

    await User.updateOne({ id: currentUserId }, { following: following });
    await User.updateOne({ id: fetchedUserId }, { followers: followers });
  } catch (err) {
    throw new Error(`Failed to update user following: ${err.message}`);
  }
}

export async function fetchUser(userId: string) {
  try {
    await dbManager.connectToDB();
    return await User.findOne({ id: userId });
  } catch (err: any) {
    throw new Error(`Failed to fetch user: ${err.message}`);
  }
}

interface Params {
  userId: string;
  username: string;
  name: string;
  bio: string;
  image: string;
  development: string;
  phone: string;
  posts: Array<post>;
  following: Array<>;
  followers: Array<>;
  email: string;
}

export async function createUser({
  userId,
  bio,
  name,
  username,
  image,
  development,
  phone,
  posts,
  email,
  followers,
  following,
}: Params): Promise<void> {
  try {
    await dbManager.connectToDB();
    const data = {
      id: userId,
      username: username.toLowerCase(),
      name,
      bio,
      image,
      development,
      posts,
      phone,
      Email: email,
      following,
      followers,
      onboarded: true,
    };
    console.log(data);
    await User.create(data);
  } catch (error: any) {
    throw new Error(`Failed to create/update user: ${error.message}`);
  }
}
