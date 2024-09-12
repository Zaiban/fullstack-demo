import { useState } from "react";

import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Divider from '@mui/joy/Divider';

import NewBikeForm from "./NewBikeForm";
import BikeDetails from "./BikeDetails";

function Welcome() {
  // Store the bike code
  const [bikeCode, setBikeCode] = useState("");

  const handleSetBikeCode = (code) => {
    console.log('handleSetBikeCode:', code)
    setBikeCode(code);
  };

  return (
    <Card>
      <CardContent>
        {bikeCode.length > 0 ? (
          <BikeDetails code={bikeCode} />
        ) : (
          <NewBikeForm handleSetBikeCode={handleSetBikeCode} />
        )}
        <Divider />
        <small>© 2024 Esa Parkkila | App mode: {process.env.NODE_ENV}</small>
      </CardContent>
    </Card>
  );
}
export default Welcome;
