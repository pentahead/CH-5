const express = require("express");
const {
  validateGetTypes,
  validateGetTypeById,
  validateDeleteTypeById,
  validateCreateType,
  validateUpdateType,
} = require("../middlewares/typesValidatiion");
const {
  getTypes,
  getTypeById,
  deleteTypeById,
  createType,
  updateType,
} = require("../controllers/typesController");
const { authorization } = require("../middlewares/auth");
const { adminRole, userRole } = require("../constant/auth");

const router = express.Router();

router
  .route("/")
  .get(authorization(adminRole, userRole), getTypes)
  .post(authorization(adminRole), validateCreateType, createType);

router
  .route("/:id")
  .get(authorization(adminRole, userRole), validateGetTypeById, getTypeById)
  .put(authorization(adminRole), validateUpdateType, updateType)
  .delete(authorization(adminRole), validateDeleteTypeById, deleteTypeById);

module.exports = router;
