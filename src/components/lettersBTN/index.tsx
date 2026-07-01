import { Button} from '@mui/material';
interface LetterProps {
  selectedLetter: string;
  onLetterSelect: (letter: string) => void;
}
/*
selectedLetter: Alphabetic char input.
onLetterSelect: Callback function to send new letter input value up tot eh parent component.
*/
export default function LettersBTN({ selectedLetter, onLetterSelect }: LetterProps) {
    const letterList: string[] = [
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 
        'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
      ];
      
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px'}}>
      {letterList.map((letter) => (
        <Button variant="text"
          key={letter} 
          onClick={() => onLetterSelect(letter)}
          style={{
            width: '40px',
            height: '40px',
            cursor: 'pointer',
            fontWeight: selectedLetter === letter ? '700' : '400',
          }}
        >
          {letter}
        </Button>
      ))}
    </div>
  );
}
