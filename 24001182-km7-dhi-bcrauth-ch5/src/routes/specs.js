const express = require("express");
const {
  validateGetSpecs,
  validateGetSpecById,
  validateDeleteSpecById,
  validateCreateSpec,
  validateUpdateSpec,
} = require("../middlewares/specsValidation");
const {
  getSpecs,
  getSpecById,
  deleteSpecById,
  createSpec,
  updateSpec,
} = require("../controllers/specsControllers");
const { authorization } = require("../middlewares/auth");
const { adminRole, userRole } = require("../constant/auth");
const router = express.Router();


router
  .route("/")
  .get(authorization(adminRole, userRole), validateGetSpecs, getSpecs)
  .post(authorization(adminRole), validateCreateSpec, createSpec);

router
  .route("/:id")
  .get(authorization(adminRole, userRole), validateGetSpecById, getSpecById)
  .put(authorization(adminRole), validateUpdateSpec, updateSpec)
  .delete(authorization(adminRole), validateDeleteSpecById, deleteSpecById);

module.exports = router;
