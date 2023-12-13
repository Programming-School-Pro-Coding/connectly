"use client";

import * as z from "zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { ChangeEvent, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import remarkGfm from "remark-gfm";
import Markdown from "react-markdown";
import Button from "@mui/material/Button";
import PostAddRoundedIcon from "@mui/icons-material/PostAddRounded";

import CodeBlock from "../../components/ui/code";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { useUploadThing } from "@/lib/uploadthing";
import { isBase64Image } from "@/lib/utils";

import { PostValidation } from "@/lib/validations/post";
import { user } from "@/lib/interfaces";
import { createId } from "../../lib/utils";
import { createPost } from "../../lib/actions/post";

interface Props {
  user: user;
  btnTitle: string;
}

const NewPost = ({ user, btnTitle }: Props) => {
  const router = useRouter();
  const { startUpload } = useUploadThing("media");
  const [activeTab, setActiveTab] = useState("input");

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const [files, setFiles] = useState<File[]>([]);
  const [isUploaded, setIsUploaded] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof PostValidation>>({
    resolver: zodResolver(PostValidation),
    defaultValues: {
      cover: "",
      title: "",
      content: "",
      description: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof PostValidation>) => {
    const blob = values.cover;

    const hasImageChanged = isBase64Image(blob);
    if (hasImageChanged) {
      const imgRes = await startUpload(files);

      if (imgRes && imgRes[0].fileUrl) {
        values.cover = imgRes[0].fileUrl;
      }
    }

    const postId = createId();

    const post = {
      postId: postId,
      userId: user.id,
    };

    await createPost(
      {
        title: values.title,
        content: values.content,
        cover: values.cover,
        description: values.description,
        createdAt: new Date().toDateString(),
        authorId: user.id,
        postId: postId,
        likes: [],
      },
      post
    );

    router.push("/");
  };

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const fileReader = new FileReader();

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFiles(Array.from(e.target.files));

      if (!file.type.includes("image")) return;

      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || "";
        form.setValue("cover", imageDataUrl); // Set form field value
        setIsUploaded(true);
      };

      fileReader.readAsDataURL(file);
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          className="flex flex-col justify-start gap-10"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="cover"
            render={({ field }) => (
              <FormItem className="flex items-center justify-center gap-4">
                <FormLabel className="account-form_image-label">
                  {field.value ? (
                    <Image
                      src={field.value}
                      alt="profile_icon"
                      width={1025}
                      height={1025}
                      priority
                      className="object-contain w-full h-full rounded-lg"
                    />
                  ) : null}
                  {isUploaded === false && (
                    <>
                      <button
                        type="button"
                        className="text-white transition px-4 py-3 bg-slate-800 hover:bg-slate-400"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        Upload File
                      </button>
                      <Input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImage}
                      />
                    </>
                  )}
                </FormLabel>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-3">
                <FormLabel className="text-base-semibold text-black">
                  Title
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    className="account-form_input no-focus"
                    placeholder="Enter your title"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-3">
                <FormLabel className="text-base-semibold text-black">
                  Description
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    className="account-form_input no-focus"
                    placeholder="Enter your Description"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-3">
                <FormLabel className="text-base-semibold text-black">
                  Content
                </FormLabel>
                <div className="flex mb-4">
                  <div
                    className={`cursor-pointer transition py-2 px-4 border-b-2 ${
                      activeTab === "input"
                        ? "border-blue-500 bg-blue text-white"
                        : ""
                    }`}
                    onClick={() => handleTabChange("input")}
                  >
                    Input
                  </div>
                  <div
                    className={`cursor-pointer transition py-2 px-4 border-b-2 ${
                      activeTab === "result"
                        ? "border-blue-500 bg-blue text-white"
                        : ""
                    }`}
                    onClick={() => handleTabChange("result")}
                  >
                    Result
                  </div>
                </div>
                <FormControl>
                  {activeTab === "input" ? (
                    <Textarea
                      rows={10}
                      className="account-form_input no-focus"
                      {...field}
                    />
                  ) : (
                    <div className="mt-4">
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
                            <a
                              className={`text-blue underline ${className}`}
                              {...props}
                            >
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
                          blockquote: ({
                            node,
                            className,
                            children,
                            ...props
                          }) => (
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
                            <th
                              className={`py-2 px-4 bg-gray-200 ${className}`}
                              {...props}
                            >
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
                        {field.value}
                      </Markdown>
                    </div>
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" variant="outlined" startIcon={<PostAddRoundedIcon />}>
            {btnTitle}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default NewPost;
