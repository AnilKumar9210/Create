import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";
import { toast } from "react-toastify";

const Register = () => {
  const [RegForm, setRegForm] = useState({
    email: "",
    password: "",
    username: "",
  });
  const navigate = useNavigate();

  const handleRchange = (e) => {
    setRegForm({ ...RegForm, [e.target.name]: e.target.value });
  };

  const handleRsubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(RegForm),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("HTTP error", res);
          }
          console.log("registration successful");
          toast.success ("Registered Successfully");
          navigate("/");
        })
        .then((data) => console.log(data.json ()));
    } catch (err) {
      console.log(err);
      console.log(err.response);
    }
  };
  return (
    <div className="auth-sec">
      <div className="auth-form">
        <h1>Register here</h1>
        <form action="" onSubmit={handleRsubmit}>
          <input
            type="text"
            name="username"
            placeholder="enter your username"
            minLength={4}
            onChange={handleRchange}
          />
          <input
            type="email"
            name="email"
            placeholder="enter your e-mail"
            minLength={12}
            onChange={handleRchange}
          />
          <input
            type="password"
            name="password"
            placeholder="enter your password"
            minLength={4}
            onChange={handleRchange}
          />
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
