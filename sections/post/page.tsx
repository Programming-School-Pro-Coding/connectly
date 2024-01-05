import React from "react";
import { Grid, Typography } from "@mui/material";
import PostCard from "@/components/shared/PostCard";
import { post } from "@/lib/interfaces";
import SkeletonLoader from "@/components/shared/SkeletonLoader";

interface PostsProps {
  posts: Array<post> | null | any[] | undefined;
}

const Posts: React.FC<PostsProps> = ({ posts }) => {
  if (!posts) {
    return null; // or loading indicator or error message
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Grid container spacing={3}>
        {posts.length === 0 ? (
          <Grid item xs={12}>
            <Typography variant="h4" align="center" color="textSecondary">
              No Posts
            </Typography>
          </Grid>
        ) : (
          posts.map((post: post) => (
            <Grid item key={post._id} xs={12} sm={6} md={4}>
              <PostCard post={post} indicator={"main"} />
            </Grid>
          ))
        )}
      </Grid>
    </div>
  );
};

export default Posts;
