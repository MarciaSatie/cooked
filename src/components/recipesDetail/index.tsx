


import type { CleanRecipe } from '../../types/interfaces';
import { Typography,Box,Chip, Divider, CardMedia, Card } from '@mui/material';
import PlaylistAddCheckCircleTwoToneIcon from '@mui/icons-material/PlaylistAddCheckCircleTwoTone';
import ExpandableSection from "../expandableSection";
import * as utils from '../../utils/utils';
import bgImage from "../../assets/backgorund_img.png";
import myLogo from '../../assets/cook-hat.png';
import FavoriteToggle from '../cardIcons/favoriteToggle';


type RecipesDetailProps = { recipe: CleanRecipe };
export default function RecipesDetail({ recipe }: RecipesDetailProps){

  // Break the strInstructions into smaller readable chunks.
  const instructionSteps = utils.recipeInstructionsFormatter(recipe);

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
        {/* Recipe Title */}
        <Typography color="primary" variant="h4" component="h1" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
          <Box component="img" src={myLogo} alt="Logo" sx={{ width: 50, height: 50, marginRight: 2 }} />
          {recipe.strMeal}
        </Typography>

        <FavoriteToggle recipe={recipe} />
      </Box>

      {/* Recipe Image */}
      <Box   sx={{
        gap: 1,
        mb: 2,
        backgroundImage: `url(${bgImage})`,
        backgroundRepeat: "repeat",
        backgroundPosition: "top left",
        backgroundSize: "auto",
        p: 0,
      }}>
        {showVideoIfExistsOrImage(recipe.strMealThumb, recipe.strYoutube!)}
      </Box>
      {/* Recipe Category, Area, Country and Tags*/}
      <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
        <Chip label={recipe.strCategory} color="primary" size="small" />
        <Chip label={recipe.strArea} color="secondary" variant="outlined" size="small" />
        <Chip label={recipe.strCountry}/>
        <Chip label={recipe.strTags} color="secondary" variant="outlined" size="small"/>
      </Box>
      
      <Divider color="yellow" sx={{m:2,}}></Divider>
      {/* Ingrevient List */}
        <Box component="ul" sx={{ pl: 2, mt: 0, mb: 0 }}>
          <Typography variant="subtitle1" sx={{ fontSize: 25 ,fontWeight: 'bold', mb: 1 }}>
          <PlaylistAddCheckCircleTwoToneIcon color="secondary">
          </PlaylistAddCheckCircleTwoToneIcon> 
            Ingredients List
          </Typography>
        
          <ExpandableSection>
            {recipe.ingredientsList.map((item, index:number) => (
              <Box component="li" key={index} sx={{ mb: 0.5 }}>
                <Typography variant="body2">
                  <strong>{item.measure}</strong> {item.name}
                </Typography>
              </Box>
            ))}
          </ExpandableSection>
      </Box>
      <Divider color="yellow" sx={{m:2,}}></Divider>
      {/* Recipe Instructions */}
      <Box component="ul" sx={{ pl: 2, mt: 0, mb: 0 }}>
          <Typography variant="subtitle1" sx={{ fontSize: 25 ,fontWeight: 'bold', mb: 1 }}>
          <PlaylistAddCheckCircleTwoToneIcon color="secondary">
          </PlaylistAddCheckCircleTwoToneIcon> 
            Instructions
          </Typography>
        
          <ExpandableSection>
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
          </ExpandableSection>
      </Box>
    </Box>
           
  );

}



// -------------- Helper functions for this page ---------------------------
function showVideoIfExistsOrImage(imgSrc: string, videoSrc: string | null) {
  //if (videoSrc) works because JavaScript treats null, undefined, "", 0, and false as falsy.
  if (videoSrc) {
    return (
      <Card sx={{ maxWidth: 800, margin: "0 auto" }}>
        <CardMedia
          component="iframe"
          height="350"
          src={videoSrc.replace("watch?v=", "embed/")}
          title="Embedded YouTube Video"
          sx={{ border: 0 }}
        />
      </Card>
    );
  }

  return (
    <CardMedia
      component="img"
      src={imgSrc}
      sx={{
        height: 450,
        width: "auto",
        margin: "0 auto",
        objectFit: "contain",
      }}
    />
  );
}