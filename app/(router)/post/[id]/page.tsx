import React from "react";
import Image from "next/image";
import remarkGfm from "remark-gfm";
import Markdown from "react-markdown";

import { fetchPost } from "@/lib/actions/post";
import CodeBlock from "../../../../components/ui/code";
import { fetchUser } from "@/lib/actions/user";

const Page = async ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const post = await fetchPost(id);

  const user = await fetchUser(post?.authorId);

  return (
    <div className="flex flex-col items-center justify-center mx-4 md:mx-10 lg:mx-20">
      <div className="mb-4">
        <Image
          src={post?.cover}
          alt={post?.title}
          className="object-contain rounded-xl"
          width={1000}
          height={1000}
        />
      </div>
      <div className="flex items-center gap-4 mb-2">
        <div className="flex items-center">
          <Image
            src={user?.image}
            alt={user?.name}
            className="w-10 h-10 rounded-full mr-2"
            width={84}
            height={84}
          />
          <p className="font-bold text-lg">{user?.name}</p>
        </div>
        <p className="text-gray-500">
          {new Date(post?.createdAt).toDateString()}
        </p>
      </div>
      <h1 className="text-heading1-bold font-bold mb-2 text-center">
        {post?.title}
      </h1>
      <div className="mt-5 p-8 max-w-2xl w-full mx-auto">
        <Markdown
          className="markdown"
          remarkPlugins={[remarkGfm]}
          components={{
            code: ({ node, children, ...props }) => (
              <CodeBlock
                {...props}
                language={
                  typeof children === "string"
                    ? children.split("\n")[0].trim().toLowerCase()
                    : ""
                }
                value={String(children)}
              />
            ),
            h1: ({ node, className, children, ...props }) => (
              <h1
                className={`font-bold text-heading1-bold mb-4 ${className}`}
                {...props}
              >
                {children}
              </h1>
            ),
            h2: ({ node, className, children, ...props }) => (
              <h2
                className={`font-semibold text-heading2-bold mb-4 ${className}`}
                {...props}
              >
                {children}
              </h2>
            ),
            h3: ({ node, className, children, ...props }) => (
              <h3
                className={`font-semibold text-heading3-bold mb-4 ${className}`}
                {...props}
              >
                {children}
              </h3>
            ),
            h4: ({ node, className, children, ...props }) => (
              <h4
                className={`font-semibold text-heading4-medium mb-4 ${className}`}
                {...props}
              >
                {children}
              </h4>
            ),
            a: ({ node, className, children, ...props }) => (
              <a className={`text-blue underline ${className}`} {...props}>
                {children}
              </a>
            ),
            ul: ({ node, className, children, ...props }) => (
              <ul className={`list-disc ${className}`} {...props}>
                {children}
              </ul>
            ),
            ol: ({ node, className, children, ...props }) => (
              <ol
                className={`list-decimal list-inside ${className}`}
                {...props}
              >
                {children}
              </ol>
            ),
            li: ({ node, className, children, ...props }) => (
              <li
                className={`text-lg text-dark-4 my-2 ${className}`}
                {...props}
              >
                {children}
              </li>
            ),
            blockquote: ({ node, className, children, ...props }) => (
              <blockquote
                className={`border-l-4 border-blue-500 italic p-4 my-4 ${className}`}
                {...props}
              >
                {children}
              </blockquote>
            ),
            table: ({ node, className, children, ...props }) => (
              <table
                className={`min-w-full border border-gray-300 ${className}`}
                {...props}
              >
                {children}
              </table>
            ),
            th: ({ node, className, children, ...props }) => (
              <th className={`py-2 px-4 bg-gray-200 ${className}`} {...props}>
                {children}
              </th>
            ),
            td: ({ node, className, children, ...props }) => (
              <td className={`py-2 px-4 ${className}`} {...props}>
                {children}
              </td>
            ),
          }}
        >
          {post?.content}
        </Markdown>
      </div>
    </div>
  );
};

export default Page;
