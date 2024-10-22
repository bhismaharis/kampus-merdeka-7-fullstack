const express = require("express");
const authRouter = require("./auth");
const studentsRouter = require("./students");

const router = express.Router();

router.use("/auth", authRouter);
router.use("/students", studentsRouter);

module.exports = router;
