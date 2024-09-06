import React, { useState, useEffect } from "react";

const BikeDetails = (props) => {
  const { code } = props; // Extract code from URL
  const [bike, setBike] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBike = async () => {
      try {
        const response = await fetch(`http://localhost:4000/bikes/code`, {
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ code }),
        });
        if (!response.ok) {
          throw new Error("Bike not found");
        }
        const data = await response.json();
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
      <h1>Bike Details</h1>
      <p>
        <strong>Brand:</strong> {bike.brand}
      </p>
      <p>
        <strong>Model:</strong> {bike.model}
      </p>
      <p>
        <strong>Purchase Date:</strong>{" "}
        {new Date(bike.purchaseDate).toLocaleDateString()}
      </p>
      <p>
        <strong>Code:</strong> {bike.code}
      </p>
    </div>
  );
};

export default BikeDetails;
