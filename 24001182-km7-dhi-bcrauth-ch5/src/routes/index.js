const express = require("express");
const carRouter = require("./cars");
const optionsRouter = require("./options");
const modelsRouter = require("./models");
const specsRouter = require("./specs");
const manufactureRouter = require("./manufacture");
const transmissionsRouter = require("./transmissions");
const typesRouter = require("./types");
const availablesRouter = require("./availables");
const modeloptionsRouter = require("./modelOptions");
const modelspecsRouter = require("./modelOptions");
const authRouter = require("./auth");

const router = express.Router();

router.use("/auth", authRouter);
router.use("/cars", carRouter);
router.use("/options", optionsRouter);
router.use("/models", modelsRouter);
router.use("/specs", specsRouter);
router.use("/manufactures", manufactureRouter);
router.use("/transmissions", transmissionsRouter);
router.use("/types", typesRouter);
router.use("/availables", availablesRouter);
router.use("/modeloptions", modeloptionsRouter);
router.use("/modelspecs", modelspecsRouter);
module.exports = router;
