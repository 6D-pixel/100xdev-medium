import { Blog } from "../hooks";
import AppBar from "./AppBar";
import { Avatar } from "./BlogCard";

const FullBlog = ({ blog }: { blog: Blog }) => {
  return (
    <div>
      <AppBar />

      <div className="grid grid-cols-12 px-10 pt-12 max-w-screen-2xl">
        <div className="col-span-8  ">
          <div className="text-5xl font-extrabold">{blog.title}</div>
          <div className="text-slate-500 pt-2">posted on 2 Dec</div>
          <div className="pt-4">{blog.content}</div>
        </div>
        <div className="col-span-4 ">
          <div className="text-lg text-slate-600">Author</div>
          <div className="flex items-center">
            <div className="pr-4">
            <Avatar name={blog.author.name || "Anonymous"} size="big"/>
            </div>
            <div>
              <div className="text-xl font-bold pt-4 ">
                {blog.author.name || "Anonymous"}
              </div>
              <div className="pt-2  text-slate-500">Random catch phase</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FullBlog;
