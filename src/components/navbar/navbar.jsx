import { Stack, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { colors } from "../../constants/color";
import { SearchBar } from '../'
import { Loader } from '../'
import "./navbar.css";
const Navbar = () => {
  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      justifyContent={"space-between"}
      p={2}
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 9999,
        backgroundColor: colors.primary,
       }}
       flexWrap={'wrap'}
    >
      <Link to={'/'} style={{textDecoration: 'none', color: '#111', marginBottom: '10px'}}>
        <div className="logo">DIMA WEB</div>
      </Link>
      {<SearchBar/> ? <SearchBar /> : <Loader/>}
      <Box />
    </Stack>
  );
};

export default Navbar;
