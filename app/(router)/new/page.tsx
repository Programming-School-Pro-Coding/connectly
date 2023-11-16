import { currentUser } from "@clerk/nextjs";

import NewPost from "@/components/forms/NewPost";

const page = async () => {
  const user = await currentUser();

  const userData = {
    id: String(user?.id),
    username: String(user?.username),
    name: String(user?.firstName) ?? "",
    bio: "",
    email: String(user?.emailAddresses[0].emailAddress),
    image: String(user?.imageUrl),
    development: "",
    phone: '',
    posts: [],
  };
  return (
    <div className='container min-h-screen mx-auto my-auto bg-white w-full h-full px-5 py-5'>
      <NewPost user={userData} btnTitle="New Post" />
    </div>
  );
}

export default page;