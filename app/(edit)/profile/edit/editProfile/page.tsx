import { currentUser } from "@clerk/nextjs";
import { redirect } from 'next/navigation';

import { fetchUser } from "@/lib/actions/user";
import AccountProfile from "@/components/forms/AccountProfile";

const page = async () => {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const userData = {
    id: String(user?.id),
    username: String(user?.username),
    name: String(user?.firstName),
    bio: userInfo.bio,
    email: String(user?.emailAddresses[0].emailAddress),
    image: String(user?.imageUrl),
    development: userInfo.development,
    phone: userInfo.phone,
    posts: userInfo.posts,
  };

  return (
    <div className="bg-slate-900 p-12">
      <h1 className='head-text'>Edit Profile</h1>
      <p className='mt-3 text-base-regular text-light-2'>Make any changes</p>

      <section className='mt-12'>
        <AccountProfile user={userData} btnTitle='Continue' update={true} />
      </section>
    </div>
  );
};

export default page;
