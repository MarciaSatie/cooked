import { useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Tabs, Tab, Container, Paper } from "@mui/material";
import bgImage2 from "../assets/backgorund_img2.png";
import RecipesDetail from "../components/recipesDetail";
import GoToNextRecipe from "../components/cardIcons/goToNextRecipe";
import GoToPreviousRecipe from "../components/cardIcons/goToPreviousRecipe";

export default function RecipesAtoZDetail() {
  const { id } = useParams();
  console.log(`Recipe ID is ${id}`);
  const idNumber = parseInt(id!, 10); // Added radix 10 for safety
  const nextId = isNaN(idNumber) ? 1 : idNumber + 1; // Fallback if id is missing
    const previousId = isNaN(idNumber) ? 1 : idNumber - 1; 
  const [tabValue, setTabValue] = useState<number>(0);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Box
      sx={{
        backgroundImage: `url(${bgImage2})`,
        backgroundRepeat: "repeat",
        backgroundPosition: "top left",
        backgroundSize: "auto",
      }}
    >
      <Box sx={{ position: "relative" }}>
        <GoToNextRecipe url={`/recipesAtoZ/${nextId}`} />
        <GoToPreviousRecipe url={`/recipesAtoZ/${previousId}`}/>
        <Box
          sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
        >
        {/* Main Content Area */}
        {/* Container limits maximum width and centers content automatically */}
        <Container
          component="main"
          maxWidth="md"
          sx={{ mt: 4, mb: 4, flexGrow: 1 }}
        >
          {/* Paper MUI adds elevation/ dropshadow */}
          <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
            {/* Tabs switch between ingredients and instructions */}
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              variant="fullWidth"
              sx={{ mb: 2, borderBottom: 1, borderColor: "divider" }}
            >
              <Tab label="Recipe" /> {/* Index 0 */}
              <Tab label="Reviews" /> {/* Index 1 */}
            </Tabs>

            {/* Recipe Content Tab */}
            {tabValue === 0 && <RecipesDetail id={id} />}

            {/* Review Content Tab */}
            {tabValue === 1 && <Box>In progress</Box>}
          </Paper>
        </Container>
        </Box>
      </Box>
    </Box>
  );
}
