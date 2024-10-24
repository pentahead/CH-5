const express = require("express");
const {
  validateGetAvailable,
  validateGetAvailableById,
  validateDeleteAvailableById,
  validateCreateAvailable,
  validateUpdateAvailable,
} = require("../middlewares/availablesValidation");
const {
  getAvailable,
  getAvailableById,
  deleteAvailableById,
  createAvailable,
  updateAvailable,
} = require("../controllers/availablesController");
const { authorization } = require("../middlewares/auth");
const { adminRole, userRole } = require("../constant/auth");

const router = express.Router();

router
  .route("/")
  .get(authorization(adminRole, userRole), getAvailable)
  .post(authorization(adminRole), validateCreateAvailable, createAvailable);

router
  .route("/:id")
  .get(authorization(adminRole, userRole), validateGetAvailableById, getAvailableById)
  .put(authorization(adminRole), validateUpdateAvailable, updateAvailable)
  .delete(authorization(adminRole), validateDeleteAvailableById, deleteAvailableById);

module.exports = router;
