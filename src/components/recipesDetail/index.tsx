import { useState } from 'react';
import { useParams } from "react-router-dom";
import { useQueryRecipeByID } from '../../hooks/useRecipes'; 
import Spinner from "../../components/spinner";
import { Typography,Container,Box,Paper ,Chip, Divider, CardMedia, IconButton, Tabs, Tab, Card} from '@mui/material';
import PlaylistAddCheckCircleTwoToneIcon from '@mui/icons-material/PlaylistAddCheckCircleTwoTone';
import ExpandableSection from "../expandableSection";
import * as utils from '../../utils/utils';
import bgImage from "../../assets/backgorund_img.png";
import bgImage2 from "../../assets/backgorund_img2.png";  
import myLogo from '../../assets/cook-hat.png';

function RecipesDetail() {
  const { id } = useParams();
  console.log(`Recipe ID is ${id}`);
  
  const {recipe, isLoading, isError, error} = useQueryRecipeByID(id!);

  if (!recipe) return <div>No recipe found</div>;
  if (isLoading) {return <Spinner />;}
  if (isError) {return <h1>{(error as Error).message}</h1>;}

  // Break the strInstructions into smaller readable chunks.
  const instructionSteps = utils.recipeInstructionsFormatter(recipe);
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

      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', }}>

      
        {/* Main Content Area */}
        {/* Container limits maximum width and centers content automatically */}
        <Container component="main" maxWidth="md" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
          {/* Paper MUI adds elevation/ dropshadow */}
          <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>

            {/* Tabs switch between ingredients and instructions */}
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              variant="fullWidth"
              sx={{ mb: 2, borderBottom: 1, borderColor: 'divider' }}
            >
              <Tab label="Recipe" />  {/* Index 0 */}
              <Tab label="Reviews" />  {/* Index 1 */}
            </Tabs>

            {tabValue === 0 && (
              <Box>
                {/* Recipe Title */}
                <Typography color="primary" variant="h4" component="h1" gutterBottom>
                <Box component="img" src={myLogo} alt="Logo" sx={{ width: 50, height: 50, marginRight: 2 }} />
                  {recipe.strMeal}
                </Typography>

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
            )}
          
          {tabValue === 1&& (
            <Box>
              In progress
            </Box>
          )}
          </Paper>
        </Container>

      </Box>
  
  </Box>
  );

}

export default RecipesDetail

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