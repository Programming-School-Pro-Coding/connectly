import type { ObjectId } from "mongoose";
import { currentUser } from "@clerk/nextjs";

import NewPost from "@/components/forms/NewPost";
import { fetchUser } from "@/lib/actions/user";

const page = async () => {
  const user = await currentUser();
  const user2 = await fetchUser(String(user?.id));
  return (
    <div className='container min-h-screen mx-auto my-auto bg-white w-full h-full px-5 py-5'>
      <NewPost user={user2} btnTitle="New Post" />
    </div>
  );
}

export default page;