"use client";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Paper from "@mui/material/Paper";
import { Box, List, ListItem, Divider, Typography } from "@mui/material";
import { search } from "@/utils/fetchData";
import { useRouter } from "next/navigation";


export default function SearchBar(): JSX.Element {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [results, setResults] = useState<any[]>([]); // Replace `any` with the appropriate type for your data
  const [error, setError] = useState<string | null>(null);
  const [recentSearches, setRecentSearches] = useState<string[]>(["Face Wash", "The Derma Co. 1% Hyaluronic Sunscreen"]); // Sample recent searches
  const [isFocused, setIsFocused] = useState<boolean>(false); // To track input focus
  const router = useRouter()
  // Handle search
  const handleSearch = async (query: string) => {
    try {
      const data = await search(query);
      setResults(data.products); // Set the search results
      setError(null);   // Reset any previous errors
      if (!recentSearches.includes(query)) {
        setRecentSearches([...recentSearches, query]); // Add query to recent searches
      }
    } catch (err) {
      setError('Failed to fetch search results');
      setResults([]);   // Clear previous results if error occurs
    }
  };

  // Hide the menu when the input field loses focus
  const handleBlur = () => {
    // Delay the hiding to allow clicks on the dropdown items
    setTimeout(() => setIsFocused(false), 200);
  };

  return (
    <Box className="flex w-full gap-2">
      <Box className="w-full">
        <Paper className="flex rounded-md" elevation={0} variant="outlined">
          <Box className="flex items-center flex-1">
            <IconButton className="p-[10px]" type="button" aria-label="search">
              <SearchIcon />
            </IconButton>
            <InputBase
              className="w-full ml-1 flexGrow-1"
              placeholder="Search on Nykaa"
              onFocus={() => setIsFocused(true)}  // Show dropdown when focused
              onBlur={handleBlur}                // Hide dropdown when focus is lost
              onKeyUp={(event: React.KeyboardEvent<HTMLInputElement>) => {
                const value = (event.target as HTMLInputElement).value;
                setSearchQuery(value);
                handleSearch(value);  // Trigger search when the user types
              }}
            />
          </Box>
        </Paper>

        {/* Conditionally render the dropdown based on focus and searchQuery */}
        {isFocused && (
          <Box sx={{ position: 'relative', zIndex: 1000, mt: 1 }}>
            {/* Recent Searches */}
            {searchQuery.length === 0 && (
              <List component="nav" aria-label="recent searches" sx={{ backgroundColor: 'white', borderRadius: '4px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', maxHeight: '200px', overflowY: 'auto' }}>
                {recentSearches.map((item, index) => (
                  <ListItem button key={index}>
                    <SearchIcon fontSize="small" style={{ marginRight: '8px' }} />
                    {item}
                  </ListItem>
                ))}
                <Divider />
                {/* <Typography variant="subtitle2" sx={{ padding: '8px', color: '#555', fontWeight: 'bold' }}>
                  Trending Searches
                </Typography> */}
                {/* You can add trending searches here */}
                {/* {["Nykaa Cosmetics", "Face Masks", "Nykaa Naturals", "Lipstick", "Hand Sanitisers"].map((trend, index) => (
                  <ListItem button key={index}>
                    {trend}
                  </ListItem>
                ))} */}
              </List>
            )}

            {/* Search Results */}
            {searchQuery.length > 0 && (
              <List component="nav" aria-label="search results" sx={{ backgroundColor: 'white', borderRadius: '4px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', maxHeight: '200px', overflowY: 'auto' }}>
                {results.length > 0 ? (
                  results.map((result) => (
                    <ListItem   onClick={() => {
                      
                        router.push(`/products/${result.id}`);
                      
                    }} button key={result.id}>
                      {result.name} {/* Adjust based on your data structure */}
                    </ListItem>
                  ))
                ) : (
                  <ListItem>No results found</ListItem>
                )}
              </List>
            )}

            {/* Error */}
            {error && <p>{error}</p>}
          </Box>
        )}
      </Box>
    </Box>
  );
}
