import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Login from "./Components/Login";
import Register from "./Components/Register";
import { Route,Routes } from "react-router-dom";
import Home from "./Components/Home";

function App() {
  const [count, setCount] = useState(0);

  return <div className="app">
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register/>} />
    </Routes>
  </div>;
}

export default App;
