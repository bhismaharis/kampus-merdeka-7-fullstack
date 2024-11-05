const express = require("express");
const { authorizations } = require("../middlewares/auth");
const { getClasses } = require("../controllers/classes");
const { adminRole, userRole } = require("../constants/auth");

const router = express.Router();

// It will be run the URL based on path and the method
router.route("/").get(authorizations(adminRole, userRole), getClasses);

module.exports = router;
