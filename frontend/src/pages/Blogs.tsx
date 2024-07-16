import AppBar from "../components/AppBar";
import BlogCard from "../components/BlogCard";
import BlogsSkelton from "../components/BlogsSkelton";
import { userBlogs } from "../hooks";

const Blogs = () => {
  const { loading, blogs } = userBlogs();
  if (loading) {
    return <div>
        <AppBar/>
        <div className="flex justify-center">
            <div className="flex flex-col">
            <BlogsSkelton/>
            <BlogsSkelton/>
            <BlogsSkelton/>
            <BlogsSkelton/>
            </div>
        </div>
    </div>;
  }
  return (
    <div>
      <AppBar />
      <div className="flex justify-center ">
        <div className="">
          {blogs.map((blog) => (
            <BlogCard
              id={blog.id}
              authorName={blog.author.name || "Anonymous"}
              title={blog.title}
              content={blog.content}
              publishedDate="2022-01-01"
            />
          ))}
        </div>
      </div>
    </div>
  );
};
export default Blogs;
