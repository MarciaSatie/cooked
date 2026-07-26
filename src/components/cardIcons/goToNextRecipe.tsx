import { Box, Fab, Tooltip } from '@mui/material';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import { useNavigate } from 'react-router-dom';

type GoToNextRecipeProps ={ url: string}
const GoToNextRecipe = ({url}:GoToNextRecipeProps) => {
    const navigate = useNavigate(); //Initialize the navigate function

  return (
    <Box
      sx={{
        position: 'fixed',
        top: '50%',
        right: '25%',
        transform: 'translate(250%, -50%)', 
        zIndex: 2,
      }}
    >
        <Tooltip title="Next recipe">
          <Fab
            color="primary"
            aria-label="next recipe"
            onClick={() => navigate(url)}
            sx={{
              width: 56,
              height: 56,
              boxShadow: 4,
            }}
          >
            <NavigateNextRoundedIcon fontSize="large" />
          </Fab>
        </Tooltip>
    </Box>  
  );
};

export default GoToNextRecipe;