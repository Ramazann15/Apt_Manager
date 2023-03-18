const express = require("express");
require('dotenv').config()

const validator = require("./Middlewares/Validator")

const DatabaseConnect = require("./Model/Connect");
const PersonRouter = require("./Router/PersonRouter")
const ExpenseRouter = require("./Router/ExpenseRouter")
const IncomeRouter = require("./Router/IncomeRouter")
const TotalAmountController = require("./Router/TotalAmount")
const LastestRouter = require("./Router/LastestRouter")

const app = express();

DatabaseConnect.connectDatabase();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.get("/",(req,res)=>{
    res.send("Hello World");
})

app.use("/person",PersonRouter);
app.use("/expense",validator.validateExpense,ExpenseRouter);
app.use("/income",validator.validateIncome,IncomeRouter);
app.use("/totalamount",TotalAmountController);
app.use("/lastest",LastestRouter);

app.listen(3000);

console.log("Server run 3000 Port");