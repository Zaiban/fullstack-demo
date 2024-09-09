import * as React from "react";
import { useState, useEffect } from "react";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import FormHelperText from "@mui/joy/FormHelperText";
import Input from "@mui/joy/Input";
import Typography from "@mui/joy/Typography";
import Button from "@mui/joy/Button";
import CircularProgress from '@mui/joy/CircularProgress';


const NewBikeForm = (props) => {
  // Handler for updating the bike information to parent
  const { handleSetBike } = props;

  const [inputCode, setInputCode] = useState("");

  // Tilat pyörän tiedoille
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [color, setColor] = useState("");
  const [purchaseDate, setPurchaseDate] = useState("");

  // Tilat onnistumisviestille tai virheille
  const [message, setMessage] = useState("");

  // Code input field states
  const [loading, setLoading] = useState(false); // Loading spinner
  const [codeInputPlaceholder, setCodeInputPlaceholder]
    = useState("hae pyörän tiedot koodilla...");

  useEffect(() => {
    if (inputCode.length >= 6) {
      console.log("haetaan pyörää");
      const fetchBike = async () => {
        try {
          setLoading(true);
          const response = await fetch(`http://localhost:4000/bikes/code`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ code: inputCode }),
          });
          if (!response.ok) {
            throw new Error("Bike not found");
          }
          const data = await response.json();
          console.log("bike:", data);
          if (data) {
            handleSetBike(data);
          } else {
            setInputCode("");
            setCodeInputPlaceholder("🚳 Koodilla ei löytynyt pyörää.")
          }
        } catch (error) {
          console.log("error:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchBike();
    }
  }, [inputCode]);

  // Funktio pyörän lisäämiseksi
  const addBike = async (e) => {
    e.preventDefault(); // Estetään lomakkeen oletustoiminto

    // Luodaan pyörän tiedot
    const bikeData = { brand, model, color, purchaseDate };

    try {
      // Lähetetään POST-pyyntö APIin
      const response = await fetch("http://localhost:4000/bikes/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bikeData),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(`Pyörä lisätty: ${data.brand} - ${data.model}`);
        setBrand(""); // Tyhjennetään lomake
        setModel("");
        setColor("");
        setPurchaseDate("");

        // Update the parent component state
        console.log("updating parent:", data);
        console.log("handleSetBike:", handleSetBike);
        handleSetBike(data);
      } else {
        const errorData = await response.json();
        setMessage(`Virhe: ${errorData.error}`);
      }
    } catch (error) {
      setMessage("Virhe pyörän lisäämisessä");
    }
  };

  return (
    <form onSubmit={addBike}>
      <FormControl>
        <Input
          placeholder={codeInputPlaceholder}
          value={inputCode}
          onChange={(e) => setInputCode(e.target.value)}
          endDecorator={loading && <CircularProgress />}
        />
      </FormControl>
      <br />
      <Typography level="body-sm">
        Tai syötä uuden työsuhdepyöräsi tiedot alle 🚲😊
      </Typography>
      <FormControl>
        <FormLabel>Merkki</FormLabel>
        <Input
          placeholder="esim. Helkama.."
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Malli</FormLabel>
        <Input
          placeholder="esim. Jopo.."
          value={model}
          onChange={(e) => setModel(e.target.value)}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Väri</FormLabel>
        <Input
          value={color}
          onChange={(e) => setColor(e.target.value)}
          placeholder=""
        />
      </FormControl>
      <FormControl>
        <FormLabel>Tilauspäivä</FormLabel>
        <Input
          type="date"
          value={purchaseDate}
          onChange={(e) => setPurchaseDate(e.target.value)}
        />
      </FormControl>
      <br />
      <Button type="submit">Lisää pyörä</Button>
    </form>
  );
};
export default NewBikeForm;
