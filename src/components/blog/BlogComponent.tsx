// components/SingleBlog.tsx
import Link from "next/link";
import VideoRenderer from "@/components/blog/VideoRenderer";
import ImageRenderer from "@/components/blog/ImageRenderer";

interface BlogPost {
  id: number;
  title: string;
  content: string;
  type: string;
  description: string;
}

interface SingleBlogProps {
  post: BlogPost;
}

const SingleBlog: React.FC<SingleBlogProps> = ({ post }) => {
  return (
    <div className="bg-white shadow-md rounded-md overflow-hidden" >
      <div className="cursor-pointer" onClick={() => window.location.href = `/blogs/${post.id}`}>
      {post.type === "video" ? (
      <VideoRenderer content={post.content} title={post.title} width={500} height={200} />
      ) : (
      <ImageRenderer content={post.content} title={post.title} width={500} height={200}/>
      )}
      </div>
      <div className="p-4">
      <h2 className="text-xl font-bold mb-2">{post.title}</h2>
      <Link href={`/blogs/${post.id}`} className="text-blue-500 hover:underline">
        Read more
      </Link>
      </div>
    </div>
  );
};

export default SingleBlog;
