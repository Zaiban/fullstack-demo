import logo from "./logo.svg";
import "./App.css";

import Welcome from "./components/Welcome";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import CssBaseline from "@mui/joy/CssBaseline";


const logoEl = (
  <img src={logo} className="App-logo" float="left" alt="Logo" />
)

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <CssBaseline />
          <Sheet
            sx={{
              mx: 4, // margin left & right
              my: 4, // margin top & bottom
              py: 3, // padding top & bottom
              px: 2, // padding left & right
              display: "flex",
              flexDirection: "column",
              gap: 2,
              borderRadius: "sm",
              boxShadow: "md",
              maxWidth: "80%",
              verticalAlign: "center"
            }}
            variant="outlined"
          >
            <Typography color="black" level="h2" variant="plain" sx={{ textWrap: "nowrap" }}>
              {logoEl}
              <span className="App-title">
                TSP-Appi
              </span>
              {logoEl}
            </Typography>
            <Welcome />
          </Sheet>
        </div>
      </header>
    </div>
  );
}

export default App;
