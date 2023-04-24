const express = require("express");

const getPDF = require("../PDFCreator/index");

const router = express.Router();
router.route("/:slug").get(getPDF.createPdf);

module.exports = router;
