import React, { useState, useEffect } from "react";
import Typography from "@mui/joy/Typography";
import Table from "@mui/joy/Table";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";

const BikeDetails = (props) => {
  const { code } = props; // Code from parent component via props

  const [state, setState] = useState({
    bike: null, // Store bike data
    loading: true, // Data loading from backend?
    error: null, // In case data load fails
  });

  // useEffect is executed the first time this view is loaded
  useEffect(() => {
    const fetchBike = async () => {
      try {
        // Fetch bike data from backend with the "code"
        const response = await fetch(`http://localhost:4000/bikes/code`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code }),
        });

        // If backend call fails, show text "Bike not found" in the UI
        if (!response.ok) throw new Error("Bike not found.");

        // Parse the data from the backend response
        const data = await response.json();

        // Update UI state
        setState({ bike: data, loading: false, error: null });
      } catch (error) {
        // If backend returns something else than a 2xx (OK) response
        setState({
          bike: null,
          loading: false,
          error: error.message || "Backend error.",
        });
      }
    };

    fetchBike();
  }, [code]);

  const { bike, loading, error } = state;

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!bike) return <div>Bike not found.</div>;

  const renderValue = (label, value, info) => (
    <tr>
      <td>
        <b>{label}</b>
      </td>
      <td>{value || "Ei tiedossa"}</td>
      <td>{info}</td>
    </tr>
  );

  return (
    <Card sx={{ maxWidth: "30em" }}>
      <CardContent>
        <Typography level="title-lg" sx={{ flex: "1 1 100%" }} id="tableTitle">
          Työsuhdepyöräsi tiedot
        </Typography>
        <Table aria-label="bike details table" borderAxis="vertical">
          <tbody>
            {renderValue(
              "Koodi",
              <Typography fontSize="2em">{bike.code}</Typography>,
              "ℹ️ Pidä koodi tallessa.😊"
            )}
            {renderValue("Merkki", bike.brand)}
            {renderValue("Malli", bike.model)}
            {renderValue("Väri", bike.color)}
            {renderValue(
              "Tilauspäivä",
              bike.purchaseDate
                ? new Date(bike.purchaseDate).toLocaleDateString()
                : null
            )}
            <tr>
              <td colSpan="3">
                {!bike.purchaseDate
                  ? "ℹ️ Huom! Jos pyöräsi tilauspäivä ei ole tiedossa, maksuennustetta ei voida laskea."
                  : "ℹ️ Huom! Pyörän maksuennustelaskelma-ominaisuus on vielä rakenteilla."}
              </td>
            </tr>
          </tbody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default BikeDetails;
