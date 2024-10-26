import React, { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { useRouter } from "next/navigation";
import { fetchBlogs } from "@/utils/fetchData";
import ImageRenderer from "./ImageRenderer"; // Adjust path as necessary
import VideoRenderer from "./VideoRenderer"; // Adjust path as necessary

interface BlogPost {
  id: number;
  title: string;
  content: string; // URL for images or videos
  type: string; // "image" or "video"
  description: string;
  image: string; // Assuming you have an image field in your blog data
}

interface AutocompleteSearchProps {
  onSearch: (results: BlogPost[]) => void; // Prop for updating parent with search results
}

const AutocompleteSearch: React.FC<AutocompleteSearchProps> = ({
  onSearch,
}) => {
  const [options, setOptions] = useState<BlogPost[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const fetchData = async () => {
    if (searchTerm.length >= 1) {
    const response = await fetchBlogs({ search: searchTerm });
    setOptions(response?.data || []);
    } else {
      setOptions([]);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(fetchData, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const handleOptionSelect = (option: BlogPost) => {
    router.push(`/blogs/${option.id}`);
  };

  const handleSearchSubmit = () => {
    alert();
    onSearch(options); // Update parent with the search results
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearchSubmit(); // Update parent if Enter is pressed
    }
  };

  return (
    <div className="flex w-full justify-center my-5">
      <Autocomplete
        className="w-full md:w-3/4 md:mr-3"
        size="small"
        freeSolo
        disableClearable
        options={options}
        getOptionLabel={(option: any) => option?.title || option?.description}
        renderOption={(props, option) => (
          <li
            {...props}
            onClick={() => handleOptionSelect(option)}
            className="flex items-center cursor-pointer w-full gap-3"
          >
            {option.type === "video" ? (
              <VideoRenderer
                content={option.content}
                title={option.title}
                height={200}
                width={200}
              />
            ) : (
              <ImageRenderer
                content={option.content}
                title={option.title}
                width={200}
                height={200}
              />
            )}
            <span className="w-3/4">{option.title}</span>
          </li>
        )}
        renderInput={(params) => (
          <TextField
            className="w-full"
            {...params}
            label="Search Blogs"
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown} // Handle key press events
            variant="outlined"
            InputProps={{
              ...params.InputProps,
              type: "search",
            }}
          />
        )}
      />
      <button
        onClick={handleSearchSubmit}
        className="bg-primary text-background py-2 px-4 rounded hidden md:flex"
      >
        Submit
      </button>
    </div>
  );
};

export default AutocompleteSearch;
