import React from 'react';
import { redirect } from 'next/navigation';
import { currentUser } from '@clerk/nextjs';

import Posts from '@/sections/post/page';
import { fetchUser } from '../../lib/actions/user'
import { fetchPosts } from '@/lib/actions/post';
import { post } from '@/lib/interfaces';

async function getPosts() {
  const user = await currentUser();
  if(!user) return null;

  const userInfo = await fetchUser(user.id);
  if(!userInfo?.onboarded) redirect('/onboarding')

  const data = await fetchPosts();

  return {
    posts: data
  }
}



const Home = async () => {
  const props = await getPosts();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-[#ecf0f1] text-[#2c3e50]">
      <Posts posts={props?.posts} />
    </main>
  )
};

export default Home;
