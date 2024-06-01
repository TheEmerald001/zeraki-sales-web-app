import react from "react";
import { Route, Routes } from "react-router-dom";
import SignIn from "./components/auth/SignIn";
import "./App.css";
import NavigationBar from "./components/navs/NavigationBar";
import { Typography } from "@mui/material";
function App() {
  return (
    <div className="App">
      <Routes>
        {" "}
        <Route path="/" element={<SignIn />}></Route>
        <Route path="agent" element={<NavigationBar/>}>
        <Route path="dashboard" element={<Typography>Dashboard</Typography>} />
        <Route path="schools" element={<Typography>Schools</Typography>} ></Route>
        <Route path="invoices" element={<Typography>Invoices</Typography>}></Route>
        <Route path="collections" element={<Typography>Collections</Typography>}></Route>
      
        </Route>
        </Routes>
    </div>
  );
}

export default App;
