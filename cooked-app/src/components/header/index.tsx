import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import myLogo from '../../assets/cook-hat.png';

interface HeaderProps {
  title: string;          
}

export default function Header({ title }: HeaderProps) {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        {/* The Logo image */}
        <Box component="img" src={myLogo} alt="Logo" sx={{ width: 50, height: 50, marginRight: 2 }} />

        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>

        <Box sx={{ display: "flex", gap: 2 }}>
          <Button color="inherit" onClick={() => {}}>
            All Recipes
          </Button>
          <Button color="inherit">
            Favorites
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
