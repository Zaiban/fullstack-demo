import React, { useState, useEffect } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Typography,
  Button,
  CircularProgress,
} from "@mui/joy";

const BACKEND_URL = process.env.NODE_ENV === 'production'
  ? 'https://fullstack-demo.project.tamk.cloud'
  : 'http://localhost:4000';

const NewBikeForm = (props) => {
  // Handler for updating the bike information to parent
  const { handleSetBikeCode } = props;

  // UI state
  const [status, setStatus] = useState({
    loadingFetch: false,
    loadingAdd: false,
    error: "",
    placeholder: "hae pyörän tiedot koodilla...",
  });

  // Store the code input field
  const [inputCode, setInputCode] = useState("");

  // Store the bike input fields
  const [bikeData, setBikeData] = useState({
    brand: "",
    model: "",
    purchaseDate: "",
    color: "",
    price: "",
  });

  // Execute when user inputs 6 or more characters to the code input field
  useEffect(() => {
    if (inputCode.length >= 6) {
      const fetchBike = async () => {
        try {
          // Display loading indicator
          setStatus((prev) => ({ ...prev, loadingFetch: true }));

          // Fetch bike data from backend with the "code"

          const response = await fetch(`${BACKEND_URL}/api/v1/bikes/code`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ code: inputCode }),
          });

          // Parse the data from the backend response
          const data = await response.json();

          // If data is not null, call the parent component handler
          if (response.ok && data && data.code) {
            handleSetBikeCode(data.code);
          } else {
            // Otherwise the bike did not exist. Message via input placeholder.
            setStatus({
              loadingFetch: false,
              error: "",
              placeholder: "🚳 Koodilla ei löytynyt pyörää.",
            });

            // Clear the code input field.
            setInputCode("");
          }
        } catch (error) {
          // If backend returns something else than a 2xx (OK) response
          setStatus({
            loadingFetch: false,
            error: "",
            placeholder: error.message || "Backend error.",
          });
        }
      };
      fetchBike();
    }
  }, [inputCode, handleSetBikeCode]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBikeData((prev) => ({ ...prev, [name]: value }));
  };

  // Add a new bike
  const addBike = async (e) => {
    // Prevent default form function
    e.preventDefault();
    try {
      setStatus({
        ...status,
        loadingAdd: true,
      });
      // Call the backend add endpoint
      const response = await fetch(`${BACKEND_URL}/api/v1/bikes/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bikeData),
      });

      // If backend call not ok, throw an Error
      if (!response.ok) throw new Error(await response.text());

      const data = await response.json();

      // If data.code is received back
      if (data && data.code) {
        handleSetBikeCode(data.code);
      } else {
        setStatus({
          ...status,
          loadingAdd: false,
          error: "Server error.",
        });
      }
    } catch (error) {
      setStatus({
        ...status,
        loadingAdd: false,
        error: error.message,
      });
    }
  };

  return (
    <form onSubmit={addBike}>
      <FormControl>
        <Input
          placeholder={status.placeholder}
          value={inputCode}
          onChange={(e) => setInputCode(e.target.value)}
          endDecorator={status.loadingFetch && <CircularProgress />}
        />
      </FormControl>
      <br />
      <Typography level="body-sm">
        Tai syötä uuden työsuhdepyöräsi tiedot alle 🚲😊
      </Typography>
      <FormControl>
        <FormLabel>Merkki (*)</FormLabel>
        <Input
          placeholder="esim. Helkama.."
          name="brand"
          value={bikeData.brand}
          onChange={handleInputChange}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Malli (*)</FormLabel>
        <Input
          placeholder="esim. Jopo.."
          name="model"
          value={bikeData.model}
          onChange={handleInputChange}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Tilauspäivä (*)</FormLabel>
        <Input
          type="date"
          name="purchaseDate"
          value={bikeData.purchaseDate}
          onChange={handleInputChange}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Väri</FormLabel>
        <Input
          placeholder="esim. Sininen.."
          name="color"
          value={bikeData.color}
          onChange={handleInputChange}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Hinta</FormLabel>
        <Input
          type="number"
          name="price"
          value={bikeData.price}
          onChange={handleInputChange}
        />
      </FormControl>
      <br />
      <Button
        type="submit"
        loading={status.loadingAdd}
        loadingPosition="end"
        endDecorator={status.loadingAdd && <CircularProgress />}
      >
        Lisää pyörä
      </Button>
      {status.error && <Typography>{status.error}</Typography>}
    </form>
  );
};
export default NewBikeForm;
