import { Box, Fab, Tooltip } from '@mui/material';
import NavigateBeforeRoundedIcon from '@mui/icons-material/NavigateBeforeRounded';

import { useNavigate } from 'react-router-dom';

type GoToPreviousRecipeProps ={ url: string}
const GoToPreviousRecipe = ({url}:GoToPreviousRecipeProps) => {
    const navigate = useNavigate(); //Initialize the navigate function

  return (
    <Box
      sx={{
        position: 'fixed',
        top: '50%',
        left: '25%',
        transform: 'translate(-250%, -50%)', 
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
            <NavigateBeforeRoundedIcon fontSize="large" />
          </Fab>
        </Tooltip>
    </Box>  
  );
};

export default GoToPreviousRecipe;