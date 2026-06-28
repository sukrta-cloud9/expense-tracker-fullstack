const express = require("express");

const router = express.Router();

const {

  getExpenses,

  addExpense,

  updateExpense,

  deleteExpense,

  monthlySummary

} = require(
  "../controllers/expenseController"
);

const authMiddleware = require(
  "../middleware/authMiddleware"
);



router.get(
  "/summary",
  authMiddleware,
  monthlySummary
);



router.get(
  "/",
  authMiddleware,
  getExpenses
);



router.post(
  "/",
  authMiddleware,
  addExpense
);



router.put(
  "/:id",
  authMiddleware,
  updateExpense
);



router.delete(
  "/:id",
  authMiddleware,
  deleteExpense
);

module.exports = router;