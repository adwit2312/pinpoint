import { mockResults } from "./mockData";
import React, { useState, useRef, KeyboardEvent } from "react";
import { styles } from '../../constants/styles';
import {
  Typography,
  Grid,
  TextField,
  InputAdornment,
  Button,
  Card,
  CardContent,
  CircularProgress,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import "./FindCheapGroceries.css";
import { Footer } from "./Footer";
import PageButtons from "../layout/PageButtons";

const FindCheapGroceries: React.FC = () => {
  const [filterValue, setFilterValue] = useState("");
  const [filterArray, setFilterArray] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [recipes, setRecipes] = useState<any[]>([]);
  const filterRef = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [showInputError, setShowInputError] = useState(false);

  const handleClick = () => {
    const trimmedFilter = filterValue.trim();
    if (trimmedFilter !== "") {
      if (!filterArray.includes(trimmedFilter)) {
        setFilterArray([...filterArray, trimmedFilter]);
      }
      setFilterValue("");
      setShowInputError(false);
    } else {
      setShowInputError(true);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleClick();
    }
  };

  const handleGetRecipes = () => {
    setLoading(true);
    const results: any[] = [];

    const ingredients = inputValue.split(",").map((i) => i.trim().toLowerCase()).filter(Boolean);

    ingredients.slice(0, 2).forEach((ingredient) => {
      const dataObj = mockResults[ingredient as keyof typeof mockResults];
      if (dataObj) {
        let options = Object.values(dataObj);

        // FILTER DISABLED — NO EFFECT FROM FILTER INPUT
        // if (filterArray.length > 0) {
        //   options = options.filter((opt) =>
        //     filterArray.every((tag) => opt.filter.includes(tag))
        //   );
        // }

        options.sort((a, b) => {
          const d1 = parseFloat(a.distance.replace(/[^\d.]/g, ""));
          const d2 = parseFloat(b.distance.replace(/[^\d.]/g, ""));
          return d1 - d2;
        });

        options.slice(0, 2).forEach((opt) => results.push({ ...opt, ingredient }));
      }
    });

    setTimeout(() => {
      setRecipes(results);
      setLoading(false);
    }, 500);
  };

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ height: "100vh", backgroundColor: "#000" }}>
      <PageButtons/>
      <Grid
        item
        sx={{
          textAlign: "center",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          padding: "50px",
          borderRadius: "12px",
        }}
      >
        <Typography sx={{ fontFamily: "Geologica, sans-serif", fontWeight: "900", fontSize: "4rem", color: "white" }} align="center" gutterBottom>
          <h1 className={`${styles.heroHeadText} text-white`}>
            <span className="text-red-500">Pin</span>
            <span className="text-[brown] ml-2">Point</span>
          </h1>
          <span>Find Cheap Groceries</span>
        </Typography>

        <Typography variant="h5" align="center" gutterBottom sx={{ color: "white", fontSize: "1.6rem" }}>
          Enter your ingredients — PinPoint will find you the cheapest matches!
        </Typography>

        <TextField
          label="Enter ingredients"
          variant="outlined"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          sx={{
            maxWidth: "350px", marginTop: "10px", backgroundColor: "black",
            input: { color: "white" }, label: { color: "white" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "red" },
              "&:hover fieldset": { borderColor: "red" },
              "&.Mui-focused fieldset": { borderColor: "red" },
            },
          }}
        />

        <TextField
          label="Add a filter - e.g organic."
          variant="outlined"
          inputRef={filterRef}
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
          onKeyDown={handleKeyDown}
          sx={{
            maxWidth: "350px", marginTop: "10px", backgroundColor: "black",
            input: { color: "white" }, label: { color: "white" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "red" },
              "&:hover fieldset": { borderColor: "red" },
              "&.Mui-focused fieldset": { borderColor: "red" },
            },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Button variant="contained" onClick={handleClick} style={{ backgroundColor: "red", color: "#fff" }}>
                  ADD
                </Button>
              </InputAdornment>
            ),
          }}
        />

        <Grid container justifyContent="center" spacing={1} style={{ marginTop: "10px" }}>
          {filterArray.map((item, index) => (
            <Grid item key={index}>
              <Button variant="outlined" color="primary" startIcon={<ClearIcon />} onClick={() => setFilterArray(filterArray.filter(f => f !== item))}>
                {item}
              </Button>
            </Grid>
          ))}
        </Grid>

        <Button
          size="large"
          variant="contained"
          style={{ marginTop: "20px", backgroundColor: "red", color: "#fff" }}
          onClick={handleGetRecipes}
        >
          Find Cheapest Options
          {loading && <CircularProgress size={20} style={{ color: "#fff", marginLeft: "10px" }} />}
        </Button>

        <Grid container justifyContent="center" spacing={2} style={{ marginTop: "30px" }}>
          {recipes.map((item, index) => (
            <Grid
              item
              key={index}
              className="fade-card"
              style={{ animationDelay: `${index * 0.3}s` }}
            >
              <Card sx={{ maxWidth: 300, backgroundColor: "#1a1a1a", color: "white", borderRadius: 4, boxShadow: "0 8px 16px rgba(0,0,0,0.4)" }}>
                <CardContent>
                  <Typography variant="caption" sx={{ color: "gray" }}>
                    Ingredient: {item.ingredient}
                  </Typography>
                  <Typography variant="h6" sx={{ color: "red", fontWeight: "bold" }}>
                    {item.store} — {item.price}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {item.location}
                  </Typography>
                  <Typography variant="body2" fontStyle="italic" sx={{ mb: 1 }}>
                    {item.distance}
                  </Typography>
                  <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" style={{ color: "lightblue", fontSize: "0.9rem" }}>
                    View on Google Maps
                  </a>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
    
    </Grid>

  );
};

export default FindCheapGroceries;