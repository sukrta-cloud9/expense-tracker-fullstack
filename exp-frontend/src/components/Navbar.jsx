import { Link, useLocation } from "react-router-dom";

import {
  FaWallet,
  FaChartPie,
  FaClipboardList
} from "react-icons/fa";

function Navbar() {

  const location = useLocation();

  const user =
    JSON.parse(
      localStorage.getItem("user")
    );

  const logoutUser = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    window.location.href = "/login";
  };

  return (

    <nav
      className="navbar navbar-expand-lg px-4 py-3 shadow-sm"
      style={{
        background:
          "#f6c90e"
      }}
    >

      <div className="container-fluid">

        
        <Link
          to="/"
          className="navbar-brand fw-bold fs-1"
          style={{
            color: "#222"
          }}
        >
          Expense Tracker
        </Link>

        
        <div
          className="bg-light px-4 py-2 rounded shadow-sm"
        >
          <h4 className="m-0">
            {new Date().toLocaleString(
              "default",
              {
                month: "long",
                year: "numeric"
              }
            )}
          </h4>
        </div>

        
        <div className="d-flex align-items-center gap-4">

          <Link
            to="/"
            className={
              location.pathname === "/"
                ? "fw-bold text-dark"
                : "text-dark"
            }
            style={{
              textDecoration: "none"
            }}
          >
            <FaWallet /> Expenses
          </Link>

          <Link
            to="/charts"
            className={
              location.pathname === "/charts"
                ? "fw-bold text-dark"
                : "text-dark"
            }
            style={{
              textDecoration: "none"
            }}
          >
            <FaChartPie /> Charts
          </Link>

          <Link
            to="/summary"
            className={
              location.pathname === "/summary"
                ? "fw-bold text-dark"
                : "text-dark"
            }
            style={{
              textDecoration: "none"
            }}
          >
            <FaClipboardList /> Summary
          </Link>

          {!user ? (
            <>
              <Link
                to="/login"
                className="text-dark fw-bold"
                style={{
                  textDecoration: "none"
                }}
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="text-dark fw-bold"
                style={{
                  textDecoration: "none"
                }}
              >
                Signup
              </Link>
            </>
          ) : (
            <>
              <span className="fw-bold">
                Hi, {user.name}
              </span>

              <button
                onClick={logoutUser}
                className="btn btn-dark rounded-pill"
              >
                Logout
              </button>
            </>
          )}

        </div>

      </div>

    </nav>
  );
}

export default Navbar;