const express = require("express");
const {
  validateGetModels,
  validateGetModelById,
  validateDeleteModelById,
  validateCreateModel,
  validateUpdateModel,
} = require("../middlewares/modelsValidation");
const {
  getModels,
  getModelById,
  deleteModelById,
  createModel,
  updateModel,
} = require("../controllers/modelsControllers");
const { authorization } = require("../middlewares/auth");
const { adminRole, userRole } = require("../constant/auth");
const router = express.Router();

router
  .route("/")
  .get(authorization(adminRole, userRole), validateGetModels, getModels)
  .post(authorization(adminRole), validateCreateModel, createModel);

router
  .route("/:id")
  .get(authorization(adminRole, userRole), validateGetModelById, getModelById)
  .put(authorization(adminRole), validateUpdateModel, updateModel)
  .delete(authorization(adminRole), validateDeleteModelById, deleteModelById);

module.exports = router;
