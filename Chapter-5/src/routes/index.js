const express = require("express");
const authRouter = require("./auth");
const studentsRouter = require("./students");
const universitiesRouter = require("./universities");
const classesRouter = require("./classes");

const router = express.Router();

router.use("/auth", authRouter);
router.use("/students", studentsRouter);
router.use("/universities", universitiesRouter);
router.use("/classes", classesRouter);

module.exports = router;
