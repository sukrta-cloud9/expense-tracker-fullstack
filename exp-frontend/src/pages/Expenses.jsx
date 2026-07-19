import { useEffect, useState } from "react";

import axios from "axios";

import {
  FaUtensils,
  FaPlane,
  FaSpa,
  FaTshirt,
  FaMoneyBillWave,
  FaGamepad
} from "react-icons/fa";

function Expenses() {

  const [expenses, setExpenses] =
    useState([]);

  const [amount, setAmount] =
    useState("");

  const [showCategories, setShowCategories] =
    useState(false);

  const [categories, setCategories] =
    useState([
      {
        name: "Food",
        icon: <FaUtensils />
      },

      {
        name: "Travel",
        icon: <FaPlane />
      },

      {
        name: "Beauty",
        icon: <FaSpa />
      },

      {
        name: "Clothing",
        icon: <FaTshirt />
      },

      {
        name: "Sports",
        icon: <FaGamepad />
      },

      {
        name: "Bills",
        icon: <FaMoneyBillWave />
      }
    ]);

  const [selectedCategory,
    setSelectedCategory] =
    useState("");

  const [newCategory,
    setNewCategory] =
    useState("");

    const [editCategories, setEditCategories] =
  useState(false);

  const [editingId,
    setEditingId] =
    useState(null);

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
        "Error fetching expenses"
      );
    }
  };

  
  const addExpense = async () => {

    if (!amount ||
      !selectedCategory) return;

    try {

      const token =
        localStorage.getItem("token");

      if (editingId) {

        await axios.put(

          `http://localhost:5000/api/expenses/${editingId}`,

          {
            title: selectedCategory,
            amount: Number(amount),
            category: selectedCategory
          },

          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );

        setEditingId(null);

      } else {

        await axios.post(

          "http://localhost:5000/api/expenses",

          {
            title: selectedCategory,
            amount: Number(amount),
            category: selectedCategory
          },

          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );
      }

      setAmount("");

      setSelectedCategory("");

      setShowCategories(false);

      fetchExpenses();

    } catch (error) {

      console.log(
        "Error saving expense"
      );
    }
  };

  
  const deleteExpense = async (id) => {

    try {

      const token =
        localStorage.getItem("token");

      await axios.delete(

        `http://localhost:5000/api/expenses/${id}`,

        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

      fetchExpenses();

    } catch (error) {

      console.log(
        "Error deleting expense"
      );
    }
  };

  
  const editExpense = (item) => {

    setAmount(item.amount);

    setSelectedCategory(
      item.category
    );

    setShowCategories(true);

    setEditingId(item._id);
  };

  
  const addCategory = () => {

    if (!newCategory) return;

    if (
      !categories.find(
        (item) =>
          item.name === newCategory
      )
    ) {

      setCategories([

        ...categories,

        {
          name: newCategory,
          icon: <FaGamepad />
        }
      ]);
    }

    setNewCategory("");
  };

  const deleteCategory = (categoryName) => {

  if (
    !window.confirm(`Delete "${categoryName}"?`)
  )
    return;

  setCategories(
    categories.filter(
      (cat) => cat.name !== categoryName
    )
  );

  if (selectedCategory === categoryName) {
    setSelectedCategory("");
  }
};
  const totalExpense =
    expenses.reduce(

      (sum, item) =>
        sum + item.amount,

      0
    );

  return (

    <div
      className="container py-5"
      style={{
        maxWidth: "900px"
      }}
    >

      
      <div
        className="card border-0 shadow-lg p-5 mb-5"
        style={{
          borderRadius: "30px",

          background:
            "linear-gradient(to right, #f6c90e, #ffdb58)",

          color: "#222"
        }}
      >

        <h1
          className="fw-bold mb-4 text-center"
        >
          Expense Tracker
        </h1>

        
        <div className="text-center mb-5">

          <p
            style={{
              opacity: 0.8,
              letterSpacing: "1px"
            }}
          >
            TOTAL EXPENSE
          </p>

          <h1
            className="fw-bold"
            style={{
              fontSize: "60px"
            }}
          >
            ₹{totalExpense}
          </h1>

        </div>

      
        <input
          type="number"

          placeholder="Enter amount"

          value={amount}

          onChange={(e) =>
            setAmount(e.target.value)
          }

          className="form-control form-control-lg text-center border-0 shadow-sm"

          style={{
            height: "65px",

            borderRadius: "20px",

            fontSize: "24px"
          }}
        />

      
        {!showCategories && (

          <div className="text-center mt-4">

            <button

              onClick={() =>
                setShowCategories(true)
              }

              className="btn btn-dark px-5 py-3 fw-bold"

              style={{
                borderRadius: "15px"
              }}
            >
              + Add Expense
            </button>

          </div>
        )}

        
        {showCategories && (

          <>

            <div
              className="d-flex flex-wrap gap-3 justify-content-center mt-5"
            >

              {categories.map((cat) => (

                <button

                  key={cat.name}

                  onClick={() =>
                    setSelectedCategory(
                      cat.name
                    )
                  }

                  className={
                    selectedCategory === cat.name
                      ? "btn btn-dark"
                      : "btn btn-outline-dark"
                  }

                  style={{
                    borderRadius: "50px",

                    padding: "12px 20px",

                    display: "flex",

                    alignItems: "center",

                    gap: "8px",

                    fontWeight: "600"
                  }}
                >

                  {cat.icon}

                  {cat.name}

                </button>
              ))}

            </div>

            
            <div className="text-center mt-4">

  <div className="d-flex justify-content-center gap-3">

    <button
      onClick={() => setNewCategory(" ")}
      className="btn btn-outline-dark"
      style={{
        borderRadius: "50px"
      }}
    >
      + Add Category
    </button>

    <button
      onClick={() =>
        setEditCategories(!editCategories)
      }
      className="btn btn-dark"
      style={{
        borderRadius: "50px"
      }}
    >
      ✏️ Edit Categories
    </button>

  </div>

  {newCategory !== "" && (

    <div
      className="d-flex justify-content-center gap-2 mt-3"
    >

      <input
        type="text"
        placeholder="Category name"
        value={newCategory}
        onChange={(e) =>
          setNewCategory(e.target.value)
        }
        className="form-control"
        style={{
          maxWidth: "250px",
          borderRadius: "15px"
        }}
      />

      <button
        onClick={addCategory}
        className="btn btn-dark"
        style={{
          borderRadius: "15px"
        }}
      >
        Save
      </button>

    </div>

  )}

</div>
{editCategories && (

  <div
    className="card mt-4 border-0 shadow-sm"
    style={{
      borderRadius: "20px"
    }}
  >

    <div className="card-body">

      <h5 className="fw-bold mb-3">
        Manage Categories
      </h5>

      {categories.map((cat) => (

        <div
          key={cat.name}
          className="d-flex justify-content-between align-items-center border-bottom py-2"
        >

          <div className="d-flex align-items-center gap-2">

            {cat.icon}

            <span>{cat.name}</span>

          </div>

          <button
            className="btn btn-sm btn-outline-danger"
            onClick={() =>
              deleteCategory(cat.name)
            }
          >
            🗑
          </button>

        </div>

      ))}

    </div>

  </div>

)}
            
            <div className="text-center mt-5">

              <button

                onClick={addExpense}

                className="btn btn-dark px-5 py-3 fw-bold"

                style={{
                  borderRadius: "15px"
                }}
              >
                {editingId
                  ? "Update Expense"
                  : "Save Expense"}
              </button>

            </div>

          </>
        )}
      </div>

      
      <div
        className="card border-0 shadow-lg p-4"
      >

        <div
          className="d-flex justify-content-between align-items-center mb-4"
        >

          <h3 className="fw-bold">
            Recent Expenses
          </h3>

          <span
            className="badge bg-dark px-3 py-2"
            style={{
              fontSize: "14px"
            }}
          >
            {expenses.length} Items
          </span>

        </div>

        {expenses.length === 0 && (

          <p className="text-muted text-center">
            No expenses added yet
          </p>

        )}

        {expenses.map((item) => (

          <div

            key={item._id}

            className="d-flex justify-content-between align-items-center mb-3 p-3"

            style={{
              background: "#f8f9fa",

              borderRadius: "18px"
            }}
          >

            <div>

              <h5 className="fw-bold mb-1">
                {item.category}
              </h5>

              <small className="text-muted">

                {new Date(
                  item.date
                ).toLocaleDateString()}

              </small>

            </div>

            <div className="text-end">

              <h5 className="fw-bold text-success">
                ₹{item.amount}
              </h5>

              <div className="d-flex gap-2 mt-2">

                <button

                  onClick={() =>
                    editExpense(item)
                  }

                  className="btn btn-warning btn-sm"

                  style={{
                    borderRadius: "10px"
                  }}
                >
                  Edit
                </button>

                <button

                  onClick={() =>
                    deleteExpense(item._id)
                  }

                  className="btn btn-danger btn-sm"

                  style={{
                    borderRadius: "10px"
                  }}
                >
                  Delete
                </button>

              </div>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

export default Expenses;