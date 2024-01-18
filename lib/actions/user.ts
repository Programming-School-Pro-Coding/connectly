"use server";

import User from "../models/User";

import { post } from "../interfaces";
import DatabaseManager from "@/Managers/DatabaseManager";

const dbManager = DatabaseManager.getInstance();

export async function handleUnFollow(fetchedId: string, currentId: string) {
  try {
    await dbManager.connectToDB();

    const currentUser = await User.findOne({ id: currentId });
    const userToUnFollow = await User.findOne({ id: fetchedId });

    const indexFollowing = currentUser.following.findIndex(
      (followedUser: { id: string }) => followedUser.id === fetchedId
    );
    const indexFollowers = userToUnFollow.followers.findIndex(
      (follower: { id: string }) => follower.id === currentId
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
  } catch (err: any) {
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
  } catch (err: any) {
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

interface follower {
  id: string;
}

interface following {
  id: string;
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
  following: Array<following>;
  followers: Array<follower>;
  email: string;
  update: boolean;
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
  update,
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
    console.log(data, "data");
    if (update) {
      await User.updateOne(
        { id: data.id },
        {
          $set: data
        }
      );
    } else {
      await User.create(data);
    }
  } catch (error: any) {
    throw new Error(`Failed to create/update user: ${error.message}`);
  }
}
