const express = require("express");

const personController = require("../Controller/PersonController");

const router = express.Router();


router.route("/createPerson").post(personController.createPerson);
router.route("/editperson").put(personController.editPerson);
router.route("/getPerson").get(personController.getPerson);

module.exports = router;
