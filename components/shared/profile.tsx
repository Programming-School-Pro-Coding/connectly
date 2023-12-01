import { currentUser } from "@clerk/nextjs";

import { fetchUser } from "@/lib/actions/user";
import { user } from "@/lib/interfaces";

const Profile = ({ userData }: { userData: user }) => {
  console.log(userData);
  return (
    <div className="pr-6 mr-2">profile</div>
  );
};

export async function getStaticProps() {
  const clerkUser = await currentUser();
  const mongoDBUser = await fetchUser(String(clerkUser?.id));

  return {
    props: {
      userData: mongoDBUser,
    },
  };
}

export default Profile;
