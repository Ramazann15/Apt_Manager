const express = require("express");
const incomeController = require("../Controller/IncomeController");

const router = express.Router();

router.route("/addincome").post(incomeController.addIncome);
// router.route("/editperson").put(personController.editPerson);

module.exports = router;