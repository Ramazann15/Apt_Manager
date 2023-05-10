const express = require("express");


require('dotenv').config()

const validator = require("./Middlewares/Validator")

const DatabaseConnect = require("./Model/Connect");
const PersonRouter = require("./Router/PersonRouter")
const ExpenseRouter = require("./Router/ExpenseRouter")
const IncomeRouter = require("./Router/IncomeRouter")
const TotalAmountController = require("./Router/TotalAmount")
const LastestRouter = require("./Router/LastestRouter")
const GetPDFRouter = require("./Router/GetPDFRouter")
const AuthorizationRoter = require("./Router/AuthorizationRoter")
const Cron = require("./Cron")

const app = express();





app.use(express.json());
app.use(express.urlencoded({ extended: true }));

Cron.startCronJob();

global.name = " "

app.get("/",(req,res)=>{
    res.send("Hello :)")
})

app.use("/auth",AuthorizationRoter)
app.use("/person",validator.Authorization,PersonRouter);
app.use("/expense",validator.Authorization,validator.validateExpense,ExpenseRouter);
app.use("/income",validator.Authorization,validator.validateIncome,IncomeRouter);
app.use("/totalamount",validator.Authorization,TotalAmountController);
app.use("/lastest",validator.Authorization,LastestRouter);
app.use("/getPDF",validator.Authorization,GetPDFRouter)


const port = process.env.PORT || 3000;
DatabaseConnect.connectDatabase().then(()=>{
    app.listen(port, () => {
        console.log(`Server run On port ${port}`);
      });
})


