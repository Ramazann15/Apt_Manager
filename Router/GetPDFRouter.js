const express = require("express");

const getPDF = require("../PDFCreator/index");


const router = express.Router();
router.route("/createPDF/:slug").get(getPDF.createPdf);


module.exports = router;
