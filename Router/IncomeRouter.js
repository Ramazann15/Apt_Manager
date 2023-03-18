const express = require("express");
const incomeController = require("../Controller/IncomeController");

const router = express.Router();

router.route("/addincome").post(incomeController.addIncome);


module.exports = router;