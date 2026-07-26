import { useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Tabs, Tab, Container, Paper } from "@mui/material";
import bgImage2 from "../assets/backgorund_img2.png";
import RecipesDetail from "../components/recipesDetail";
import Spinner from "../components/spinner";
import GoToNextRecipe from "../components/cardIcons/goToNextRecipe";
import GoToPreviousRecipe from "../components/cardIcons/goToPreviousRecipe";
import { useQueryRecipeByID } from '../hooks/useRecipes'; 

export default function RecipesDetailPage() {
  const { id } = useParams();
  console.log(`Recipe ID is ${id}`);

  const {recipe, isLoading, isError, error} = useQueryRecipeByID(id!);
  const [tabValue, setTabValue] = useState<number>(0);

  if (isLoading) {return <Spinner />;}
  if (isError) {return <h1>{(error as Error).message}</h1>;}
  if (!recipe) return <div>No recipe found</div>;

  const idNumber = parseInt(id!, 10); // Added radix 10 for safety
  const nextId = isNaN(idNumber) ? 1 : idNumber + 1; // Fallback if id is missing
  const previousId = isNaN(idNumber) ? 1 : idNumber - 1; 

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
            {tabValue === 0 && <RecipesDetail recipe={recipe} />}

            {/* Review Content Tab */}
            {tabValue === 1 && <Box>In progress</Box>}
          </Paper>
        </Container>
        </Box>
      </Box>
    </Box>
  );
}
