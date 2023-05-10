const express = require("express");

const getPDF = require("../PDFCreator/index");
const sendPDF = require("../Controller/SendPDF");

const router = express.Router();
router.route("/createPDF/:slug").get(getPDF.createPdf);


module.exports = router;
