import React from "react"; // replace existing react import
import { useParams } from "react-router-dom";
import { useQueryRecipeByID } from '../../hooks/useRecipes'; 
import Spinner from "../../components/spinner";
import { Collapse ,Typography,Container,Box,Paper,Button ,Chip, Divider, CardMedia, IconButton, Tabs, Tab} from '@mui/material';
import PlaylistAddCheckCircleTwoToneIcon from '@mui/icons-material/PlaylistAddCheckCircleTwoTone';
import ExpandableSection from "../expandableSection";

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
      
      {/* Main Content Area */}
      {/* Container limits maximum width and centers content automatically */}
      <Container component="main" maxWidth="md" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
        {/* Paper MUI adds elevation/ dropshadow */}
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          {/* Recipe Title */}
          <Typography variant="h4" component="h1" gutterBottom>
            {recipe.strMeal}
          </Typography>

          {/* Recipe Image */}
          <CardMedia
            component="img"
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
            sx={{
              height: 400,
              width: 'auto',          // Prevents the image from stretching horizontally
              margin: '0 auto',       // Standard CSS trick to center block elements
              objectFit: 'contain',   // Ensures the full image fits without cropping
            }} />

          {/* Recipe Category */}
          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
            <Chip label={recipe.strCategory} color="primary" size="small" />
            <Chip label={recipe.strArea} color="secondary" variant="outlined" size="small" />
          </Box>
          

          {/* Ingrevient List */}
            <Box component="ul" sx={{ pl: 2, mt: 0, mb: 0 }}>
              <Typography variant="subtitle1" sx={{ fontSize: 25 ,fontWeight: 'bold', mb: 1 }}>
               <PlaylistAddCheckCircleTwoToneIcon color="secondary">
               </PlaylistAddCheckCircleTwoToneIcon> 
                Ingredients List
              </Typography>
            
              <ExpandableSection>
                {recipe.ingredientsList.map((item, index) => (
                  <Box component="li" key={index} sx={{ mb: 0.5 }}>
                    <Typography variant="body2">
                      <strong>{item.measure}</strong> {item.name}
                    </Typography>
                  </Box>
                ))}
              </ExpandableSection>
          </Box>
          
          {/* Recipe Instructions */}
          <Box component="ul" sx={{ pl: 2, mt: 0, mb: 0 }}>
              <Typography variant="subtitle1" sx={{ fontSize: 25 ,fontWeight: 'bold', mb: 1 }}>
               <PlaylistAddCheckCircleTwoToneIcon color="secondary">
               </PlaylistAddCheckCircleTwoToneIcon> 
                Instructions
              </Typography>
            
              <ExpandableSection>
                {recipe.ingredientsList.map((item, index) => (
                  <Box component="li" key={index} sx={{ mb: 0.5 }}>
                    <Typography variant="body2">
                      <strong>{item.measure}</strong> {item.name}
                    </Typography>
                  </Box>
                ))}
              </ExpandableSection>
          </Box>

        </Paper>
      </Container>

      {/* Footer */}
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