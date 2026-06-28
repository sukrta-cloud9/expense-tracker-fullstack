import { useState } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const loginUser = async () => {

    try {

      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password
        }
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      alert("Login successful");

      navigate("/");

    } catch (error) {

      alert("Login failed");
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
          Login
        </h1>

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
          onClick={loginUser}
          className="btn btn-dark w-100 py-3"
          style={{
            borderRadius: "15px"
          }}
        >
          Login
        </button>

      </div>
    </div>
  );
}

export default Login;