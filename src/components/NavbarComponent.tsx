/** @format */
"use client";

import {
  AppBar,
  Box,
  Container,
  IconButton,
  Typography,
  styled,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import Link from "next/link";

export default function NavbarComponent() {
  return (
    <AppBar position='static'>
      <NavContent>
        <NavLogo>
          <IconButton>
            <HomeIcon />
          </IconButton>
          <Typography variant='h6' fontSize={16}>
            NEXTJS
          </Typography>
        </NavLogo>
        <ListLink>
          <NavLink href='/'>Home</NavLink>
          <NavLink href='/about'>About</NavLink>
        </ListLink>
      </NavContent>
    </AppBar>
  );
}

const NavContent = styled(Container)({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0.5rem",
});

const NavLogo = styled(Box)({
  display: "flex",
  alignItems: "center",
});

const ListLink = styled(Box)({
  display: "flex",
  gap: "1rem",
});

const NavLink = styled(Link)({
  textDecoration: "none",
  color: "white",
});
