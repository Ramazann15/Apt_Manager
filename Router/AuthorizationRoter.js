const express = require("express");

const AuthorizationController = require("../Controller/AuthorizationController");

const router = express.Router();


router.route("/Login").get(AuthorizationController.Login);
router.route("/CreateAdmin").post(AuthorizationController.CreateAdmin);
router.route("/ResetAdminPassword").post(AuthorizationController.ResetPassword);


module.exports = router;