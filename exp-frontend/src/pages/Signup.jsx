import { useState } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

function Signup() {

  const navigate = useNavigate();

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const signupUser = async () => {

    try {

      
      await axios.post(
        "https://expense-tracker-fullstack-6p2s.onrender.com/api/auth/signup",
        {
          name,
          email,
          password
        }
      );

      
      const loginRes = await axios.post(
        "https://expense-tracker-fullstack-6p2s.onrender.com/api/auth/login",
        {
          email,
          password
        }
      );

      
      localStorage.setItem(
        "token",
        loginRes.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(
          loginRes.data.user
        )
      );

      alert("Signup successful");

      window.location.reload();

      navigate("/");

    } catch (error) {

      alert("Signup failed");
    }
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >

      <div
        className="shadow-lg p-5"
        style={{
          width: "400px",
          borderRadius: "30px",
          background:
            "linear-gradient(to right, #f6c90e, #ffdb58)"
        }}
      >

        <h1 className="fw-bold text-center mb-4">
          Signup
        </h1>

        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          className="form-control mb-3"
          style={{
            height: "50px",
            borderRadius: "15px"
          }}
        />

        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="form-control mb-3"
          style={{
            height: "50px",
            borderRadius: "15px"
          }}
        />

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="form-control mb-4"
          style={{
            height: "50px",
            borderRadius: "15px"
          }}
        />

        <button
          onClick={signupUser}
          className="btn btn-dark w-100 py-3"
          style={{
            borderRadius: "15px"
          }}
        >
          Signup
        </button>

      </div>

    </div>
  );
}

export default Signup;