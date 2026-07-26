import { useState } from 'react';
import { useParams } from "react-router-dom";
import { Box,Tabs,Tab, Container, Paper} from '@mui/material';
import bgImage2 from "../assets/backgorund_img2.png";
import RecipesDetail from '../components/recipesDetail';


export default function FavoritesPage() {
  const { id } = useParams();
  console.log(`Recipe ID is ${id}`);
  
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
            <RecipesDetail
                id={id}
            />
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



