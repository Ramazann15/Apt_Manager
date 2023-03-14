const express = require("express");

const ExpenseController = require("../Controller/ExpenseController");

const router = express.Router();


router.route("/addExpense").post(ExpenseController.addExpense);
// router.route("/").get(ExpenseController.editPerson);

module.exports = router;