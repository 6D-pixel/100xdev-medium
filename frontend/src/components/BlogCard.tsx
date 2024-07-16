import { Link } from "react-router-dom";

interface BlogCardType {
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
  id: string;
}
const BlogCard = ({
  id,
  authorName,
  title,
  content,
  publishedDate,
}: BlogCardType) => {
  return (
    <Link to={`/blog/${id}`}>
      <div className="p-4 border-b border-slate-300 pb-2 w-screen max-w-screen-md">
        <div className="flex">
          <div className="flex justify-center flex-col">
            <Avatar name={authorName} size="small" />
          </div>
          <div className="pl-2 font-normal text-slate-700 flex items-center text-sm">
            {authorName}
          </div>
          <div className="pl-2 font-semibold text-slate-500 flex items-center">
            .
          </div>
          <div className="pl-2 font-thin flex items-center text-sm">
            {publishedDate}
          </div>
        </div>
        <div className="text-xl font-semibold pt-2">{title}</div>
        <div className="text-base font-thin">
          {content.slice(0, 100) + "..."}
        </div>
        <div className="text-sm font-thin text-slate-500 pt-2">
          {Math.ceil(content.length / 100)} minutes(s) read
        </div>
      </div>
    </Link>
  );
};

export function Avatar({
  name,
  size = "small",
}: {
  name: string;
  size: "small" | "big";
}) {
  return (
    <div
      className={`relative inline-flex items-center justify-center  overflow-hidden rounded-full bg-gray-600 ${
        size === "small" ? "w-6 h-6" : "w-10 h-10"
      }`}
    >
      <span
        className={`${
          size === "small" ? "text-xs" : "text-base"
        }font-medium text-white `}
      >
        {name[0]}
      </span>
    </div>
  );
}
export default BlogCard;
