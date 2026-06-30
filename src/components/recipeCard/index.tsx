import { Card, CardContent, Typography, Box, Chip, Divider, CardMedia, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import type { CleanRecipe } from '../../types/interfaces';


// Local props type for the RecipeCard component.
// The editor symbol label may show RecipeCardProps, but that is only a reference to this type.
type RecipeCardProps = {
  recipe: CleanRecipe;
};

export default function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <Card sx={{ maxWidth: 600, margin: '20px auto', borderRadius: 2, overflow: 'hidden' }}>
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height="250"
          image={recipe.strMealThumb}
          alt={recipe.strMeal}
        />
        
        {/* Favorite toggle button shown on top of the recipe image */}
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
          {/* Icon color reflects the current favorite state */}
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

        {/* Ingredient list is rendered from the cleaned ingredient array */}
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
