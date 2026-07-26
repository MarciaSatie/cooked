import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import type { SxProps, Theme } from '@mui/material/styles';

type DropDownMenuProps = {
  name: string;
  listOption: string[]; 
  // callback prop function type to return a value to the parent component.
  onSelect: (selectedValue: string) => void; 
};

export default function DropDownMenu({ name, listOption,onSelect }: DropDownMenuProps) {
  const id = React.useId();
  const buttonId = `${id}-button`;
  const menuId = `${id}-menu`;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const buttonSx: SxProps<Theme> = {
    bgcolor: 'primary.main',
    color: 'primary.contrastText',
    fontWeight: 700,
    borderRadius: 999,
    px: 2.5,
    py: 1,
    textTransform: 'none',
    boxShadow: '0 10px 20px rgba(245, 124, 0, 0.22)',
    '&:hover': {
      bgcolor: 'primary.dark',
      boxShadow: '0 12px 24px rgba(245, 124, 0, 0.28)',
    },
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Handle item clicks by sending the value up and closing the menu
  const handleItemClick = (option: string) => {
    onSelect(option); 
    handleClose();
  };


  return (
    <div>
      <Button
        id={buttonId}
        aria-controls={open ? menuId : undefined}
        aria-haspopup="true"
        aria-expanded={open}
        onClick={handleClick}
        sx={buttonSx}
      >
        {name}
      </Button>

      <Menu
        id={menuId}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            sx: {
              mt: 1,
              borderRadius: 3,
              border: '1px solid',
              borderColor: 'secondary.main',
              bgcolor: 'background.paper',
              boxShadow: '0 16px 40px rgba(255, 152, 0, 0.18)',
              overflow: 'hidden',
            },
          },
          list: {
            'aria-labelledby': buttonId,
            sx: {
              py: 0.5,
            },
          },
        }}
      >
        {listOption.map((option, index) => (
            <MenuItem 
            key={`${id}-option-${index}`} 
            onClick={() => handleItemClick(option)}
            sx={{
              color: 'text.primary',
              fontWeight: 500,
              px: 2.5,
              py: 1.25,
              '&:hover': {
                bgcolor: 'secondary.light',
              },
            }}
            >
            {option}
            </MenuItem>
        ))}
      </Menu>
    </div>
  );
}