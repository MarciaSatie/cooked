import { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";
 

const styles = {
    root: {
        backgroundColor: "#bfbfbf",
    },
    fab: {
        marginTop: 8,
        position: "fixed",
        top: 20,
        right: 2,
    },
};

interface recipeFilterUIProps {
    titleFilter: string;
    countryFilter: string;
    ingredientsFilter: string;
    ingredientsFilterList: string[];
    onAddIngredient: () => void;
    onDeleteIngredient: (ingredient: string) => void;
    onClearIngredients: () => void;
    onTitleChange: (value: string) => void;
    onCountryChange: (value: string) => void;
    onIngredientChange: (value: string) => void;
    showIngredients?: boolean;
}


const RecipeFilterUI: React.FC<recipeFilterUIProps> = ({
    titleFilter,
    countryFilter,
    ingredientsFilter,
    ingredientsFilterList,
    onAddIngredient,
    onDeleteIngredient,
    onClearIngredients,
    onTitleChange,
    onCountryChange,
    onIngredientChange,
    showIngredients = true,
}) => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    return (
        <>
            <Fab
                color="secondary"
                variant="extended"
                onClick={() => setDrawerOpen(true)}
                sx={styles.fab}
            >
                Filter
            </Fab>
            <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
            >
                <Card sx={{ maxWidth: 345 }} variant="outlined">
                    <CardContent>
                        <Typography variant="h5" component="h1">
                            Filter recipes.
                        </Typography>
                        <TextField
                            sx={{ mt: 2, width: "100%", backgroundColor: "rgb(255, 255, 255)" }}
                            id="recipe-search"
                            label="Recipe name"
                            type="search"
                            variant="filled"
                            value={titleFilter}
                            onChange={(e) => onTitleChange(e.target.value)}
                        />
                        <TextField
                            sx={{ mt: 2, width: "100%", backgroundColor: "rgb(255, 255, 255)" }}
                            id="country-search"
                            label="Country"
                            type="search"
                            variant="filled"
                            value={countryFilter}
                            onChange={(e) => onCountryChange(e.target.value)}
                        />
                        {showIngredients && (
                                                    <>
                          <Box sx={{ display: "flex" }}>
                              <TextField
                                  sx={{ mr: 1, mt: 2, width: "100%", backgroundColor: "rgb(255, 255, 255)" }}
                                  id="Ingredients-search"
                                  label="Ingredients"
                                  type="search"
                                  variant="filled"
                                  value={ingredientsFilter}
                                  onChange={(e) => onIngredientChange(e.target.value)}
                              />

                              <Button
                                  variant="contained"
                                  color="secondary"
                                  size="small"
                                  sx={{ mt: 2 }}
                                  onClick={onAddIngredient}
                              >
                                  Add
                              </Button>
                          </Box>

                          <Box sx={{ mt: 3 }}>
                              {ingredientsFilterList.map((ingredient) => (
                                  <Chip
                                      color="secondary"
                                      key={ingredient}
                                      label={ingredient}
                                      onDelete={() => onDeleteIngredient(ingredient)}
                                      sx={{ mr: 1, mb: 1 }}
                                  />
                              ))}
                          </Box>
                                                    </>
                        )}

                        <Box sx={{ mt: 2 }}>
                            <Button
                                variant="text"
                                onClick={() => {
                                    onTitleChange("");
                                    onCountryChange("");
                                    onIngredientChange("");
                                    onClearIngredients();
                                }}
                            >
                                Clear filters
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            </Drawer>
        </>
    );
};

export default RecipeFilterUI;
