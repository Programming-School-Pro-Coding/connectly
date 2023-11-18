import Link from "next/link";
import Image from "next/image";

import { EpicIcon } from "../../assets";
import Dropdown from "../ui/dropdown";
import { fetchUser } from "@/lib/actions/user";

const Navbar = async ({ id, email }: { id: string, email: string }) => {
  const user = await fetchUser(id);
  
  return (
    <div className="container mx-auto flex items-center justify-between w-full h-20 px-4 pl-1 py-4 bg-[#3498db]">
      <div className="hidden md:flex items-center gap-5">
        <Image src={EpicIcon} alt="EpicIcon" width={68} height={68} />
        <Link href="/">
          <h3 className="text-lg font-bold text-white">Connectly</h3>
        </Link>
      </div>

      <div className="flex items-center justify-center gap-5">
        <Link
          href="/"
          className="bg-[#192655] transition duration-700 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full float-right"
        >
          Home
        </Link>
        <Link
          href="/new"
          className="bg-[#192655] transition duration-700 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full float-right"
        >
          New
        </Link>
      </div>
      <div className="md:flex items-center transition duration-700 ease-in-out rounded-full border-2 border-white hover:border-[#91A7F7]">
        <div className="p-[2px]">
          <Dropdown id={user?.id} image={user?.image} user={user} email={email} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
