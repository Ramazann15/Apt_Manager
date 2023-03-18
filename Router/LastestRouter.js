const express = require("express");

const lastestController = require("../Controller/LastestController");

const router = express.Router();


router.route("/").get(lastestController.lastestProcess);


module.exports = router;