import { useParams } from "react-router-dom";
import { Box} from '@mui/material';
import bgImage2 from "../assets/backgorund_img2.png";
import RecipesDetail from '../components/recipesDetail';


export default function FavoritesPage() {
  const { id } = useParams();
  console.log(`Recipe ID is ${id}`);
  


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
        <RecipesDetail
            id= {id}
        />
      </Box>
  
  </Box>
  );

}



