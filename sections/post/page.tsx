import PostCard from "@/components/PostCard";
import { post } from "@/lib/interfaces";

interface PostsProps {
  posts: Array<post> | null | any[] | undefined;
}

const Products: React.FC<PostsProps> = ({ posts }) => {
  // Check if products array is not null or undefined before mapping
  if (!posts) {
    return null; // or loading indicator or error message
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col gap-4 items-center justify-center">
        {posts.map((post : post) => (
          <PostCard key={post.postId} post={post} indicator={"main"} />
        ))}
      </div>
    </div>
  );
};

export default Products;
