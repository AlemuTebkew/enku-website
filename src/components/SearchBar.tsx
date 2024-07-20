"use client"
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Paper from "@mui/material/Paper";
import { Box} from "@mui/material";

export default function SearchBar(props:{search?:any}): JSX.Element {
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
          onKeyUp={(event: any) =>props?.search(event.target.value)} 
          placeholder="Search..." />
        </Box>
      </Paper>
    </Box>
  </Box>
  );
}