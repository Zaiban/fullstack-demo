import { useState } from "react";
import Typography from "@mui/joy/Typography";

import NewBikeForm from "./NewBikeForm";
import BikeDetails from "./BikeDetails";

function Welcome() {
  // State for the bike
  const [bike, setBike] = useState({
    brand: "",
    model: "",
    purchaseDate: "",
    code: "",
  });
  console.log('parent:', bike)


  const handleSetBike = (data) => {
    console.log('run handlesetbike', data)
    setBike(data);
  }
  return (
    <div>
      <br />
      {bike.code.length > 0 ? (
        <BikeDetails />
      ) : (
        <NewBikeForm handleSetBike={handleSetBike} />
      )}
      <br />
      <small>© 2024 Esa Parkkila</small>
    </div>
  );
}
export default Welcome;
