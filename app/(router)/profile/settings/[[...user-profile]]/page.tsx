import { UserProfile } from "@clerk/nextjs";

const page = () => {
  return (
    <div className="flex items-center justify-center w-full">
      <UserProfile path="/profile/settings" routing="path" />
    </div>
  );
}

export default page;