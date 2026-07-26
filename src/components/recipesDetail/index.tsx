import React from "react"; // replace existing react import
import { useParams } from "react-router-dom";
import { useQueryRecipeByID } from '../../hooks/useRecipes'; 
import Spinner from "../../components/spinner";
import { Toolbar,Typography,Container,Box,Paper,Button ,Chip, Divider, CardMedia, IconButton, Tabs, Tab} from '@mui/material';



function RecipesDetail() {
  const { id } = useParams();
  console.log(`Recipe ID is ${id}`);
  
  const {recipe, isLoading, isError, error} = useQueryRecipeByID(id!);

  if (!recipe) return <div>No recipe found</div>;
  if (isLoading) {return <Spinner />;}
  if (isError) {return <h1>{(error as Error).message}</h1>;}

  return (
    // Box with flexbox ensures the footer stays at the bottom
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      
      {/* 2. Main Content Area */}
      {/* Container limits maximum width and centers content automatically */}
      <Container component="main" maxWidth="md" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
        {/* Paper MUI adds elevation/ dropshadow */}
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          {/* Recipe Title */}
          <Typography variant="h4" component="h1" gutterBottom>
            {recipe.strMeal}
          </Typography>

          <CardMedia
            component="img"
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
            sx={{ width: '100%', borderRadius: 2 }}
          />
          <Typography variant="body1" color="text.secondary">
            This is a clean, structured starting point for your new page. 
            The Paper component acts as a nice white canvas for your forms, 
            tables, or text.
          </Typography>
        </Paper>
      </Container>

      {/* 3. Footer */}
      <Box component="footer" sx={{ py: 3, px: 2, mt: 'auto', backgroundColor: 'grey.100' }}>
        <Container maxWidth="sm">
          <Typography variant="body2" color="text.secondary" align="center">
            © {new Date().getFullYear()} My Company
          </Typography>
        </Container>
      </Box>

    </Box>
  );

}

export default RecipesDetail