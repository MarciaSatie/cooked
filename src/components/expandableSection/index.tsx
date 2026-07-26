import { useState, type ReactNode } from "react";
import { Button, Collapse, Box} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

type ExpandableSectionProps = {
  children: ReactNode; // Means anything React can render: text, JSX,arrays ets...
};

export default function ExpandableSection({ children }: ExpandableSectionProps) {
  const [isOpen, setIsOpen] = useState(true);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <Box sx={{ maxWidth: 800, m: 2 }}>
      <Button
        variant="contained"
        onClick={handleToggle}
        endIcon={isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        sx={{ mb: 2 }}
      >
        {isOpen ? "Hide Details" : "Show Details"}
      </Button>

      <Collapse in={isOpen}>
        <Box sx={{ ml: 5 ,mb: 2 }}>
          {children}
        </Box>
      </Collapse>
    </Box>
  );
}