import AccountProfile from "@/components/forms/AccountProfile";
import { currentUser } from "@clerk/nextjs";

async function Page() {
  const user = await currentUser();

  const userData = {
    id: String(user?.id),
    username: user?.username,
    name: user?.firstName ?? "",
    bio: "",
    email: user?.emailAddresses[0].emailAddress,
    image: user?.imageUrl,
    development: "",
    phone: '',
    posts: [],
  };

  return (
    <main className='mx-auto flex max-w-3xl flex-col justify-start px-10 py-20'>
      <h1 className='head-text'>Onboarding</h1>
      <p className='mt-3 text-base-regular text-dark-4'>
        Complete your profile now, to use Epic Shop.
      </p>

      <section className='mt-9 bg-dark-2 p-10'>
        <AccountProfile user={userData} btnTitle='Continue' />
      </section>
    </main>
  );
}

export default Page;
