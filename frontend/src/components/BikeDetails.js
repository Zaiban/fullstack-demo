import React, { useState, useEffect } from "react";
import Alert from "@mui/joy/Alert";
import Typography from "@mui/joy/Typography";
import Table from '@mui/joy/Table';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';


const BikeDetails = (props) => {
  const { code } = props; // Extract code from URL
  console.log("props?", props);
  const [bike, setBike] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBike = async () => {
      try {
        const response = await fetch(`http://localhost:4000/bikes/code`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ code }),
        });
        if (!response.ok) {
          throw new Error("Bike not found");
        }
        const data = await response.json();
        console.log("bike:", data);
        setBike(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBike();
  }, [code]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!bike) return <div>No bike found</div>;

  return (
    <Card sx={{ width: '30em' }}>
      <Typography
        level="title-lg"
        sx={{ flex: '1 1 100%' }}
        id="tableTitle"
      >
        Työsuhdepyöräsi tiedot
      </Typography>
      <Table aria-label="basic table" borderAxis="vertical">
        <tbody>
          <tr>
            <td><b>Koodi</b></td>
            <td><Typography fontSize="2em">{bike.code}</Typography></td>
            <td>
              ℹ️ Säilytä pyöräsi koodi päästäksesi pyöräsi tietoihin käsiksi jatkossa.😊
            </td>
          </tr>
          <tr>
            <td><b>Merkki</b></td>
            <td>{bike.brand}</td>
            <td></td>
          </tr>
          <tr>
            <td><b>Malli</b></td>
            <td>{bike.model}</td>
            <td></td>
          </tr>
          <tr>
            <td><b>Väri</b></td>
            <td>{bike.color ? (
              <span>{bike.color}</span>
            ) : (
              <span>Ei tiedossa</span>
            )}</td>
            <td></td>
          </tr>
          <tr>
            <td><b>Tilauspäivä</b></td>
            <td>

              {bike.purchaseDate ? (
                <span>{new Date(bike.purchaseDate).toLocaleDateString()}</span>
              ) : (<span>Ei tiedossa</span>)}
            </td>
            <td>
              {!bike.purchaseDate ? (
                <span>
                  ℹ️ Huom! Jos pyöräsi tilauspäivä ei ole tiedossa, maksuennustetta ei voida
                  laskea.
                </span>
              ) : (<span>
                ℹ️ Huom! Pyörän maksuennustelaskelma-ominaisuus on vielä rakenteilla.
              </span>)}
            </td>
          </tr>
        </tbody>
      </Table>
    </Card>
  );
};

export default BikeDetails;
