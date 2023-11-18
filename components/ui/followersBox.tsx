"use client";

import { useState, useEffect } from "react";

import { fetchUser } from "@/lib/actions/user";
import { user } from "@/lib/interfaces";

interface follower {
  id: string;
}

const FollowersBox = ({ followers } : { followers: Array<follower> }) => {
  const fetchUserDetails = async () => {
    const userPromises = followers.map((follower) => fetchUser(follower.id));
    return Promise.all(userPromises);
  };

  const [userDetails, setUserDetails] = useState<user[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const users = await fetchUserDetails();
      setUserDetails(users);
    };

    fetchData();
  }, [followers]);


  return (
    <div className="p-4">
      <ul>
        {followers.length === 0 ? (
          <p>No Followers</p>
        ) : (
          userDetails.map((user : user, index : number) => (
            <li key={index} className="flex items-center mb-2">
              <img
                src={user?.image}
                alt={`Avatar of ${user?.name}`}
                className="w-8 h-8 rounded-full mr-2"
              />
              <span>{user?.name}</span>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default FollowersBox;
