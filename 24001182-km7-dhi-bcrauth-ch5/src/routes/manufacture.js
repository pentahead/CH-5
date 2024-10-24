const express = require("express");
const {
  validateGetManufactures,
  validateGetManufactureById,
  validateDeleteManufactureById,
  validateCreateManufacture,
  validateUpdateManufacture,
} = require("../middlewares/manufacturesValidation");
const {
  getManufactures,
  getManufactureById,
  deleteManufactureById,
  createManufacture,
  updateManufacture,
} = require("../controllers/manufacturesController");
const { authorization } = require("../middlewares/auth");
const { adminRole, userRole } = require("../constant/auth");

const router = express.Router();

router
  .route("/")
  .get(authorization(adminRole, userRole), getManufactures)
  .post(authorization(adminRole), validateCreateManufacture, createManufacture);

router
  .route("/:id")
  .get(authorization(adminRole, userRole), validateGetManufactureById, getManufactureById)
  .put(authorization(adminRole), validateUpdateManufacture, updateManufacture)
  .delete(authorization(adminRole), validateDeleteManufactureById, deleteManufactureById);



module.exports = router;
