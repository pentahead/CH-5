const express = require("express");
const studentsRouter = require("./students");
const authrouter = require("./auth");

const router = express.Router();

router.use("/students", studentsRouter);
router.use("/auth", authrouter);

module.exports = router;
