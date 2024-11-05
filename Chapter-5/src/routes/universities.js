const express = require("express");
const { authorizations } = require("../middlewares/auth");
const { getUniversities } = require("../controllers/universities");
const { adminRole, userRole } = require("../constants/auth");

const router = express.Router();

// It will be run the URL based on path and the method
router.route("/").get(authorizations(adminRole, userRole), getUniversities);

module.exports = router;
