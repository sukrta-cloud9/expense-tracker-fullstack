const authRoutes = require(
  "./routes/authRoutes"
);

require("dotenv").config();

const express = require("express");

const mongoose = require("mongoose");

const cors = require("cors");

const expenseRoutes = require(
  "./routes/expenseRoutes"
);

const app = express();

const PORT = 5000;



app.use(express.json());

app.use(cors());



mongoose.connect(process.env.MONGO_URI)

  .then(() =>
    console.log("MongoDB Connected")
  )

  .catch((err) =>
    console.log(err)
  );



app.get("/", (req, res) => {

  res.send("Server is running");

});



app.use(
  "/api/expenses",
  expenseRoutes
);
app.use(
  "/api/auth",
  authRoutes
);



app.listen(PORT, () => {

  console.log(
    `Server running on port ${PORT}`
  );

});