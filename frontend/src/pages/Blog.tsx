import AppBar from "../components/AppBar";
import BlogSkelton from "../components/BlogSkelton";
import FullBlog from "../components/FullBlog";
import { useBlog } from "../hooks"
import { useParams } from "react-router-dom";

const Blog = () => {
  const {id} = useParams();
  
  const {loading, blog} = useBlog({id : id || ""});
  if(loading){
    return <div>
      <AppBar/>
      <BlogSkelton/>
    </div>
  }
  return (
    <div><FullBlog blog={blog}/></div>
  )
}

export default Blog