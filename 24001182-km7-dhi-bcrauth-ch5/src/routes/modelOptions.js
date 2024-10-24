const express = require("express");
const {
  validateGetModelOptions,
  validateGetModelOptionsById,
  validateDeleteModelOptionsById,
  validateCreateModelOptions,
  validateUpdateModelOptions,
} = require("../middlewares/modelOptionsValidation");
const {
  getModelOptions,
  getModelOptionsById,
  deleteModelOptionsById,
  createModelOptions,
  updateModelOptions,
} = require("../controllers/modelOptionsController");
const { authorization } = require("../middlewares/auth");
const { adminRole, userRole } = require("../constant/auth");

const router = express.Router();

router
  .route("/")
  .get(authorization(adminRole, userRole), validateGetModelOptions, getModelOptions)
  .post(authorization(adminRole), validateCreateModelOptions, createModelOptions);

router
  .route("/:id")
  .get(authorization(adminRole, userRole), validateGetModelOptionsById, getModelOptionsById)
  .put(authorization(adminRole), validateUpdateModelOptions, updateModelOptions)
  .delete(authorization(adminRole), validateDeleteModelOptionsById, deleteModelOptionsById);

module.exports = router;
