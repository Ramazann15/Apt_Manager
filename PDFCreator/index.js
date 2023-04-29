const PDFDocument = require('pdfkit');
const fs = require('fs');

const Income = require("../Model/Income")
const Expense = require("../Model/Expense");
const TotalAmount = require("../Controller/GetTotalIncomeAndExpense")
const Person = require("../Model/Person");


exports.createPdf = async (req,res)=>{
  
    const date = new Date();
    const getAmount = await Income.find({bringerMonth : req.params.slug}).select({ "_id":0})
    const getExpense = await Expense.find({ExpenseMonth :req.params.slug}).select({"_id":0})
    const getPerson = await Person.find({}).select({"_id":0})


    //Is the value empty?
    if(getAmount.length == 0 || getExpense.length == 0){
      res.status(204)
      res.send("No content")
      return
    }

    //find the one who doesn't pay and push array
    const those_who_do_not_pay = [];

    for (let i = 0; i < getPerson.length; i++) {

      let nameFound = false;

      for (let j = 0; j < getAmount.length; j++) {

        if (getPerson[i].name === getAmount[j].bringer) {
          nameFound = true;
          break;
        }

      }

      if (!nameFound) {
        those_who_do_not_pay.push(getPerson[i]);
      }
    }


    //get total accounts from other module 
    const totalexpense =  TotalAmount.getTotalIncomeAndExpense(getExpense)
    const totalincome =  TotalAmount.getTotalIncomeAndExpense(getAmount,"TotalIncome")
  


    //start create PDF
    const doc = new PDFDocument();

    //set PDFs path 
     doc.pipe(fs.createWriteStream(`./PDF/${req.params.slug}-output.pdf`));

    //write date 
    doc.fontSize(16)
    doc.font("Helvetica-Bold").text('Tarih : ', 410, 39);
    doc.font("Helvetica").text(`${req.params.slug}`, 458, 39);
    
    // add logo
    doc.font("Helvetica-Bold").fontSize(25).text("Apt-Manager",24,32)

    //add border
    doc.strokeColor('#000000');
    doc.lineWidth(1);
    doc.rect(26, 73, 548, 148).stroke();

    // write APT Name
    doc.fontSize(16).font("Helvetica-Bold").text('Hamzaoglu APT.', 38, 88);
    // write APT'S general information
    doc.fontSize(16).font("Helvetica").text('Genel Bilgileri', 170, 88);

    //add border
    doc.strokeColor('#000000');
    doc.rect(27, 113, 546, 1).stroke();

    //write income 
    doc.font("Helvetica-Bold").text('Gelir : ', 44, 132);
    doc.font("Helvetica").text(`${totalincome}TL`, 94, 132);

    // write expense
    doc.font("Helvetica-Bold").text('Gider : ', 234, 132);
    doc.font("Helvetica").text(`${getExpense[0].total}TL`, 288, 132);

    //write total money
    doc.font("Helvetica-Bold").text('Biriken : ', 428, 132);
    doc.font("Helvetica").text(`${totalexpense-totalincome}TL`, 493, 132);

    //write electricity bill
    doc.font("Helvetica-Bold").text('Elektirik : ', 44, 173);
    doc.font("Helvetica").text(`${getExpense[0].electricity_bill}TL`, 118, 173);
    //write elevator maintenance
    doc.font("Helvetica-Bold").text('Asansör Bakim : ', 216, 173);
    doc.font("Helvetica").text(`${getExpense[0].elevator_maintenance}TL`, 344, 173);

    // write another expense 
    doc.font("Helvetica-Bold").text('Diger : ', 436, 173);
    doc.font("Helvetica").text('350TL', 490, 173);


    //add border
    doc.strokeColor('#000000');
    doc.lineWidth(1);
    doc.rect(26, 236, 548, 480).stroke();


    // write Income informations
    doc.fontSize(16).font("Helvetica").text('Gelir Bilgileri', 38, 250);

    //Add border
    doc.strokeColor('#000000');
    doc.rect(27, 276, 548, 1).stroke();

    // write Income values
    doc.font("Helvetica-Bold").text('Isim : ', 41, 288);
    doc.font("Helvetica-Bold").text('Verecegi  Tutar ', 147, 288);
    doc.font("Helvetica-Bold").text('Verdigi  Tutar ', 342, 288);
    doc.font("Helvetica-Bold").text('Tarih ', 502, 288);

    doc.strokeColor('#000000');
    doc.rect(26, 315, 548, 1).stroke();

    //write the payers
    let height = 326
    getAmount.map((key)=>{
      
        doc.fontSize(16).font("Helvetica").text(`${key.bringer}`, 38, height );
        doc.fontSize(16).font("Helvetica").text(`${key.fee_to_pay}`, 148, height );
        doc.fontSize(16).font("Helvetica").text(`${key.isBring ? key.amount : "-"}`, 358, height  );
        doc.fontSize(14).font("Helvetica").text(`${key.isBring ? key.date : "-"}`, 468, height );

        doc.strokeColor('#000000');
        doc.rect(26, height + 22 , 548, 1).stroke();

        height += 34;


    
    })

    // Add new Page
    doc.addPage()

    //Add border
    doc.strokeColor('#000000');
    doc.lineWidth(1);
    doc.rect(26, 73, 548, 480).stroke();

    // write Another expense informations
    doc.fontSize(16).font("Helvetica-Bold").text('Diger Giderler', 38, 88);

    //Add border
    doc.strokeColor('#000000');
    doc.rect(27, 113, 546, 1).stroke();

    // write Another expense informations
    doc.fontSize(16).font("Helvetica-Bold").text('Isim', 38, 124);
    doc.fontSize(16).font("Helvetica-Bold").text('Tutar', 498, 124);

    //Add border
    doc.strokeColor('#000000');
    doc.rect(27, 145, 546, 1).stroke();


    // //write another  expenses
    height = 160
    Array.from(getExpense[0].extra_expenses).map(key=>{

      if(!key[0] == "") {

        doc.fontSize(16).font("Helvetica").text(`${key[0]}`, 38, height);
        doc.fontSize(16).font("Helvetica").text(`${key[1]} TL`, 490, height);
  
        doc.strokeColor('#000000');
        doc.rect(27, height  + 22 , 546, 1).stroke();
        height += 34
        return 
      }
      doc.fontSize(16).font("Helvetica-Bold").text(`Gosterilecek  bir gider yok!`, 190, 302);
      
      
  })
  
  //write document create time
  doc.fontSize(14).font("Helvetica").text(`Bu belge  ${date.toLocaleString()}  tarihinde olusturulmustur. `, 24, 580);

  doc.end();


  res.send("Succes")
  
  res.status(200)
    

}
