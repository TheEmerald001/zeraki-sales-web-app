import react from "react";
import { Route, Routes } from "react-router-dom";
import SignIn from "./components/auth/SignIn";
import "./App.css";

function App() {
  return (
    <Routes>
      {" "}
      <Route path="/" element={<SignIn />}></Route>
      <Route path="dashboard" element={<>Dahboard!</>} />
    </Routes>
  );
}

export default App;
