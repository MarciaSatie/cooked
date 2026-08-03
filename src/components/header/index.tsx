import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import myLogo from "../../assets/cook-hat.png";
import { useAuth } from "../../auth/AuthContextType";

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/"); // back to login page
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Box component="img" src={myLogo} alt="Logo" sx={{ width: 50, height: 50, marginRight: 2 }} />

        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>

        {user && (
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button color="inherit" component={RouterLink} to="/home">Home</Button>
            <Button color="inherit" component={RouterLink} to="/surpriseMe">Surprise ME!</Button>
            <Button color="inherit" component={RouterLink} to="/categories">Categories</Button>
            <Button color="inherit" component={RouterLink} to="/favorites">Favorites</Button>
            <Button color="inherit" onClick={handleSignOut}>Sign out</Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}