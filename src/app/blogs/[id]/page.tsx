"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchBlog, fetchBlogs } from "@/utils/fetchData";
import Link from "next/link";
import VideoRenderer from "@/components/blog/VideoRenderer"; // Adjust the import path based on your project structure
import ImageRenderer from "@/components/blog/ImageRenderer"; // Adjust the import path based on your project structure

interface BlogPost {
  id: number;
  title: string;
  content: string;
  type: string;
  description: string;
  image: string;
}

const BlogDetail = () => {
  const params = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { id } = params;

      if (id) {
        const blogData = await fetchBlog(id.toString());
        setPost(blogData || null);

        if (blogData) {
          const relatedData = await fetchBlogs({ type: blogData?.type });
          setRelatedPosts(relatedData?.data || []);
        }
      }
      setLoading(false);
    };

    fetchData();
  }, [params]);

  if (loading) {
    return <div className="flex justify-center ">Loading...</div>;
  }

  if (!post) {
    return <div>Blog post not found.</div>;
  }

  return (
    <div className="container mx-auto md:px-[150px] py-8">
      <h1 className="text-4xl font-bold mb-4 pl-3">{post.title}</h1>
      {post.type === "video" ? (
        <VideoRenderer content={post.content} title={post.title} height={400} />
      ) : (
        <ImageRenderer content={post.content} title={post.title} width={1000} height={400} />
      )}
      <div
        className="mb-6"
        dangerouslySetInnerHTML={{ __html: post.description }}
      />
      <h2 className="text-2xl font-bold my-4">Related Blogs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatedPosts.map((relatedPost) => (
          <div
            key={relatedPost.id}
            className="bg-white shadow-md rounded-md overflow-hidden"
          >
            {relatedPost.type === "video" ? (
              <VideoRenderer
                content={relatedPost.content}
                title={relatedPost.title}
              />
            ) : (
              <ImageRenderer
                content={relatedPost.content}
                title={relatedPost.title}
              />
            )}
            <div className="p-4">
              <h3 className="text-lg font-bold">{relatedPost.title}</h3>
              <Link
                href={`/blogs/${relatedPost.id}`}
                className="text-blue-500 hover:underline"
              >
                Read more
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogDetail;
