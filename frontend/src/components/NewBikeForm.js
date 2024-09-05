import * as React from "react";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import FormHelperText from "@mui/joy/FormHelperText";
import Input from "@mui/joy/Input";
import Typography from "@mui/joy/Typography";
import Button from '@mui/joy/Button';

export default function NewBikeForm() {
  return (
    <FormControl>
      <Input placeholder="haen pyörän tiedot koodilla.." />
      <br />
      <Typography level="body-sm">Tai syötä uuden työsuhdepyöräsi tiedot alle 🚲😊</Typography>
      <FormLabel>Merkki</FormLabel>
      <Input placeholder="esim. Canyon" />
      <FormLabel>Malli</FormLabel>
      <Input placeholder="esim. Grail SL" />
      <FormLabel>Väri</FormLabel>
      <Input placeholder="" />
      <FormLabel>Tilauspäivä</FormLabel>
      <Input type="date" />
      <br />
      <Button onClick={function(){}}>Lisää pyörä</Button>
    </FormControl>
  );
}
