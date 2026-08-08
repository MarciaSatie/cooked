import { useState } from "react";
import type { MouseEvent } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { styled } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import myLogo from "../../assets/cook-hat.png";
import { useAuth } from "../../supabase/auth";
import LogoutIcon from '@mui/icons-material/Logout';
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

interface HeaderProps {
  title: string;
}

const styles = {
  title: {
    flexGrow: 1,
  },
};

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

export default function Header({ title }: HeaderProps) {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"), { noSsr: true });
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);

  const menuOptions = [
    { label: "Home", path: "/home" },
    { label: "Surprise ME!", path: "/surpriseMe" },
    { label: "Categories", path: "/categories" },
    { label: "Recipes By Ingredient", path: "/recipeByIngredient" },
    { label: "Favorites", path: "/favorites" },
  ];

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
    setAnchorEl(null);
  };

  const handleMenu = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuSelect = (pageURL: string) => {
    navigate(pageURL);
    setAnchorEl(null);
  };

  return (
    <>
    <AppBar position="fixed" color="primary" elevation={0}>
      <Toolbar>
        <Box component="img" src={myLogo} alt="Logo" sx={{ width: 50, height: 50, marginRight: 2 }} />

        <Box sx={{ display: "flex", flexDirection: "column", ...styles.title }}>
          <Typography variant="body2" color="inherit">
            Hi {user?.email}
          </Typography>

          <Typography variant="h6">
            {title}
          </Typography>
        </Box>

        {user && isMobile ? (
          <>
            <IconButton
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
              size="large"
            >
              <MenuIcon />
            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={open}
              onClose={() => setAnchorEl(null)}
            >
              {menuOptions.map((opt) => (
                <MenuItem key={opt.label} onClick={() => handleMenuSelect(opt.path)}>
                  {opt.label}
                </MenuItem>
              ))}
              <MenuItem onClick={handleSignOut}>
                Sign out
                <LogoutIcon fontSize="small" sx={{ ml: 1 }} />
              </MenuItem>
            </Menu>
          </>
        ) : (
          user && (
            <Box sx={{ display: "flex", gap: 2 }}>
              {menuOptions.map((opt) => (
                <Button key={opt.label} color="inherit" component={RouterLink} to={opt.path}>
                  {opt.label}
                </Button>
              ))}
              <Button color="inherit" onClick={handleSignOut} title="Log out" endIcon={<LogoutIcon />}>
                Sign out
              </Button>
            </Box>
          )
        )}
      </Toolbar>
    </AppBar>
    <Offset />
    </>
  );
}