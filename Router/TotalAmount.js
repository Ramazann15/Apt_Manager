const express = require("express");

const totalAmountController = require("../Controller/totalAmountController");

const router = express.Router();


router.route("/get-total-income").get(totalAmountController.getTotalIncome);
router.route("/get-total-expense").get(totalAmountController.getTotalExpense);
router.route("/get-total-accumulating").get(totalAmountController.getaccumulating);


module.exports = router;