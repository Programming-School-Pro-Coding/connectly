'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import { currentUser } from "@clerk/nextjs";
import { post, user as UserType } from "@/lib/interfaces";
import { fetchUser } from "@/lib/actions/user";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 345,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    "&:hover": {
      boxShadow: `0px 4px 20px rgba(0, 0, 0, 0.1)`,
    },
  },
  media: {
    height: 140,
    objectFit: "cover",
  },
  content: {
    flexGrow: 1,
  },
  userContainer: {
    display: "flex",
    alignItems: "center",
    gap: '4px',
    marginTop: '16px',
  },
  avatar: {
    width: '40px',
    height: 128,
  },
  postInfoContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
}));

const PostCard = ({ post, indicator }: { post: post; indicator: string }) => {
  const classes = useStyles();
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const fetchedUser = await fetchUser(post?.authorId);
      setUser(fetchedUser);
    };

    fetchUserData();
  }, [post?.authorId]);

  return (
    <Link href={`/post/${post?.postId}`}>
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image={post?.cover}
          title={post?.title}
        />
        <CardContent className={classes.content}>
          <Typography gutterBottom variant="h6" component="div">
            {post?.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {post?.description}
          </Typography>
          <div className={classes.userContainer}>
            <div className="flex items-center gap-3 bg-gray-200 rounded-full w-fit px-2 py-1 text-small-semibold font-semibold text-gray-700">
              <Avatar
                className={classes.avatar}
                src={user?.image}
                alt={user?.name}
              />
              <Typography variant="body2">{user?.name}</Typography>
            </div>
            <div className="inline-block px-2 py-3 text-small-medium font-semibold text-gray-500">
              <Typography variant="body2">
                {new Date(post?.createdAt).toDateString()}
              </Typography>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default PostCard;
