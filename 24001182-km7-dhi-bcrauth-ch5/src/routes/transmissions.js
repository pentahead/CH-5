const express = require("express");
const {
  validateGetTransmissions,
  validateGetTransmissionById,
  validateDeleteTransmissionById,
  validateCreateTransmission,
  validateUpdateTransmission,
} = require("../middlewares/transmissionsValidation");
const {
  getTransmissions,
  getTransmissionById,
  deleteTransmissionById,
  createTransmission,
  updateTransmission,
} = require("../controllers/transmissionsController");
const { authorization } = require("../middlewares/auth");
const { adminRole, userRole } = require("../constant/auth");

const router = express.Router();

router
  .route("/")
  .get(authorization(adminRole, userRole), getTransmissions)
  .post(authorization(adminRole), validateCreateTransmission, createTransmission);

router
  .route("/:id")
  .get(authorization(adminRole, userRole), validateGetTransmissionById, getTransmissionById)
  .put(authorization(adminRole), validateUpdateTransmission, updateTransmission)
  .delete(authorization(adminRole), validateDeleteTransmissionById, deleteTransmissionById);

module.exports = router;
