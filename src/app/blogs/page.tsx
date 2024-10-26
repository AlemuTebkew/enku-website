"use client";
import { useEffect, useState } from "react";
import { fetchBlogs } from "@/utils/fetchData";
import Pagination from "@mui/material/Pagination";
import AutocompleteSearch from "@/components/blog/AutoComplete";
import SingleBlog from "@/components/blog/BlogComponent";

interface BlogPost {
  id: number;
  title: string;
  content: string;
  type: string;
  description: string;
}

const BlogList = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch blogs with search term and pagination
  const fetchBlogData = async (page = 1, type = filter, search = "") => {
    const response = await fetchBlogs({ page, limit: 10, type, search });
    if (response) {
      setPosts(response.data);
      setTotalPages(response.meta.totalPages);
    }
  };

  useEffect(() => {
    fetchBlogData(currentPage);
  }, [filter, currentPage]);

  // Handle search term change
  const handleSearch = (results: BlogPost[]) => {
    setCurrentPage(1); // Reset to first page on search
    setPosts(results); // Update posts with search results
  };

  // Handle filter change
  const handleFilterChange = (type: string) => {
    setFilter(type);
    setCurrentPage(1); // Reset to first page when filter changes
    fetchBlogData(1, type);
  };

  const handlePageChange = (event: any, value: number) => {
    setCurrentPage(value);
  };

  return (
    <div>
         <aside className="flex flex-wrap justify-center md:hidden">
          <button
            onClick={() => handleFilterChange("all")}
            className="p-2 text-left bg-primary rounded hover:bg-gray-300 mx-2 my-1 md:hidden"
          >
            All
          </button>
          <button
            onClick={() => handleFilterChange("blog")}
            className="p-2 text-left bg-primary rounded hover:bg-gray-300 mx-2 my-1 md:hidden"
          >
            Blogs
          </button>
          <button
            onClick={() => handleFilterChange("tip")}
            className="p-2 text-left bg-primary rounded hover:bg-gray-300 mx-2 my-1 md:hidden"
          >
            Tips
          </button>
          <button
            onClick={() => handleFilterChange("video")}
            className="p-2 text-left bg-primary rounded hover:bg-gray-300 mx-2 my-1 md:hidden"
          >
            Videos
          </button>
          </aside>
      <div className="container mx-auto flex justify-between md:px-10 pb-8">
   
        <aside className="w-1/4 mt-[130px] hidden md:block">
          <h2 className="text-2xl font-bold mb-4">Categories</h2>
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => handleFilterChange("all")}
                className="block p-2 text-left w-full bg-gray-200 rounded hover:bg-gray-300"
              >
                All
              </button>
            </li>
            <li>
              <button
                onClick={() => handleFilterChange("blog")}
                className="block p-2 text-left w-full bg-gray-200 rounded hover:bg-gray-300"
              >
                Blogs
              </button>
            </li>
            <li>
              <button
                onClick={() => handleFilterChange("tip")}
                className="block p-2 text-left w-full bg-gray-200 rounded hover:bg-gray-300"
              >
                Tips
              </button>
            </li>
            <li>
              <button
                onClick={() => handleFilterChange("video")}
                className="block p-2 text-left w-full bg-gray-200 rounded hover:bg-gray-300"
              >
                Videos
              </button>
            </li>
          </ul>
        </aside>

        <main className="w-full md:w-3/4 md:ml-4">
          {/* <h1 className="text-4xl font-bold text-center mb-8">Blog</h1> */}

          {/* Search bar */}
          <AutocompleteSearch
            onSearch={handleSearch} // Update parent with search results
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <SingleBlog key={post.id} post={post} />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-8">
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="secondary"
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default BlogList;
