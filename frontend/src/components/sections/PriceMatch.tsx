import { mockResults } from "./mockData";
import React, { useState, useEffect, useRef, KeyboardEvent } from "react";
import { styles } from '../../constants/styles';
import {
  Typography,
  Grid,
  TextField,
  InputAdornment,
  Button,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Select,
  MenuItem,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import qrCode from '../../assets/qr-code.png'; // ✅ QR image import
import { Footer } from "./Footer";
import PageButtons from "../layout/PageButtons";

const PriceMatch: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [inputArray, setInputArray] = useState<string[]>([]);
  const [recipes, setRecipes] = useState<any[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [showInputError, setShowInputError] = useState(false);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleClick = () => {
    if (inputValue.trim() !== "") {
      setInputArray([...inputArray, inputValue]);
      setInputValue("");
      setShowInputError(false);
    } else {
      setShowInputError(true);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13) {
      handleClick();
    }
  };

  const clearRecipes = () => {
    setInputArray([]);
    setInputValue("");
    setSelectedOption("");
    setRecipes([]);
    setShowInputError(false);
  };

  const handleRemove = (item: string) => {
    const updatedArray = inputArray.filter((value) => value !== item);
    setInputArray(updatedArray);
  };

  const handleGetRecipes = () => {
    setLoading(true);
    const results: any[] = [];

    inputArray.forEach((ingredient) => {
      const key = ingredient.toLowerCase() as keyof typeof mockResults;
      const itemData = mockResults[key];
      if (!itemData) return;

      let options = Object.values(itemData);

      if (selectedOption) {
        const filtered = options.filter(opt =>
          opt.filter.includes(selectedOption)
        );
        if (filtered.length) {
          options = filtered;
        }
      }

      const cheapest = options.reduce((prev, curr) => {
        const prevPrice = parseFloat(prev.price.replace(/[^0-9.]/g, ''));
        const currPrice = parseFloat(curr.price.replace(/[^0-9.]/g, ''));
        return currPrice < prevPrice ? curr : prev;
      }, options[0]);

      results.push(cheapest);
    });

    setTimeout(() => {
      setRecipes(results);
      setLoading(false);
    }, 1000);
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{
        height: "100vh",
        width: "100%",
        backgroundColor: "#000",
        backgroundImage: "none",
      }}
    >
      <PageButtons/>
      <Grid
        item
        sx={{
          textAlign: "center",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          padding: {
            xs: "20px",
            sm: "20px",
            md: "20px",
            lg: "50px",
            xl: "50px",
          },
          borderRadius: "12px",
        }}
      >
        <Typography
          sx={{
            fontFamily: "Geologica, sans-serif",
            fontWeight: "900",
            marginBottom: "20px",
            fontSize: {
              xs: "2.5rem",
              sm: "3rem",
              md: "3.5rem",
              lg: "4rem",
              xl: "4.5rem",
            },
            lineHeight: {
              xs: "2.5rem",
            },
            color: "white",
          }}
          align="center"
          gutterBottom
        >
          <h1 className={`${styles.heroHeadText} text-white`}>
            <span className="text-red-500">Pin</span>
            <span className="text-[brown] ml-2">Point</span>
          </h1>
          <span style={{ color: "white" }}>Price Match</span>
        </Typography>

        <Typography
          variant="h5"
          align="center"
          gutterBottom
          sx={{
            color: "white",
            fontSize: {
              xs: "1.2rem",
              sm: "1.4rem",
              md: "1.6rem",
              lg: "1.8rem",
              xl: "2rem",
            },
          }}
        >
          Enter the ingredients you need — PinPoint will find you the best price match!
        </Typography>

        <TextField
          id="outlined-basic"
          label="Add an ingredient"
          variant="outlined"
          inputRef={inputRef}
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          onKeyDown={handleKeyDown}
          sx={{
            width: "100%",
            maxWidth: "350px",
            marginTop: "10px",
            backgroundColor: "black",
            input: {
              color: "white",
            },
            label: {
              color: "white",
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "red",
              },
              "&:hover fieldset": {
                borderColor: "red",
              },
              "&.Mui-focused fieldset": {
                borderColor: "red",
              },
            },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Button
                  variant="contained"
                  size="medium"
                  onClick={handleClick}
                  style={{ backgroundColor: "red", color: "#fff" }}
                >
                  ADD
                </Button>
              </InputAdornment>
            ),
          }}
        />

        {showInputError && (
          <Typography variant="body2" color="error" sx={{ marginTop: "5px" }}>
            Please enter a valid ingredient.
          </Typography>
        )}

        <Grid container justifyContent="center" spacing={1} style={{ marginTop: "10px" }}>
          {inputArray.map((item, index) => (
            <Grid item key={index}>
              <Button
                variant="outlined"
                color="primary"
                startIcon={<ClearIcon />}
                onClick={() => handleRemove(item)}
              >
                {item}
              </Button>
            </Grid>
          ))}
        </Grid>

        <Select
          value={selectedOption}
          onChange={(event) => setSelectedOption(event.target.value)}
          displayEmpty
          style={{
            width: "100%",
            maxWidth: "350px",
            marginTop: "10px",
            backgroundColor: "white",
            textAlign: "left",
          }}
        >
          <MenuItem value="">Any specific store?</MenuItem>
          <MenuItem value="NoFrills">NoFrills</MenuItem>
          <MenuItem value="Walmart">Walmart</MenuItem>
          <MenuItem value="Loblaws">Loblaws</MenuItem>
          <MenuItem value="Costco">Costco</MenuItem>
          <MenuItem value="FoodBasics">FoodBasics</MenuItem>
        </Select>

        <Grid container justifyContent="center" spacing={1} style={{ marginTop: "10px" }}>
          <Grid item>
            <Button
              size="large"
              variant="contained"
              style={{ backgroundColor: "red", color: "#fff" }}
              onClick={handleGetRecipes}
            >
              Get PriceMatch{" "}
              {loading && (
                <CircularProgress size={20} style={{ color: "#fff", marginLeft: "10px" }} />
              )}
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{ color: "red", borderColor: "red" }}
              variant="outlined"
              size="large"
              onClick={clearRecipes}
            >
              Clear
            </Button>
          </Grid>
        </Grid>

        <Grid container justifyContent="center" spacing={1} style={{ marginTop: "20px" }}>
          {recipes.map((item, index) => (
            <Grid item key={index}>
              <Card sx={{ maxWidth: 345, textAlign: "left" }}>
                <CardMedia sx={{ height: 140 }} image={item.image} title={item.name} />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {item.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.store} — {item.price}
                  </Typography>
                  <Typography variant="body2" fontStyle="italic">
                    {item.description}
                  </Typography>
                  <div style={{ display: "flex", alignItems: "center", marginTop: "10px" }}>
                    <img
                      src={qrCode}
                      alt="QR code"
                      style={{ width: "60px", height: "60px", marginRight: "10px" }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      Scan to download app
                    </Typography>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
      
    </Grid>
  );
};

export default PriceMatch;
