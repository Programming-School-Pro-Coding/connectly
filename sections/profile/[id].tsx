"use client";

import Image from "next/image";
import { useState } from "react";
import { RiUserFollowLine } from "react-icons/ri";
import { AiFillCloseCircle } from "react-icons/ai";

import { user } from "../../lib/interfaces";
import { Button } from "@/components/ui/button";
import DropDownProfile from "../../components/ui/dropdownprofile";
import { handleFollow, handleUnFollow } from "@/lib/actions/user";
import FollowersBox from "@/components/ui/followersBox";

const Profile = ({ user, id }: { user: user; id: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [following, setFollowing] = useState("Following");
  const [isCurrentUserAFollower, setIsCurrentUserAFollower] = useState(
    user?.followers.map((follower) => follower.id === id)
  );

  const handleFollowClick = () => {
    handleFollow({ currentUserId: id, fetchedUserId: user.id });
    setIsCurrentUserAFollower(true);
    setFollowing("Unfollow");
  };

  const handleUnfollowClick = () => {
    handleUnFollow(user.id, id);
    setIsCurrentUserAFollower(false);
    setFollowing("Follow");
  };
  return (
    <>
      <div className="flex gap-6 w-full">
        <div className="flex gap-3 w-1/2 p-4">
          <div className="flex items-center justify-center">
            <Image
              src={user?.image}
              alt={user?.name}
              className="object-cover rounded-full overflow-hidden w-14"
              width={200}
              height={200}
            />
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="text-heading1-bold">{user?.name}</h3>
            <p className="text-base-regular">{user?.bio}</p>
            <h5 className="text-base-regular text-slate-500">
              {user?.development}
            </h5>
          </div>
        </div>
        <div className="flex gap-2 w-1/2 p-4 pr-6">
          <div className="flex gap-2 w-1/2 p-4 pr-6">
            <button
              className="h-10 w-10 flex items-center justify-center"
              onClick={() => setIsOpen(!isOpen)}
            >
              <RiUserFollowLine size={20} />
            </button>
            {!isCurrentUserAFollower && user.id !== id ? (
              <div className="mr-5">
                <Button onClick={handleFollowClick} className="bg-primary-500">
                  Follow
                </Button>
              </div>
            ) : (
              <div className="mr-5">
                <Button
                  onClick={handleUnfollowClick}
                  variant={`${
                    following === "Unfollow" ? "unFollow" : "default"
                  }`}
                  onMouseEnter={() => setFollowing("Unfollow")}
                  onMouseLeave={() => setFollowing("Following")}
                >
                  {following}
                </Button>
              </div>
            )}
            <div className="absolute right-2">
              <DropDownProfile />
            </div>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 flex w-full items-center justify-center bg-opacity-50 backdrop-filter backdrop-blur-md">
          <div className="bg-white p-4 rounded shadow-md w-1/2 mx-auto">
            <div className="flex justify-center gap-4 items-center">
              <h2 className="text-2xl font-bold mb-4">Followers</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center p-2 text-gray-600 rounded-full transition duration-700 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-200"
                style={{ width: "40px", height: "40px", marginBottom: "12px" }}
              >
                <AiFillCloseCircle />
              </button>
            </div>
            <FollowersBox followers={user?.followers} />
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
