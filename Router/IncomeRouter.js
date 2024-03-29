const express = require("express");
const incomeController = require("../Controller/IncomeController");
const GetPersonIncome = require("../Controller/GetIncome");

const router = express.Router();

router.route("/addincome").post(incomeController.addIncome);
router.route("/person/getIncome").post(GetPersonIncome.PersonIncomes);

module.exports = router;
