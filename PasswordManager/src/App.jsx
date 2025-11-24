import React,{ useState } from "react";
import "./App.css";
import Login from "./Components/Login";
import Register from "./Components/Register";
import { Route,Routes } from "react-router-dom";
import Home from "./Components/Home";

function App() {

  return <div className="app">
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register/>} />
    </Routes>
  </div>;
}

export default App;
