const express = require("express");
require('dotenv').config()

const DatabaseConnect = require("./Model/Connect");
const PersonRouter = require("./Router/PersonRouter")
const ExpenseRouter = require("./Router/ExpenseRouter")
const IncomeRouter = require("./Router/IncomeRouter")
const totalAmountController = require("./Router/TotalAmount")
const validator = require("./Middlewares/Validator")
const app = express();
DatabaseConnect.connectDatabase();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require('dotenv').config()


app.get("/",(req,res)=>{
    res.send("Hello World");
})

app.use("/person",PersonRouter);
app.use("/expense",validator,ExpenseRouter);
app.use("/income",IncomeRouter);
app.use("/totalamount",totalAmountController);

app.listen(3000);

console.log("Server run 3000 Port");