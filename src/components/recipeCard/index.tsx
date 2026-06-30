import { Card, CardContent, Typography, Box, Chip, Divider, CardMedia, IconButton } from '@mui/material';
// 1. Import the Heart Icon from the icons package
import FavoriteIcon from '@mui/icons-material/Favorite';
import type { CleanRecipe } from '../../types/interfaces';

// Update your interface if you haven't already to include isFavorite
type RecipeCardProps = {
  recipe: CleanRecipe & { isFavorite?: boolean }; 
};

export default function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <Card sx={{ maxWidth: 600, margin: '20px auto', borderRadius: 2, overflow: 'hidden' }}>
      
      {/* 2. Wrap CardMedia in a Relative Box to position the heart icon on top of it */}
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height="250"
          image={recipe.strMealThumb}
          alt={recipe.strMeal}
        />
        
        {/* Heart Icon button (isFavorite)*/}
        <IconButton
          sx={{
            position: 'absolute',
            top: 12,
            right: 12,
            backgroundColor: 'rgba(255, 255, 255, 0.7)', // Semi-transparent white background
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.9)', // Brighten on hover
            },
          }}
          onClick={() => console.log('Heart clicked for recipe:', recipe.idMeal)}
        >
          {/* 4. Dynamic Color logic: Red if true, grey if false */}
          <FavoriteIcon 
            sx={{ 
              color: recipe.isFavorite ? '#e53935' : '#b0bec5' 
            }} 
          />
        </IconButton>
      </Box>

      <CardContent>
        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
          {recipe.strMeal}
        </Typography>

        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
          <Chip label={recipe.strCategory} color="primary" size="small" />
          <Chip label={recipe.strArea} color="secondary" variant="outlined" size="small" />
        </Box>

        <Divider sx={{ my: 2 }} />

        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
          Ingredients
        </Typography>

        <Box component="ul" sx={{ pl: 2, mt: 0, mb: 2 }}>
          {recipe.ingredientsList.map((item, index) => (
            <Box component="li" key={index} sx={{ mb: 0.5 }}>
              <Typography variant="body2">
                <strong>{item.measure}</strong> {item.name}
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}
