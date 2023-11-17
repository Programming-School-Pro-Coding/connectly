import { currentUser } from "@clerk/nextjs";

import Profile from "@/sections/profile/[id]";
import { fetchUser } from "@/lib/actions/user";
import { fetchPost } from "@/lib/actions/post";
import { post, user as UserType } from "@/lib/interfaces";
import PostCard from "@/components/PostCard";

const page = async ({ params }: { params: { id: string } }) => {
  const posts: Array<post> = [];
  const current = await currentUser();
  
  const id = params.id;
  const user: UserType | null = await fetchUser(id);

  if (!user) {
    return <p>User not found!</p>;
  }

  for (const post of user.posts) {
    const fetchedPost = await fetchPost(post?.postId);
    posts.push(fetchedPost);
  }

  return (
    <>
      <Profile user={user} id={String(current?.id)} />
      <div className="w-full p-4">
        <h2 className="text-heading2-bold mb-4">Posts</h2>
        {posts.length === 0 ? (
          <p className="text-center">No Posts Found!</p>
        ) : (
          posts.map((post: post) => {
            console.log(post);
            return (
              <div key={post?.postId}>
                <PostCard post={post} indicator="Profile" />
              </div>
            );
          })
        )}
      </div>
    </>
  );
};

export default page;
