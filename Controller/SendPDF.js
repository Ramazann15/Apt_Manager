const fs = require("fs")


exports.sendPDF = (req,res)=>{
    const path = `${__dirname}/../PDF/${req.params.slug}-output.pdf`
    fs.readFile(path,(err,data)=>{
        if (err) {
            console.error(err);
            return res.status(500).send('Server Error');
          }

         
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=example.pdf');

   
        res.send(data);
    })
}
