const Expense = require(
  "../models/Expense"
);


const getExpenses = async (
  req,
  res
) => {

  try {

    const expenses =
      await Expense.find({
        user: req.userId
      });

    res.json(expenses);

  } catch (error) {

    res.status(500).send(
      "Error fetching expenses"
    );
  }
};


const addExpense = async (
  req,
  res
) => {

  try {

    const newExpense =
      new Expense({

        ...req.body,

        user: req.userId
      });

    await newExpense.save();

    res.send(
      "Expense saved"
    );

  } catch (error) {

    res.status(500).send(
      "Error saving expense"
    );
  }
};

const deleteExpense = async (
  req,
  res
) => {

  try {

    await Expense.findByIdAndDelete(
      req.params.id
    );

    res.send(
      "Expense deleted"
    );

  } catch (error) {

    res.status(500).send(
      "Error deleting expense"
    );
  }
};


const updateExpense = async (
  req,
  res
) => {

  try {

    await Expense.findByIdAndUpdate(
      req.params.id,
      req.body
    );

    res.send(
      "Expense updated"
    );

  } catch (error) {

    res.status(500).send(
      "Error updating expense"
    );
  }
};



const monthlySummary = async (
  req,
  res
) => {

  try {

    const expenses =
      await Expense.find({
        user: req.userId
      });

    const summary = {};

    expenses.forEach((item) => {

      if (
        summary[item.category]
      ) {

        summary[item.category] +=
          item.amount;

      } else {

        summary[item.category] =
          item.amount;
      }
    });

    const finalData =
      Object.keys(summary).map(
        (key) => ({
          _id: key,
          total: summary[key]
        })
      );

    res.json(finalData);

  } catch (error) {

    res.status(500).send(
      "Error fetching chart data"
    );
  }
};


module.exports = {

  getExpenses,

  addExpense,

  deleteExpense,

  updateExpense,

  monthlySummary
};