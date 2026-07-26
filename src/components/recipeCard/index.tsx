import { useState } from 'react';
import { Card,CardActionArea, CardContent, Typography, Box, Chip, Divider, CardMedia, IconButton, Tabs, Tab } from '@mui/material';
import type { SxProps, Theme } from '@mui/material/styles';
import FavoriteIcon from '@mui/icons-material/Favorite';
import type { CleanRecipe } from '../../types/interfaces';
import { useNavigate } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';
import * as utils from '../../utils/utils' 

// Local props type for the RecipeCard component.
// The editor symbol label may show RecipeCardProps, but that is only a reference to this type.
type RecipeCardProps = {
  recipe: CleanRecipe;
  sx?: SxProps<Theme>;
};

export default function RecipeCard({ recipe, sx }: RecipeCardProps) {
    const navigate = useNavigate(); //Initialize the navigate function
    const [tabValue, setTabValue] = useState<number>(0);
    const cardSx: SxProps<Theme> = [
      { width: '100%', borderRadius: 2, overflow: 'hidden' },
      ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
    ];

    // 2. Event handler to update the state when a user clicks a different tab
    const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
      setTabValue(newValue);
    };

    // Break the strInstructions into smaller readable chunks.
    const instructionSteps = utils.recipeInstructionsFormatter(recipe);

  return (
    <Card sx={cardSx}>
      <Box sx={{ position: 'relative' }}>
        <Tooltip title="Open recipe details" arrow>
          <CardActionArea onClick={() => navigate(`/recipes/${recipe.idMeal}`)}
              sx={{
                '&:hover img': {
                  opacity: 0.9,
                  transform: 'scale(1.02)',
                  transition: '0.2s ease',
                },
              }}
            >
            <CardMedia
              component="img"
              height="250"
              image={recipe.strMealThumb}
              alt={recipe.strMeal}
            />
          </CardActionArea>
        </Tooltip>
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

        {/* Tabs switch between ingredients and instructions */}
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{ mb: 2, borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label="Ingredients" />  {/* Index 0 */}
          <Tab label="Instructions" />  {/* Index 1 */}
        </Tabs>
        <Box
            sx={{ 
                maxHeight: 250,       // 1. Sets the maximum height limit (in pixels) -- Tab Content Styles
                overflowY: 'auto',    // 2. Adds a vertical scrollbar ONLY if content overflows
                pr: 1,                // 3. Adds a tiny bit of right padding so text doesn't touch the scrollbar
                // Optional: Smooth styling for the scrollbar on modern browsers
                '&::-webkit-scrollbar': { width: '6px' },
                '&::-webkit-scrollbar-thumb': { backgroundColor: '#ccc', borderRadius: '4px' }
            }}>
            
            {/*Ingredients Tab */}
            {tabValue === 0 && (
                <Box component="ul" sx={{ pl: 2, mt: 0, mb: 0 }}>
                    {recipe.ingredientsList.map((item, index) => (
                    <Box component="li" key={index} sx={{ mb: 0.5 }}>
                        <Typography variant="body2">
                        <strong>{item.measure}</strong> {item.name}
                        </Typography>
                    </Box>
                    ))}
                </Box>
            )}
            {/*Instructions Tab 
            - Using Short-Circuit Evaluation. Instead of using CSS to hide elements, your approach completely creates (mounts) or destroys (unmounts) the elements in real-time.
            - Shor-Circuit Evaluation: Basicaly if the left information is true JS will run whenever it is in the right side.
            - With the || (OR) operator, short-circuit evaluation works exactly the opposite way of &&.
            */}
            {tabValue === 1 && (
              <Box component="ol" sx={{ pl: 0, mt: 0, mb: 0, listStyle: 'none' }}>
                    {instructionSteps.map((step, index) => (
                  <Box component="li" key={index} sx={{ mb: 1.5, display: 'flex', gap: 1 }}>
                    <Typography variant="body2" sx={{ minWidth: 32, fontWeight: 'bold' }}>
                      {/* Converts 1, 2, 3 into 01, 02, 03 so the instruction list uses padded numbering */}
                      {String(index + 1).padStart(2, '0')}.
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                      {step}
                    </Typography>
                    </Box>
                    ))}
                </Box>
            )}
        </Box>
      </CardContent>
    </Card>
  );
}
