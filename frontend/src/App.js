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
              display: "flex",
              flexDirection: "column",
              gap: 2,
              borderRadius: "sm",
              boxShadow: "md",
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
