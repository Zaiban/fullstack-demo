import React, { useState, useEffect } from "react";
import Alert from "@mui/joy/Alert";
import Typography from "@mui/joy/Typography";

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
    <div>
      <h1>Pyörän tiedot</h1>
      <p>
        <strong>Koodi:</strong> <Typography level="h3">{bike.code}</Typography>
        <Alert color="warning" size="lg">
           ℹ️ Säilytä pyöräsi koodi päästäksesi pyöräsi tietoihin käsiksi jatkossa.😊
        </Alert>
      </p>
      <p>
        <strong>Merkki:</strong> {bike.brand}
      </p>
      <p>
        <strong>Malli:</strong> {bike.model}
      </p>
      <p>
        <strong>Väri:</strong> {bike.color}
      </p>
      <p>
        <strong>Tilauspäivä:</strong>{" "}
        {bike.purchaseDate ? (
          <span>{new Date(bike.purchaseDate).toLocaleDateString()}</span>
        ) : (
          <span>
            tuntematon
            <Alert color="warning" size="lg">
              ℹ️ Huom! Jos pyöräsi tilauspäivä ei ole tiedossa, maksuennustetta ei voida
              laskea.
            </Alert>
          </span>
        )}
      </p>
    </div>
  );
};

export default BikeDetails;
