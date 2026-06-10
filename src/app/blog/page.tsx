import path from "path";
import React from "react";
import fs from "fs";
import matter from "gray-matter";
import Image from "next/image";
import Link from "next/link";
interface BlogInfo {
  file: string;
  title: string;
  author?: string;
  date: Date;
  description?: string;
  tags?: string[];
  image?: string;
}

export default async function page() {
  const blogsPath = path.join(process.cwd(), "src", "blogs");
  const files = fs.readdirSync(blogsPath);
  const data: Array<BlogInfo> = files.map((f) => {
    const matterFile = matter.read(path.join(blogsPath, f));
    return matterFile.data as BlogInfo;
  });

  return (
    <div className="flex  flex-col items-center gap-4 mt-4">
      {data.map((item, idx) => {
        return (
          <Link
            href={`/blog/${item.file}`}
            key={idx}
            className="flex border border-solid border-zinc-600 hover:border-zinc-400 rounded-md overflow-hidden w-full"
            title={item.description!}
          >
            <Image
              src={item.image!}
              alt={item.description!}
              width={100}
              height={100}
              className="object-cover aspect-square"
            />
            <div className="flex-1 flex flex-col justify-center items-center gap-2 overflow-hidden py-2 pl-4 pr-4 md:pr-16">
              <div className="text-lg font-bold text-left w-full text-orange-400">
                {item.title}
              </div>
              <div className="text-xs w-full text-left">
                {item.date.toLocaleDateString()}
              </div>
              <div className="text-sm w-full text-left font-medium line-clamp-2">
                {item.description}
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
