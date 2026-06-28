import { useEffect, useState } from "react";

import axios from "axios";

function Summary() {

  const [expenses, setExpenses] =
    useState([]);

  useEffect(() => {

    fetchExpenses();

  }, []);

  const fetchExpenses = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/expenses",
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

      setExpenses(res.data);

    } catch (error) {

      console.log(
        "Error fetching summary"
      );
    }
  };

  
  const totalExpense =
    expenses.reduce(
      (sum, item) =>
        sum + item.amount,
      0
    );

  
  const currentMonth =
    new Date().getMonth();

  const thisMonthExpenses =
    expenses.filter((item) => {

      const itemMonth =
        new Date(
          item.date
        ).getMonth();

      return (
        itemMonth === currentMonth
      );
    });

  const thisMonthTotal =
    thisMonthExpenses.reduce(
      (sum, item) =>
        sum + item.amount,
      0
    );

  
  const highestExpense =
    expenses.length > 0
      ? Math.max(
          ...expenses.map(
            (item) =>
              item.amount
          )
        )
      : 0;

  
  const categoryTotals = {};

  expenses.forEach((item) => {

    if (
      categoryTotals[item.category]
    ) {

      categoryTotals[item.category] +=
        item.amount;

    } else {

      categoryTotals[item.category] =
        item.amount;
    }
  });

  let topCategory = "No Data";

  let highestCategoryAmount = 0;

  for (let category in categoryTotals) {

    if (
      categoryTotals[category] >
      highestCategoryAmount
    ) {

      highestCategoryAmount =
        categoryTotals[category];

      topCategory = category;
    }
  }

  return (

    <div className="container py-5">

      
      <div
        className="card border-0 shadow-lg p-5 mb-5 text-center"
        style={{
          borderRadius: "30px",

          background:
            "linear-gradient(to right, #f6c90e, #ffdb58)"
        }}
      >

        <h1 className="fw-bold">
          Expense Summary
        </h1>

        <p
          className="mt-3"
          style={{
            fontSize: "22px"
          }}
        >
          Track your spending insights
        </p>

      </div>

      
      <div className="row g-4">

        
        <div className="col-md-6">

          <div
            className="card border-0 shadow-lg p-4 h-100"
            style={{
              borderRadius: "25px",

              background: "#f5edd3"
            }}
          >

            <p className="text-muted">
              TOTAL EXPENSE
            </p>

            <h1 className="fw-bold">
              ₹{totalExpense}
            </h1>

          </div>

        </div>

        
        <div className="col-md-6">

          <div
            className="card border-0 shadow-lg p-4 h-100"
            style={{
              borderRadius: "25px",

              background: "#fff1a8"
            }}
          >

            <p className="text-muted">
              THIS MONTH
            </p>

            <h1 className="fw-bold">
              ₹{thisMonthTotal}
            </h1>

          </div>

        </div>

        
        <div className="col-md-6">

          <div
            className="card border-0 shadow-lg p-4 h-100"
            style={{
              borderRadius: "25px",

              background: "#f5edd3"
            }}
          >

            <p className="text-muted">
              TOTAL TRANSACTIONS
            </p>

            <h1 className="fw-bold">
              {expenses.length}
            </h1>

          </div>

        </div>

        
        <div className="col-md-6">

          <div
            className="card border-0 shadow-lg p-4 h-100"
            style={{
              borderRadius: "25px",

              background: "#fff1a8"
            }}
          >

            <p className="text-muted">
              HIGHEST EXPENSE
            </p>

            <h1 className="fw-bold">
              ₹{highestExpense}
            </h1>

          </div>

        </div>

      </div>

      
      <div
        className="card border-0 shadow-lg p-5 mt-5 text-center"
        style={{
          borderRadius: "30px",

          background:
            "linear-gradient(to right, #1f1f1f, #444)"
        }}
      >

        <p
          className="text-light"
          style={{
            letterSpacing: "1px"
          }}
        >
          TOP SPENDING CATEGORY
        </p>

        <h1
          className="fw-bold text-light"
        >
          {topCategory}
        </h1>

      </div>

    </div>
  );
}

export default Summary;