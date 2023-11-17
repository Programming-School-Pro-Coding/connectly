import Image from "next/image";
import { currentUser } from "@clerk/nextjs";
import { post } from "@/lib/interfaces";
import Link from "next/link";
import { fetchUser } from "@/lib/actions/user";

const PostCard = async ({
  post,
  indicator,
}: {
  post: post;
  indicator: string;
}) => {
  const CurrentUser = await currentUser();

  const user = await fetchUser(post?.authorId);

  if (indicator === "main" && CurrentUser.id === user.id) {
    return null;
  }

  return (
    <Link
      href={`/post/${post?.postId}`}
      className="hover:scale-125 transition duration-700"
    >
      <div className="max-w-sm rounded overflow-hidden shadow-lg m-4 ml-2">
        <Image
          className="w-full h-64 object-cover object-center"
          src={post?.cover}
          alt={post?.title}
          width={512}
          height={512}
        />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{post?.title}</div>
          <p className="text-gray-700 text-base">
            {post?.description?.substring(0, 200)}
          </p>
        </div>
        <div className="flex gap-1 px-4 py-4">
          <span className="flex items-center gap-3 bg-gray-200 rounded-full w-fit px-2 py-1 text-small-semibold font-semibold text-gray-700 mr-2">
            <Image
              className="rounded-full w-10 object-cover"
              src={user?.image}
              alt={user?.name}
              width={128}
              height={128}
            />
            <p>{user?.name}</p>
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-2 py-3 text-small-medium font-semibold text-gray-700">
            {new Date(post?.createdAt).toDateString()}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
