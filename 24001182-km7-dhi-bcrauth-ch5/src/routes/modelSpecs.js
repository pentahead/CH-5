const express = require("express");
const {
  validateGetModelSpecs,
  validateGetModelSpecsById,
  validateDeleteModelSpecsById,
  validateCreateModelSpecs,
  validateUpdateModelSpecs,
} = require("../middlewares/modelSpecsValidation");
const {
  getModelSpecs,
  getModelSpecsById,
  deleteModelSpecsById,
  createModelSpecs,
  updateModelSpecs,
} = require("../controllers/ModelSpecsControllers");
const { authorization } = require("../middlewares/auth");
const { adminRole, userRole } = require("../constant/auth");
const router = express.Router();

router
  .route("/")
  .get(authorization(adminRole, userRole), validateGetModelSpecs, getModelSpecs)
  .post(authorization(adminRole), validateCreateModelSpecs, createModelSpecs);

router
  .route("/:id")
  .get(authorization(adminRole, userRole), validateGetModelSpecsById, getModelSpecsById)
  .put(authorization(adminRole), validateUpdateModelSpecs, updateModelSpecs)
  .delete(authorization(adminRole), validateDeleteModelSpecsById, deleteModelSpecsById);

module.exports = router;
