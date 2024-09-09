import logo from "./logo.svg";
import "./App.css";

import Welcome from "./components/Welcome";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import CssBaseline from "@mui/joy/CssBaseline";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <CssBaseline />
          <Sheet
            sx={{
              minWidth: 500,
              mx: 4, // margin left & right
              my: 4, // margin top & bottom
              py: 3, // padding top & bottom
              px: 2, // padding left & right
              display: "flex",
              flexDirection: "column",
              gap: 2,
              borderRadius: "sm",
              boxShadow: "md",
            }}
            variant="outlined"
          >
            <img src={logo} className="App-logo" alt="logo" />
            <Typography color="black" level="h2" variant="plain">
              TSP-appi
            </Typography>
            <Welcome />
          </Sheet>
        </div>
      </header>
    </div>
  );
}

export default App;
