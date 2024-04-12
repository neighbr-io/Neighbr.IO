import React, { useState } from 'react';
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import SearchBar from "../SearchBar/SearchBar";
import logoImage from "../../image/logo.png";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAuthenticated, useLogoutMutation } from "../../features/Dashboard/authSlice";
import { useNavigate } from 'react-router-dom';

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
    boxShadow:
      "0 0 10px rgba(0, 0, 0, 0.1), 0 0 20px rgba(0, 0, 0, 0.1), 0 0 30px rgba(0, 0, 0, 0.2)",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const HoverTypography = styled(Typography)(({ theme }) => ({
  "&:hover": {
    color: theme.palette.secondary.main,
    cursor: "pointer",
  },
}));

export default function Navigation() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const [logout, { isLoading }] = useLogoutMutation();
  const navigate = useNavigate();

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleSignout = async () => {
    try {
      await logout().unwrap();
      navigate('/signin');
    } catch (error) {
     
    }
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }
    setIsDrawerOpen(open);
  };

  const menuId = "primary-search-account-menu";

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {isAuthenticated ? (
        <>
          <MenuItem onClick={() => navigate("/dashboard")}>My account</MenuItem>
          <MenuItem onClick={handleSignout} disabled={isLoading}>Sign out</MenuItem>
        </>
      ) : (
        <MenuItem onClick={() => navigate("/signin")}>Sign In</MenuItem>
      )}
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";

  //Render the mobile menu
  const drawer = (
    <Box
      sx={{ width: "auto" }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {/*Always visible menu components */}
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/">
            <ListItemIcon></ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton component={Link} to="/projects">
            <ListItemIcon></ListItemIcon>
            <ListItemText primary="Projects" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton component={Link} to="/faq">
            <ListItemIcon></ListItemIcon>
            <ListItemText primary="FAQ" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton component={Link} to="/">
            <ListItemIcon></ListItemIcon>
            <ListItemText primary="New Project" />
          </ListItemButton>
        </ListItem>

        {/* Components that are only visislbe when you're signed in */}
        {isAuthenticated ? (
          <>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  navigate("/dashboard");
                }}
              >
                <ListItemIcon></ListItemIcon>
                <ListItemText primary="My Account" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton onClick={handleSignout}>
                <ListItemIcon></ListItemIcon>
                <ListItemText primary="Sign Out" />
              </ListItemButton>
            </ListItem>
          </>
        ) : (
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                 navigate("/signin");
              }}
            >
              {/* Components that are only visislbe when you're signed out */}
              <ListItemIcon></ListItemIcon>
              <ListItemText primary="Sign In" />
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" color="default">
        <Toolbar>
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <img
              src={logoImage}
              alt="Neighbr.io Logo"
              style={{ height: "70px", marginRight: "5px" }} // Adjust the height and margin as needed
            />
          </Link>
          <SearchBar onSearch={(query) => console.log(query)} />
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Link
              to="/projects"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Typography
                variant="BUTTON TEXT"
                noWrap
                component="div"
                sx={{
                  display: { xs: "none", sm: "block" },
                  mr: 3,
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  padding: "10px 10px",
                }}
              >
                Projects
              </Typography>
            </Link>

            <Link
              to="/newprojectform"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Typography
                variant="BUTTON TEXT"
                noWrap
                component="div"
                sx={{
                  display: { sm: "none", md: "block" },
                  mr: 3,
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  padding: "10px 10px",
                }}
              >
                New Project
              </Typography>
            </Link>

            <Link
              to="/Faq"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Typography
                variant="BUTTON TEXT"
                noWrap
                component="div"
                sx={{
                  display: { xs: "none", sm: "block" },
                  mr: 3,
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  padding: "10px 10px",
                }}
              >
                FAQ
              </Typography>
            </Link>

            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={toggleDrawer(true)}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer anchor="top" open={isDrawerOpen} onClose={toggleDrawer(false)}>
        {drawer}
      </Drawer>
      {renderMenu}
    </Box>
  );
}